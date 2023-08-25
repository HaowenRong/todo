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
    const response = await fetch(`http://localhost:3000/docs/${userId}/pages/${pageId}`);
    return response.json();
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


export async function saveNode(userId, node) {
  try {
    const response = await fetch(`http://localhost:3000/docs/${userId}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(node)
    });
    if (!response.ok) {
      console.log("Error creating doc");
      return;
    }
    console.log("Creation was successful");
  } catch (error) {
    console.log('Error saving node', error);
  }
}
