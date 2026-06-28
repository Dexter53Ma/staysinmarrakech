const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.eltzpybedrveeitdgjig:wpFvLp8KGMlkxIHv@aws-0-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true' });
(async () => {
  await client.connect();
  await client.query("INSERT INTO site_settings (key, value) VALUES ('phone_1', '+212 6 21 18 94 96') ON CONFLICT (key) DO UPDATE SET value = '+212 6 21 18 94 96'");
  await client.query("INSERT INTO site_settings (key, value) VALUES ('phone_2', '+212 6 21 94 74 93') ON CONFLICT (key) DO UPDATE SET value = '+212 6 21 94 74 93'");
  console.log('DB phone numbers updated');
  await client.end();
})();
