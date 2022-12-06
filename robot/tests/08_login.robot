*** Settings ***
Resource            ../resources/keywords.resource

Suite Setup         User has home page open in browser
Suite Teardown      Close all browsers


*** Test Cases ***
User logs in with credentials that don't exist
    Given User who has not signed up tries to log in
    Then User will see alert about it

User logs in with wrong password
    Given User gives wrong password
    Then User will see alert about the wrong password
