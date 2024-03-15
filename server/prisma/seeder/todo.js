import prismaClient from "../../src/app/database.js";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { v4 as uuid } from "uuid";

export default async function todoSeeder() {
  try {
    let user = await prismaClient.user.findFirst({
      where: {
        username: "Akhsan",
      },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          username: "Akhsan",
        },
      });
    }

    const todoStatusData = [{ status: "todo" }, { status: "doing" }, { status: "done" }];
    for (const data of todoStatusData) {
      await prismaClient.todoStatus.create({
        data,
      });
    }

    for (let i = 1; i <= 10; i++) {
      await prismaClient.todo.create({
        data: {
          todo_id: uuid(),
          category: JSON.stringify(["Uncategorized"]),
          text: faker.lorem.words(3),
          user_id: user.user_id,
          status: faker.helpers.arrayElement(["todo", "doing", "done"]),
          createdAt: moment().locale("id").format("Do MMM YYYY, HH:mm"),
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
