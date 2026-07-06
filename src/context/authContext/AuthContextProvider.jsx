import { authService } from "@/services/auth/authService";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const authStateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case "STOP_LOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authStateReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const initialLoad = () => {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        dispatch({ type: "STOP_LOADING" });
        return;
      }

      try {
        const decoded = jwtDecode(access_token);
        const { id, fullName, role, avatar } = decoded;
        dispatch({
          type: "LOGIN",
          payload: { id, fullName, role, avatar },
        });
      } catch {
        dispatch({ type: "STOP_LOADING" });
      }
    };

    initialLoad();
  }, []);

  const login = async (loginData) => {
    const res = await authService.login(loginData);

    if (res.success) {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      const { id, fullName, role, avatar } = res.data.user;

      dispatch({ type: "LOGIN", payload: { id, fullName, role, avatar } });
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const ctxValue = {
    user: authState.user,
    loading: authState.loading,
    login,
    logout,
    updateUser,
  };
  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
};
