import reducer, {
  setName,
  setEmail,
  setToken,
  resetSuccess,
  setResetPassword,
  setError,
  setRequest,
  setSuccess,
  registerUserThunk,
  logInThunk,
  getUserDataThunk,
  initialState,
} from "../../slices/userDataSlice";

jest.mock("../../utils/api");

const mockPayload = {
  data: jest.fn(),
  user: { name: "Test User", email: "test@example.com" },
  accessToken: "fake-access-token",
  refreshToken: "fake-refresh-token",
  order: {},
  success: true,
  message: "Success",
};

const userPayload = {
  name: "Test User",
  email: "test@example.com",
  password: "123456",
  token: "123",
};

describe("userDataSlice initial state", () => {
  it("should match the initial state structure", () => {
    expect(initialState).toEqual({
      name: "",
      email: "",
      success: false,
      error: null,
      request: false,
      token: "",
      successLogout: false,
      isAuth: false,
      order: null,
      resetPassword: false,
    });
  });
});

describe("userDataSlice reducers", () => {
  it("should handle setName", () => {
    const state = reducer(initialState, setName("John"));
    expect(state.name).toBe("John");
  });

  it("should handle setEmail", () => {
    const state = reducer(initialState, setEmail("john@example.com"));
    expect(state.email).toBe("john@example.com");
  });

  it("should handle setToken", () => {
    const state = reducer(initialState, setToken("123"));
    expect(state.token).toBe("123");
  });

  it("should handle resetSuccess", () => {
    const state = reducer({ ...initialState, success: true }, resetSuccess());
    expect(state.success).toBe(false);
  });

  it("should handle setResetPassword", () => {
    const state = reducer(initialState, setResetPassword(true));
    expect(state.resetPassword).toBe(true);
  });

  it("should handle setError", () => {
    const state = reducer(initialState, setError("Something went wrong"));
    expect(state.error).toBe("Something went wrong");
  });

  it("should handle setRequest", () => {
    const state = reducer(initialState, setRequest(true));
    expect(state.request).toBe(true);
  });

  it("should handle setSuccess", () => {
    const state = reducer(initialState, setSuccess());
    expect(state.success).toBe(true);
  });
});

describe("userDataSlice thunks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should handle registerUserThunk.fulfilled", () => {
    const state = reducer(
      initialState,
      registerUserThunk.fulfilled(mockPayload, "", userPayload)
    );

    expect(state.success).toBe(true);
    expect(state.name).toBe("Test User");
    expect(state.email).toBe("test@example.com");
    expect(state.isAuth).toBe(true);
    expect(localStorage.getItem("accessToken")).toBe("fake-access-token");
    expect(localStorage.getItem("refreshToken")).toBe("fake-refresh-token");
    expect(state.error).toBeNull();
    expect(state.request).toBe(false);
  });

  it("should handle registerUserThunk.pending", () => {
    const state = reducer(
      initialState,
      registerUserThunk.pending("", userPayload)
    );
    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle registerUserThunk.rejected", () => {
    const state = reducer(
      initialState,
      registerUserThunk.rejected(
        new Error(),
        "",
        userPayload,
        "Registration failed"
      )
    );
    expect(state.success).toBe(false);
    expect(state.error).toBe("Registration failed");
  });

  it("should handle logInThunk.fulfilled", () => {
    const state = reducer(
      initialState,
      logInThunk.fulfilled(mockPayload, "", {
        email: "test@example.com",
        password: "123456",
      })
    );
    expect(state.success).toBe(true);
    expect(state.isAuth).toBe(true);
    expect(state.name).toBe("Test User");
    expect(state.email).toBe("test@example.com");
  });

  it("should handle getUserDataThunk.fulfilled", () => {
    const response = {
      data: jest.fn(),
      user: { name: "Test", email: "test@ex.com" },
      accessToken: "fake-access-token",
      refreshToken: "fake-refresh-token",
      order: {},
      success: true,
    };
    const state = reducer(
      initialState,
      getUserDataThunk.fulfilled(response, "", undefined)
    );
    expect(state.name).toBe("Test");
    expect(state.email).toBe("test@ex.com");
    expect(state.isAuth).toBe(true);
  });
});
