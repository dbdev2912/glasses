const express = require('express');
const handlebars = require('express3-handlebars').create({defaultLayout: "main"});
const fileUpload = require('express-fileupload');
const url = require('url');
const secret = require('./secret');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
app.use(express.static("public"));
app.use(require('cookie-parser')(secret.data));
app.use(require('express-session')());

app.use(require('body-parser')({limit: "50mb"}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "public/img/tmp",
}));

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "glasses"
});

function fetchData(query, callback){
    conn.query(query, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            callback(result);
        }
    });
}

function makeCusId(num){
    let str = num.toString();

    let length = str.length;

    let init = "kh";
    for(var i = length; i<10; i++){
        init+="0";
    }
    init += str;
    return init;
}

function makeOrderId(num){
    let str = num.toString();

    let length = str.length;

    let init = "dh";
    for(var i = length; i<10; i++){
        init+="0";
    }
    init += str;
    return init;
}

function makeDateFormat(date){
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} `;
}


app.get('/getProduct', (req, res)=>{
    let query = "SELECT * FROM product";

    fetchData(query, (result)=>{
        res.send({
            products: result,
        })
    });
});


app.get('/getGlass/:id', (req, res)=>{

    let query =`
        SELECT ${"PRODUCT_ID".toLowerCase()}, ${"PRODUCT_NAME".toLowerCase()}, ${"PRICE".toLowerCase()}, ${"DESCRIPTION".toLowerCase()}, ${"URL".toLowerCase()}, ${"MATERIAL_NAME".toLowerCase()}, ${"ORIENTED_NAME".toLowerCase()},
        ${"BRAND_NAME".toLowerCase()}, ${"TYPE_GROUP".toLowerCase()}

        FROM ${"PRODUCT".toLowerCase()} AS P INNER JOIN ${"MATERIAL".toLowerCase()} AS M ON M.MATERIAL_ID = P.MATERIAL_ID
                      INNER JOIN ${"ORIENTED".toLowerCase()} AS O ON O.ORIENTED_ID = P.ORIENTED_ID
                      INNER JOIN ${"BRAND".toLowerCase()} AS B ON B.BRAND_ID = P.BRAND_ID
                      INNER JOIN ${"PRODUCT_TYPE".toLowerCase()} AS T ON T.TYPE_ID = P.TYPE_ID
        WHERE P.PRODUCT_ID = '${req.params.id}';
    `;

    fetchData(query, (result)=>{
        if(result.length > 0){

            let product = result[0];

            query = `
                SELECT ${"ATTACHMENT_NAME".toLowerCase()}, ${"TYPE".toLowerCase()}, ${"URL".toLowerCase()} FROM ${"ATTACHMENTS".toLowerCase()} AS A INNER JOIN ${"PRODUCT_ATTACHMENT".toLowerCase()} AS PA ON A.ATTACHMENT_ID = PA.ATTACHMENT_ID
                WHERE PRODUCT_ID = '${req.params.id}';
            `;

            fetchData(query, (result)=>{
                let attachment = result;
                res.send({
                    exists: true,
                    product: product,
                    attachments: attachment,
                })
            });
        }
        else{
            res.send({
                exists: false,
            })
        }
    });
});

app.post('/login', (req, res)=>{
    let username = req.body.username.toLowerCase();
    let password = req.body.password;

    // console.log(`Username: ${username}\nPassword: ${password}`);

    let query  = `SELECT user_name, password FROM account WHERE USER_NAME = '${username}'`;

    fetchData(query, result=>{
        if(result.length > 0){
            if(result[0].password === password){
                query = `SELECT * FROM customer WHERE USER_NAME = '${username}'`;
                fetchData(query, result=>{
                    req.session.credential = result[0];
                    req.session.cart = [];

                    query = `SELECT * FROM orders WHERE customer_id = '${req.session.credential.customer_id}'`;

                    fetchData(query, result=>{
                        let orders = result;

                        for(var i = 0; i< orders.length; i++){
                            orders[i].order_date = makeDateFormat(orders[i].order_date);
                            orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
                        }

                        req.session.orders = orders;

                        query =`
                        select od.product_id, o.order_id, status, product_name, price, url, oriented_name, material_name, brand_name, type_group
                        from product as p inner join order_detail as od on od.product_id = p.product_id
                                      inner join orders as o on o.order_id = od.order_id
                                      inner join brand as b on p.brand_id = b.brand_id
                                      inner join product_type as pt on pt.type_id = p.type_id
                                      inner join oriented as e on e.oriented_id = p.oriented_id
                                      inner join material as m on m.material_id = p.material_id
                                      inner join customer as c on c.customer_id = o.customer_id
                        where o.customer_id = '${req.session.credential.customer_id}';
                        `;

                        fetchData(query, result =>{
                            let ordersDetail = result;

                            req.session.ordersDetail = ordersDetail;

                            res.send({
                                signed: true,
                                credential:req.session.credential,
                                orders: orders,
                                details: ordersDetail,
                            });
                        });
                    });
                });
            }
            else{
                res.send({
                    signed: false,
                    message: "Sai mật khẩu gòi",
                });
            }
        }
        else{
            res.send({
                signed: false,
                message: "Tài khoản không tồn tại",
            });
        }
    });
});

app.post('/logout', (req, res)=>{
    req.session.credential = null;
    req.session.cart = [];
    res.send({
        signed: false,
        message: "",
    });
})

app.post('/newCustomer', (req, res)=>{
    let nUser = req.body.nUser;
    let nPass = req.body.nPass;
    let nReen = req.body.nReen;
    let nName = req.body.nName;
    let nPhon = req.body.nPhon;
    let nMail = req.body.nMail;
    let nAddr = req.body.nAddr;

    let query = `SELECT * FROM customer WHERE USER_NAME='${nUser}'`;

    fetchData(query, result=>{
        if(result.length ===0 ){
            query = "SELECT COUNT(*) AS count FROM customer";
            fetchData(query, result=>{
                let total = result[0].count;

                let credential = {
                    customer_id: makeCusId(total + 1),
                    customer_name: nName,
                    phone: nPhon,
                    email: nMail,
                    address: nAddr
                }

                req.session.credential = credential;
                req.session.cart = [];

                query = `INSERT INTO account(USER_NAME, PASSWORD) VALUES('${nUser}', '${nPass}')`;
                fetchData(query, result =>{

                    query = `
                    INSERT INTO customer(customer_id, customer_name, phone, email, address, user_name)
                    VALUES('${makeCusId(total + 1)}', '${nName}', '${nPhon}', '${nMail}', '${nAddr}', '${nUser}');
                    `;

                    fetchData(query, result=>{
                        res.send({
                            signed: true,
                            credential: credential
                        });
                    });
                });

            });
        }
        else{
            res.send({
                signed: false,
                message: "Tài khoản này đã tồn tại!"
            });
        }
    });
});

app.post('/addCart', (req, res)=>{
    let cart = req.session.cart;

    let glasses = req.body.glasses;

    cart.push(glasses);

    req.session.cart = cart;
    res.send({
        added: true,
        cart: cart,
    });
});

app.post('/clearCart', (req, res)=>{
    req.session.cart = [];
    res.send({

    })
});

app.post('/makeOrder', (req, res)=>{
    let carts = req.body.cart;
    let orderCollection  = "";
    let detailCollection = "INSERT INTO order_detail VALUES";
    let date = new Date();
    let dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${1+(date.getHours()+23)%12}:${date.getMinutes()}:00`;

    let preditDateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+3} ${1+(date.getHours()+23)%12}:${date.getMinutes()}:00`;

    let query = "SELECT COUNT(*) AS C FROM orders";

    fetchData(query, result =>{
        let count = parseInt(result[0].C);

        orderCollection = `INSERT INTO orders VALUES('${makeOrderId(count + 1)}', '${req.session.credential.customer_id}', '${dateString}', '${preditDateString}', '${req.session.credential.address}', 'accepted')`;

        for(var i = 0; i < carts.length; i++){
            detailCollection+= `('${makeOrderId(count + 1)}', '${carts[i].product_id}', 1, '')`;
            if(i!=carts.length-1){
                detailCollection+=",";
            }
        }

        fetchData(orderCollection, result =>{
            fetchData(detailCollection, result=>{

                query = `SELECT * FROM orders WHERE customer_id = '${req.session.credential.customer_id}'`;

                fetchData(query, result=>{
                    let orders = result;

                    for(var i = 0; i< orders.length; i++){
                        orders[i].order_date = makeDateFormat(orders[i].order_date);
                        orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
                    }

                    req.session.orders = orders;

                    query =`
                    select od.product_id, o.order_id, status, product_name, price, url, oriented_name, material_name, brand_name, type_group
                    from product as p inner join order_detail as od on od.product_id = p.product_id
                                  inner join orders as o on o.order_id = od.order_id
                                  inner join brand as b on p.brand_id = b.brand_id
                                  inner join product_type as pt on pt.type_id = p.type_id
                                  inner join oriented as e on e.oriented_id = p.oriented_id
                                  inner join material as m on m.material_id = p.material_id
                                  inner join customer as c on c.customer_id = o.customer_id
                    where o.customer_id = '${req.session.credential.customer_id}';
                    `;

                    fetchData(query, result =>{
                        let ordersDetail = result;

                        req.session.ordersDetail = ordersDetail;

                        res.send({
                            orders: orders,
                            details: ordersDetail,
                        });
                    });
                });
            });
        });
    });
});

app.get('/session', (req, res)=>{
    if(req.session.credential != null){
        query = `SELECT * FROM orders WHERE customer_id = '${req.session.credential.customer_id}'`;

        fetchData(query, result=>{
            let orders = result;

            for(var i = 0; i< orders.length; i++){
                orders[i].order_date = makeDateFormat(orders[i].order_date);
                orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
            }

            req.session.orders = orders;

            query =`
            select od.product_id, o.order_id, status, product_name, price, url, oriented_name, material_name, brand_name, type_group
            from product as p inner join order_detail as od on od.product_id = p.product_id
                          inner join orders as o on o.order_id = od.order_id
                          inner join brand as b on p.brand_id = b.brand_id
                          inner join product_type as pt on pt.type_id = p.type_id
                          inner join oriented as e on e.oriented_id = p.oriented_id
                          inner join material as m on m.material_id = p.material_id
                          inner join customer as c on c.customer_id = o.customer_id
            where o.customer_id = '${req.session.credential.customer_id}';
            `;

            fetchData(query, result =>{
                let ordersDetail = result;

                req.session.ordersDetail = ordersDetail;

                res.send({
                    signed: true,
                    credential:req.session.credential,
                    orders: orders,
                    details: ordersDetail,
                    cart: req.session.cart,
                });
            });
        });
    }else{
        res.send({
            signed: false,
            message: "",
        });
    }
});




app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get('/', (req, res)=>{
    let query =
    `
        select o.order_id, count(product_id) as qty, order_date, deliver_date, status, o.address
        from orders as o  inner join customer as c on c.customer_id = o.customer_id
        inner join order_detail as od on od.order_id = o.order_id
        where o.status = 'accepted'
        group by o.order_id
    `;

    fetchData(query, (result)=>{
        let orders = result;

        for(var i = 0; i< orders.length; i++){
            orders[i].order_date = makeDateFormat(orders[i].order_date);
            orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
        }

        query =
        `
            select c.customer_id, customer_name, c.address as cadd, c.phone, email , o.order_id, count(product_id) as qty, o.address as oadd, order_date
            from orders as o  inner join customer as c on c.customer_id = o.customer_id
            inner join order_detail as od on od.order_id = o.order_id
            where od.order_id='${orders.length>0 ? orders[0].order_id : ""}' and o.status='accepted';
        `;


        fetchData(query, result=>{
            let order = result[0];
            order.order_date = makeDateFormat(order.order_date);
            order.deliver_date = makeDateFormat(order.deliver_date);


            query =
            `
            select p.product_id, product_name, price, description, url, material_name, oriented_name, brand_name, type_group, note
            from product as p
            	inner join material as m on m.material_id = p.material_id
            	inner join oriented as o on o.oriented_id = p.oriented_id
            	inner join brand as b on b.brand_id = p.brand_id
            	inner join product_type as t on t.type_id = p.type_id
            	inner join order_detail as od on od.product_id = p.product_id
            where order_id = '${orders.length>0 ? orders[0].order_id : ""}';
            `;

            fetchData(query, result=>{
                let glasses = result;


                res.render("order", {
                    orders: orders,
                    order: order,
                    glasses: glasses,
                });
            });
        });
    });
});


app.get('/p/:id', (req, res)=>{
    let query =
    `
        select o.order_id, count(product_id) as qty, order_date, deliver_date, status, o.address
        from orders as o  inner join customer as c on c.customer_id = o.customer_id
        inner join order_detail as od on od.order_id = o.order_id
        where o.status = 'accepted'
        group by o.order_id
    `;

    fetchData(query, (result)=>{
        let orders = result;

        for(var i = 0; i< orders.length; i++){
            orders[i].order_date = makeDateFormat(orders[i].order_date);
            orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
        }

        query =
        `
            select c.customer_id, customer_name, c.address as cadd, c.phone, email , o.order_id, count(product_id) as qty, o.address as oadd, order_date
            from orders as o  inner join customer as c on c.customer_id = o.customer_id
            inner join order_detail as od on od.order_id = o.order_id
            where od.order_id='${req.params.id}';
        `;


        fetchData(query, result=>{
            let order = result[0];
            order.order_date = makeDateFormat(order.order_date);
            order.deliver_date = makeDateFormat(order.deliver_date);


            query =
            `
            select p.product_id, product_name, price, description, url, material_name, oriented_name, brand_name, type_group, note
            from product as p
            	inner join material as m on m.material_id = p.material_id
            	inner join oriented as o on o.oriented_id = p.oriented_id
            	inner join brand as b on b.brand_id = p.brand_id
            	inner join product_type as t on t.type_id = p.type_id
            	inner join order_detail as od on od.product_id = p.product_id
            where order_id = '${req.params.id}';
            `;

            fetchData(query, result=>{
                let glasses = result;


                res.render("order", {
                    orders: orders,
                    order: order,
                    glasses: glasses,
                });
            });
        });
    });
});


app.get('/s/:id', (req, res)=>{
    let query =
    `
        select o.order_id, count(product_id) as qty, order_date, deliver_date, status, o.address
        from orders as o  inner join customer as c on c.customer_id = o.customer_id
        inner join order_detail as od on od.order_id = o.order_id
        where o.status = 'shipped'
        group by o.order_id
    `;

    fetchData(query, (result)=>{
        let orders = result;

        for(var i = 0; i< orders.length; i++){
            orders[i].order_date = makeDateFormat(orders[i].order_date);
            orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
        }

        query =
        `
            select c.customer_id, customer_name, c.address as cadd, c.phone, email , o.order_id, count(product_id) as qty, o.address as oadd, order_date
            from orders as o  inner join customer as c on c.customer_id = o.customer_id
            inner join order_detail as od on od.order_id = o.order_id
            where od.order_id='${req.params.id}';
        `;


        fetchData(query, result=>{
            let order = result[0];
            order.order_date = makeDateFormat(order.order_date);
            order.deliver_date = makeDateFormat(order.deliver_date);


            query =
            `
            select p.product_id, product_name, price, description, url, material_name, oriented_name, brand_name, type_group, note
            from product as p
            	inner join material as m on m.material_id = p.material_id
            	inner join oriented as o on o.oriented_id = p.oriented_id
            	inner join brand as b on b.brand_id = p.brand_id
            	inner join product_type as t on t.type_id = p.type_id
            	inner join order_detail as od on od.product_id = p.product_id
            where order_id = '${req.params.id}';
            `;

            fetchData(query, result=>{
                let glasses = result;


                res.render("shipped", {
                    orders: orders,
                    order: order,
                    glasses: glasses,
                });
            });
        });
    });
});


app.get('/d/:id', (req, res)=>{
    let query =
    `
        select o.order_id, count(product_id) as qty, order_date, deliver_date, status, o.address
        from orders as o  inner join customer as c on c.customer_id = o.customer_id
        inner join order_detail as od on od.order_id = o.order_id
        where o.status = 'done' or o.status = 'canceled'
        group by o.order_id
    `;

    fetchData(query, (result)=>{
        let orders = result;

        for(var i = 0; i< orders.length; i++){
            orders[i].order_date = makeDateFormat(orders[i].order_date);
            orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
        }

        query =
        `
            select c.customer_id, customer_name, c.address as cadd, c.phone, email , o.order_id, count(product_id) as qty, o.address as oadd, order_date
            from orders as o  inner join customer as c on c.customer_id = o.customer_id
            inner join order_detail as od on od.order_id = o.order_id
            where od.order_id='${req.params.id}';
        `;


        fetchData(query, result=>{
            let order = result[0];
            order.order_date = makeDateFormat(order.order_date);
            order.deliver_date = makeDateFormat(order.deliver_date);


            query =
            `
            select p.product_id, product_name, price, description, url, material_name, oriented_name, brand_name, type_group, note
            from product as p
            	inner join material as m on m.material_id = p.material_id
            	inner join oriented as o on o.oriented_id = p.oriented_id
            	inner join brand as b on b.brand_id = p.brand_id
            	inner join product_type as t on t.type_id = p.type_id
            	inner join order_detail as od on od.product_id = p.product_id
            where order_id = '${req.params.id}';
            `;

            fetchData(query, result=>{
                let glasses = result;


                res.render("done", {
                    orders: orders,
                    order: order,
                    glasses: glasses,
                });
            });
        });
    });
});


app.get('/new/product', (req, res)=>{

    let query = `select * from material`;

    fetchData(query, result=>{
        material = result;
        let query = `select * from oriented`;

        fetchData(query, result=>{
            oriented = result;
            let query = `select * from brand`;

            fetchData(query, result=>{
                brand = result;
                let query = `select * from product_type`;

                fetchData(query, result=>{
                    product_type = result;

                    query = `
                    select product_id, product_name, url, price, description, material_name, type_group, oriented_name, brand_name
                    from product as p inner join material as m on m.material_id = p.material_id
                      inner join brand as b on b.brand_id = p.brand_id
                      inner join oriented as o on o.oriented_id = p.oriented_id
                      inner join product_type as pt on pt.type_id = p.type_id
                    `;

                    fetchData(query, result=>{
                        let products = result;

                        query = "select * from attachments";

                        fetchData(query, result=>{
                            let towel = result.filter(r => r.type === "towel");
                            let liquid = result.filter(r => r.type === "liquid");
                            let container = result.filter(r => r.type === "container");
                            res.render('newproduct', {material, oriented, brand, product_type, products, towel, liquid, container});
                        });
                    });
                });
            });
        });
    });
});




app.get('/others', (req, res)=>{



    res.render('others', {})
});




app.get("/oriented", (req, res)=>{
    let query = "select * from oriented";
    fetchData(query, result=>{
        let data = result;
        res.render("oriented", {data: data})
    });
})


app.get("/material", (req, res)=>{
    let query = "select * from material";
    fetchData(query, result=>{
        let data = result;
        res.render("material", {data: data})
    });
})


app.get("/brand", (req, res)=>{
    let query = "select * from brand";
    fetchData(query, result=>{
        let data = result;
        res.render("brand", {data: data})
    });
})


app.get("/type", (req, res)=>{
    let query = "select * from product_type";
    fetchData(query, result=>{
        let data = result;
        res.render("type", {data: data})
    });
})

app.post("/addOther", (req, res)=>{
    let type = req.body.type;
    let id = req.body.id;
    let name = req.body.name;
    let query = `INSERT INTO ${type} values('${id}', '${name}')`;

    fetchData(query, result=>{
        res.send({
            success: true,
        })
    });
})



app.post('/newproductRequest', (req, res)=>{
    var d = new Date();


    let product_id = req.body.product_id;
    let product_name = req.body.product_name;
    let description = req.body.description;
    let price = req.body.price;
    let material_id = req.body.material_id;
    let oriented_id = req.body.oriented_id;
    let brand_id = req.body.brand_id;
    let type_id = req.body.type_id;

    let liquid = req.body.liquid;
    let container = req.body.container;
    let towel = req.body.towel;
    // console.log(product_id + "   " + product_name + "   " + description + "   " + price + "   " + material_id + "   " + oriented_id + "   " + brand_id + "   " + type_id)


    var new_name = `${d.getFullYear()}${d.getMonth()+1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`;
    let base64Image = req.body.image.split(';base64,').pop();
    fs.writeFile(`public/img/product/${new_name}.jpg`, base64Image, {encoding: 'base64'}, function(err) {

        let query = `insert into product values ('${product_id}', '${product_name}', '${price}', '${description}', '/img/product/${new_name}.jpg', '${material_id}', '${oriented_id}', '${brand_id}', '${type_id}')`;

        fetchData(query, result=>{

            query = `insert into product_attachment values
                    ('${product_id}', '${liquid}'),('${product_id}', '${container}'),('${product_id}', '${towel}');`;

            fetchData(query, result =>{

                res.send({
                    success: true,
                });
            });
        });
    });
});

app.post('/deleteProduct', (req, res)=>{
    let query = `delete from product where product_id='${req.body.product_id}'`;

    fetchData(query, result=>{
        res.send({
            success: true,
        })
    });
});


app.post("/updateOrderNote", (req, res)=>{
    let products = req.body.product;
    let order_id = req.body.order_id;

    let query = `DELETE FROM order_detail where order_id = '${order_id}'`;

    fetchData(query, result=>{

        query = "insert into order_detail values";

        for(var i = 0; i<products.length; i++){
            query += `('${order_id}', '${products[i].product_id}', 1, '${products[i].note}'),`;
        }
        fetchData(query.slice(0, -1), result=>{
            query = `update orders set status='shipped' where order_id='${order_id}'`;
            fetchData(query, result=>{

                res.send({
                    success: true,
                });
            });
        });
    });
});


app.post('/getOrdersLabel', (req, res)=>{

    let query =
    `
        select o.order_id, count(product_id) as qty, order_date, deliver_date, status, o.address
        from orders as o  inner join customer as c on c.customer_id = o.customer_id
        inner join order_detail as od on od.order_id = o.order_id
        where o.status = '${req.body.status}'
        group by o.order_id
    `;

    fetchData(query, result=>{
        let orders = result;

        for(var i = 0; i< orders.length; i++){
            orders[i].order_date = makeDateFormat(orders[i].order_date);
            orders[i].deliver_date = makeDateFormat(orders[i].deliver_date);
        }

        res.send({
            orders: orders,
        })
    });
});


app.post('/makeOrderDone', (req, res)=>{
    let order_id = req.body.order_id;

    let query = `update orders set status = 'done' where order_id='${order_id}'`;

    fetchData(query, result=>{

        res.send({
            success: true,
        });
    });
});


app.listen(5000, ()=>{
    console.log("Server started on http://127.0.0.1:5000\nPress Ctrl + C to terminate... ");
})
