CREATE DATABASE online_shop;
CREATE TYPE enum AS enum('L','P')
CREATE TABLE categories (
    id_categories varchar(255) PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL
);

CREATE TABLE customer(
    id_customer varchar(255) PRIMARY KEY NOT NULL,
    fullname varchar(255) NOT NULL,
    address text,
    phone_number varchar(14),
    gender enum NULL,
    date_of_birthday VARCHAR(128),
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL, 
    role varchar(255),
    image varchar(128)
 );

 CREATE TABLE seller(
    id_seller varchar(255) PRIMARY KEY NOT NULL,
    fullname varchar(255) NOT NULL,
    address text,
    phone_number varchar(14),
    gender enum NULL,
    date_of_birthday VARCHAR(128),
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(255),
    image varchar(128),
    store_name varchar(255)
 );

 CREATE TABLE product (
    id_product varchar(255) PRIMARY KEY NOT NULL,
    id_seller varchar(255),
    id_categories varchar(255),
    name varchar(255) NOT NULL,
    price int NOT NULL,
    size varchar(255),
    color varchar(255),
    stock int NOT NULL,
    description text NOT NULL,
    rating int,
    review text,
    photo varchar(255),
    created_at varchar(255),
    updated_at varchar(255),

    CONSTRAINT fk_categories
    FOREIGN KEY (id_categories) 
    REFERENCES categories(id_categories) ON DELETE CASCADE,

    CONSTRAINT fk_seller
    FOREIGN KEY (id_seller) 
    REFERENCES seller(id_seller) ON DELETE CASCADE
 );


 CREATE TABLE cart (
    id_cart varchar(255) PRIMARY KEY,
    qty int,
    totalPrice int,
    created_at varchar(255),
    id_product varchar(255),
    id_seller varchar(255),

    CONSTRAINT  fk_id_seller
    FOREIGN KEY (id_seller)
    REFERENCES  seller(id_seller) ON DELETE CASCADE,

    CONSTRAINT  fk_id_product
    FOREIGN KEY (id_product)
    REFERENCES  product(id_product) ON DELETE CASCADE
 );

 CREATE TABLE bank (
    id_bank varchar(255) PRIMARY KEY,
    bank_name varchar(255)
 );

 CREATE TABLE transaksi (
   id_transaksi varchar(255) PRIMARY KEY,
   id_cart varchar(255),
   id_bank varchar(255),

   CONSTRAINT  fk_cart
   FOREIGN KEY (id_cart)
   REFERENCES  cart(id_cart) ON DELETE CASCADE,

   CONSTRAINT  fk_bank
   FOREIGN KEY (id_bank)
   REFERENCES  bank(id_bank) ON DELETE CASCADE
 );

-- Join table
 SELECT product.*, seller.fullname AS seller_fullname, categories.fullname AS categories_fullname  
 FROM product 
 INNER JOIN seller ON seller.id_seller = product.id_seller
 INNER JOIN categories ON categories.id_categories = product.id_categories;
 


--  insert data categories
INSERT INTO categories(fullname)
VALUES ('Sepatu Wanita'),
        ('Jam Tangan'),
        ('Tas Wanita');

INSERT INTO customer(fullname,address, gender,date_of_birthday,email,password, role)
VALUES ('Hosea Leonardo', 'Ciracas, Jakarta Timur', 'L', '1998-06-18', 'hosealeonardo18@gmail.com','test123', 'customer'),
        ('Martha evi', 'Cipayung, Jakarta Timur', 'P', '1996-03-28', 'martha@gmail.com','test123', 'customer'),
        ('Enrico', 'Cipayung, Jakarta Timur', 'L', '1998-07-15', 'enrico@gmail.com','test123', 'customer');

INSERT INTO seller(fullname,address, gender,date_of_birthday,email,password, role)
VALUES ('Siti', 'Pelumpang, Jakarta Utara', 'P', '1980-05-12', 'siti@gmail.com','test123', 'seller'),
        ('Rindang', 'Cipayung, Jakarta Timur', 'P', '1993-01-28', 'rindang@gmail.com','test123', 'seller'),
        ('Ibenk', 'Ciracas, Jakarta Timur', 'L', '1988-09-15', 'ibenk@gmail.com','test123', 'seller');


INSERT INTO product(id_product, id_seller, id_categories, fullname, price , size, color, stock, description,rating, review, photo)
VALUES ('77570790-88b6-4f43-b93c-9645c8c64eb8', '77570790-88b6-4f43-b93c-9645c8c64eb8', '1e602d64-a101-4cee-933e-6464e70b7bda','High Heels Yongki', 125000, 37, 'Black', 20, 'Barang original Mantap', 4, 'Barang sesuai dengan Deskripsi'), 
('2', '2', 'G-Shock Pria', 350000, null, 'Silver Metal', 30, 'Barang original', 5, 'Ori banget barangnya, fastrespon seller'),
('3', '3', 'GUEST', 1500000, null, 'Merah', 10, 'Terbuat dari Kuliah buaya Asli', 4, 'mantap barangnya', '');

INSERT INTO cart(id_cart, qty, totalPrice,  create_date, id_product, id_seller)
VALUES (1, 2, 400000 , '2023-01-14', 4, 3);

INSERT INTO users(id, email, password, fullname, role)
VALUES (1, 'hosea@gmail.com', 'test123' , 'Hosea Leonardo', 'user');


-- read data
SELECT * FROM categories;
SELECT * FROM customer;
SELECT * FROM seller;
SELECT * FROM product;
SELECT * FROM cart;
SELECT * FROM bank;
SELECT * FROM transaksi;

-- select data by id
SELECT * FROM categories WHERE id_categories=1;
SELECT * FROM customer WHERE id_customer=1;
SELECT * FROM seller WHERE id_seller=1;
SELECT * FROM product WHERE id_seller=1;


-- update data
UPDATE categories SET fullname='Sepatu Anak' WHERE id_categories=1;

UPDATE customer SET fullname='Hose', address='Kelapa dua Wetan, Jakarta Timur', gender='L', date_of_birthday='1998-06-19', email='hosea@gmail.com', password='test123' WHERE id_customer=1;

UPDATE seller SET fullname='Siti', address='Ciracas, Jakarta Timur', gender='P',  date_of_birthday='1990-01-01', email='siti@gmail.com', password='test123' WHERE id_seller=1;

UPDATE product SET id_seller = ${id_seller}, id_categories = ${id_categorie}, fullname = '${fullname}', price = ${price} , size = ${size}, color = '${color}', stock = ${stock}, deskripsi = '${deskripsi}', rating = ${rating}, ulasan = '${ulasan}' WHERE id_produk = ${id};


DELETE FROM categories WHERE id_categories = 1;
DELETE FROM customer WHERE id_categories = 1;
DELETE FROM seller WHERE id_seller = 1;
DELETE FROM product WHERE id_produk = 1;

ALTER TABLE seller
ADD  store_name varchar(255);

ALTER TABLE customer
ALTER COLUMN address VARCHAR(255);


-- table product --
-------------------------------
-- id_product
-- description
-- review
-- fullname



-- customer ---
-----------------------
-- address
-- date_of_birthday
-- role