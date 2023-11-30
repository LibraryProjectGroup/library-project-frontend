*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User can edit a book
    Given user can find the Harry Potter and the Chamber of Secrets book from the page
    When User edits book with title Harry Potter and the Chamber of Secrets
    When user edits book's topic to A test has edited this field
    Then book's attribute has changed to A test has edited this field
