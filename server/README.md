# REST API GET
This project is a simple Node.js REST API GET using Node.JS/EXpress.JS.

## Stack
* Back : Node JS / Express JS
* Test : Mocha / Chai

## Quick Start for local usage
### Install dependencies
```
cd server
npm i or yarn install
```

### Setup your environment variables
Go to file `.env.example`

### Run server
```
npm start
```

The console should show :
```
Started on server port <your-port>
```

## Test
Test scripts can be found in folder test : `server/test`.

First run the server :
```
npm start
OR
npm run dev
```

Then open a new terminal and run following commands :
```
cd test
npm test tests.test.js
```

OR

```
npm test test 
OR
npm test test/tests.test.js
```

## Presentation
Simple API GET application taking a string (str) and a number (nbr) url parameters as input && returning the result of the division of string length by number.
</br>
The number (nbr) must be between 0 and 20 inclusive.