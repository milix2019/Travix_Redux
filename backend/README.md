# Project Title

Hotel API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Clone the repository by entering the following comman in a terminal

```
git clone https://[YOUR_USER_NAME]@bitbucket.org/[YOUR_REPO].git
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
> hotel-membership-api@1.0.0 start E:\hotel\hotel-api
> node server.js

✓ App is running at http://localhost:8000 in development mode
✓ MongoDB connection Established
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
✓ App is running at http://localhost:8000 in development mode
✓ MongoDB connection Established
```

## Post startup

After the initial start, if no admin user is in the database, a new admin user will be created with SUPREME role

Supreme user will have the following credentials

```
name : SUPREME USER
password : welcome
email : supreme@tractive.com.my
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
