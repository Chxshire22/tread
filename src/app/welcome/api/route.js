// Import the 'axios' library for making HTTP requests
const axios = require("axios");

// Define the route handler for the API request
const handleRequest = async (req, res) => {
  try {
    // Make an API request using axios
    const response = await axios.get("https://api.example.com/welcome");

    // Extract the data from the response
    const data = response.data;

    // Send the data as the response
    res.json(data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Export the route handler
module.exports = handleRequest;
