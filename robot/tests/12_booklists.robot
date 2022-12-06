*** Settings ***
Resource            ../resources/keywords.resource
Library    String

Suite Setup    Login for testing
Suite Teardown    Close all browsers

Documentation    Checks if booklists can be CRUD

*** Test Cases ***
User can create booklist
    Given User navigates to user page
    When User presses my lists button
    Then User creates new booklist
User can add a book to booklist and view booklist
    Given User presses back button
    And User presses back button
    When User adds book to booklists
    And User navigates to user page with sleep
    Then User presses my lists button
    And User views booklists
    And User presses back button

User can edit booklists name
    Given User navigates to user page
    And User presses my lists button
    When User edits booklists name
    Then Testlists name should be updated

User can delete booklist
    When User presses delete button
    Then List should be deleted



*** Keywords ***
User presses my lists button
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /user
    Click Element    xpath://p[normalize-space()='MY LISTS']
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /booklists

User creates new booklist
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /booklists
    Click Element    xpath://*[contains(@data-testid, 'AddIcon')]
    Wait Until Element Is Visible    xpath://h4[normalize-space()='Add new booklist']
    Input Text    xpath://input[@name='name']    testlist
    Click Button    xpath://button[normalize-space()='Add']
    Wait Until Element Is Visible    xpath://p[normalize-space()='testlist']


User adds book to booklists
    Wait Until Element Is Visible    xpath://button[@type='button'][normalize-space()='+ add'][1]
    Click Button    xpath:(//button[@type='button'][normalize-space()='+ add'])[1]
    Wait Until Element Is Visible    xpath://button[normalize-space()='Add']
    Click Button    xpath://button[normalize-space()='Add']

User views booklists
    Wait Until Element Is Visible    xpath://button[normalize-space()='View']
    Click Button    xpath://button[normalize-space()='View']
    Wait Until Element Is Visible    xpath://h3[normalize-space()='testlist']

User edits booklists name
    Wait Until Element Is Visible    xpath://p[normalize-space()='testlist']
    Click Button    xpath://button[normalize-space()='Edit Name']
    Wait Until Element Is Visible    xpath://h4[normalize-space()='Edit Book List Name']
    Input Text    xpath://input[@name='name']    123
    Click Button    xpath://button[normalize-space()='Update']

Testlists name should be updated
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /booklists
    Wait Until Element Is Visible    xpath://p[normalize-space()='testlist123']

User presses delete button
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /booklists
    Click Button    xpath://button[normalize-space()='Delete']

List should be deleted
    Wait Until Element Is Not Visible    xpath://p[normalize-space()='testlist123']

User navigates to user page with sleep
    Execute Javascript    location.href='/user'
    ${path}=    Execute Javascript    return window.location.pathname
    Should Be Equal As Strings    ${path}    /user