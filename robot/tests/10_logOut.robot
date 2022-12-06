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
  