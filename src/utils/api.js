const URL = 'https://norma.nomoreparties.space/api';

const request = async (endpoint, options = {}) => {
  const url = `${URL}${endpoint}`;

  const defaultOptions = {
      headers: { 'Content-Type': 'application/json' },
  };

  try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
      }

      return data;
  } catch (error) {
      console.error(`API request to ${url} failed:`, error);
      throw error;
  }
};

export const fetchIngredients = async () => {
  try {
    const data = await request('/ingredients'); 
    return data.data; 
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error; 
  }
};

export const createOrderRequest = async (ingredientIds) => {
  try {
    const response = await request('/orders', {
      method: 'POST',
      body: JSON.stringify({ ingredients: ingredientIds }),
    });
    return response; 
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; 
  }
};