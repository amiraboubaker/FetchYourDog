const API_BASE_URL = 'https://api.thedogapi.com/v1/breeds';  // Correct API URL
const API_KEY = 'live_5z28V2wtZJdPcXu51WhsU7OnWuqqKquK9jRvLPU64n74C81QgM8OAtAgFK0XKRzn'; 

// Fetch a list of dog breeds
export const fetchDogBreeds = async () => {
    try {
        const response = await fetch(API_BASE_URL, {  // Fetch directly from breeds endpoint
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Breeds Data:", data); // Log the fetched data
        const breeds = data.map(breed => breed.name); // Extract breed names
        return breeds;
    } catch (error) {
        console.error("Error fetching dog breeds:", error);
        return [];
    }
};

// Fetch details for a specific breed by name
export const fetchDogDetails = async (breedName) => {
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data[0]; // Return the first match for the breed
    } catch (error) {
        console.error("Error fetching dog details:", error);
        return null;
    }
};

export const fetchDogImage = async (breed) => {
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed=${breed}`, {  // Use correct search endpoint
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data[0]?.url || ''; 
    } catch (error) {
        console.error("Error fetching dog image:", error);
        return '';
    }
};
