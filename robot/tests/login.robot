*** Settings ***
Resource    ../resources/keywords.resource
Suite Teardown    Close all browsers


*** Test Cases ***
User can login to the system
    Given User has home page open in browser
    Then User logins successfully
