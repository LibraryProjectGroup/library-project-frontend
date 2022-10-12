*** Settings ***
Resource    ../resources/resources.robot


*** Variables ***
${URL}          http://localhost:3000/
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
