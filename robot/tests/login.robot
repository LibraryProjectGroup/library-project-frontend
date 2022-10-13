*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can login to the system
    Given User has home page open in browser
    Then User logs in successfully
