*** Settings ***
Resource            ../resources/keywords.resource

Test Setup          Login for testing
Test Teardown       Close all browsers


*** Test Cases ***
User can return the book
    Given User navigates to user page
    When User has loaned book with title Java oh Java
    And User returns a book with title Java oh Java
    Then User can not find Java oh Java book from the page

Returned book is available for loaning
    Given List of books is visible
    Then Book with title Java oh Java is available for loaning


*** Keywords ***
User has loaned book with title ${title}
    Wait Until Page Contains Element    xpath://*[contains(text(), '${title}')]

User returns a book with title ${title}
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Return')]
    Click Element    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Return')]
    Wait Until Element Is Not Visible
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Return')]

Then others can loan it
    Click Element    xpath://a[starts-with(@href, '/auth/book/all')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Name of the book')]
    Click Button    xpath=(//button[contains(text(), 'Reserve')])
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Information')]
    Page Should Contain Element    xpath://*[contains(text(), 'Available')]
