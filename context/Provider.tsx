import React, { createContext, Dispatch, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import fetchReducer from "./fetchReduces";
import notificationReducer from "./notificationReducer";

export const AuthContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({ state: {}, dispatch: () => undefined });

export const FetchContext = createContext<{
  data: any;
  setData: Dispatch<any>;
}>({ data: {}, setData: () => undefined });

export const NotifhContext = createContext<{
  isEnable: any;
  setEnable: Dispatch<any>;
}>({ isEnable: {}, setEnable: () => undefined });

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLogin: null,
    data: null,
    isLoading: false,
  });
  const [data, setData] = useReducer(fetchReducer, {
    isFetch: false,
    data: null,
    isLoading: false,
  });
  const [isEnable, setEnable] = useReducer(notificationReducer, {
    notif: true,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <FetchContext.Provider value={{ data, setData }}>
        <NotifhContext.Provider value={{ isEnable, setEnable }}>
          {children}
        </NotifhContext.Provider>
      </FetchContext.Provider>
    </AuthContext.Provider>
  );
};
export default Provider;
