*** Settings ***
Resource    ../resources/keywords.resource


*** Test Cases ***
User deletes book from catalog with title Java oh Java
    Given others can find the Java oh Java book from the catalog
    When user deletes book from catalog with title Java oh Java
    Then User can not find Java oh Java book from the catalog