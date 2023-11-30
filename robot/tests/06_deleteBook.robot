*** Settings ***
Resource            ../resources/keywords.resource

Suite Setup         Login for testing
Suite Teardown      Close all browsers
Test Teardown       Delete all Harry Potter and the Chamber of Secrets books


*** Test Cases ***
User deletes book from catalog with title Harry Potter and the Chamber of Secrets
    Given user can find the Harry Potter and the Chamber of Secrets book from the page
    When user deletes book from catalog with title Harry Potter and the Chamber of Secrets
    Then User can not find Harry Potter and the Chamber of Secrets book from the page


*** Keywords ***
Delete all ${title} books
    ${DELETEBUTTONS}=    Get WebElements
    ...    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Delete book')]
    FOR    ${deletebutton}    IN    @{DELETEBUTTONS}
        Click Button    ${deletebutton}
    END
