CREATE DATABASE online_shop;

CREATE TABLE categories (
    id_categories serial PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL
);

CREATE TABLE customer(
    id_customer serial PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    alamat text NOT NULL,
    gender enum NOT NULL,
    tanggal_lahir date NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
 );

 CREATE TABLE seller(
    id_seller serial PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    alamat text NOT NULL,
    gender enum NOT NULL,
    tanggal_lahir date NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
 );

 CREATE TABLE product (
    id_produk serial PRIMARY KEY NOT NULL,
    id_seller serial,
    id_categories serial,
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
    REFERENCES categories(id_categories) ON DELETE CASCADE,

    CONSTRAINT fk_seller
    FOREIGN KEY (id_seller) 
    REFERENCES seller(id_seller) ON DELETE CASCADE
 );


--  insert data categories
INSERT INTO categories(name)
VALUES ('Sepatu Wanita'),
        ('Jam Tangan'),
        ('Tas Wanita');

INSERT INTO customer(name,alamat, gender,tanggal_lahir,email,password)
VALUES ('Hosea Leonardo', 'Ciracas, Jakarta Timur', 'L', '1998-06-18', 'hosealeonardo18@gmail.com','test123'),
        ('Martha evi', 'Cipayung, Jakarta Timur', 'P', '1996-03-28', 'martha@gmail.com','test123'),
        ('Enrico', 'Cipayung, Jakarta Timur', 'L', '1998-07-15', 'enrico@gmail.com','test123');

INSERT INTO seller(name,alamat, gender,tanggal_lahir,email,password)
VALUES ('Siti', 'Pelumpang, Jakarta Utara', 'P', '1980-05-12', 'siti@gmail.com','test123'),
        ('Rindang', 'Cipayung, Jakarta Timur', 'P', '1993-01-28', 'rindang@gmail.com','test123'),
        ('Ibenk', 'Ciracas, Jakarta Timur', 'L', '1988-09-15', 'ibenk@gmail.com','test123');


INSERT INTO product(id_seller, id_categories, name, price , size, color, stock, deskripsi,rating, ulasan)
VALUES ('6', '5', 'High Heels Yongki', 125000, 37, 'Black', 20, 'Barang original Mantap', 4, 'Barang sesuai dengan Deskripsi'), 
('5', '4', 'G-Shock Pria', 350000, null, 'Silver Metal', 30, 'Barang original', 5, 'Ori banget barangnya, fastrespon seller'),
('3', '7', 'GUEST', 1500000, null, 'Merah', 10, 'Terbuat dari Kuliah buaya Asli', 4, 'mantap barangnya');




-- read data
SELECT * FROM categories;
SELECT * FROM customer;
SELECT * FROM seller;
SELECT * FROM product;

-- select data by id
SELECT * FROM categories WHERE id_categories=1;
SELECT * FROM customer WHERE id_customer=1;
SELECT * FROM seller WHERE id_seller=1;
SELECT * FROM product WHERE id_seller=1;


-- update data
UPDATE categories SET name='Sepatu Anak' WHERE id_categories=1;

UPDATE customer SET name='Hose', alamat='Kelapa dua Wetan, Jakarta Timur', gender='L', tanggal_lahir='1998-06-19', email='hosea@gmail.com', password='test123' WHERE id_customer=1;

UPDATE seller SET name='Siti', alamat='Ciracas, Jakarta Timur', gender='P', tanggal_lahir='1990-01-01', email='siti@gmail.com', password='test123' WHERE id_seller=1;

UPDATE product SET id_seller = ${id_seller}, id_categories = ${id_categorie}, name = '${name}', price = ${price} , size = ${size}, color = '${color}', stock = ${stock}, deskripsi = '${deskripsi}', rating = ${rating}, ulasan = '${ulasan}' WHERE id_produk = ${id};


DELETE FROM categories WHERE id_categories = 1;
DELETE FROM customer WHERE id_categories = 1;
DELETE FROM seller WHERE id_seller = 1;
DELETE FROM product WHERE id_produk = 1;
