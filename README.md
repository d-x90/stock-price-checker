# Stock Price Checker

## Simple dev workflow:

1. Make sure docker is installed and running
2. Type `docker-compose up` in a terminal to create postgres and redis containers
3. Create a `.env` file based on `.env.example`
4. Type `npm run dev` to start the api in dev mode

## Trying out (and production)

1. Make sure docker is installed and running
2. Create a `.env` file based on `.env.example`
3. Type `docker-compose -f docker-compose.prod.yml up` in a terminal to create postgres and redis containers
4. Access the API under `http://localhost:3000`
5. PUT `http://localhost:3000/stock/:symbol` to add the stock to the watchlist
6. GET `http://localhost:3000/stock/:symbol` to get the stock's pricing metrics