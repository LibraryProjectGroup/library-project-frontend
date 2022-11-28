# EfiLibrary - About the project

<!-- ABOUT THE PROJECT -->

EfiLibrary is a project between the students of Business Information Technology Degree Programme in Haaga-Helia University of Applied Sciences, and Eficode Oy, a Finnish company specializing in enhancing software development, whose products are related to automation and devops consulting, as well as accessibility and user studies.

The EfiLibrary project was created and built from the ground up and in its entirety by the students of Haaga-Helia UAS for the use of Eficode Oy.

Knowledge is power.

This digital library project is the transformation of the many physical copies of books owned by Eficode and scattered in different Eficode offices located in 10 different countries around the world, into one digital library in which the various users will be able to learn-from, teach-with, and enjoy sharing knowledge easily and efficiently.

The users will be able to borrow and return books, create lists of favorite books and watch other users' favorite lists, as well as browse through the library database.

Admins will be able to control the distribution of borrowed books and monitor the users' activity within the library.

## Built with 

<!-- ICONS found at: https://github.com/devicons/devicon/tree/master/icons -->
<div>
      <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TS" alt="TS" width="40" height="40"/>&nbsp;
      <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="Node.js" alt="Node.js" width="40" height="40"/>&nbsp;
      <img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" title="MaterialUI" alt="MaterialUI" width="40" height="40"/>&nbsp;
      <img src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original.svg" title="Docker" alt="Docker" width="40" height="40"/>&nbsp;
      
      

</div>

The authentication is implemented using Bearer Tokens.

The application is deployed in [https://efilibrary.netlify.app/](https://efilibrary.netlify.app/).

<!-- INSTALLATION -->
# How to Install 

<!-- RUNNING -->
# How to Run 

<!-- TESTING -->
# How to Test 

<!-- TABLE OF CONTENTS -->
# Table of Contents


<!-- GETTING STARTED -->
# Getting Started 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


<!-- USAGE -->
# Usage

<details>
<summary> Backend endpoints </summary>

### Book

#### /book?id={id} (GET)

Response schema:

```JSON
{
    "title": "Book",
    "description": "Book",
    "type": "object",
    "properties":{
      "id":{"type":"string"},
      "libraryUser":{"type":"User"},
      "topic":{"type":"Topic"},
      "title":{"type":"string"},
      "author":{"type":"string"},
      "isbn":{"type":"string"},
      "location":{"type":"string"}
    }
}
```

#### /book (POST)

Response schema:

```JSON
{
    "title": "Ok",
    "description": "Ok",
    "type": "object",
    "properties":{
      "ok":{"type":"boolean"}
    }
}
```

#### /book (PUT)

Response schema:

```JSON
{
    "title": "Ok",
    "description": "Ok",
    "type": "object",
    "properties":{
      "ok":{"type":"boolean"}
    }
}
```

#### /book?id={id} (DELETE)

Response schema:

```JSON
{
    "title": "Ok",
    "description": "Ok",
    "type": "object",
    "properties":{
      "ok":{"type":"boolean"}
    }
}
```

#### /book/all (GET)

Response schema:

```JSON
{
  "type":"array",
  "items": {
    "title": "Book",
    "description": "Book",
    "type": "object",
    "properties":{
      "libraryUser":{"type":"User"},
      "topic":{"type":"Topic"},
      "title":{"type":"string"},
      "author":{"type":"string"},
      "isbn":{"type":"string"},
      "location":{"type":"string"}
    }
}
```

### User

#### /user?id={id} (GET)

Response schema:

```JSON
{
    "title": "User",
    "description": "User",
    "type": "object",
    "properties":{
      "books":{"type":"array"},
      "userId":{"type":"string"},
      "userName":{"type":"string"},
}
```

#### /user/all (GET)

Response schema:

```JSON
{
  "type":"array",
  "items": {
    "title": "User",
    "description": "User",
    "type": "object",
    "properties":{
      "books":{"type":"array"},
      "userId":{"type":"string"},
      "userName":{"type":"string"},
    }
}
```

</details>



<!-- ROBOT TESTS -->
# RobotTests

See detailed documentation about Robot testing in [AboutRobotTests.md documentation file](robot/aboutRobotTests.md).

<!-- CREDITS -->
# Credits

Attribution in alphabetical order:

* Michael Brown
* Raúl Fernández Poolan
* Eeli Killström
* Jasmin Lumme
* Anja Miscevic
* Dung Pham
* Shay Pisanty
* Axel Riska
* Markus Sibakov
* Elisa Tuovila
* Veeti Vainikka
* Tia Venäläinen

<!-- LICENSE -->
# License

See the project's MIT License in [LICENSE.md](LICENSE.md)
