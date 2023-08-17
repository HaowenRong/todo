export async function getAll(userId) {
  try {
    const response = await fetch('http://localhost:3000/docs');
    return response.json();
  } catch (error) {
    console.error('Error retrieving posts:', error);
  }
}

export async function searchUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/docs/${userId}`);
    return response.json();
  } catch (error) {
    console.error('Error retrieving posts:', error);
  }
}

export async function fetchPage(userId, pageId) {
  try {
    const response = await fetch(`http://localhost:3000/docs/${userId}/${pageId}`);
    return response.json();
  } catch (error) {
    console.error('Error retrieving posts:', error);
  }
}

export async function createNew(docData) {
  try {
    const response = await fetch('http://localhost:3000/docs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(docData)
    });
    if (!response.ok) {
      console.log("Error creating doc");
      return;
    }
    console.log("Creation was successful");
  } catch (error) {
    console.error('Error retrieving posts:', error);
  }
}

export async function createUser(docData) {
  try {
    const response = await fetch('http://localhost:3000/docs/create/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(docData)
    });
    if (!response.ok) {
      console.log("Error creating doc");
      return;
    }
    console.log("Creation was successful");
  } catch (error) {
    console.error('Error retrieving posts:', error);
  }
}