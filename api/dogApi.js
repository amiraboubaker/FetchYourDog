const API_BASE_URL = 'https://dog.ceo/api'; // Base URL for the Dog API

// Fetch a list of dog breeds
export const fetchDogBreeds = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/breeds/list/all`);
        const data = await response.json();
        
        // Extract breed names
        const breeds = Object.keys(data.message);
        return breeds;
    } catch (error) {
        console.error("Error fetching dog breeds:", error);
        return []; // Return an empty array in case of error
    }
};

// Fetch a random dog image for a specific breed
export const fetchDogImage = async (breed) => {
    try {
        const response = await fetch(`${API_BASE_URL}/breed/${breed}/images/random`);
        const data = await response.json();
        return data.message; // Return the URL of the dog image
    } catch (error) {
        console.error("Error fetching dog image:", error);
        return ''; // Return an empty string in case of error
    }
};
