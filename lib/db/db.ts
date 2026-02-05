import "server-only";
import { MongoClient, Db, Collection } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

const mongoUri: string = uri;

let client: MongoClient;
let db: Db;

export async function connectToDb() {
  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db(); // uses DB from URI
  }

  return { client, db };
}

export async function getTaskCollection(): Promise<Collection> {
  if (!db) {
    const { db: database } = await connectToDb();
    return database.collection("tasks");
  }

  return db.collection("tasks");
}
