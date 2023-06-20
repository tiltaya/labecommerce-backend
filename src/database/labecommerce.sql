-- Active: 1687300720399@@127.0.0.1@3306

-- Crição da tabela de usuários
CREATE TABLE if NOT EXISTS users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

-- Inserção de usuários
INSERT INTO users (id, name, email, password, created_at)
VALUES ("u001", "Taya", "taya@labenu.com.br", "taya123", "20/06/2023"),
("u002", "Tilápia", "tilapia@labenu.com.br", "tilapia123", "20/06/2023"),
("u003", "Eddie", "eddie@labenu.com.br", "eddie123", "20/06/2023");

-- Criação da tabela de produtos
CREATE TABLE if NOT EXISTS products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Inserção de produtos
INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod001", "Mouse gamer", 250, "Melhor mouse do mercado!", "https://picsum.photos/seed/Mouse%20gamer/400"),
("prod002", "Monitor", 900, "Monitor LED Full HD 24 polegadas", "https://picsum.photos/seed/Monitor/400"),
("prod003", "Headset gamer", 550, "Headset 7.1 surround", "https://images.kabum.com.br/produtos/fotos/63196/63196_1518113965_index_g.jpg"),
("prod004", "Microfone de mesa", 470, "Microfone condensador USB", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4nJn1uuGbTAKaNOpralj_aLieTUEuxDeMw&usqp=CAU"),
("prod005", "Webcam", 420, "Webcam Full HD 4k com microfone", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRad91dLPzPhkaT74d2F3Qq4oIZdw19IR-ZYw&usqp=CAU");