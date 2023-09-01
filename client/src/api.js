const api = {
  getProducts: async (page, limit) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  getReports: async (accessToken) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
