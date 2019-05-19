# Kojelauta - Home information dashboard

Home information dashboard for displaying interesting facts from home's sensors.

![Screenshot](./screenshots/screenshot.png?raw=true)

## Features

* Fetches latest RuuviTag temperature sensor readings from InfluxDB
* Starts coffee machine at a scheduled time

Work in progress...

# Development mode

Launch both frontend and backend in development mode and then open browser
window to http://localhost:3000

For login username is "user" and password is "password".

## Frontend

1. Open terminal into frontend directory
2. Run `yarn` for installing required packages (this needs to be done only once)
3. Run `yarn start` for staring up Webpack dev server

Webpack dev server starts up in port 3000

Hot reloading is enabled so code and CSS changes should be loaded automatically
to the browser.

## Backend

1. Open terminal into backend directory
2. Run `./mvnw spring-boot:run -Dskip.tests` for starting up Spring Boot in
   development mode. Dev tools are installed so compilation triggers reloading
   automatically.

Backend starts up in port 8080.

# Production build

1. `./mvnw clean package`
2. `java -jar bundle/target/bundle-0.0.1-SNAPSHOT.jar`

Server starts up in port 8080.
