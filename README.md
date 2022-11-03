## Backend endpoints


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

# RobotTests

Install Docker

Create file in root ```docker.env```

```TESTUSERNAME = "xxxxxxxxxxx"```
``` TESTPASSWORD = "xxxxxxxxxxx"```

These can be found in discord secrets.

If there is no image repository then you have to create the image yourself
```docker build -t docker-robot .```

Then compose the image

```docker compose up```

Then open bash with 
```docker exec -it docker-robot /bin/bash````
or 
```docker-compose run frontend /bin/bash```

Then run tests with 

```robot --variable TESTUSERNAME:${TESTUSERNAME} --variable TESTPASSWORD:${TESTPASSWORD} --removekeywords  NAME:*logins* --outputdir robot/results robot/tests```


Make sure the container is open in port 3000.
