interface Payload {
  avatar: string;
  fullname: string;
}
export type LoginResponse = {
  id: string;
  email: string;
  profile: {
    image: string;
    fullname: string;
  };
  token: string;
};

const AuthReducer = (
  state: any,
  { type, payload }: { type: string; payload: LoginResponse }
) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
        data: payload,
        isLoading: false,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isLogin: false,
        data: null,
        isLoading: false,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        data: null,
      };
    default:
      return state;
  }
};
export default AuthReducer;
