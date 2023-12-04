// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'tic-tac-toe-game',
  Item: {
    gameId: '5b5ee7d8',
    user1: 'myfirstuser',
    user2: 'theseconduser',
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    a5: 0,
    a6: 0,
    a7: 0,
    a8: 0,
    a9: 0,
    lastMoveBy: 'myfirstuser'
  }
};

documentClient.put(params).promise()
  .then(() => console.log('Game added successfully!'))
  .catch((error) => console.log('Error adding game', error));
