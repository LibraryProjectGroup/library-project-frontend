*** Settings ***
Resource            ../resources/keywords.resource

Test Setup          Login for testing
Test Teardown       Close all browsers


*** Test Cases ***
User can return the book
    Given User navigates to user page
    When User has loaned book with title Harry Potter and the Chamber of Secrets
    And User returns a book with title Harry Potter and the Chamber of Secrets
    Then User can not find Harry Potter and the Chamber of Secrets book from the page

Returned book is available for loaning
    Given List of books is visible
    Then Book with title Harry Potter and the Chamber of Secrets is available for loaning


*** Keywords ***

