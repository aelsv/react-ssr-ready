const initialState = {
  name: '',
  email: '',
  isVerified: false,
  isAuthorized: false,
  isRegistered: false,
};

export const userReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    default:
      return state;
  }
};
