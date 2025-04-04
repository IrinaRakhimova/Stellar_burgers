const URL = "https://norma.nomoreparties.space/api";

type ApiResponse<T = {}> = {
  data(data: any): unknown;
  user: any;
  accessToken: string;
  refreshToken: string;
  order: any;
  success: boolean;
  message?: string;
} & T;

const checkResponse = async <T = {}>(res: Response): Promise<ApiResponse<T>> => {
  const data: ApiResponse<T> = await res.json();
  return res.ok ? data : Promise.reject(data);
};

interface RefreshTokenResponse {
  [x: string]: any;
  refreshToken: string;
  accessToken: string;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const res = await fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });

  const refreshData = await checkResponse<RefreshTokenResponse>(res);
  if (!refreshData.success) throw refreshData;

  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken);
  return refreshData;
};

export const fetchWithRefresh = async <T = {}>(
  url: string,
  options: RequestInit & { headers: Record<string, string> }
): Promise<ApiResponse<T>> => {
  let res = await fetch(url, options);
  let data = await res.json(); 

  if (res.status === 401 || (data.success === false && data.message === "jwt expired")) {
    const refreshData = await refreshToken();

    if (!refreshData.success) {
      return Promise.reject(new Error("Token refresh failed"));
    }

    options.headers.Authorization = `Bearer ${refreshData.accessToken}`;

    res = await fetch(url, options);
    data = await res.json();
  }

  return data;
};

export const handleForgotPassword = async (
  email: string
): Promise<ApiResponse> => {
  const res = await fetch(`${URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return checkResponse(res);
};

export const resetPassword = async (userData: {
  password: string;
  token: string;
}): Promise<ApiResponse> => {
  const res = await fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return checkResponse(res);
};

const request = async <T = {}>(
  endpoint: string,
  method: string = "GET",
  body?: unknown
): Promise<ApiResponse<T>> => {
  const options: RequestInit & { headers: Record<string, string> } = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken") || "",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    return await fetchWithRefresh<T>(`${URL}${endpoint}`, options);
  } catch (error) {
    console.error(`API request failed: ${error}`);
    throw error;
  }
};

export const createOrderRequest = (ingredientIds: string[]) =>
  request("/orders", "POST", { ingredients: ingredientIds });

export const fetchIngredients = () => request("/ingredients");

export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
}) => request("/auth/register", "POST", userData);

export const loginUser = (userData: { email: string; password: string }) =>
  request("/auth/login", "POST", userData);

export const logOut = () =>
  request("/auth/logout", "POST", {
    token: localStorage.getItem("refreshToken"),
  });

export const getUserData = () => request("/auth/user");

export const updateUserData = (
  userData: Partial<{ name: string; email: string; password: string }>
) => request("/auth/user", "PATCH", userData);

export const fetchOrderByNumber = async (orderNumber: number) => {
  return request<{ orders: Order[] }>(`/orders/${orderNumber}`);
};
