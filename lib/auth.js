import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import fetcher from "../utils/fetcher";
import useSWR from "swr";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const { data: user, mutate: mutateUser } = useSWR(
    "/api/auth/profile",
    fetcher
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const signin = async (formData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        mutateUser();
        Router.push("/my-campaigns");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(JSON.parse(error.message));
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  };

  const signup = async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Router.push("/my-campaigns");
        mutateUser();
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const logout = async () => {
    const res = await fetch("/api/auth/logout");
    if (res.ok) {
      mutateUser(null);

      Router.push("/");
    }
  };

  return {
    errorMessage,
    user,
    loading,
    mutateUser,
    signin,
    signup,
    logout,
  };
}
