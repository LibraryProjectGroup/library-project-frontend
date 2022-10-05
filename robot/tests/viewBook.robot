*** Settings ***
Resource    ../resources/resources.robot


*** Variables ***
${URL}          http://localhost:3000/
${BROWSER}      Chrome


*** Test Cases ***
Check application root element loads
    open the browser
    Page Should Contain Element    xpath://*[contains(@id, 'root')]


*** Keywords ***
open the browser
    Open Browser    ${URL}    ${BROWSER}
