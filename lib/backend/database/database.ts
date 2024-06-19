import clientPromise from "./mongodb";

export default async function db() {
  const client = await clientPromise;

  client.on("error", (event) => {
    console.error(event.message)
  });

  return client.db("stock");
}

// const db = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
//   log: [
//     {
//       emit: "event",
//       level: "error",
//     },
//   ],
// });

// db.$on("error", (event) => {
//   logger
//     .log({ level: "error", message: event.message })
//     .catch((e) => console.error("Logging failed", e));
// });

// export default db;
