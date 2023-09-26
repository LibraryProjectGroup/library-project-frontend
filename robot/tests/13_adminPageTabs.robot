*** Settings ***
Documentation       Checks that tabs of admin page are working

Resource            ../resources/keywords.resource

Suite Setup         Login for testing
Suite Teardown      Close all browsers


*** Test Cases ***
Admin can see list of users
    Given Admin navigates to admin page
    When Tab with text Users is pressed
    Then Row that contains text ${TESTUSERNAME2} is visible

Admin can see list of books
    Given Admin navigates to admin page
    When Tab with text Books is pressed
    Then Row that contains attribute data-field with value author is visible

Admin can see list of current loans
    Given Admin navigates to admin page
    When Tab with text Current loans is pressed
    Then Row that contains text Borrowed is visible

Admin can see list of expired loans
    Given Admin navigates to admin page
    When Tab with text Expired loans is pressed
    Then Row that contains text Due is visible

Admin can see list of book requests
    Given Admin navigates to admin page
    When Tab with text Book requests is pressed
    Then Row that contains text ISBN is visible

Admin can see list of book reservations
    Given Admin navigates to admin page
    When Tab with text Book reservations is pressed
    Then Row that contains text Reservation time is visible
