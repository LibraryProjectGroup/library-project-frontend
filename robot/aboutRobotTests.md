#### :arrow_left: [Back to Main ReadMe File](../README.md)

# Testing with Robot Framework

_You can choose your preferred environment for robot testing. We recommend using **Docker** or **DevContainers** to avoid heavy multi-step installations on your local computer._

> `Reminder:` You need to have the backend running for the robot tests to pass. Same with the github actions, the backend url should lead to a working backend.

<details>
<summary>🐳 Testing with Docker</summary>

## :heavy_check_mark: Prequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- Docker engine running on your computer before testing (e.g. Docker desktop opened)

### :page_facing_up: Create your local secret file for Docker

Create a file named `docker.env` to the root of the project folder. It should be already on .dockerignore and .gitignore, but please double-check that so that you don't accidentally commit it to GitHub!

The content of this secret file is described in the project's Discord, on `#secret` channel.

### :runner: Run the Ultimate:tm: start-server-and-test-workflow with docker-compose

1. Open project directory
2. Type in terminal `docker compose up --build --remove-orphans` (this builds the image and starts the container in a configuration that is described in docker-compose.yml file, and also removes orphan containers with the same name)

**That's it!** You should see the npm start and test logs running in your terminal. The first time can take a few minutes, but after that the process gets quicker when you have a cached version of the image.

After running the tests, the container exits automatically. Status code tells you immediately how many tests were failing. _e.g. docker-robot exited with code 0 means that all tests have passed._ You can also open the reports / logs created in `robot/results` folder for more details.

### :bulb: Useful commands for Docker

**Remove all images that are not currently used by a container:** (saves space)

```pwsh
docker image prune -a
```

**Start test container without building the image again:**

```pwsh
docker compose up
```

> TIP: Remember to clean up unnecessary containers or images regularly in order to save space. Too many dangling images and/or orphan containers take up VM memory and will slow down your computer when using Docker.

<p align="center">:wavy_dash: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :large_orange_diamond: :eight_pointed_black_star: :large_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :wavy_dash:</p>
</details>

<details>
<summary>:vs: Testing with VSCode DevContainers</summary>

## :heavy_check_mark: Prequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- VSCode in use
- Docker engine running on your computer before testing (e.g. Docker desktop opened)

### :page_facing_up: Create your local secret file for Docker

Create a file named `docker.env` to the `.devcontainer` folder. It should be already on .dockerignore and .gitignore, but please double-check that so that you don't accidentally commit it to GitHub!

The content of this secret file is described in the project's Discord, on `#secret` channel. **Please note that in this .env file, there are no quotation marks around the variables values!**

### :open_file_folder: Open folder in a DevContainer

After you have created a local secret file, you must open the project in VSCode DevContainer. You can quickly access that by `ctrl + shift + p` in windows and by typing `Dev Containers: Rebuild Container`, or by clicking the double-arrow icon on green background on the **left corner of VSCode window**, and by typing the former keyword. `Dev Containers: Open Folder in Container` should work also, but be careful to choose the **root folder** to open in a DevContainer if you're using that option.

After that, VSCode starts building the DevContainer. This is quite a slow process so be patient.

### :runner: Start server and run the Robot Tests

1. Start server by typing `npm start` in VSCode DevContainer Terminal.

   _You know you're in a right terminal when the line starts with `node ➜ /workspaces/library-project-frontend $ `._

2. Open another DevContainer terminal from VSCode, and type `npm run dockertests`

:tada: Tada! Now you should see the test logs running. Reports appear in `robot/results` folder like in every test environment. You can utilize the DevContainer's pre-installed _live server_ extension to preview them in your browser by right-clicking the desired `.html` file.

<p align="center">:wavy_dash: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :large_orange_diamond: :eight_pointed_black_star: :large_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :wavy_dash:</p>
</details>

<details>
<summary>💻 Testing on your local computer</summary>

_Please note that these instructions are only applicable to Windows 10. Feel free to add instructions if you have a different OS and have successfully installed Robot Framework to your local machine._

#### Table of Contents

