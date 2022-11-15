*** Settings ***
Resource            ../resources/keywords.resource
Library    String

Suite Setup    Login for testing
Suite Teardown    Close all browsers

Documentation    Checks if back button is visible in userpage and working

*** Test Cases ***
User can Logout
    Given User navigates to user page
    When User presses back button
    Then User is returned to booklist

*** Keywords ***
User presses back button
    Wait until Element Is Visible    xpath://*[contains(@aria-label, 'back')]
    Click Element    xpath://*[contains(@data-testid, 'ArrowBackIcon')]

User is returned to booklist
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /list-books
    
    

         