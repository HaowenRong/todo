
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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

export { readDocument };