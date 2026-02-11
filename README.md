# 📅 Scheduling API & Client

Uma solução Full Stack desenvolvida com **Node.js** e **Vanilla JavaScript** para gerenciamento de agendamentos, integrada a um banco de dados **MySQL**.

## 🚀 Funcionalidades

### **Back-end (API REST)**
* **Listagem Inteligente:** Recupera agendamentos com formatação de data e hora via SQL.
* **Validação de Conflitos:** Sistema que impede dois agendamentos no mesmo dia e horário.
* **Padronização de Resposta:** Todas as respostas seguem um contrato fixo através da função `response`.
* **Gerenciamento Completo:** Endpoints para buscar por ID, criar, deletar individualmente ou resetar o banco.

### **Front-end (Interface)**
- 💻 Código do Front-end (Integrado)

* **Dashboard Moderno:** Interface responsiva construída com **Tailwind CSS**.
* **Integração AJAX:** Comunicação assíncrona com o back-end via Fetch API.
* **Mapeamento de Dados:** Correção automática de chaves (Case Sensitivity) entre o banco e o front.

---

## 🛠️ Tecnologias Utilizadas

* **Runtime:** Node.js
* **Framework:** Express
* **Banco de Dados:** MySQL
* **Estilização:** Tailwind CSS
* **Segurança:** CORS habilitado

---

## ⚙️ Instalação e Configuração

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure o ambiente (`.env`):**
    ```env
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASS=sua_senha
    DB_NAME=scheduling_db
    DB_PORT=3306
    ```

3.  **Inicie o Servidor:**
    ```bash
    node index.js
    ```

---

## 📍 Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/agendamentos` | Lista todos os agendamentos. |
| **POST** | `/agendamento` | Cria um novo agendamento. |
| **DELETE** | `/agendamento/:id` | Remove um agendamento específico. |

---
