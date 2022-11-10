*** Settings ***
Resource            ../resources/keywords.resource

Suite Setup         Login for testing
Suite Teardown      Close all browsers
Test Teardown       Delete all Java oh Java books


*** Test Cases ***
User deletes book from catalog with title Java oh Java
    Given user can find the Java oh Java book from the page
    When user deletes book from catalog with title Java oh Java
    Then User can not find Java oh Java book from the page


*** Keywords ***
Delete all ${title} books
    ${DELETEBUTTONS}=    Get WebElements
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    FOR    ${deletebutton}    IN    @{DELETEBUTTONS}
        Click Button    ${deletebutton}
    END
