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
    