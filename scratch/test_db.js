const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:imblue-12345@localhost:4000/linked'
});

async function run() {
  try {
    const websitesRes = await pool.query("SELECT id, brand_name, subdomain_slug FROM website");
    console.log("Websites in database:");
    websitesRes.rows.forEach(w => console.log(`- ID: ${w.id}, Brand: ${w.brand_name}, Slug: ${w.subdomain_slug}`));

    const chatCountRes = await pool.query("SELECT count(*) FROM chat_message");
    console.log(`\nTotal chat messages: ${chatCountRes.rows[0].count}`);

    const sampleRes = await pool.query("SELECT * FROM chat_message ORDER BY created_at DESC LIMIT 5");
    console.log("\nLast 5 chat messages:");
    sampleRes.rows.forEach(row => {
      console.log(`- ID: ${row.id}, WebsiteID: ${row.website_id}, Role: ${row.role}, Length: ${row.content.length}, Content: "${row.content.substring(0, 50)}..."`);
    });

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

run();
