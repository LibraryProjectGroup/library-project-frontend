*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can see the list of books
    Given user has home page open in browser
    When User logins successfully
    Then List of books is visible
