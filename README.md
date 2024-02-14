
# Zebec Backend for Binance Smart Chain

The project aims to provide functionalities such as web3 authentication, websockets, managing user addressbooks, transactions metadata and retrieving data while implementing security measures and optimizing performance.
## Features

- Web3 Authentication using JWT


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
PORT=
DB_URI=
NODE_ENV=
CORS_ALLOWED_ORIGINS=
JWT_SECRET=
JWT_EXPIRES_IN=
```



## Installation

Install packages and run

```bash
  yarn
  yarn build
  yarn start
```

For the Development
```bash
  yarn
  yarn dev
```
## Running Tests

To run tests, run the following command

```bash
  yarn test
```


## API Reference

#### 1. Get user nonce

```http
  GET /api/user/nonce
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `wallet` | `string` | **Required**. Your wallet address |

#### 2. Login

```http
  POST /api/auth/login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `wallet`      | `string` | **Required**. wallet of the user |
| `signature`      | `string` | **Required**. signature of the signed message |