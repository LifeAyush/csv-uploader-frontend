import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Update with your actual backend URL

const Api = {
  uploadCsv: async (csvData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/upload`, { csvData });
      return response.data;
    } catch (error) {
      console.error("Error uploading CSV:", error);
      throw error;
    }
  },

  submitMapping: async (mappingData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/submit-mapping`, mappingData); // No need to wrap mappingData in an object
      return response.data;
    } catch (error) {
      console.error("Error submitting mapping:", error);
      throw error;
    }
  },
};

export default Api;
