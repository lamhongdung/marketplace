-- -----------
-- database --
-- -----------
drop database if exists marketplace;

create database marketplace;

use marketplace;

-- -----------------------------------------------------
-- table `product`
-- -----------------------------------------------------

set foreign_key_checks = 0;

drop table if exists `product`;

create table `product` (

  `id` int not null auto_increment,
  `name` varchar(255) default null,
  `description` varchar(5000) default null,
  `unitPrice` decimal(13,2) default null,
  `imageUrl` varchar(255) default null,
  `active` bit default 1,
  `unitInStock` int default null,
  `dateCreated` datetime(6) default null,
  `lastUpdated` datetime(6) default null,
  
  primary key (`id`)
  
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1001,'Điện thoại iPhone 12 Pro Max 128GB','iPhone 12 Pro Max 128 GB một siêu phẩm smartphone đến từ Apple. Máy có một hiệu năng hoàn toàn mạnh mẽ đáp ứng tốt nhiều nhu cầu đến từ người dùng và mang trong mình một thiết kế đầy vuông vức, sang trọng',32990000,'assets/image/product/1001.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1002,'Điện thoại Samsung Galaxy Z Flip3 5G 256GB ','Nối tiếp thành công của Galaxy Z Flip 5G, trong sự kiện Galaxy Unpacked vừa qua Samsung tiếp tục giới thiệu đến thế giới về Galaxy Z Flip3 5G 256GB. Sản phẩm có nhiều cải tiến từ độ bền cho đến hiệu năng và thậm chí nó còn vượt xa hơn mong đợi của mọi người',25990000,'assets/image/product/1002.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1003,'Điện thoại iPhone 11 128GB','Được xem là một trong những phiên bản iPhone "giá rẻ" của bộ 3 iPhone 11 series nhưng iPhone 11 128GB vẫn sở hữu cho mình rất nhiều ưu điểm mà hiếm có một chiếc smartphone nào khác sở hữu',18990000,'assets/image/product/1003.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1004,'Điện thoại OPPO Reno6 Pro 5G','OPPO Reno6 Pro 5G - một sản phẩm thuộc dòng Reno6 của OPPO, thỏa mãn những gì người tiêu dùng đã trông đợi với cấu hình khủng cùng hệ thống camera cực ấn tượng và ngoại hình bắt mắt, thật hào hứng mong chờ để được trải nghiệm',18490000,'assets/image/product/1004.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1005,'Điện thoại Vivo Y20s','Sau Y20 thì Vivo đã tung ra mẫu điện thoại Y20s. Mẫu smartphone được nâng cấp dung lượng bộ nhớ và RAM cao hơn mang đến trải nghiệm mượt mà, lưu trữ thoải mái, đi kèm thiết kế đẹp mắt ấn tượng, dung lượng pin lớn đáp ứng nhu cầu giải trí cả ngày dài',4690000,'assets/image/product/1005.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1006,'Điện thoại Samsung Galaxy Z Fold3 5G 512GB','Galaxy Z Fold3 5G đánh dấu bước tiến mới của Samsung trong phân khúc điện thoại gập cao cấp khi được cải tiến về độ bền cùng những nâng cấp đáng giá về cấu hình hiệu năng, hứa hẹn sẽ mang đến trải nghiệm sử dụng đột phá cho người dùng',43990000,'assets/image/product/1006.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1007,'Điện thoại iPhone 12 64GB','Trong những tháng cuối năm 2020, Apple đã chính thức giới thiệu đến người dùng cũng như iFan thế hệ iPhone 12 series mới với hàng loạt tính năng bứt phá, thiết kế được lột xác hoàn toàn, hiệu năng đầy mạnh mẽ và một trong số đó chính là iPhone 12 64GB',20490000,'assets/image/product/1007.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1008,'Điện thoại Xiaomi 11T 5G 256GB','Xiaomi 11T 5G sở hữu màn hình AMOLED, viên pin siêu khủng cùng camera độ phân giải 108 MP, chiếc smartphone này của Xiaomi sẽ đáp ứng mọi nhu cầu sử dụng của bạn, từ giải trí đến làm việc đều vô cùng mượt mà',11990000,'assets/image/product/1008.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1009,'Điện thoại Samsung Galaxy A52s 5G','Samsung đã chính thức giới thiệu chiếc điện thoại Galaxy A52s 5G đến người dùng, đây phiên bản nâng cấp của Galaxy A52 5G ra mắt cách đây không lâu, với ngoại hình không đổi nhưng được nâng cấp đáng kể về thông số cấu hình bên trong',10990000,'assets/image/product/1009.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1010,'Laptop Acer Nitro 5 Gaming','Acer Nitro 5 Gaming AN515 57 727J i7 (NH.QD9SV.005.) sở hữu vẻ ngoài cá tính, nổi bật và được tích hợp bộ vi xử lý Intel thế hệ 11 tân tiến, card đồ hoạ rời NVIDIA GeForce RTX, hứa hẹn mang đến các trải nghiệm tuyệt vời cho người dùng',28990000,'assets/image/product/1010.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1011,'Điện thoại iPhone 12 64GB','Trong những tháng cuối năm 2020, Apple đã chính thức giới thiệu đến người dùng cũng như iFan thế hệ iPhone 12 series mới với hàng loạt tính năng bứt phá, thiết kế được lột xác hoàn toàn, hiệu năng đầy mạnh mẽ và một trong số đó chính là iPhone 12 64GB',20490000,'assets/image/product/1011.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1012,'Laptop Apple MacBook Air M1 2020','Laptop Apple MacBook Air M1 2020 (Z12A00050) mang nét thanh lịch sang trọng với thiết kế kim loại nguyên khối cùng hiệu năng vượt trội nhờ chip M1 độc quyền của “nhà Táo” sẽ mang đến cho bạn những trải nghiệm riêng biệt mà chỉ dòng máy MacBook mới có được',39490000,'assets/image/product/1012.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1013,'Laptop Dell Gaming G3 15 i7','Laptop Dell G3 15 i7 (P89F002BWH) thuộc dòng laptop gaming với cấu hình mạnh mẽ, thiết kế trang nhã và rất sang trọng, dễ lựa chọn cho cả người đi đọc, đi làm, là 1 phiên bản tốt để lựa chọn cho cả nhu cầu làm việc, học tập và chơi game giải trí',31490000,'assets/image/product/1013.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1014,'Laptop Apple MacBook Pro 14 M1','Sự đẳng cấp không chỉ ở thiết kế thời thượng, sang trọng mà còn sở hữu sức mạnh siêu năng với con chip Apple M1 Pro phiên bản nâng cấp ấn tượng đến từ nhà Apple, mang đến cho bạn trải nghiệm làm việc chuyên nghiệp nhất dù là các tác vụ đồ họa - kỹ thuật chuyên sâu',54990000,'assets/image/product/1014.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1015,'Máy In laser Trắng Đen Brother HL L2321D','Được thiết kế hướng đến phục vụ người dùng doanh nghiệp nên máy in Brother HL-L2321D có kiểu dáng vuông vắn, màu sắc sạch sẽ, cứng cáp, giúp tối ưu không gian bố trí hơn',3490000,'assets/image/product/1015.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1016,'Máy in Laser đa năng trắng đen Brother DCP-B7535DW','Máy in Laser đa năng Brother DCP-B7535DW wifi sở hữu thiết kế đơn giản, sang trọng. Bốn góc cạnh được bo tròn mềm mại giúp máy in Brother trông nổi bật hơn. Màu xám trên máy in cũng khá tao nhã, phù hợp hầu hết các không gian sống từ gia đình, cơ quan làm việc đến hộ kinh doanh',5490000,'assets/image/product/1016.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1017,'Máy In Ảnh Phun Màu Canon PIXMA TS6370 Wifi','Với độ phân giải cao, máy in copy xuất ra những bản in rõ ràng, chuẩn đẹp, không bị mờ nhòe, cho bạn nhìn rõ từng vùng trên ảnh. Chất lượng in gần như đúng với bản gốc trên máy tính sẽ hỗ trợ tốt cho bạn khi cần in những bản vẽ, bản thiết kế làm mẫu',3990000,'assets/image/product/1017.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1018,'HP AIO 24 df1028d i5 1135G7/8GB/512GB/23.8"','HP AIO 24 df1028d i5 1135G7(4B6E1PA) là sản phẩm All-in-One được tích hợp đầy đủ CPU, ổ cứng, loa, camera vào chung một chiếc màn hình máy tính bàn, có chuột và bàn phím không dây đi kèm, là sản phẩm không chỉ mạnh mẽ về cấu hình mà còn mang đến một vẻ đẹp hiện đại, gọn gàng cho không gian văn phòng của bạn',21290000,'assets/image/product/1018.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1019,'Lenovo IdeaCentre AIO 3 24ITL6 i5','Lenovo IdeaCentre AIO 3 24ITL6 (F0G0009AVN) là phiên bản máy tính nguyên bộ All-in-one khi được tích hợp đầy đủ các linh kiện đa năng như loa, CPU, camera,... vào chung một màn hình lớn nhưng vẫn sở hữu lối thiết kế gọn gàng, thời thượng cùng cấu hình mạnh mẽ đa tác vụ',20590000,'assets/image/product/1019.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1020,'Tai nghe EP Gaming Asus Rog Cetra II Core Đen','Củ tai có lớp vỏ nhôm nhẹ, cho khả năng chịu lực tốt, chống trầy xước. Kiểu dáng củ tai hơi nghiêng về phía trước cùng đệm tai và móc tai chất liệu LSR (cao su silicone lỏng) kết cấu cực mềm tạo nên sự dễ chịu và phù hợp tối ưu cho trải nghiệm nghe tốt nhất trong khi chơi game',1161000,'assets/image/product/1020.jpg',1,100,now(),now());
insert into product (id, name, description, unitPrice, imageUrl, active, unitInStock,  dateCreated, lastUpdated) VALUES (1021,'Tai nghe Bluetooth True Wireless Beats Studio Buds MJ503 Đỏ','Phiên bản Beats Studio Buds MJ503 màu đỏ cực bắt mắt với hộp sạc kiểu dáng mềm mại, mới lạ, rất trẻ trung cho người trẻ năng động. Vỏ ngoài hộp sạc và tai nghe dùng chất liệu nhựa nhám sang trọng, chống trầy, tiện lợi cho bạn mang theo đến mọi nơi nhờ kích thước gọn nhẹ',3790000,'assets/image/product/1021.jpg',1,100,now(),now());

set foreign_key_checks = 1;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------

set foreign_key_checks = 0;

drop table if exists `user`;

create table `user` (

	`id` int not null auto_increment,
	`email` varchar(255) not null,
	`password` varchar(255) not null,
	`firstName` varchar(255) not null,
	`lastName` varchar(255) not null,
	`phone` varchar(255) not null,
	`shippingAddress` varchar(255) not null,

	-- "ROLE_CUSTOMER"
	`role` varchar(255) not null,
	-- "Active", "Inactive"
	`status` varchar(255) not null,

	primary key (`id`),
	unique (`email`)
    
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

insert into `user`(id, email, password, firstName, lastName, phone, shippingAddress, role, status) values
(1,'dunglh+customer1@gmail.com','$2a$12$CR0useg0GQlwrYMvylhHROZg0Vq5nr7jRILz14lc.ArB9iuw1wsEC','Quân','Châu', '0986009999','123 Trần Hưng Đạo','ROLE_CUSTOMER','Active');


set foreign_key_checks = 1;

-- -----------------------------------
-- Table `orders`
-- -----------------------------------

set foreign_key_checks = 0;

drop table if exists `orders`;

create table `orders` (

	`id` int not null auto_increment,
	`orderTrackingNumber` varchar(255) default null,
	`totalQuantity` int default null,
	`totalPrice` decimal(19,2) default null,
	`userId` int default null,
	--
	`email` varchar(255) not null,
	`firstName` varchar(255) not null,
	`lastName` varchar(255) not null,
	`phone` varchar(255) not null,
	`shippingAddress` varchar(255) not null,
    --
	`dateCreated` datetime(6) default null,
	`lastUpdated` datetime(6) default null,
  
	primary key(`id`)
  
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

set foreign_key_checks = 1;

-- -----------------------------------
-- Table `orderItem`
-- -----------------------------------

set foreign_key_checks = 0;

drop table if exists `orderItem`;

create table `orderItem` (

  `id` int not null auto_increment,
  `orderId` int default null,
  `productId` int default null,
  `imageUrl` varchar(255) default null,
  `quantity` int default null,
  `unitPrice` decimal(19,2) default null,

  primary key (`id`),
  
  key `fk_orderId` (`orderId`),
  constraint `fk_orderId` foreign key (`orderId`) references `orders` (`id`),
  constraint `fk_productId` foreign key (`productId`) references `product` (`id`)
  
) engine=InnoDB auto_increment=2001 default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;

set foreign_key_checks = 1;