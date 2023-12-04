# EfiLibrary - About the project

<!-- ABOUT THE PROJECT -->

<p float="left">
<img src="screenshots/login.PNG" height="250" width="400"> 
<img src="screenshots/booklist.PNG" height="250" width="400">
<img src="screenshots/admin-page.png" height="200" width="400">
<img src="screenshots/scanner.png" height="200" width="175">
</p>

EfiLibrary is a project between the students of Business Information Technology Degree Programme in Haaga-Helia University of Applied Sciences, and Eficode Oy, a Finnish company specializing in enhancing software development, whose products are related to automation and devops consulting, as well as accessibility and user studies.

This digital library project is the transformation of the many physical copies of books owned by Eficode and scattered in different Eficode offices located in 10 different countries around the world, into one digital library in which the various users will be able to learn-from, teach-with, and enjoy sharing knowledge easily and efficiently.

The users will be able to loan, reserve, and return books, create lists of favorite books and watch other users' favorite lists, as well as like and review books, and browse through the library database.

Admins will be able to control the distribution of borrowed books and monitor the users' activity within the library on a restricted admin page. Admin users can view users, books, loans, reservations, and requests. Admin users can also edit and delete users, and generate a password reset link if need be. In addition, admin users can deny, allow, or cancel book requests and reservations in the restricted admin page.

The EfiLibrary project was created and built from the ground up and in its entirety by the students of Haaga-Helia UAS for the use of Eficode Oy.

Knowledge is power.

## Built with

<!-- ICONS found at: ht<rtps://github.com/devicons/devicon/tree/master/icons -->
<div>
      <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TS" alt="TS" width="40" height="40"/>&nbsp;
      <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="Node.js" alt="Node.js" width="40" height="40"/>&nbsp;
      <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
      <img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" title="MaterialUI" alt="MaterialUI" width="40" height="40"/>&nbsp;
      <img src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original.svg" title="Docker" alt="Docker" width="40" height="40"/>&nbsp;
</div>

<br/>
Efilibrary consists of a frontend and a backend with a connected relational database. Both front- and backend are written in TypeScript and are using React and Express respectively as their main framework and library.
<br/>
<br/>
The frontend’s user interface is divided into pages that are routed through react-router-dom. To access pages other than the login page or signup page, users can create accounts and securely log in in through HTTPS with passwords that are hashed on server-side. Authentication is implemented using Bearer Tokens.
<br/>
<br/>

# Running the Program Locally

> Make sure that the `REACT_APP_BACKEND_URL` in the frontend `.env ` matches the port in the backend `.env`. Or if you're using docker-compose, the port in the docker-compose file.

<!-- INSTALLATION -->

## How to Install

You need to have npm installed to run this project, you can check if you have it installed by running `npm -v` in the command line.

Clone the repository on your computer. Detailed instructions can be found [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository?tool=webui).

Use `npm ci` or `npm install` to install node modules.

<!-- RUNNING -->

## How to Run

```pwsh
npm start
```

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload when you make changes to the code.

