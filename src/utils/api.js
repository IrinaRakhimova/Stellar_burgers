const URL = 'https://norma.nomoreparties.space/api';

 export const fetchIngredients = async () => {
   try {
     const response = await fetch(URL + '/ingredients');
     
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
     
     const data = await response.json();
     return data.data; 
   } catch (error) {
     console.error("Error fetching ingredients:", error);
     throw error; 
   }
 };

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

export const createOrderRequest = (ingredientIds) => {
  return request('/orders', {
      method: 'POST',
      body: JSON.stringify({ ingredients: ingredientIds }),
  });
};