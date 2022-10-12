*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can see the list of books
    Given user has home page open in browser
    Then list of books is visible
