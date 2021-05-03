DROP DATABASE IF EXISTS glasses;

CREATE DATABASE glasses;
USE glasses;

create table `product`
(
	`product_id` varchar(20) primary key not null, -- pk
    `product_name` varchar(255),
    `price` int,
    `description` text,
    `url` text,
    `material_id` varchar(20),
    `oriented_id` varchar(20),
    `brand_id` varchar(20),
    `type_id` varchar(20)
);

create table `brand`
(
	`brand_id` varchar(20) primary key not null,
    `brand_name` varchar(255)
);

create table `product_type`
(
	`type_id` varchar(20) primary key not null,
    `type_group` varchar(255)
);

create table `material`
(
	`material_id` varchar(20) primary key not null,
    `material_name` varchar(255) 
);

create table `oriented`
(
	oriented_id varchar(20) primary key not null,
    oriented_name varchar(255)
);


alter table product add constraint `fk_pro_mater` foreign key (`material_id`) references `material`(`material_id`);
alter table product add constraint `fk_pro_orie`  foreign key (`oriented_id`) references `oriented`(`oriented_id`);
alter table product add constraint `fk_pro_bran`  foreign key (`brand_id`) 	  references `brand`(`brand_id`);
alter table product add constraint `fk_pro_type`  foreign key (`type_id`)	  references `product_type`(`type_id`);


create table `customer`
(
	`customer_id` varchar(20) primary key not null,
    `customer_name` varchar(255),
    `email` varchar(255),
    `phone` varchar(20),
    `gender` enum('mail', 'female', 'orther', "unknown") default "unknown",
    `date_of_birth` datetime,
    `address` text,
    `user_name` varchar(255)
);

create table `account` 
(
	`user_name` varchar(255) primary key not null,
    `password` varchar(255)
);

alter table customer add constraint `fk_cus_acc` foreign key (`user_name`) references `account`(`user_name`);


create table `orders`
(
	`order_id` varchar(20) primary key not null,
    `customer_id` varchar(20),
    `order_date` datetime,
    `deliver_date` datetime,
    `address` text,
    `status` enum('accepted', 'shipped', 'done', 'canceled')
);

alter table `orders` add constraint `fk_ors_cus` foreign key (`customer_id`) references `customer`(`customer_id`);

create table `order_detail` 
(
	`order_id` varchar(20),
    `product_id` varchar(20),
    `quantity` tinyint default 1,
    `note` text
);

alter table `order_detail` add constraint primary key (`order_id`, `product_id`);
alter table `order_detail` add constraint `fk_or_od` foreign key (`order_id`) references `orders`(`order_id`);


create table `attachments`
(
	`attachment_id` varchar(20) primary key not null,
    `attachment_name` varchar(255),
    `url` text,
    `type` enum('liquid', 'towel', 'container')
);

create table `product_attachment`
(
	`product_id` varchar(20),
    `attachment_id` varchar(20)
);

alter table `product_attachment` add constraint primary key (`product_id`, `attachment_id`);
alter table `product_attachment` add constraint `fk_pa_pro` foreign key (`product_id`) references `product`(`product_id`) on delete cascade on update cascade;
alter table `product_attachment` add constraint `fk_pa_att` foreign key (`attachment_id`) references `attachments`(`attachment_id`);