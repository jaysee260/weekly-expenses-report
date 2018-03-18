'use strict'

////////////////////////////////////////////////////////
///////////       server configs       ////////////////
//////////////////////////////////////////////////////

exports.port = process.env.PORT || 2018;
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`;
exports.init = function(){ return require('./config') };