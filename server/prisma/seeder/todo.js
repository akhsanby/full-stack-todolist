import prismaClient from "../../src/app/database.js";
import { faker } from "@faker-js/faker";

async function seed() {
  try {
    const user = await prismaClient.user.create({
      data: {
        username: "Akhsan",
      },
    });

    for (let i = 1; i <= 10; i++) {
      await prismaClient.TodoUpcoming.create({
        data: {
          text: faker.lorem.text(),
          user_id: user.user_id,
        },
      });
      await prismaClient.TodoProgress.create({
        data: {
          text: faker.lorem.text(),
          user_id: user.user_id,
        },
      });
      await prismaClient.TodoDone.create({
        data: {
          text: faker.lorem.text(),
          user_id: user.user_id,
        },
      });
    }

    console.log("Seeder completed successfully.");
  } catch (error) {
    console.error("Seeder error:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

seed();
