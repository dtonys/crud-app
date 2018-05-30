# CRUD App

This is a CRUD ( Create, Read, Update, Delete ) based interface for viewing data from the jsonplaceholder API.

Redux + Redux saga is used for the "get all posts" API:
- Get all posts - GET https://jsonplaceholder.typicode.com/posts

The other APIs are implemented within the react lifecycle methods:
- Get Post by ID - GET https://jsonplaceholder.typicode.com/posts/1
- Create new post - POST https://jsonplaceholder.typicode.com/posts
- Edit Post - PUT https://jsonplaceholder.typicode.com/posts/1

# Instructions to run

### Run the app

`npm run dev`

Open the browser at localhost:3000

### Run the tests

`npm run test`
