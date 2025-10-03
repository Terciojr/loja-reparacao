-- Database Schema for TechRepair App
-- Normalized to 3rd Normal Form (3NF)

-- Tabela de Clientes
-- Armazena informações sobre cada cliente.
CREATE TABLE Clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(50)
);

-- Tabela de Categorias de Produtos
-- 3NF: Evita repetição de nomes de categorias na tabela de Produtos.
CREATE TABLE Categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de Produtos
-- Armazena os produtos disponíveis para venda.
CREATE TABLE Produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    categoria_id INT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    imagem_url VARCHAR(2048),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
);

-- Tabela de Serviços
-- Catálogo dos tipos de serviços oferecidos pela loja.
CREATE TABLE Servicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco_base DECIMAL(10, 2) NOT NULL
);

-- Tabela de Reparações
-- Registra cada serviço de reparo solicitado por um cliente.
CREATE TABLE Reparacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    servico_id INT, -- Opcional, para ligar a um serviço pré-catalogado
    aparelho VARCHAR(255) NOT NULL,
    problema_relatado TEXT NOT NULL,
    status ENUM('pendente', 'em_curso', 'concluido', 'cancelado') NOT NULL DEFAULT 'pendente',
    custo_final DECIMAL(10, 2),
    data_entrada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id),
    FOREIGN KEY (servico_id) REFERENCES Servicos(id)
);

-- Tabela de Vendas
-- Registra o cabeçalho de cada transação de venda.
-- 1NF: O campo 'produtos' (que era um array) foi movido para uma tabela separada (Venda_Itens).
-- 3NF: O campo 'total' foi removido, pois pode ser calculado a partir de Venda_Itens, evitando dependência transitiva.
CREATE TABLE Vendas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    data_venda TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id)
);

-- Tabela de Itens da Venda (Tabela de Junção)
-- 2NF: Resolve a relação Muitos-para-Muitos entre Vendas e Produtos.
-- Cada atributo depende da chave primária composta (venda_id, produto_id).
CREATE TABLE Venda_Itens (
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario_na_venda DECIMAL(10, 2) NOT NULL, -- Preserva o preço histórico da venda.
    PRIMARY KEY (venda_id, produto_id),
    FOREIGN KEY (venda_id) REFERENCES Vendas(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);

-- Tabela de Avaliações
-- Armazena o feedback dos clientes sobre produtos ou serviços.
CREATE TABLE Avaliacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    produto_id INT, -- Avaliação pode ser de um produto
    reparacao_id INT, -- Ou de um serviço de reparo
    nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(id),
    FOREIGN KEY (reparacao_id) REFERENCES Reparacoes(id),
    -- Garante que a avaliação seja sobre um produto OU um reparo, mas não ambos.
    CHECK (produto_id IS NOT NULL OR reparacao_id IS NOT NULL)
);

-- Tabela de Usuários do Sistema (Funcionários)
-- Para o login na parte da loja.
CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'funcionario') NOT NULL DEFAULT 'funcionario'
);
