var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '209.237.254.55',
    user     : 'postgres',
    password : 'postgres',
    database : 'shex',
    charset  : 'utf8'
  }
});
var Bookshelf = require('bookshelf');

var bookshelf = Bookshelf(knex);

var accounts = require('./accounts')(bookshelf);

module.exports = {
  "accounts": accounts
};
