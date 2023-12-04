// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};

// const awsServerlessExpress = require("aws-serverless-express");
// const app = require("./app");
// const server = awsServerlessExpress.createServer(app);

// exports.handler = async (event, context) => {
//   try {
//     // Handle the event using awsServerlessExpress
//     const result = await awsServerlessExpress.proxy(server, event, context);
//     return result;
//   } catch (error) {
//     console.error("Error handling request:", error.message);
//     // Respond to the client with an appropriate error message or take other actions
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Internal Server Error" }),
//     };
//   }
// };
