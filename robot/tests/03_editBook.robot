*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can edit a book
    Given user can find the Java oh Java book from the page
    When User edits book with title Java oh Java
    When user edits book's topic to A test has edited this field
    Then book's attribute has changed to A test has edited this field
