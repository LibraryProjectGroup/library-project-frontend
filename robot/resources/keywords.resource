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
