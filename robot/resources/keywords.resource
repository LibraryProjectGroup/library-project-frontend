*** Settings ***
Resource    ../resources/resources.robot


*** Variables ***
${URL}              http://127.0.0.1:3000/    # Localhost port 3000
${BROWSER}          headlesschrome
${TESTUSERNAME}     defaultusername    # Just to initialize the variable
${TESTPASSWORD}     doesnotexist    # Just to initialize the variable


*** Keywords ***
Login for testing
    Run Keyword    User has home page open in browser
    Run Keyword    User logins successfully
    Run Keyword    List of books is visible

User has home page open in browser
    Open Browser    url=${URL}    browser=${BROWSER}    options=add_argument("--no-sandbox")
    Set Window Size    1920    1080

List of books is visible
    Wait Until Element Is Visible    xpath://*[contains(@data-testid, 'AddIcon')]

User edits book with title ${title}
    Execute Javascript    location.reload()
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Edit book')]
    Click Button
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Edit book')]

User edits book's ${name} to ${value}
    Wait Until Element Is Visible    xpath://*[contains(@name, '${name}')]
    Click Element    xpath://input[contains(@name, '${name}')]
    Press Keys    xpath://*[contains(@name, '${name}')]    CTRL+A    DELETE
    Input Text    xpath://*[contains(@name, '${name}')]    ${value}    clear=True
    Wait Until Element Is Visible    xpath://*[contains(@value, '${value}')]
    Click Button    xpath://button[contains(text(), 'Update')]

Book's attribute has changed to ${value}
    Wait Until Element Is Not Visible    xpath://button[contains(text(), 'Update')]
    Wait Until Element Is Visible    xpath://*[contains(., '${value}')]

User can not find ${title} book from the page
    Page Should Not Contain Element    xpath://*[contains(text(), '${title}')]

User adds ${title} book to catalog
    Execute Javascript    window.scrollTo(0, 800)
    Click Button    xpath://*[@aria-label='add']
    Wait Until Element Is Visible    (//h4[normalize-space()='Add book'])[1]
    Input Text    xpath://input[@name='author']    Firstname Lastname
    Input Text    xpath://input[@name='title']    ${title}
    Input Text    xpath://input[@name='topic']    Java
    Input Text    xpath://input[@name='isbn']    123-456
    Input Text    xpath://input[@name='location']    Helsinki
    Click Button    xpath=(//button[normalize-space()='Add'])[1]

User can find the ${title} book from the page
    Wait Until Page Contains Element    xpath://*[contains(text(), '${title}')]

User logins successfully
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r1:')]
    Input Password    xpath://input[contains(@id, ':r1:')]    ${TESTUSERNAME}    clear=True    # username
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r3:')]
    Input Password    xpath://input[contains(@id, ':r3:')]    ${TESTPASSWORD}    clear=True    # password
    Click Button    xpath://button[contains(text(), 'Log in')]
    Wait Until Element Is Visible    xpath://*[contains(@data-testid, 'AccountBoxIcon')]

User deletes book from catalog with title ${title}
    Execute Javascript    location.reload()
    Wait Until Element Is Enabled
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    Wait Until Element Is Not Visible    xpath://*[contains(text(), '${title}')]

User navigates to user page
    Wait Until Element Is Visible    xpath://*[contains(@aria-label, 'account')]
    Click Button    xpath://*[contains(@aria-label, 'account')]
    Wait Until Element Is Visible    xpath://*[contains(@data-testid, 'LogoutIcon')]

Book with title ${title} is available for loaning
    Wait Until Element Is Enabled
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'LOAN')]

User tries to loan a book with title ${title}
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'LOAN')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'LOAN')]

User who has not signed up tries to log in
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r1:')]
    Input Password    xpath://input[contains(@id, ':r1:')]    VääräTyyppi    clear=True    # username
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r3:')]
    Input Password    xpath://input[contains(@id, ':r3:')]    VääräSalasana    clear=True    # password
    Click Button    xpath://button[contains(text(), 'Log in')]

User will see alert about it
    Wait Until Element Is Visible    xpath://*[contains(text(), 'No account by that username')]

User gives wrong password
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r1:')]
    Input Password    xpath://input[contains(@id, ':r1:')]    ${TESTUSERNAME}    clear=True    # username
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r3:')]
    Input Password    xpath://input[contains(@id, ':r3:')]    VääräSalasana    clear=True    # password
    Click Button    xpath://button[contains(text(), 'Log in')]

User will see alert about the wrong password
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Invalid password')]

