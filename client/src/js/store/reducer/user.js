export const defaultState = {
  token: '',
  username: 'username'
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_ADD_TOKEN':
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};

export default user;