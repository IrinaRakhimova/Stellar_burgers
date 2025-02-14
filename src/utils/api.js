import Cookies from "js-cookie";

const URL = "https://norma.nomoreparties.space/api";

const request = async (endpoint, method = "GET", body) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("accessToken"),
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${error}`);
    throw error;
  }
};

export const createOrderRequest = (ingredientIds) =>
  request("/orders", "POST", { ingredients: ingredientIds });
export const fetchIngredients = () => request("/ingredients");

export const handleForgotPassword = (email) =>
  request("/password-reset", "POST", email);
export const resetPassword = (userData) =>
  request("/password-reset/reset", "POST", userData);
export const registerUser = (userData) =>
  request("/auth/register", "POST", userData);
export const loginUser = (userData) => request("/auth/login", "POST", userData);
export const logOut = () =>
  request("/auth/logout", "POST", { token: Cookies.get("refreshToken") });


export const getUserData = () => request("/auth/user");
export const updateUserData = (userData) =>
  request("/auth/user", "PATCH", userData);

