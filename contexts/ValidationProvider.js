export const initialValidationState = {
  userId: null,
};

export const validationReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload.userId,
      };

    case "RESET_OTP":
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};
