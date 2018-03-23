'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const plaid = require('plaid');

let {
  client_id,
  secret,
  public_key,
  env,
  // user specific
  access_token,
  public_token,
  item_id
} = require('../../config/index').init().plaid;

const client = new plaid.Client(
  client_id,
  secret,
  public_key,
  plaid.environments[env]
);

module.exports = client;