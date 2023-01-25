*** Settings ***
Resource            ../resources/keywords.resource
Library    String

Suite Setup    User2 login for testing
Suite Teardown    Close all browsers

Documentation    Checks if books can be reserved
*** Test Cases ***
User adds book into catalog
    Given user can not find Java oh Java book from the page
    When user adds Java oh Java book to catalog
    Then User can find the Java oh Java book from the page

User can loan the book
    Given Book with title Java oh Java is available for loaning
    When User tries to loan a book with title Java oh Java
    And User navigates to user page
    Then User can find the Java oh Java book from the page
    And User logout

User can reserve book and cancel reservation
    Given Login for testing
    And User reserves book with title Java oh Java
    Then User navigates to reservations page 
    And User cancels reservation of book with title Java oh Java
    And User navigates to booklist page
    And User can reserve book with title Java oh Java
   
User can return the book
    Given User logout 
    And User2 login for testing
    And User navigates to user page
    When User has loaned book with title Java oh Java
    And User returns a book with title Java oh Java
    Then User can not find Java oh Java book from the page
    And User navigates to booklist page


User deletes book from catalog with title Java oh Java
    Given User can find the Java oh Java book from the page
    When user deletes book from catalog with title Java oh Java
    Then User can not find Java oh Java book from the page

*** Keywords ***
User reserves book with title ${title}
    Wait Until Element Is Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'RESERVE')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'RESERVE')]
    Alert Should Be Present    Do you want to RESERVE this book?    ACCEPT
    Sleep    1s
    

User cancels reservation of book with title ${title}
    Wait Until Element Is Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Cancel reservation')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Cancel reservation')]
    Alert Should Be Present    Cancel this reservation?    ACCEPT
    Sleep    1s
    Execute Javascript    location.reload()
    Wait Until Element Is Not Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Cancel reservation')]

User can reserve book with title ${title}
    Wait Until Element Is Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'RESERVE')]

   