
# Zeotap Internship Assignment

**Github Link** [https://www.github.com/jainvaibhav671/zeotap-assignment](https://www.github.com/jainvaibhav671/zeotap-assignment)

## Deployed Links

Both the applications are under the same url but on different sub-routes

- Application 1: [https://zeotap.fly.dev/](https://zeotap.fly.dev/)
- Application 2: [https://zeotap-api.fly.dev/](https://zeotap-api.fly.dev/)

**Setup Instructions**
===========================================================

## Docker

you can build a docker image and use it to run the application

```bash
docker compose up -d
```

This will start the client and backend server on PORT `5173` and `5000` respectively

You can then access

> Application 1 : [http://localhost:5173/app1](http://localhost:5173/app1)

> Application 2 : [http://localhost:5173/app2](http://localhost:5173/app2)

**Prerequisites**
---------------

* pnpm installed on your system
* Node.js installed on your system

You can use `nvm` to install node


### Install Node
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```
### Enable corepack

`corepack` is a utitlity bundled with NodeJS. It handles the installation of the package manger. In this case `pnpm`

```bash
corepack enable
```

**Client Setup**
--------------

1. Navigate to the client directory: `cd client`
2. Copy `.env.example` to `.env` and replace with appropriate values
3. Install dependencies: `pnpm install`
4. Start the client: `pnpm dev`

> This should start the development server on [http://localhost:5173](http://localhost:5173)

**Server Setup**
--------------

1. Navigate to the server directory: `cd server`
2. Copy `.env.example` to `.env` and replace with appropriate values
2. Install dependencies: `pnpm install`
3. Start the server: `pnpm dev`

> This should start the development server on [http://localhost:5000](http://localhost:5000)
