const authReducer = (
  state = {
    authData: [
      {
        roleName: 'super-admin',
        password: 'Ixtiyor0919$%',
        phoneNumber: '998945987742',
        address: 'Toshkent viloyati',
        fullName: 'Ixtiyor Komiljonov',
        email: 'ixtiyor0919@gmail.com',
        roleIcon: 'mdi:account-cowboy-hat-outline',
        id: '19943cbb-c5f7-0f2b-4101-ff8c893c4548',
      },
    ],
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'AUTH_CREATE':
      return {
        ...state,
        authData: [...state.authData, action.data],
        loading: false,
        error: false,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
      };
    case 'AUTH_DELETE':
      state.authData = state.authData.filter((item) => item.id !== action.id);
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'AUTH_UPDATING_START':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'AUTH_UPDATING_SUCCESS':
      state.authData = state.authData.filter((item) => item.id !== action.data.id);
      return {
        ...state,
        authData: [...state.authData, action.data],
        loading: false,
        error: false,
      };
    case 'AUTH_UPDATING_FAIL':
      return {
        ...state,
        loading: true,
        error: true,
      };

    case 'LOG_OUT':
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
      };

    // case "FOLLOW_USER":
    //   return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]} }}

    // case "UNFOLLOW_USER":
    //   return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)]} }}

    default:
      return state;
  }
};

export default authReducer;
