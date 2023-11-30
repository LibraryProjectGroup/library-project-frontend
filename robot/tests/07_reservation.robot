*** Settings ***
Resource            ../resources/keywords.resource
Library    String

Suite Setup    Login for testing
Suite Teardown    Close all browsers

Documentation    Checks if books can be reserved
*** Test Cases ***
User adds book into catalog
    Given user can not find Harry Potter and the Chamber of Secrets book from the page
    When user adds Harry Potter and the Chamber of Secrets book to catalog
    Then User can find the Harry Potter and the Chamber of Secrets book from the page

User can loan the book
    Given Book with title Harry Potter and the Chamber of Secrets is available for loaning
    When User tries to loan a book with title Harry Potter and the Chamber of Secrets
    And User navigates to user page
    Then User can find the Harry Potter and the Chamber of Secrets book from the page
    And User logout

User can reserve book and cancel reservation
    Given User2 login for testing
    And User reserves book with title Harry Potter and the Chamber of Secrets
    Then User navigates to reservations page 
    And User cancels reservation of book with title Harry Potter and the Chamber of Secrets
    And User navigates to booklist page
    And User can reserve book with title Harry Potter and the Chamber of Secrets
   
User can return the book
    Given User logout 
    And Login for testing
    And User navigates to user page
    When User has loaned book with title Harry Potter and the Chamber of Secrets
    And User returns a book with title Harry Potter and the Chamber of Secrets
    Then User can not find Harry Potter and the Chamber of Secrets book from the page
    And User navigates to booklist page


User deletes book from catalog with title Harry Potter and the Chamber of Secrets
    Given User can find the Harry Potter and the Chamber of Secrets book from the page
    When user deletes book from catalog with title Harry Potter and the Chamber of Secrets
    Then User can not find Harry Potter and the Chamber of Secrets book from the page

*** Keywords ***
User reserves book with title ${title}
    Wait Until Element Is Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'RESERVE')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'RESERVE')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Do you want to reserve this book?')]
    Click Button    xpath:/html/body/div[5]/div[3]/div/div[2]/button[1]
    Sleep    1s
    

User cancels reservation of book with title ${title}
    Wait Until Element Is Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Cancel reservation')]
    Click Button    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Cancel reservation')]
    Wait Until Element Is Visible    xpath://*[contains(text(), 'Do you want to cancel your reservation?')]
    Click Button    xpath:/html/body/div[5]/div[3]/div/div[2]/button[1]
    Sleep    1s
    Execute Javascript    location.reload()
    Wait Until Element Is Not Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'Cancel reservation')]

User can reserve book with title ${title}
    Wait Until Element Is Visible    xpath://*[contains(text(), '${title}')]//ancestor::div[2]//button[contains(text(), 'RESERVE')]

   