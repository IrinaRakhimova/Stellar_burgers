type Ingredient = {
  _id: string;
  name: string;
  image: string;
  image_large: string;
  price: number;
  type: "bun" | "sauce" | "main";
  instanceId: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
};

type UserDataState = {
  name: string;
  email: string;
  success: boolean;
  error: string | null;
  request: boolean;
  token: string;
  successLogout: boolean;
  isAuth: boolean;
  order: null | Order;
  resetPassword: boolean;
};

type Order = {
  ingredients: string[];
  number: number;
  createdAt: string;
  name: string;
  status: string;
  price?: number;
};
