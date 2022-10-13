*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can loan the book
    Given user selects the book they want to loan
    When user sees that the book is available
    And user gives the required info
    Then user is able to loan the book

User can not loan the book
    Given user selects the book they want to loan
    When user sees that the book is not available
    Then user is not able to loan the book


*** Keywords ***
User selects the book they want to loan
    User has home page open in browser
    Page Should Contain Element    xpath://*[contains(text(), 'Name of the book')]
    Click Button    xpath=(//button[contains(text(), 'Reserve')])[1]

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

User sees that the book is not available
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Information')]
    Page Should Contain Element    xpath://*[contains(text(), 'Reserved')]
    Element Should Be Disabled    xpath=(//button[contains(text(), 'Make reservation')])[1]

User is not able to loan the book
    Click Button    xpath=(//button[contains(text(), 'Go back')])[1]
    List of books is visible
