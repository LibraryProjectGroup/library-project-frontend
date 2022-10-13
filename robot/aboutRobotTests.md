# Testing with Robot Framework

## :heavy_check_mark: Prequisites

If you are not sure if you have any of these installed, you can check that by running the version checking commands with command line:

```pwsh
robot --version
python --version
pip --version
```

-   [Python](https://www.python.org/downloads/) installed
-   [PIP](https://pip.pypa.io/en/stable/installation/) package management tool installed

## :twisted_rightwards_arrows: Configure PATH

It's important to have all the needed folders in "PATH", so they can be accessed via command line from any folder or program. **Please check first** if you already have them there, no need to repeat these steps if they have appeared there automatically! The folder structure might differ depending on your Python version and/or where you have installed Python, so check the applicable folder structure from your Python folder. Remember also to give the full path of your folders, for example `C:\Python39\Scripts\`.

The folders that must be in 'Path' are:

-   _Python_, eg. `Python39` for Python v3.9
-   _Python Scripts_, eg. `Python39\Scripts` for Python v3.9
-   _Python site-packages_, eg. `Python39\Lib\site-packages` for Python v3.9 _(note: the Lib folder might not exist with newer Python versions)_

**:arrow_right: Go to environment variable settings**

> Windows tip: Write "environment variables" (or if OS is in Finnish: muokkaa järjestelmän ympäristömuuttujia) to the seach box in your task bar; the right setup window opens immediately

```diff
+ Windows 10:
Control panel > Settings > Related settings > Advanced system settings > Environment variables
```

**:arrow_right: Find 'Path' and check if you need to add folders**

```diff
+ Windows 10:
Find 'Path' under System variables > Edit > (Add folders if necessary) > OK
```

## :robot: Install Robot Framework

1. Run command line tool (eg. PowerShell) **as an administrator** by right-clicking the icon and choosing "Run as Administrator"
2. If you have Python version 3+, type `pip3 install robotframework`, if older version, type `pip install robotframework`
3. Verify successful installation by running `robot --version` and you should see your Robot Framework version

## :cd: Install Chrome WebDriver for Selenium

The tests are using headless Chrome by default, so you have to install a driver for the tests to access your Chrome browser.

-   Check your Chrome version from your Chrome browser settings
-   Download .zip of WebDriver [here](https://chromedriver.chromium.org/downloads) based on your version number
-   Unzip `chromedriver.exe` to your Python's `Scripts` folder

### :tada: You should now be able to run robot tests using `npm test` command!

Please do not use `robot ...` commands (at least without `--outputdir` flag) so no log or report files will be created to unwanted locations. We have altered the `npm test` script in [package.json](/package.json) to run robot tests and output to `robot/results` folder.
