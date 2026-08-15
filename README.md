# Scheduling API

API REST em Node.js/Express para gerenciar agendamentos em MySQL, organizada em camadas:

- `src/routes`: mapeamento das rotas HTTP;
- `src/controllers`: entrada/saída HTTP;
- `src/services`: validações e regras de negócio;
- `src/repositories`: consultas ao banco de dados;
- `src/config`: ambiente e conexão MySQL;
- `src/utils`: respostas e tratamento centralizado de erros.

## Configuração

1. Instale as dependências com `npm install`.
2. Preencha a senha do banco em `.env`. Esse arquivo é ignorado pelo Git; use `.env.example` como modelo.
3. Crie o banco/tabela com `db/database.sql`.
4. Inicie com `npm start` (ou `npm run dev` durante o desenvolvimento).

Variáveis necessárias:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=sua_senha_do_mysql
DB_NAME=scheduling_db
DB_PORT=3306
```

## Rotas

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/home` | Interface web. |
| GET | `/agendamentos` | Lista os agendamentos. |
| GET | `/agendamento/:id` | Busca um agendamento. |
| POST | `/agendamento` | Cria um agendamento. |
| DELETE | `/agendamento/:id` | Cancela um agendamento. |
| DELETE | `/agendamentos` | Cancela todos os agendamentos. |

Exemplo de criação:

```json
{
  "Cliente": "José",
  "Data": "2026-08-20",
  "Horario": "14:30"
}
```
