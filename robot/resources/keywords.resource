*** Settings ***
Resource    ../resources/resources.robot


*** Variables ***
${URL}          http://127.0.0.1:80/
${BROWSER}      headlesschrome


*** Keywords ***
User has home page open in browser
    Open Browser    url=${URL}    browser=${BROWSER}

List of books is visible
    Page Should Contain Element    xpath://*[contains(@id, 'root')]

User edits book with title ${title}
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
    Element Should Be Visible    xpath://*[contains(., '${value}')]

User can not find ${title} book from the catalog
    User has home page open in browser
    Page Should Not Contain Element    xpath://*[contains(text(), '${title}')]

User adds ${title} book to catalog
    Click Button    xpath://button[@aria-label='add']
    Wait Until Element Is Visible    (//h4[normalize-space()='Add a new book'])[1]
    Input Text    xpath://input[@id=':r1:']    Firstname Lastname
    Input Text    xpath://input[@id=':r3:']    ${title}
    Input Text    xpath://input[@id=':r5:']    Java
    Input Text    xpath://input[@id=':r7:']    123-456
    Input Text    xpath://input[@id=':r9:']    Helsinki
    Click Button    xpath=(//button[normalize-space()='Add'])[1]

Others can find the ${title} book from the catalog
    Wait Until Page Contains Element    xpath://*[contains(text(), '${title}')]

User logs in successfully
    Wait Until Element Is Visible    xpath://*[contains(@name, 'username')]
    Input Text    xpath://*[contains(@name, 'username')]    testusername    clear=True
    Wait Until Element Is Visible    xpath://*[contains(@name, 'password')]
    Input Password    xpath://*[contains(@name, 'password')]    pa5sw0rdf0rtestu5er    clear=True
    Click Button    xpath://button[contains(text(), 'Login')]
    Page Should Contain Element    xpath://*[contains(text(), 'Account page')]

User deletes book from catalog with title ${title}
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    Wait Until Element Is Not Visible    xpath://*[contains(text(), '${title}')]
