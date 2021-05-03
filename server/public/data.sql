use glasses;

insert into brand(brand_id, brand_name) values('br1', 'Mắt kính Mỹ nữ'), ('br2', 'Handmande hàng hiệu');
insert into material(material_id, material_name) values('ND', 'Nhựa dẽo'), ('IN', 'Inox');
insert into oriented(oriented_id, oriented_name) values('m', 'Nam'), ('f', 'Nữ'), ('y', 'Trẻ em'), ('o', 'Lão');
insert into product_type(type_id, type_group) values('C', 'Cận'), ('V', 'Viễn'), ('M', 'Mát');

insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('1', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp1.jpg', 'ND', 'm', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('2', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp2.jpg', 'ND', 'm', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('3', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp3.jpg', 'ND', 'm', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('4', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp4.jpg', 'ND', 'm', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('5', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp5.jpg', 'ND', 'y', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('6', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp6.jpg', 'ND', 'y', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('7', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp7.jpg', 'ND', 'y', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('8', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp8.jpg', 'ND', 'y', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('9', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp9.jpg', 'ND', 'f', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('10', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp10.jpg', 'ND', 'f', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('11', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp11.jpg', 'ND', 'f', 'br1', 'C');
insert into product(product_id, product_name, price, description, url, material_id, oriented_id, brand_id, type_id) values('12', 'THIS IS THE FREAKING LONGGGG NAME OF A GLASSES', 529000, '', '/img/product/sp12.jpg', 'ND', 'f', 'br1', 'C');


update product set description = '- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.
- Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
- Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.
- Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.
- Culpa qui officia deserunt mollit anim id est laborum.';

insert into `attachments` values
('at1', 'Nước rửa kính hàng hiệu', '/img/attach/liquid.jpg', 'liquid'),
('at2', 'Hộp đựng kính quý\'s tộc\'ss', '/img/attach/container.jpg', 'container'),
('at3', 'Giẻ lao kính bản giới hạn', '/img/attach/towel.jpg', 'towel');

insert into product_attachment select product_id, 'at1' from product;
insert into product_attachment select product_id, 'at2' from product;
insert into product_attachment select product_id, 'at3' from product;