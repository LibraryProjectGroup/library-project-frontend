*** Settings ***
Documentation       Checks that admin can edit user info

Resource            ../resources/keywords.resource

Suite Setup         Login for testing
Suite Teardown      Close all browsers

*** Variables ***
${OPERATINGSYSTEMCOMMAND}   CRTL+A     #Changes CTRL+A to CMD+A for mac


*** Test Cases ***
Admin can edit user information
    When Admin can see list of users
    Then Admin can edit user information
    [Teardown]    Admin reverts changes

Admin can upgrade user to admin
    When Admin can see list of users
    Then Admin can upgrade user to admin
    [Teardown]    User logout

User can check that they are admin
    When User logins after upgrade
    Then User can see that they are admin
    [Teardown]    User downgrades themself


*** Keywords ***
Admin can see list of users
    Given Admin navigates to admin page
    When Tab with text Users is pressed
    Then Row that contains text ${TESTUSERNAME2} is visible

Admin can edit user information
    Click Button    xpath://*[contains(text(), '${TESTUSERNAME2}')]//ancestor::div[2]//button[contains(text(), 'Edit')]
    Wait Until Element Is Visible    xpath://h4[normalize-space()='Edit user']
    Press Keys  xpath://input[@name='username']     CTRL+A    DELETE
    Input Text    xpath://input[@name='username']    mestattavatyyppi
    Press Keys    xpath://input[@name='email']    CTRL+A    DELETE
    Input Text    xpath://input[@name='email']    suku.suku@doesnotexist.com
    Click Element    xpath:/html/body/div[5]/div[3]/div/div[4]/div
    Wait Until Element Is Visible   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[2]
    Click Element   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[2]
    Sleep   1s
    Click Button    xpath://button[normalize-space()='Update']
    Row that contains text mestattavatyyppi is visible
    Row that contains text suku.suku@doesnotexist.com is visible

Admin reverts changes
    Click Button    xpath://*[contains(text(), 'mestattavatyyppi')]//ancestor::div[2]//button[contains(text(), 'Edit')]
    Wait Until Element Is Visible    xpath://h4[normalize-space()='Edit user']
    Press Keys  xpath://input[@name='username']     CTRL+A    DELETE
    Input Text    xpath://input[@name='username']    ${TESTUSERNAME2}
    Press Keys    xpath://input[@name='email']    CTRL+A    DELETE
    Input Text    xpath://input[@name='email']    ${TESTUSERNAME2}
    Click Element    xpath:/html/body/div[5]/div[3]/div/div[4]/div
    Wait Until Element Is Visible   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[2]
    Click Element   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[3]
    Sleep   1s
    Click Button    xpath://button[normalize-space()='Update']
    Wait Until Element Is Not Visible    xpath://*[contains(text(), 'mestattavatyyppi')]
    Wait Until Element Is Not Visible    xpath://*[contains(text(), 'suku.suku@doesnotexist.com')]

Admin can upgrade user to admin
    Click Button    xpath://*[contains(text(), '${TESTUSERNAME2}')]//ancestor::div[2]//button[contains(text(), 'Edit')]
    Wait Until Element Is Visible    xpath://h4[normalize-space()='Edit user']
    Click Element    xpath:/html/body/div[5]/div[3]/div/div[1]/div
    Wait until Element Is Visible   xpath://*[@id="menu-administrator"]/div[3]/ul/li[1]
    Click Element    xpath://*[@id="menu-administrator"]/div[3]/ul/li[1]
    Wait Until Element Is Visible   xpath:/html/body/div[5]/div[3]/div/div[4]/div
    Click Element    xpath:/html/body/div[5]/div[3]/div/div[4]/div
    Wait Until Element Is Visible   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[2]
    Click Element   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[2]
    Sleep   1s
    Click Button    xpath://button[normalize-space()='Update']
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${TESTUSERNAME2}')]//ancestor::div[2]//div[contains(text(), 'true')]

User logins after upgrade
    User2 login for testing

User can see that they are admin
    Admin navigates to admin page
    Admin can see list of users

User downgrades themself
    Click Button    xpath://*[contains(text(), '${TESTUSERNAME2}')]//ancestor::div[2]//button[contains(text(), 'Edit')]
   Wait Until Element Is Visible    xpath://h4[normalize-space()='Edit user']
    Click Element    xpath:/html/body/div[5]/div[3]/div/div[1]/div
    Wait until Element Is Visible   xpath://*[@id="menu-administrator"]/div[3]/ul/li[1]
    Click Element    xpath://*[@id="menu-administrator"]/div[3]/ul/li[2]
    Wait Until Element Is Visible   xpath:/html/body/div[5]/div[3]/div/div[4]/div
    Click Element    xpath:/html/body/div[5]/div[3]/div/div[4]/div
    Wait Until Element Is Visible   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[2]
    Click Element   xpath://*[@id="menu-homeOfficeId"]/div[3]/ul/li[2]
    Sleep   1s
    Click Button    xpath://button[normalize-space()='Update']
    Wait Until Element Is Visible
    ...    xpath://*[contains(text(), '${TESTUSERNAME2}')]//ancestor::div[2]//div[contains(text(), 'false')]
    User navigates to booklist page
    Execute Javascript    location.reload()
    Wait Until Element Is Not Visible    xpath://p[normalize-space()='ADMIN PAGE']