You will also need the [backend](https://github.com/LibraryProjectGroup/library-project-backend) running for the application to work.

# Using docker-compose

## Prerequisites
- Install Docker and Docker Compose on your machine. [Docker Installation Guide](https://docs.docker.com/get-docker/). If you choose to use Docker Desktop, which is recommended, it comes with Docker Compose preinstalled.
- To run the frontend with docker-compose, you need to create a .env file in the root of the frontend project.
  
## Starting the Frontend Only

If you want to run just the frontend part of the application, follow these steps:

1. **Open a Terminal**: Open your command-line interface (CLI).
2. **Navigate to Frontend Directory**: `The docker-compose-start-frontend.yml` is located at the root of the frontend directory. Use the `cd` command to navigate:
   ```bash
   cd path/to/library-project-frontend
   ``` 
4. Now run the command (windows users make sure you have docker desktop running):

```
docker-compose -f docker-compose-start-frontend.yml up -d
```

> Make sure the backend is running before next steps.
> You can check if the backend is running here: http://localhost:3002/health
> It should say: "ok: true"
  
5. Now with both backend and frontend running, open the app at http://localhost:3000/

## Starting Both Frontend and Backend from the frontend directory

You have the option to start both the frontend and backend (including the database) using a single command from the frontend directory. This is done through the `docker-compose-start-front-and-back.yml` file, which pulls the backend image from our GitHub Container Registry and starts it along with the frontend as containers.  

Follow these steps to run both the frontend and backend from the frontend directory:

1. **Open a Terminal**: Open your command-line interface (CLI).
2. **Navigate to Frontend Directory**: `The docker-compose-start-front-and-back.yml` is located at the root of the frontend directory. Use the `cd` command to navigate:
   ```bash
   cd path/to/library-project-frontend
   ``` 
4. Now run the command (windows users make sure you have docker desktop running):

```
docker-compose -f docker-compose-start-front-and-back.yml up -d
```
> **Check Backend Status**: Ensure the backend is fully operational before continuing. 
> You can check if the backend is running here: http://localhost:3002/health
> It should display: "ok: true"
  
5. Now with both backend and frontend running, open the app at http://localhost:3000/
> **Note**: It might take few minutes for the frontend to be completely ready for use.  




<!-- ROBOT TESTS -->

# RobotTests

See detailed documentation about Robot testing in [AboutRobotTests.md documentation file](robot/aboutRobotTests.md).

<!-- WORKFLOWS -->

# Workflows
## The ghactions.yml worfklow

### When Does it Run?
- **On Pushes to `development`**: Whenever code is pushed to the `development` branch, the workflow starts.
- **On Pull Requests to `development`**: It also starts when someone proposes changes (pull requests) to the `development` branch.

### What Does it Do?
1. **Gets the Latest Code**: It first grabs the most recent version of frontend code from GitHub.
2. **Logs into Docker Registry**: It logs into a GitHub Container Registry (GHCR). This is where we store our Docker images.
3. **Builds and Starts Our App**: Using a Docker Compose, it builds applications and start them up. Backend is pulled from ghcr and frontend is build from the pushed local files.
4. **Waits for Everything to be Ready**: The workflow makes sure that both the backend and frontend are properly set up and ready to go.
5. **Runs Frontend Tests**: It runs a series of checks on the frontend to make sure everything works as expected.
6. **Cleans Up**: Finally, it shuts everything down and cleans up, ensuring that we're starting fresh the next time.

### Secret handling
- **Secrets and Settings**: This workflow uses GitHub secrets that are passed as .env for the docker-compose.
- **No Manual Work Needed**: This entire process is automatic. 

## The Prettier workflow

The Prettier workflow is setup in the code with Pretty-quick (https://github.com/azz/pretty-quick) and Husky (https://typicode.github.io/husky/) to ensure consistent foramtting. Pretty-Quick checks formatting when a developer tries to commit to the repo, and fixes formatting using our prettier config (.prettierrc.json file in the root of the project). Husky ensures that the pre-commit checks works with a pre-commit hook. Make sure you have all dependencies installed by running: `npm install` before you start. In your code editor, you can also set prettier checks on save, which will help the process.

<!-- CREDITS -->

# Credits

Attribution in alphabetical order:

- Ville Aalto
- Christel Baker
- Sebastian Bergman
- Jordie Biemold
- Michael Brown
- Louis Diarra
- Raúl Fernández Poolan
- Lauri Iivarinen
- Jouni Johansson
- Eeli Killström
- Ivan Kolesov
- Amaru Korpimäki
- Markku Känkänen
- Samuel Langhoff
- Jong Lau
- Jasmin Lumme
- Aaro Miikkulainen
- Anja Miscevic
- Tatu Paukkeri
- Dung Pham
- Shay Pisanty
- Lauri Reis
- Juho Rintala
- Axel Riska
- Aleksi Saarinen
- Markus Sibakov
- Dmitry Sinyavskiy
- Julia Söderlund
- Elisa Tuovila
- Veeti Vainikka
- Riku Vartiainen
- Tia Venäläinen
- Palmitos254

<!-- LICENSE -->

# License

See the project's MIT License in [LICENSE.md](LICENSE.md)
