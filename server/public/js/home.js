$('.order').click(function(){
    window.location = $(this).attr('redirect');
});


$('#makeOrder').click(function(){
    let order_id = $('.products').eq(0).attr('order_id');

    let product = [];

    $('.product-container').each(function(){
        let product_id =  $(this).find('.product').eq(0).attr('pid');
        let note = $(this).find('textarea').val();
        product.push({
            product_id,
            note,
        });
    });

    console.log(product);

    $.ajax({
        url: "/updateOrderNote",
        data: {product, order_id},
        type: "post",
        success: function(resp){
            if(resp.success){

                window.location = `/s/${order_id}`;
            }
        }
    });
});


$('.orders-type button').each(function(){
    $(this).click(function(){
        let token = '';
        let type = $(this).attr('name');
        if(type !== 'accepted'){
            $('.confirm-group').hide();
        }else{
            $('.confirm-group').show();
        }

        switch (type) {
            case "accepted":
                token = "p"
                break;
            case "shipped":
                token = "s"
                break;
            case "done":
                token = "d"
                break;
        }

        $.ajax({
            url: '/getOrdersLabel',
            data: {
                status: type,
            },
            type: "post",
            success: function(resp){
                let orders = resp.orders;
                $('.orders-container').html('');
                for(var i = 0; i< orders.length; i++){
                    let div = document.createElement('div');
                    $(div).attr('class', 'order');
                    $(div).attr('redirect', `/${token}/${orders[i].order_id}`);
                    $(div).html(
                        `
                            <div class="order-head">
                                <span class="order-span-w5">Mã đơn hàng: ${orders[i].order_id}</span>
                                <span class="order-span-w3">Qty: ${orders[i].qty}</span>
                                <span class="order-span-w2">${orders[i].status}</span>
                            </div>
                            <div class="order-dates">
                                <p class="order-date">
                                    <span class="order-date-title">Ngày đặt: </span><span>${orders[i].order_date}</span>
                                </p>
                            </div>
                        `);
                    $('.orders-container').eq(0).append(div);
                }
                $('.order').click(function(){
                    window.location = $(this).attr('redirect');
                });
            }
        });
    });
});


$('#makeDone').click(function(){
    let order_id = $(this).attr('order_id');
    $.ajax({
        url: '/makeOrderDone',
        type: "post",
        data: {
            order_id: order_id
        },
        success: function(resp){
            if(resp.success){
                window.location='/d/'+order_id;
            }
        }
    });
});

$('.untouch').focus(function(){
    $(this).blur();
})
