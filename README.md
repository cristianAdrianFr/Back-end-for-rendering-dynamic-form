# Test mock up server
This project  is for mockup server for user management

## Getting Started
After downloading the project, run the following command to set up the project:
```
npm install
```

To start the application, run the following command:
```
npm start
```

## Important Directory and Files
```
data: the directory for user and form data.
  /people.json
    store user data as json format
  /form.json
    store the element data of user management form.
img: the directory for uploaded user images
```

## Features
-default server port : 3001

-apis:
```
    GET. "v1/formData": get data for dynamic form 
    GET. "v1/users": get all user data
    GET. "v1/users/?q=Ben": get all user data for the search text.
    GET. "v1/users/1": get user for its index.
    POST. "v1/users": create new user.
```
