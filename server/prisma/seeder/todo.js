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

    let todoStatus = await prismaClient.todoStatus.count();
    if (!todoStatus) {
      const todoStatusData = [{ status: "todo" }, { status: "doing" }, { status: "done" }];
      for (const data of todoStatusData) {
        await prismaClient.todoStatus.create({
          data,
        });
      }
    }

    // Variabel saved total todo, doing, and done
    let todo = 0;
    let doing = 0;
    let done = 0;

    for (let i = 1; i <= 10; i++) {
      const status = faker.helpers.arrayElement(["todo", "doing", "done"]); // Tentukan status secara acak

      // Hitung jumlah masing-masing status
      if (status === "todo") {
        todo++;
      } else if (status === "doing") {
        doing++;
      } else if (status === "done") {
        done++;
      }

      await prismaClient.todo.create({
        data: {
          todo_id: uuid(),
          index: status === "todo" ? todo - 1 : status === "doing" ? doing - 1 : done - 1,
          category: JSON.stringify(["Uncategorized"]),
          text: faker.lorem.words(3),
          user_id: user.user_id,
          status: status,
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
