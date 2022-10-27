*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can return the book
    Given user selects the book they want to return from user info page
    When user has returned the selected book to the library
    Then others can loan it


*** Keywords ***
User selects the book they want to return from user info page
    User logins successfully
    Click Element    xpath://a[starts-with(@href, '/auth/userinfo')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Borrowed Books')]
    Page Should Contain Element    xpath://*[contains(text(), 'Name of the book')]
    Click Button    xpath://button[contains(text(), 'Return')]

User has returned the selected book to the library
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Return book')]
    Click Element    xpath://select[@id='returnLocation']
    Click Element    xpath://option[@value='Location name here']
    Click Button    xpath=(//button[contains(text(), 'Confirm return')])
    Alert Should Be Present    xpath://*[contains(text(), 'Returning confirmed!')]

Then others can loan it
    Click Element    xpath://a[starts-with(@href, '/auth/book/all')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Name of the book')]
    Click Button    xpath=(//button[contains(text(), 'Reserve')])
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Information')]
    Page Should Contain Element    xpath://*[contains(text(), 'Available')]
