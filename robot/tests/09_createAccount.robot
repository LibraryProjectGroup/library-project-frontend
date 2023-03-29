*** Settings ***
Resource            ../resources/keywords.resource

Suite Setup         User has home page open in browser
Suite Teardown      Close all browsers


*** Test Cases ***
User creates account with existing credentials
    Given User navigates to Create Account page
    And User signs up with existing username and password
    Then User will see alert that username already exists

User creates account with too short username
    Given User signs up with a 2 letter username
    Then User will see alert that the username is too short

User creates account with too short password
    Given User signs up with a 2 character password
    Then User will see alert that the password is too short