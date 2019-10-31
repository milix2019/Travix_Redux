# Project Title

Travix API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.
Note: We dont delete the record in the file , we just change the flag of is_deleted=false/true

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


```
npm test

```
* sample output
```
C:\Users\milim\Desktop\Travix\Travix_Redux\backend>npm test

> your_app_name@1.0.0 test C:\Users\milim\Desktop\Travix\Travix_Redux\backend
> mocha --recursive ./test --timeout 10000 --exit

server > started


✓ App is running at http://localhost:3003 in development mode
  Test API for module app
note controller > [object Object]
note controller > create > 1
{
  level: 'info',
  message: 'note create',
  meta: [
    {
      id: 1572520439650,
      title: 'test title',
      note: 'test note',
      is_deleted: false,
      update_at: 2019-10-31T11:13:59.650Z,
      create_at: 2019-10-31T11:13:59.650Z
    }
  ]
}
    √ Create Note - POST - /api/tasks (69ms)
note controller > readAll > [object Object]:::[{"id":1572520439650,"title":"test title","note":"test note","is_deleted":false,"update_at":"2019-10-31T11:13:59.650Z","create_at":"2019-10-31T11:13:59.650Z"}]
{
  level: 'info',
  message: 'note readAll',
  meta: [
    {
      id: 1572520439650,
      title: 'test title',
      note: 'test note',
      is_deleted: false,
      update_at: 2019-10-31T11:13:59.650Z,
      create_at: 2019-10-31T11:13:59.650Z
    }
  ]
}
    √ Read all Notes - GET - /api/tasks
note controller > readOne > [object Object]
{
  level: 'info',
  message: 'note readOne',
  meta: [
    {
      id: 1572520439650,
      title: 'test title',
      note: 'test note',
      is_deleted: false,
      update_at: 2019-10-31T11:13:59.650Z,
      create_at: 2019-10-31T11:13:59.650Z
    }
  ]
}
    √ Read One Note - GET - /api/tasks/:id
note controller > update > [object Object]
{
  level: 'info',
  message: 'note update',
  meta: [
    {
      id: 1572520439650,
      title: 'test title modified updated',
      note: 'test note modified updated',
      is_deleted: false,
      update_at: 2019-10-31T11:13:59.707Z,
      create_at: 2019-10-31T11:13:59.650Z
    }
  ]
}
    √ Update Note - PUT - /api/tasks/:id
note controller > delete > [object Object]
{
  level: 'info',
  message: 'note delete',
  meta: [
    {
      id: 1572520439650,
      title: 'test title modified updated',
      note: 'test note modified updated',
      is_deleted: true,
      update_at: 2019-10-31T11:13:59.718Z,
      create_at: 2019-10-31T11:13:59.650Z
    }
  ]
}
    √ Delete Note - DELETE - /api/tasks/:id


  5 passing (142ms)
```