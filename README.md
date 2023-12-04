# Tic-Tac-Toe-Gulam-Srivathsav

## Group Members
1. Gulam Sulaman Choudhury
2. Srivathsav Velpuri

## API Gateway link
- [API Gateway link](https://leua6lifk6.execute-api.us-east-1.amazonaws.com/prod)

##Most challenging part**
- The most challenging part of the assignment is to create the database in DynamoDB and fetch the game logic. We struggled to implement it using DynamoDB.

## Buggy Features
- In the assignment, we took inspiration from the turn-based game. The game logic was straightforward, and there is no game UI developed. Therefore, we struggled to build a UI in our game. If we had more time, we would have developed a game UI where both users can play in real-time.

**Note:**
If you want to play the game in the current state, please follow the guidelines given in [Tic-Tac-Toe-Command.txt](Tic-Tac-Toe-Command.txt) file.

## CLI Command to set up New Game
- **Background Setup**
    - ##### Deletes existing resources
      Run Command `bash scripts/delete-resources.sh`
    - ##### Create an environment file
      `touch env.sh`
    - ##### Install dependencies
      `npm install --prefix scripts/ && npm install --prefix application`
    - ##### Set AWS region
      `echo "export AWS_REGION=us-east-1" >> env.sh && source env.sh`
    - ##### Source the environment file
      `source env.sh`

- **Provision a database**
    - ##### Create database table
      `bash scripts/create-table.sh`
    - ##### Script to create a game
      `node scripts/createGame.js`
    - ##### Script to perform a move in the game
      `node scripts/performMove.js`

- **Set up Notifications**
    - ##### Set email address for notifications
      `echo "export EMAIL_ADDRESS=<YOUR_EMAIL_ADDRESS_HERE>" >> env.sh && source env.sh`
    - ##### Script to send notifications
      `node scripts/sendMessage.js`

- **Authenticate Application**
    - ##### Create user pool
      `bash scripts/create-user-pool.sh`
    - ##### Create user pool client
      `bash scripts/create-user-pool-client.sh`
    - ##### Create Lambda functions
      `bash scripts/create-lambda.sh`
    - ##### Create REST API
      `bash scripts/create-rest-api.sh`
    - ##### Source the environment file
      `source env.sh`
    - ##### Example request to test authentication
      `curl -X GET ${BASE_URL}/games/5b5ee7d8`

- **Test Application**
    - *First User Registration*
        - ##### Register the first user
          `curl -X POST <API_Gateway_Link>/users -H 'Content-Type: application/json' -d '{"username": "theseconduser","password": "Password1","email": "<SECOND_USER_EMAIL_ADDRESS>"}'`
    - *Second User Registration*
        - ##### Register the second user
          `curl -X POST <API_Gateway_Link>/users -H 'Content-Type: application/json' -d '{"username": "myfirstuser","password": "Password1","email": "<FIRST_USER_EMAIL_ADDRESS>"}'`
    - *First User Login*
        - ##### First user login
          `curl -X POST <API_Gateway_Link>/login -H 'Content-Type: application/json' -d '{"username": "myfirstuser","password": "Password1"}'`
    - *Second User Login*
        - ##### Second user login
          `curl -X POST <API_Gateway_Link>/login -H 'Content-Type: application/json' -d '{"username": "thesecond","password": "Password1"}'`
    - *Creating Game*
        - ##### Create a game
          `curl -X POST <API_Gateway_Link>/games -H 'Content-Type: application/json' -H "Authorization: <FIRST_ID_TOKEN>" -d '{"opponent": "theseconduser"}'`
    - *Fetch game*
        - ##### Fetch game details
          `curl -X GET <API_Gateway_Link>/games/<GAME_ID_TOKEN>`

- **Performing Move**
    - *Second User’s Move*
        - ##### Second user makes a move
          `curl -X POST <API_Gateway_Link>/games/<GAME_ID_TOKEN> -H "Authorization: <SECOND_ID_TOKEN>" -H 'Content-Type: application/json' -d '{"cell": "<cell_number>","cellValue": <cell_value>}'`
    - *First User’s Move*
        - ##### First user makes a move
          `curl -X POST <API_Gateway_Link>/games/<GAME_ID_TOKEN> -H "Authorization: <FIRST_ID_TOKEN>" -H 'Content-Type: application/json' -d '{"cell": "<cell_number>","cellValue": <cell_value>}'`
