# Testing with Robot Framework

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

-   [Python](https://www.python.org/downloads/) installed
-   [PIP](https://pip.pypa.io/en/stable/installation/) package management tool installed

## :twisted_rightwards_arrows: Configure PATH

It's important to have all the needed folders in "PATH", so they can be accessed via command line from any folder or program. **Please check first** if you already have them there, no need to repeat these steps if they have appeared there automatically! The folder structure might differ depending on your Python version and/or where you have installed Python, so check the applicable folder structure from your Python folder. Remember also to give the full path of your folders, for example `C:\Python39\Scripts\`.

The folders that must be in 'Path' are:

-   _Python_, eg. `Python39` for Python v3.9
-   _Python Scripts_, eg. `Python39\Scripts` for Python v3.9
-   _Python site-packages_, eg. `Python39\Lib\site-packages` for Python v3.9 _(note: the Lib folder might not exist with newer Python versions)_

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

-   Check your Chrome version from your Chrome browser settings
-   Download `.zip` of WebDriver [here](https://chromedriver.chromium.org/downloads) based on your Chrome's version number
-   Unzip `chromedriver.exe` to your Python's `Scripts` folder (so that it is automatically in 'Path')

## :page_facing_up: Create your local secret file

Create a file named `library-project-secrets.py`. The location of the file should be **one folder up** from the project's root folder, so that it's in the same folder where the `library-project-frontend` folder is. Because the secret file is now _above_ our repository, there is no risk of accidentally committing it to GitHub.

The content of this secret file is described in the project's Discord, on `#secret` channel.

## :tada: You should now be able to run the robot tests locally!

You can run robot tests with `npm run robottests` command in your terminal. Make sure you have the local server running on port 3000 before executing the command.

> **NOTE:** Please do not use custom `robot ...` commands (if you are not 100% sure of what flags to include in them) so that no log or report files will be accidentally committed & no secrets will be leaked. We have altered the npm scripts in [package.json](/package.json) to have a custom command to run robot tests, include secret credentials, hide secrets from log files and output logs to `robot/results` folder.

### :exclamation: Remember these steps before pushing your code:

#### :one: Run all the unit tests:

Terminal command: `npm test` :arrow_right: if no tests start running automatically, press `a` to run all the unit tests. **Fix failing tests** by either altering the test or altering your code.

#### :two: Run all the robot tests:

Terminal command: `npm run robottests` :arrow_right: tests should start running :arrow_right: you can open `report.html` file that gets created in `/results` folder in your browser to view a more detailed report about the tests. **Fix failing tests** by either altering the test or altering your code.

## :octocat: GitHub Actions testing workflow

> `[Updated 26.10.2022]:` Right now Robot Tests are NOT a part of GitHub Actions workflow. They will be added there when we have finished refining the tests to match current application structure and addressed authorization issues.

GitHub actions currently runs only the **unit tests**, and if all the tests are passing, current version of frontend's development branch will be deployed to GitHub pages. Therefore it is important to fix all failing tests before accepting any pull requests to be merged into development; if the workflow fails, the application will not be deployed.
