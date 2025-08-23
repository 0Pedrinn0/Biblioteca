CREATE DATABASE IF NOT EXISTS db_biblioteca;

USE db_biblioteca;

CREATE TABLE usuario_tb (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nome_usuario VARCHAR(255) NOT NULL,
email_usuario VARCHAR(50) NOT NULL
);

CREATE TABLE livro_tb (
id_livro INT AUTO_INCREMENT PRIMARY KEY,
titulo_livro VARCHAR(255) NOT NULL,
autor_livro VARCHAR(50) NOT NULL,
categoria_livro VARCHAR(50) NOT NULL,
ano_livro DATE NOT NULL
);

CREATE TABLE emprestimo_tb (
id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
fk_usuario_emprestimo int NOT NULL,
fk_livro_emprestimo INT NOT NULL,
data_emprestimo VARCHAR(20) NOT NULL,
dataDevolucao_emprestimo VARCHAR(20) NOT NULL,
status ENUM("Ativo", "Devolvido", "Atrasado") NOT NULL,
CONSTRAINT fk_do_usuario FOREIGN KEY (fk_usuario_emprestimo) REFERENCES usuario_tb(id_usuario),
CONSTRAINT fk_do_livro FOREIGN KEY (fk_livro_emprestimo) REFERENCES livro_tb(id_livro)
);