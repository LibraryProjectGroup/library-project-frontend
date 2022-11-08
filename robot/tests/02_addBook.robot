*** Settings ***
Resource        ../resources/keywords.resource

Suite Setup     Login for testing


*** Test Cases ***
User adds book into catalog
    Given user can not find Java oh Java book from the page
    When user adds Java oh Java book to catalog
    Then User can find the Java oh Java book from the page
