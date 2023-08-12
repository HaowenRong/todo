import 'dotenv/config.js';
import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_DB_URI;
  console.log(uri);
  try {
    const connection = await mongoose.connect(uri);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function readCollection(databaseName, collectionName) {
  try {
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const data = await collection.find({}).toArray();
    console.log('Data:', data);
  } catch(error) {
    console.log('Error reading data:', error);
  }
}

async function readDocument(databaseName, collectionName, documentId) {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const query = { _id: new ObjectId(documentId)};
    const document = await collection.findOne( query );
    console.log('Document:', document);
    return document;
  } catch(error) {
    console.log('Error reading data:', error);
  } finally {
    await client.close();
  }
}

async function writeToCollection(databaseName, collectionName, document) {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const result = await collection.insertOne(document);
    console.log('Document inserted:', result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error('Error writing to collection:', error);
  } finally {
    await client.close();
  }
}

async function readFromWrite(document) {
  const newDocumentId = await writeToCollection('testdb', 'testcoll', document).catch(console.error);
  await readDocument('testdb', 'testcoll', newDocumentId);
}
