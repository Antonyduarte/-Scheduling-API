
# Scheduling API

A Node.js REST API for managing appointment scheduling with MySQL database integration.

## Features

- Retrieve all scheduled appointments
- Create new appointments with client information
- Structured response format with timestamps
- Environment-based configuration

## Prerequisites

- Node.js
- MySQL
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Antonyduarte/-Scheduling-API.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your database credentials:
```
DB_HOST=localhost
DB_USER=your_user
DB_PASS=your_password
DB_NAME=your_database
DB_PORT=3306
```

## Usage

Start the server:
```bash
npm start
```

The API runs on `http://localhost:3000`

## Endpoints

### GET `/agendamentos`
Retrieve all scheduled appointments.

**Response:**
```json
{
    "status": "Sucesso",
    "message": "Agendamentos encontrados com êxito",
    "afctdrows": 1,
    "data": [],
    "timesTamp": 1234567890
}
```

### POST `/agendamento`
Create a new appointment.

**Request Body:**
```json
{
    "Cliente": "Name",
    "Data": "20/02/2026",
    "Horario": "13:30 PM"
}
```

**Response:**
```json
{
    "status": "Sucesso",
    "message": "Cliente agendado com êxito",
    "afctdrows": 1,
    "data": {},
    "timesTamp": 1234567890
}
```

## Project Structure

```
├── index.js
├── src/
│   ├── config.js
│   └── defs.js
├── .env
└── README.md
```
