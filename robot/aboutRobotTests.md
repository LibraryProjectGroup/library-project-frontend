#### :arrow_left: [Back to Main ReadMe File](../README.md)

# Testing with Robot Framework

_You can choose your preferred environment for robot testing. We recommend using **Docker** to avoid heavy multi-step installations on your local computer._

> `Reminder:` You need to have the backend running for the robot tests to pass. Same with the github actions, the backend url should lead to a working backend.

<details>
<summary>🐳 Testing with Docker</summary>

## :heavy_check_mark: Prequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- Docker engine running on your computer before testing (e.g. Docker desktop opened)

### :page_facing_up: Create your local secret file for Docker

Create a file named `docker.env` to the root of the project folder. It should be already on .dockerignore and .gitignore, but please double-check that so that you don't accidentally commit it to GitHub!

The content of this secret file is described in the project's Teams, on `#resources` channel (fall 23).

### :runner: Run the Ultimate:tm: start-server-and-test-workflow with docker-compose

1. Open project directory
2. Type in terminal `docker-compose -f docker-compose-test.yml up -d` (this builds the image and starts the container in a configuration that is described in docker-compose.yml file)

**That's it!** You should see the npm start and test logs running in Docker images terminal. The first time can take a few minutes, but after that the process gets quicker when you have a cached version of the image.

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
<summary>💻 Testing on your local computer</summary>

\_Please note that these instructions are only applicable to Windows 10. For other OS steps are same but might vary a bit (for example configuring PATH)

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

## Install dotenv Python library

Library is needed to read .env file

```pwsh
pip install python-dotenv
```

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

### Comprehensive guide (For other OS than windows)

https://gist.github.com/nex3/c395b2f8fd4b02068be37c961301caa7

## :robot: Install Robot Framework

1. Run command line tool (eg. PowerShell) **as an administrator** by right-clicking the icon and choosing "Run as Administrator"
2. If you have Python version 3+, type `pip3 install robotframework`, if older version, type `pip install robotframework`
3. Verify successful installation by running `robot --version` and you should see your Robot Framework version

## :cd: Install Chrome WebDriver for Selenium

The tests are using headless Chrome by default, so you have to install a driver for the tests to access your Chrome browser. You also need to have Chrome in your local machine beforehand.

- Check your Chrome version from your Chrome browser settings
- Download `.zip` of chromedriver (binary) [here](https://googlechromelabs.github.io/chrome-for-testing/#stable) based on your Chrome's version number
- Unzip `chromedriver.exe` and add file directory to 'PATH' (GUIDE for linux: https://linuxize.com/post/how-to-add-directory-to-path-in-linux/)

## :page_facing_up: Update .env with correct variables

The content of this secret file is described in the project's Teams, on `#resources` channel (fall 23).

TODO: - Update tests to use GitHub secrets if possible for better continuous integration.

## :tada: You should now be able to run the robot tests locally!

You can run robot tests with `npm run startserverandtest` command in your terminal (backend must be running).

> **NOTE:** Please do not use custom `robot ...` commands (if you are not 100% sure of what flags to include in them) so that no log or report files will be accidentally committed & no secrets will be leaked. We have altered the npm scripts in [package.json](/package.json) to have a custom command to run robot tests, include secret credentials, hide secrets from log files and output logs to `robot/results` folder.

### :exclamation: Remember these steps before pushing your code:

#### :one: Run all the unit tests:

Terminal command: `npm test` :arrow_right: if no tests start running automatically, press `a` to run all the unit tests. **Fix failing tests** by either altering the test or altering your code.

#### :two: Run all the robot tests:

Terminal command: `npm run robottests` :arrow_right: tests should start running :arrow_right: you can open `report.html` file that gets created in `/results` folder in your browser to view a more detailed report about the tests. **Fix failing tests** by either altering the test or altering your code.

<p align="center">:wavy_dash: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :large_orange_diamond: :eight_pointed_black_star: :large_orange_diamond: :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: :wavy_dash:</p>

</details>

## :octocat: GitHub Actions testing workflow

> `[Updated 7.12.2023]:` Test pipeline is working as intended (on main and development branches) :)

GitHub actions currently runs all robot tests made in the project, however pipeline does not restrict pushing of the new image into GHCR but will warn if tests fail.

## State of testing (fall 2023)

Tests have been mostly updated to the new UI and they run locally and in Docker. Here are some of the findings that migth help the next implementation.

- A recommedation from the fall 2023 implementation. Consider developing the app so that whenever a developer modifies the code or adds new features, the same developer would also update the tests so that they're always up to date.
