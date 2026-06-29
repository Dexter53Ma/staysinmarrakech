const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
async function main() {
  try {
    const count = await p.user.count();
    console.log("User count:", count);
  } catch (e) {
    console.error("User count error:", e.message);
  }

  try {
    const users = await p.user.findMany({ take: 3 });
    console.log("Users:", JSON.stringify(users, null, 2));
  } catch (e) {
    console.error("FindMany error:", e.message);
  }

  // Check if there are any users
  try {
    const result = await p.$queryRawUnsafe("SELECT id, email, name, role FROM public.users LIMIT 5");
    console.log("Raw query users:", JSON.stringify(result, null, 2));
  } catch (e) {
    console.error("Raw query error:", e.message);
  }
}
main().finally(() => p.$disconnect());
