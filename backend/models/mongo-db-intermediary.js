

async function fetchDocument(databaseName, collectionName, documentId) {
  try {
    const { readDocument } = await import('./mongo-db.js');
    const document = await readDocument(databaseName, collectionName, documentId);
    return document;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export {
  fetchDocument
}
