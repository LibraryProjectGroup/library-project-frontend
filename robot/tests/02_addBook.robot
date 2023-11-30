*** Settings ***
Resource        ../resources/keywords.resource

Suite Setup     Login for testing


*** Test Cases ***
User adds book into catalog
    Given user can not find Harry Potter and the Chamber of Secrets book from the page
    When user adds Harry Potter and the Chamber of Secrets book to catalog
    Then User can find the Harry Potter and the Chamber of Secrets book from the page
