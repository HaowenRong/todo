require('dotenv').config();

// express
const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/todo.html`);
});


// mongo db
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

async function readItem(databaseName, collectionName, itemId) {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const query = { _id: new ObjectId(itemId)};
    const document = await collection.findOne( query );
    console.log('Document:', document);
  } catch(error) {
    console.log('Error reading data:', error);
  } finally {
    await client.close();
  }
}

async function writeToCollection(databaseName, collectionName, item) {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const result = await collection.insertOne(item);
    console.log('Document inserted:', result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error('Error writing to collection:', error);
  } finally {
    await client.close();
  }
}

// Example usage
const documentToWrite = { name: 'Jeff',
                          job: 'Salesman',
                          fdas: 'gdfs' };

async function readFromWrite() {
  const newItemId = await writeToCollection('testdb', 'testcoll', documentToWrite).catch(console.error);
  await readItem('testdb', 'testcoll', newItemId);
}

readFromWrite();