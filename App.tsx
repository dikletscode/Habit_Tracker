import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setAuthToken } from "./config/axios";
import { getValue } from "./config/secureStore";
import { LoginResponse } from "./context/AuthReducer";
import Provider, { AuthContext } from "./context/Provider";
import * as Application from "expo-application";
import useCachedResources from "./hooks/useCachedResources";

import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider>
          <Navigation />

          <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