1. [Prequisites](#✔️-prequisites)
2. [Configure PATH](#🔀-configure-path)
3. [Install Robot Framework](#🤖-install-robot-framework)
4. [Install Chrome Web Driver for Selenium](#💿-install-chrome-webdriver-for-selenium)
5. [Create local secret file](#📄-create-your-local-secret-file)
6. [Run tests locally](#🎉-you-should-now-be-able-to-run-the-robot-tests-locally)
7. [(Nice to know:) About testing in GitHub Actions workflow](#octocat-github-actions-testing-workflow)

## :heavy_check_mark: Prequisites

If you are not sure if you have any of these installed, you can check that by running the version checking commands with command line:

```pwsh
robot --version
python --version
pip --version
```

To install Robot Framework, you need to have:

- [Python](https://www.python.org/downloads/) installed
- [PIP](https://pip.pypa.io/en/stable/installation/) package management tool installed

## :twisted_rightwards_arrows: Configure PATH

It's important to have all the needed folders in "PATH", so they can be accessed via command line from any folder or program. **Please check first** if you already have them there, no need to repeat these steps if they have appeared there automatically! The folder structure might differ depending on your Python version and/or where you have installed Python, so check the applicable folder structure from your Python folder. Remember also to give the full path of your folders, for example `C:\Python39\Scripts\`.

The folders that must be in 'Path' are:

- _Python_, eg. `Python39` for Python v3.9
- _Python Scripts_, eg. `Python39\Scripts` for Python v3.9
- _Python site-packages_, eg. `Python39\Lib\site-packages` for Python v3.9 _(note: the Lib folder might not exist with newer Python versions)_

### **:arrow_right: Go to environment variable settings**

> Windows tip: Write "environment variables" (or if OS is in Finnish: _muokkaa järjestelmän ympäristömuuttujia_) to the seach box in your task bar; the right setup window opens immediately.

```nginx
Windows 10:
Control panel > Settings > Related settings > Advanced system settings > Environment variables ;
```

### **:arrow_right: Find 'Path' and check if you need to add folders**

```nginx
Windows 10:
Find 'Path' under System variables > 'Edit' > (Add folders if necessary) > 'OK' ;
```

## :robot: Install Robot Framework

1. Run command line tool (eg. PowerShell) **as an administrator** by right-clicking the icon and choosing "Run as Administrator"
2. If you have Python version 3+, type `pip3 install robotframework`, if older version, type `pip install robotframework`
3. Verify successful installation by running `robot --version` and you should see your Robot Framework version

## :cd: Install Chrome WebDriver for Selenium

The tests are using headless Chrome by default, so you have to install a driver for the tests to access your Chrome browser. You also need to have Chrome in your local machine beforehand.

- Check your Chrome version from your Chrome browser settings
- Download `.zip` of chromedriver (binary) [here](https://googlechromelabs.github.io/chrome-for-testing/#stable) based on your Chrome's version number
- Unzip `chromedriver.exe` and add file directory to 'PATH' (GUIDE for linux: https://linuxize.com/post/how-to-add-directory-to-path-in-linux/)

## :page_facing_up: Create your local secret file [*DEPRECATED*]

Create a file named `library-project-secrets.py`. The location of the file should be **one folder up** from the project's root folder, so that it's in the same folder where the `library-project-frontend` folder is. Because the secret file is now _above_ our repository, there is no risk of accidentally committing it to GitHub.

The content of this secret file is described in the project's Discord, on `#secret` channel.

## :tada: You should now be able to run the robot tests locally!

To use Python script properly (in robot folder)

Run command `pip install python-dotenv` 

You can run robot tests with `npm run startserverandtest` command in your terminal.

> **NOTE:** Please do not use custom `robot ...` commands (if you are not 100% sure of what flags to include in them) so that no log or report files will be accidentally committed & no secrets will be leaked. We have altered the npm scripts in [package.json](/package.json) to have a custom command to run robot tests, include secret credentials, hide secrets from log files and output logs to `robot/results` folder.

### :exclamation: Remember these steps before pushing your code:

#### :one: Run all the unit tests:

Terminal command: `npm test` :arrow_right: if no tests start running automatically, press `a` to run all the unit tests. **Fix failing tests** by either altering the test or altering your code.

#### :two: Run all the robot tests:

Terminal command: `npm run robottests` :arrow_right: tests should start running :arrow_right: you can open `report.html` file that gets created in `/results` folder in your browser to view a more detailed report about the tests. **Fix failing tests** by either altering the test or altering your code.

<p align="center">:wavy_dash: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :large_orange_diamond: :eight_pointed_black_star: :large_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :wavy_dash:</p>

</details>

## :octocat: GitHub Actions testing workflow

> `[Updated 26.10.2022]:` Right now Robot Tests are NOT a part of GitHub Actions workflow. They will be added there when we have finished refining the tests to match current application structure and addressed authorization issues.

GitHub actions currently runs only the **unit tests**, and if all the tests are passing, current version of frontend's development branch will be deployed to GitHub pages. Therefore it is important to fix all failing tests before accepting any pull requests to be merged into development; if the workflow fails, the application will not be deployed.

## State of testing (spring 2023)

Tests have been mostly updated to the new UI and they run locally. Docker tests and consecutively the github action test workflow fails. Here are some of the findings that migth help the next implementation.

- Try changing the `User logins successfully` test located in the `keywords.resource` file. If you change the variables `TESTUSERNAME` and `TESTPASSWORD` to their actual value, the test will start passing. We think that the issue with the github workflow for the test might be related to this.

- When running the tests locally using Selenium library please make sure that the tests are valid for the operating system you are running them on. If you go to '14_editUsed.robot' some of the tests use `CRTL+A` in their tests which won't work on macOS, so in those cases change `CTRL` for `COMMAND`.

- A recommedation from the spring 2023 implementation. Consider developing the app so that whenever a developer modifies the code or adds new features, the same developer would also update the tests so that they're always up to date.
