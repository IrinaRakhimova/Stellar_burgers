const URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
    });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const handleForgotPassword = async (email) => {
  const res = await fetch(`${URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  return checkResponse(res);
};

export const resetPassword = async (userData) => {
  const res = await fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return checkResponse(res);
};

const request = async (endpoint, method = "GET", body) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  try {
    return await fetchWithRefresh(`${URL}${endpoint}`, options);
  } catch (error) {
    console.error(`API request failed: ${error}`);
    throw error;
  }
};

export const createOrderRequest = (ingredientIds) =>
  request("/orders", "POST", { ingredients: ingredientIds });
export const fetchIngredients = () => request("/ingredients");
export const registerUser = (userData) =>
  request("/auth/register", "POST", userData);
export const loginUser = (userData) => request("/auth/login", "POST", userData);
export const logOut = () =>
  request("/auth/logout", "POST", {
    token: localStorage.getItem("refreshToken"),
  });
export const getUserData = () => request("/auth/user");
export const updateUserData = (userData) =>
  request("/auth/user", "PATCH", userData, {
    token: localStorage.getItem("refreshToken"),
  });
