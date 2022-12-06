*** Settings ***
Resource            ../resources/keywords.resource

Suite Teardown      Close all browsers


*** Test Cases ***
User can loan the book
    Given Book with title Java oh Java is available for loaning
    When User tries to loan a book with title Java oh Java
    And User navigates to user page
    Then User can find the Java oh Java book from the page
    And User logout

 User can not loan the book
    Given User2 login for testing
    When User can find the Java oh Java book from the page
    Then User sees that the book Java oh Java is not available
    


*** Keywords ***
User sees that the book is available
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Information')]
    Page Should Contain Element    xpath://*[contains(text(), 'Available')]
    Element Should Be Enabled    xpath=(//button[contains(text(), 'Make reservation')])[1]
    Click Button    xpath=(//button[contains(text(), 'Make reservation')])[1]

User gives the required info
    Click Element    xpath://select[@id='pickUpLocation']
    Click Element    xpath://option[@value='Location name here']
    Click Button    xpath=(//button[contains(text(), 'Confirm reservation')])[1]

User is able to loan the book
    Alert Should Be Present    xpath://*[contains(text(), 'Confirmed! Reservation info is sent to your email!')]

User sees that the book ${title} is not available
    Wait Until Element Is Visible    xpath://button[@aria-label='add']
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /list-books
    Element Should Be Disabled    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'LOAN')]

User is not able to loan the book
    Click Button    xpath=(//button[contains(text(), 'Go back')])[1]
    List of books is visible
