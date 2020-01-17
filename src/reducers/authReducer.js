export default (state = {}, action) => {
  switch (action.type) {
    case "register":
      console.log("registered ");
      return {
        ...state,
        loggedIn: true,
        source: action.payload,
        authError: null
      };
    case "login":
      console.log("logged in");
      return {
        ...state,
        loggedIn: true,
        source: action.payload,
        authError: null
      };
    case "logout":
      console.log("logged out");
      return {
        ...state,
        loggedIn: false,
        authError: null
      };
    case "registerError":
      return { ...state, authError: action.error };
    case "loginError":
      return { ...state, authError: action.error };
    case "logoutError":
      return { ...state, authError: action.error };
    default:
      return state;
  }
};
