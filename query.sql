CREATE DATABASE online_shop;

CREATE TABLE categories (
    id_categories int PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL
);

CREATE TABLE customer(
    id_customer int PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    alamat text NOT NULL,
    gender enum NOT NULL,
    tanggal_lahir date NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
 );

 CREATE TABLE seller(
    id_seller int PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    alamat text NOT NULL,
    gender enum NOT NULL,
    tanggal_lahir date NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
 );

 CREATE TABLE product (
    id_produk int PRIMARY KEY NOT NULL,
    id_seller int,
    id_categories int,
    name varchar(255) NOT NULL,
    price int NOT NULL,
    size int,
    color varchar(255),
    stock int NOT NULL,
    deskripsi text NOT NULL,
    rating int,
    ulasan text,

    CONSTRAINT fk_categories
    FOREIGN KEY (id_categories) 
    REFERENCES categories(id_categories),

    CONSTRAINT fk_seller
    FOREIGN KEY (id_seller) 
    REFERENCES seller(id_seller)
 );


--  insert data categories
INSERT INTO categories(id_categories, name)
VALUES (1,'Sepatu Wanita'),
        (2,'Jam Tangan'),
        (3,'Tas Wanita');

INSERT INTO customer(id_customer,name,alamat, gender,tanggal_lahir,email,password)
VALUES ('1','Hosea Leonardo', 'Ciracas, Jakarta Timur', 'L', '1998-06-18', 'hosealeonardo18@gmail.com','test123'),
        ('2','Martha evi', 'Cipayung, Jakarta Timur', 'P', '1996-03-28', 'martha@gmail.com','test123'),
        ('3','Enrico', 'Cipayung, Jakarta Timur', 'L', '1998-07-15', 'enrico@gmail.com','test123');

INSERT INTO seller(id_seller,name,alamat, gender,tanggal_lahir,email,password)
VALUES ('1','Siti', 'Pelumpang, Jakarta Utara', 'P', '1980-05-12', 'siti@gmail.com','test123'),
        ('2','Rindang', 'Cipayung, Jakarta Timur', 'P', '1993-01-28', 'rindang@gmail.com','test123'),
        ('3','Ibenk', 'Ciracas, Jakarta Timur', 'L', '1988-09-15', 'ibenk@gmail.com','test123');


INSERT INTO product(id_produk, id_seller, id_categories, name, price , size, color, stock, deskripsi,rating, ulasan)
VALUES ('1', '2', '1', 'High Heels Yongki', 125000, 37, 'Black', 20, 'Barang original Mantap', 4, 'Barang sesuai dengan Deskripsi'), 
('2', '1', '2', 'G-Shock Pria', 350000, null, 'Silver Metal', 30, 'Barang original', 5, 'Ori banget barangnya, fastrespon seller'),
('3', '3', '3', 'GUEST', 1500000, null, 'Merah', 10, 'Terbuat dari Kuliah buaya Asli', 4, 'mantap barangnya');


-- read data
SELECT * FROM categories;
SELECT * FROM customer;
SELECT * FROM seller;
SELECT * FROM product;

-- select data by id
SELECT * FROM categories WHERE id_categories=1;