*** Settings ***
Resource            ../resources/keywords.resource
Library    String

Suite Setup    Login for testing
Suite Teardown    Close all browsers

Documentation    Checks if logout button is visible and working

*** Test Cases ***
User can Logout
    Given User navigates to user page
    When User presses logout button
    Then User is logged out
    And User is returned to login page

*** Keywords ***
User presses logout button
    Wait until Element Is Visible    xpath://*[contains(@aria-label, 'back')]
    Click Element    xpath://*[contains(@data-testid, 'LogoutIcon')]

User is logged out
    Wait until Element Is Visible   xpath://button[contains(text(), 'Log in')]

User is returned to login Page
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /login    