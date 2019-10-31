# Project Title

Travix FrontEnd

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Clone the repository by entering the following comman in a terminal

```
git clone https://[YOUR_USER_NAME]@github.com/[YOUR_REPO].git
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

is running at http://localhost:3000 
```

* sample output
```
> test-candidates@0.0.1 start C:\Users\milim\Desktop\Travix\Travix_Redux\frontend
> webpack-dev-server --mode development --open

```
* Running eslint 
Currently the eslint is pointing to ./src/component/**

```
npm run lint
```

* sample output
```
> test-candidates@0.0.1 lint C:\Users\milim\Desktop\Travix\Travix_Redux\frontend
> eslint ./src/component/**
✖ 3 problems (0 errors, 3 warnings)
```

* Running Test ( Jest and Enzyme has been used in the application ) 


```
npm test
```

* sample output
```
 PASS  src/component/home.test.js (7.33s)
 PASS  src/component/Addbox/addbox.test.js (7.973s)
 PASS  src/component/Card/cardholder.test.js (8.103s)
 PASS  src/action/homeaction.test.js    
 PASS  src/reducer/homereducer.test.js  
 PASS  src/component/Nav/navbar.test.js

Test Suites: 6 passed, 6 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        10.277s, estimated 11s
Ran all test suites.

Watch Usage: Press w to show more.
```


* Running/Building using Webpack

```
This application is using webpack in order to compile 
If you want to build the app into the production use

npm run build

then your file will generate in build folder, 
you can take that file and add it into your html

```


# Travix Front-End Tech Interview Test

The aim of the test is to develop a mini-application for managing TODO tasks. Using your application we must be able to create, modify and delete a task.

A really simple server has been implemented with Express. It offers the minimum of expected functionalities (get the list of tasks, update a task, delete a task, save a task). However this server is not perfect. It could be improved and tested as well.

Your mission is to develop the front-end from scratch using a front-end framework. We are also expecting from you a usable, responsive UI.

## Process

Please clone this project then create your own repository from it. Do not fork/branch this project when creating your solution as it will be visible to other applicants. Once your code is ready, please send us the link of your repository and we will review it.

## Requirements

* React 16+
* Good state management
* Modular CSS
* Responsive design
* Linting
* Unit tests

## Bonus

* Integration/E2E tests
* Automated deployment
* Storybook
* Impress us!
