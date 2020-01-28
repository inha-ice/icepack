# IcePack

> Inha Univ. ICE Student Association Resource Management Service

[![Actions Status](https://github.com/inha-ice/icepack/workflows/Node%20CI/badge.svg)](https://github.com/inha-ice/icepack/actions)

## Installation

```bash
git clone https://github.com/inha-ice/icepack.git
```

## Server

The server source code is placed in the [apis](./apis) directory.

Change directory before you follow guides below:

```bash
cd ./apis/
```

You need `.env` to load environment variables. See [example](./apis/.env.example).

### Quick Start

```bash
# build an image from a Dockerfile
docker build --tag icepack .
```

### Development

```bash
# install dependencies
npm run install

# serve with hot reload at localhost:3000
npm run dev

# launch server at localhost:3000
npm start

# run integration test
npm test

# lint codes
npm run lint

# lint codes and auto fix
npm run lint:fix
```

## Web

### Development

``` bash
# install dependencies
npm run install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# lint codes
npm run lint

# lint codes and auto fix
npm run lint:fix

# generate static project
npm run generate

# deploy to GitHub Pages
npm run deploy
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
