// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require("uuid/v4");
const sendMessage = require("./sendMessage");

const createGame = async ({ creator, opponent }) => {
  if (!opponent || !opponent.username || !opponent.email) {
    console.log('Invalid opponent:', opponent);
    throw new Error('Invalid opponent. It must have username and email.');
  }
  const params = {
    TableName: "tic-tac-toe-game",
    Item: {
      gameId: uuidv4().split('-')[0],
      user1: creator,
      user2: opponent.username,
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      a5: 0,
      a6: 0,
      a7: 0,
      a8: 0,
      a9: 0,
      lastMoveBy: creator
    }
  };

  try {
    await documentClient.put(params).promise();
  } catch (error) {
    console.log("Error creating game: ", error.message);
    throw new Error("Could not create game");
  }

  const message = `Hi ${opponent.username}. Your friend ${creator} has invited you to a new game! Your game ID is ${params.Item.gameId}`;
  
  console.log('Opponent:', opponent);
  console.log('Opponent Email:', opponent.email);

  try {
    await sendMessage({ email: opponent.email, message });
    console.log(`Message sent to ${opponent.email}: ${message}`);
  } catch (error) {
    console.log("Error sending message: ", error.message);
    throw new Error(`Could not send message to user, email: ${opponent.email}`);
  }

  return params.Item;
};

module.exports = createGame;
