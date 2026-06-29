const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
async function main() {
  const cols = await p.$queryRawUnsafe(
    "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position"
  );
  console.log("Users table columns:", JSON.stringify(cols, null, 2));

  const tables = await p.$queryRawUnsafe(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
  );
  console.log("\nAll tables:", JSON.stringify(tables, null, 2));
}
main().finally(() => p.$disconnect());
