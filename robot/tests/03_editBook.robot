*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can edit a book
    Given user has home page open in browser
    When user edits book with title sqdf
    When user edits book's topic to A test has edited this field
    Then book's attribute has changed to A test has edited this field
