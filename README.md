## Description

Using the skills and knowledge gained from the workflow course, I have enhanced the quality of this repos master branch, by implementing effective workflows that streamline and improve the development process, by enhancing the environment with extensions that tests, verifies and formats the code.

- I took the original project repository (https://github.com/NoroffFEU/social-media-client) and forked it to my GitHub account.
- Created a new branch called `workflow`.
- Configured the project with ESLint, Prettier, and commit hooks.
- Configured the project with GitHub Actions for build/deploy if required.
- Recorded any bugs found during this process in the Issues tab.
- Configured the project for Jest and Cypress.
- Created tests for login and logout in Jest (unit).
- Created tests for login, invalid login, logout, and CRUD in Cypress (e2e).
- Created a Pull Request from the `workflow` branch into the default branch.
- Requested a review from peers to help improve the submission.
- Submitted a link to the Open Pull Request on Moodle.

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [Bootstrap](https://getbootstrap.com/)
- [SCSS](https://sass-lang.com/documentation/syntax)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Status 

[![Deploy static content to Pages](https://github.com/RamonaXR/social-media-client/actions/workflows/pages.yml/badge.svg?branch=master)](https://github.com/RamonaXR/social-media-client/actions/workflows/pages.yml)

- I could not run this deploy action from the workflow branch. 
- To see status badge, please start the action called "deploy static content to pages". 

[![Automated E2E Testing](https://github.com/RamonaXR/social-media-client/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/RamonaXR/social-media-client/actions/workflows/e2e-test.yml)

[![Automated Unit Testing](https://github.com/RamonaXR/social-media-client/actions/workflows/unit-test.yml/badge.svg)](https://github.com/RamonaXR/social-media-client/actions/workflows/unit-test.yml)

## Configured With

- Prettier
- ESLint

## Getting Started

### Installing

1. Clone the repo:
  ```bash
  git clone https://github.com/RamonaXR/social-media-client.git
  ```


2. Installing: 
  ```
  npm install
  ```

3. Run:
  ```
  npm run start
  ```

4. Testing:
  ```
  npm run test
  ```