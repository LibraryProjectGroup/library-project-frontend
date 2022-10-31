*** Settings ***
Resource    ../resources/keywords.resource
Suite Teardown    Close all browsers


*** Test Cases ***
User adds book into catalog
    Given user can not find Java oh Java book from the catalog
    When user adds Java oh Java book to catalog
    Then others can find the Java oh Java book from the catalog
