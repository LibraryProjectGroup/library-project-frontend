*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User adds book into catalog
    Given user can not find their book from the catalog
    When user adds book to catalog
    Then others can find the book from the catalog
