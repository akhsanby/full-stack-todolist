import prismaClient from "../../src/app/database.js";

async function seed() {
  try {
    // Create categories
    const categories = [{ name: "Personal" }, { name: "Work" }, { name: "Shopping" }, { name: "Health" }, { name: "Education" }, { name: "Shopping" }, { name: "Home" }, { name: "Social" }, { name: "Finance" }];

    for (const category of categories) {
      await prismaClient.category.create({
        data: category,
      });
    }

    console.log("Seeder Category completed successfully.");
  } catch (error) {
    console.error("Seeder Category error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
