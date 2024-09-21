const { Pool } = require('pg');

const PG_URI = 'postgresql://postgres.wfsamhhkgeivikxnlytb:theeverdaypantryrecipesandingrediantswillneverbeshared@aws-0-us-east-2.pooler.supabase.com:6543/postgres';

const pool = new Pool ({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};