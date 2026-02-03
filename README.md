# Scheduling API

Uma API REST desenvolvida em Node.js para gerenciamento de agendamentos, integrada com banco de dados MySQL.

## 🚀 Funcionalidades

Baseado na implementação atual do `index.js`, a API oferece suporte para:
* **Listagem completa:** Recupera todos os agendamentos cadastrados no banco.
* **Busca por ID:** Localiza um agendamento específico através do parâmetro de rota.
* **Criação com Validação:** Registra novos agendamentos, verificando automaticamente se o dia e horário já estão ocupados para evitar duplicidade.
* **Cancelamento Individual:** Remove um agendamento específico via ID.
* **Limpeza de Banco:** Remove todos os agendamentos da tabela de uma só vez.
* **Tratamento de Rotas:** Middleware para capturar e responder a rotas inválidas ou não encontradas.

## 🛠️ Pré-requisitos

* **Node.js** instalado.
* **MySQL** Server ativo.
* Dependências principais: `express`, `mysql2`, `dotenv` e `cors`.

## ⚙️ Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Antonyduarte/-Scheduling-API.git](https://github.com/Antonyduarte/-Scheduling-API.git)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o ambiente:**
    Crie um arquivo `.env` na raiz do projeto com suas credenciais:
    ```env
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_NAME=seu_banco_de_dados
    DB_PORT=3306
    ```

## 📍 Endpoints

### Agendamentos

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/agendamentos` | Lista todos os agendamentos. |
| **GET** | `/agendamento/:id` | Busca detalhes de um agendamento específico. |
| **POST** | `/agendamento` | Cria um novo agendamento (Exige validação de horário). |
| **DELETE** | `/agendamento/:id` | Cancela/Deleta um agendamento pelo ID. |
| **DELETE** | `/agendamentos` | Remove todos os registros da tabela. |

### Exemplo de Requisição (POST)
**Corpo da requisição (JSON):**
```
{
  "Cliente": "Antony",
  "Data": "2026-02-10",
  "Horario": "14:30:00"
}
```
### Estrutura de Pastas

├── index.js          
├── src/              
│   ├── configs.js    
│   └── defs.js       
├── .env              
└── README.md         
```json
