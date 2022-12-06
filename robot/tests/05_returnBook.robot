*** Settings ***
Resource            ../resources/keywords.resource

Test Setup          Login for testing
Test Teardown       Close all browsers


*** Test Cases ***
User can return the book
    Given User navigates to user page
    When User has loaned book with title Java oh Java
    And User returns a book with title Java oh Java
    Then User can not find Java oh Java book from the page

Returned book is available for loaning
    Given List of books is visible
    Then Book with title Java oh Java is available for loaning


*** Keywords ***

