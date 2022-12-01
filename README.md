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
