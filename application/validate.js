// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const Joi = require("joi");

const extractError = error => {
  return error.details[0].message;
};

// Request body validation for the POST /users endpoint
const validateCreateUser = body => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(8).max(20).required(),
    username: Joi.string().min(4).max(20).required()
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    return {
      valid: false,
      message: extractError(result.error)
    };
  }
  return {
    valid: true
  };
};

// Request body validation for the POST /games endpoint
const validateCreateGame = body => {
  const schema = Joi.object().keys({
    opponent: Joi.string().min(4).max(20).required()
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    return {
      valid: false,
      message: extractError(result.error)
    };
  }
  return {
    valid: true
  };
};

// Request body validation for the POST /games/:gameIdendpoint
const validatePerformMove = body => {
  const schema = Joi.object().keys({
    cell: Joi.string().valid('a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9').required(),
    cellValue: Joi.number().valid(1, 2).required()
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    return {
      valid: false,
      message: extractError(result.error)
    };
  }
  return {
    valid: true
  };
};

module.exports = {
  validateCreateUser,
  validateCreateGame,
  validatePerformMove
};
