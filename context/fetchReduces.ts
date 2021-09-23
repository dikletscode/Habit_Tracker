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

const fetchReducer = (
  state: any,
  { type, payload }: { type: string; payload: LoginResponse }
) => {
  switch (type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        isFetch: true,
        data: payload,
        isLoading: false,
      };
    case "FETCH_FAILED":
      return {
        ...state,
        isFetch: false,
        data: null,
        isLoading: false,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        isFetch: false,
        data: null,
      };
    default:
      return state;
  }
};
export default fetchReducer;
