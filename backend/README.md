# Project Title

Travix API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Clone the repository by entering the following comman in a terminal

```
git clone https://[YOUR_USER_NAME]@github.com/[YOUR_REPO].git
```

Intall nodemon if you wish to use nodemon for runing the application

```
npm install -g nodemon
```


### Installing and running

Run the following commands to intall the required packages

* Install the node modules from the package.json file

```
npm install
```

* Running using start command

```
npm start
```

* sample output
```
> your_app_name@1.0.0 start C:\Users\milim\Desktop\Travix\Travix_Redux\backend
> node server.js

server > started
✓ App is running at http://localhost:3003 in development mode
```

* Running using nodemon

```
nodemon server.js
```

* sample output
```
[nodemon] 1.18.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
✓ App is running at http://localhost:3003 in development mode
```

#Test

For testing need to set NODE as test , also need to setup .env.test file for database connection 

IN Windows:
```
$Env:NODE  += "test"
echo $ENV:NODE
```

In Linux:

```
export NODE = "test"
echo NODE
```


RUN UNIT TEST
mocha ./test/hotel.js --timeout 10000
