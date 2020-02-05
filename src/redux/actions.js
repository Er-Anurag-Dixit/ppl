export const Update_Categories = "update_categories";
export const Update_LoginState = "login_state";
export const Reset_LoginState = "reset_login_state";

export const updateCategories = data => {
  return {
    type: Update_Categories,
    payload: data
  };
};
export const updateLoginState = data => {
  return {
    type: Update_LoginState,
    payload: data
  };
};
export const resetLoginState = () => {
  return {
    type: Reset_LoginState,
    payload: ""
  };
};
