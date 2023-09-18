*** Settings ***
Resource    ../resources/resources.robot


*** Variables ***
${URL}              http://127.0.0.1:3000/    # Localhost port 3000
${BROWSER}          headlesschrome
${TESTUSERNAME}     defaultusername    # Just to initialize the variable
${TESTPASSWORD}     doesnotexist    # Just to initialize the variable
${TESTUSERNAME2}    defaultusername    # Just to initialize variable
${TESTPASSWORD2}    doesnotexist    # Just to initialize the variable
${OPERATINGSYSTEMCOMMAND}   placeholder


*** Keywords ***
Log env Variables
    Log to console  ${TESTUSERNAME}
    Log to console  ${TESTUSERNAME2}
    Log to console  ${TESTPASSWORD}
    Log to console  ${TESTPASSWORD2}
    Log to console  ${OPERATINGSYSTEMCOMMAND}

Login for testing
    Run Keyword    User has home page open in browser
    Run Keyword    User logins successfully
    Run Keyword    List of books is visible

User logout
    Execute Javascript    location.href='/user'
    Run Keyword    User presses logout button
    Run Keyword    User is logged out
    Run Keyword    User is returned to login Page
    Close all browsers

User2 login for testing
    Run Keyword    User has home page open in browser
    Run Keyword    User2 logins successfully
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
    Mouse over  xpath:/html/body/div[4]/form/div/div/div[6]/div
    Click Element   xpath:/html/body/div[4]/form/div/div/div[6]/div
    Mouse over    xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[5]/span[1]
    Click Element   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[5]/span[1]
    Sleep   1s
    Click Button    xpath:/html/body/div[4]/form/div/div/div[7]/button[1]

User can find the ${title} book from the page
    Wait Until Page Contains Element    xpath://*[contains(text(), '${title}')]

User logins successfully
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r1:')]
    Input Password    xpath://input[contains(@id, ':r1:')]    ${TESTUSERNAME}    clear=True    # username
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r3:')]
    Input Password    xpath://input[contains(@id, ':r3:')]    ${TESTPASSWORD}    clear=True    # password
    Click Button    xpath://button[contains(text(), 'Log in')]
    Wait Until Element Is Not Visible    xpath://*[contains(text(), 'No account by that username')]
    Wait Until Element Is Visible    xpath://*[contains(@data-testid, 'LogoutIcon')]

User deletes book from catalog with title ${title}
    Execute Javascript    location.reload()
    Wait Until Element Is Enabled
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Do you want to delete this book?')]
    Click Button    xpath:/html/body/div[4]/div[3]/div/div[2]/button[1]
    Wait Until Element Is Not Visible    xpath://*[contains(text(), '${title}')]

User navigates to user page
    Execute Javascript    location.href='/user'
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /user

Book with title ${title} is available for loaning
    Wait Until Element Is Enabled
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'LOAN')]

User tries to loan a book with title ${title}
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'LOAN')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'LOAN')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Do you want to loan this book?')]
    Click Button    xpath:/html/body/div[4]/div[3]/div/div[2]/button[1]

User who has not signed up tries to log in
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r1:')]
    Input Password    xpath://input[contains(@id, ':r1:')]    VääräTyyppi    clear=True    # username
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r3:')]
    Input Password    xpath://input[contains(@id, ':r3:')]    VääräSalasana    clear=True    # password
    Click Button    xpath://button[contains(text(), 'Log in')]

User will see alert about it
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Invalid Email or Password')]

User gives wrong password
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r1:')]
    Input Password    xpath://input[contains(@id, ':r1:')]    ${TESTUSERNAME}    clear=True    # username
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r3:')]
    Input Password    xpath://input[contains(@id, ':r3:')]    VääräSalasana    clear=True    # password
    Click Button    xpath://button[contains(text(), 'Log in')]

User will see alert about the wrong password
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Invalid Email or Password')]

User navigates to Create Account page
    Click Button    xpath://button[normalize-space()='Create account']
    Wait Until Element Is Visible    xpath://h4[normalize-space()='Create Account']

User signs up with a 2 letter username
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Email')]//ancestor::div[1]//input
    Input Text
    ...    xpath://label[contains(text(), 'Email')]//ancestor::div[1]//input
    ...    dummyemail@example.doesnotexist
    ...    clear=True
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
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Email')]//ancestor::div[1]//input
    Input Text
    ...    xpath://label[contains(text(), 'Email')]//ancestor::div[1]//input
    ...    dummyemail@example.doesnotexist
    ...    clear=True
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

User signs up with existing username and password
    Wait Until Element Is Visible    xpath://label[contains(text(), 'Email')]//ancestor::div[1]//input
    Input Text
    ...    xpath://label[contains(text(), 'Email')]//ancestor::div[1]//input
    ...    dummyemail@example.doesnotexist
    ...    clear=True
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

User navigates to booklist page
    Execute Javascript    location.href='/list-books'
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /list-books

User presses back button
    Wait until Element Is Visible    xpath://*[contains(@aria-label, 'back')]
    Click Element    xpath://*[contains(@data-testid, 'ArrowBackIcon')]

User is returned to booklist
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /list-books

User navigates to reservations page
    Execute Javascript    location.href='/reservations'
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /reservations

User2 logins successfully
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r1:')]
    Input Password    xpath://input[contains(@id, ':r1:')]    ${TESTUSERNAME2}    clear=True    # username
    Wait Until Element Is Visible    xpath://input[contains(@id, ':r3:')]
    Input Password    xpath://input[contains(@id, ':r3:')]    ${TESTPASSWORD2}    clear=True    # password
    Click Button    xpath://button[contains(text(), 'Log in')]
    Wait Until Element Is Not Visible    xpath://*[contains(text(), 'No account by that username')]
    Wait Until Element Is Visible    xpath://*[contains(@data-testid, 'LogoutIcon')]

User presses logout button
    Wait until Element Is Visible    xpath://*[contains(@aria-label, 'back')]
    Click Element    xpath://*[contains(@data-testid, 'LogoutIcon')]

User is logged out
    Wait until Element Is Visible    xpath://button[contains(text(), 'Log in')]

User is returned to login Page
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /login

User has loaned book with title ${title}
    Wait Until Page Contains Element    xpath://*[contains(text(), '${title}')]

User returns a book with title ${title}
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Return')]
    Click Element    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Return')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Do you want to return this book?')]
    Click Button    xpath:/html/body/div[4]/div[3]/div/div[2]/button[1]
    Wait Until Element Is Not Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Return')]

Then others can loan it
    Click Element    xpath://a[starts-with(@href, '/auth/book/all')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Name of the book')]
    Click Button    xpath=(//button[contains(text(), 'Reserve')])
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Information')]
    Page Should Contain Element    xpath://*[contains(text(), 'Available')]

Admin navigates to admin page
    Execute Javascript    location.href='/admin'
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /admin

Tab with text ${tab} is pressed
    Wait Until Element Is Visible    xpath://button[contains(text(), '${tab}')]
    Click Button    xpath://button[contains(text(), '${tab}')]
    Element Attribute Value Should Be    xpath://button[contains(text(), '${tab}')]    aria-selected    true

Row that contains text ${text} is visible
    Wait Until Element Is Visible    xpath://*[contains(text(), '${text}')]

Row that contains attribute ${attr} with value ${val} is visible
    Wait Until Element Is Visible    xpath://*[@${attr}='${val}']
