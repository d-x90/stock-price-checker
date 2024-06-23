# Stock Price Checker

## Simple dev workflow:

1. Make sure docker is installed and running
2. Type `docker-compose up` in a terminal to create postgres and redis containers
3. Create a `.env` file based on `.env.example`
4. Type `npm run dev` to start the api in dev mode

## Trying it out

1. Make sure docker is installed and running
2. Create a `.env` file based on `.env.for-prod-docker-compose`
3. Type `docker-compose -f docker-compose.prod.yml up` in a terminal to create postgres, redis and the api containers
4. You can access the API under `http://localhost:3000`
5. You can access the API's swagger documentation under `http://localhost:3000/api-docs`
6. PUT `http://localhost:3000/stock/:symbol` to add the stock to the watchlist
7. GET `http://localhost:3000/stock/:symbol` to get the stock's pricing metrics