User navigates to Create Account page
    Click Button    xpath://button[normalize-space()='Create account']
    Wait Until Element Is Visible    xpath://h4[normalize-space()='Create Account']

User signs up with a 2 letter username
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input
    Input Text    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input    Te    clear=True
    Wait Until Element Is Visible    xpath://input[@name='firstPassword']
    Input Password    xpath://input[@name='firstPassword']    Kahdeksan8?    clear=True
    Wait Until Element Is Visible    xpath://input[@name='secondPassword']
    Input Password    xpath://input[@name='secondPassword']    Kahdeksan8?    clear=True
    Wait Until Element Is Enabled    xpath://button[normalize-space()='SIGN UP']
    Click Button    xpath://button[normalize-space()='SIGN UP']

 User will see alert that the username is too short
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Username has to be between 3 and 50 characters')]

User signs up with a 2 character password
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input
    Input Text    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input    Testikaveri    clear=True
    Wait Until Element Is Visible    xpath://input[@name='firstPassword']
    Input Password    xpath://input[@name='firstPassword']    k8    clear=True
    Wait Until Element Is Visible    xpath://input[@name='secondPassword']
    Input Password    xpath://input[@name='secondPassword']    k8    clear=True
    Wait Until Element Is Enabled    xpath://button[normalize-space()='SIGN UP']
    Click Button    xpath://button[normalize-space()='SIGN UP']

User will see alert that the password is too short
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Passwords has to be atleast 8 characters long')]

User signs up with password without uppercase character
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input
    Input Text    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input    Testikaveri    clear=True
    Wait Until Element Is Visible    xpath://input[@name='firstPassword']
    Input Password    xpath://input[@name='firstPassword']    kahdeksan8?    clear=True
    Wait Until Element Is Visible    xpath://input[@name='secondPassword']
    Input Password    xpath://input[@name='secondPassword']    kahdeksan8?    clear=True
    Wait Until Element Is Enabled    xpath://button[normalize-space()='SIGN UP']
    Click Button    xpath://button[normalize-space()='SIGN UP']

User will see alert that password is insufficient
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), 'Password has to have atleast one uppercase character, lowercase character, number, and special character')]

User signs up with password without lowercase character
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input
    Input Text    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input    Testikaveri    clear=True
    Wait Until Element Is Visible    xpath://input[@name='firstPassword']
    Input Password    xpath://input[@name='firstPassword']    KAHDEKSAN8?    clear=True
    Wait Until Element Is Visible    xpath://input[@name='secondPassword']
    Input Password    xpath://input[@name='secondPassword']    KAHDEKSAN8?    clear=True
    Wait Until Element Is Enabled    xpath://button[normalize-space()='SIGN UP']
    Click Button    xpath://button[normalize-space()='SIGN UP']

User signs up with password without number
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input
    Input Text    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input    Testikaveri    clear=True
    Wait Until Element Is Visible    xpath://input[@name='firstPassword']
    Input Password    xpath://input[@name='firstPassword']    Kahdeksan?    clear=True
    Wait Until Element Is Visible    xpath://input[@name='secondPassword']
    Input Password    xpath://input[@name='secondPassword']    Kahdeksan?    clear=True
    Wait Until Element Is Enabled    xpath://button[normalize-space()='SIGN UP']
    Click Button    xpath://button[normalize-space()='SIGN UP']

User signs up with password without special character
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input
    Input Text    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input    Testikaveri    clear=True
    Wait Until Element Is Visible    xpath://input[@name='firstPassword']
    Input Password    xpath://input[@name='firstPassword']    Kahdeksan8    clear=True
    Wait Until Element Is Visible    xpath://input[@name='secondPassword']
    Input Password    xpath://input[@name='secondPassword']    Kahdeksan8    clear=True
    Wait Until Element Is Enabled    xpath://button[normalize-space()='SIGN UP']
    Click Button    xpath://button[normalize-space()='SIGN UP']

 User signs up with existing username and password
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input
    Input Text    xpath://label[contains(text(), 'Username')]//ancestor::div[1]//input    ${TESTUSERNAME}    clear=True
    Wait Until Element Is Visible    xpath://input[@name='firstPassword']
    Input Password    xpath://input[@name='firstPassword']    Kahdeksan8?    clear=True
    Wait Until Element Is Visible    xpath://input[@name='secondPassword']
    Input Password    xpath://input[@name='secondPassword']    Kahdeksan8?    clear=True
    Wait Until Element Is Enabled    xpath://button[normalize-space()='SIGN UP']
    Click Button    xpath://button[normalize-space()='SIGN UP']

User will see alert that username already exists
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), 'Username is already taken')]
