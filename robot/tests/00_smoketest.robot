*** Settings ***
Resource    ../resources/keywords.resource
Suite Teardown    Close all browsers


*** Test Cases ***
User can see the list of books
    When user has home page open in browser
    Then Row that contains text Login is visible
    