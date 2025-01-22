import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_CONNECTION);

export let userCollection, playersCollection, pureSoulsCollection;

let db;

try {
  await client.connect();

  db = client.db("soul-points");
  userCollection = db.collection("users");
  playersCollection = db.collection("players");
  pureSoulsCollection = db.collection("pureSouls");

  console.log("Successful database connection!");
} catch (error) {
  console.error(error);
}

export default db;
