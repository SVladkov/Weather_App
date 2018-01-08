# Weather_App
Web application that gives information about the weather.

# Setup instructions
You will need node.js (at least v.6), npm, mongodb

Create a config.js file as a copy of exampleConfig.js. Replace the port, database connectionString and weatherApiKey with ones of yout choice (I can provide you with my weatherApiKey).

Go to /server directory and run
```
npm install
```
Then do the same in /client
```
npm install
```

## Starting the server in /server
Be sure that the mongo service is started. If necessary, start it manually
```
sudo service mongod start
```
and then run the server
```
node server.js
```

## Starting the client in /client
Run the client with
```
npm start
```
Access the application on localhost:8000. It is still dummy, so it only has weather information about Sofia, Rome, London, Paris and New York. The user and password are also dummy, they are 'admin' and 'pass'


## Running the tests in /server
```
npm test
```
