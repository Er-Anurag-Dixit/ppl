import { Update_LoginState, Reset_LoginState } from "./actions";

const initialState = {
  loginState: ""
};

const loginStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Update_LoginState:
      return {
        ...state,
        loginState: action.payload
      };
    case Reset_LoginState:
      return {
        ...state,
        loginState: action.payload
      };
    default:
      return state;
  }
};

export default loginStateReducer;
