export const defaultState = {
  token: '',
  username: ''
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_ADD_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'USER_ADD_DETAILS':
      const { realm, username, email, emailVerified, id } = action.userDetails;
      return {
        ...state,
        realm, username, email, emailVerified, id
      };
    default:
      return state;
  }
};

export default user;