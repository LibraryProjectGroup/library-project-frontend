*** Settings ***
Resource    ../resources/resources.robot


*** Variables ***
${URL}          http://localhost:3000/
${BROWSER}      headlesschrome


*** Keywords ***
User has home page open in browser
    Open Browser    url=${URL}    browser=${BROWSER}

List of books is visible
    Page Should Contain Element    xpath://*[contains(@id, 'root')]
