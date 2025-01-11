export const initialState = {
  isAuthenticated: false,
  role: null,
  profile: "",
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  expires: null,
};

export const authReducer = (UserState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...UserState,
        isAuthenticated: true,
        role: action.payload.role,
        profile: action.payload.profile,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        token: action.payload.token,
        expires: action.payload.expires,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        role: null,
        profile: "",
        firstName: "",
        lastName: "",
        email: "",
        token: "",
        expires: null,
      };
    default:
      return UserState;
  }
};
