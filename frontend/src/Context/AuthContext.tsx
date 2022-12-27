import React from "react";
import { useState, useEffect } from "react";

/**
 * AuthContext
 */
const AuthContext = React.createContext({
  getAuthData: (): AuthData => ({ authToken: "", authData: "" }),
  signOut: () => {},
  updateData: (val: AuthData) => {},
});

/**
 * AuthProps
 */
type AuthProps = {
  children: JSX.Element;
};

/**
 * AuthData type
 */
export type AuthData = {
  authToken: string;
  authData: string;
};

/**
 * AuthProvider
 *
 * @param AuthProps
 * @returns React.FunctionComponent
 */
const AuthProvider = ({ children }: AuthProps) => {
  const [authToken, setAuthToken] = useState("");
  const [authData, setAuthData] = useState("");

  /**
   * Get authentication and user data.
   *
   * @returns AuthData
   */
  const getAuthData = () => {

    if (authData) {
      const data = JSON.parse(authData);
      if (
        data.payload &&
        data.payload.exp &&
        data.payload.exp < Date.now() / 1000
      ) {
        setAuthData("");
        setAuthToken("");
      }
    }

    return { authToken, authData };
  };

  /**
   * Sign out (clear authentication token and data)
   *
   * @returns void
   */
  const signOut = () => {
    setAuthToken("");
    setAuthData("");
    localStorage.setItem("authToken", "");
    localStorage.setItem("authData", "");
  };

  /**
   * Update authentication data. Use this to update the authentication token and data, particularly within a user login, etc.
   *
   * @param AuthData data
   * @return void
   */
  const updateData = ({ authToken, authData }: AuthData) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("authData", authData);
    setAuthToken(authToken);
    setAuthData(authData);
  };

  useEffect(() => {
    const authTokenFromStorage = localStorage.getItem("authToken");
    const authDataFromStorage = localStorage.getItem("authData");
    if (
      !authData &&
      authTokenFromStorage != null &&
      authDataFromStorage != null
    ) {
      setAuthToken(authTokenFromStorage);
      setAuthData(authDataFromStorage);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getAuthData,
        signOut,
        updateData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
