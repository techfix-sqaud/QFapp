import { useContext, useState } from "react";
import { Alert } from "react-native";
import quickFixAPI, { configartion, resetConfigartion } from "../Helpers/Axios";
import AuthContext from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import ValidationContext from "../contexts/ValidationContext";
import { UserRole, UserRoleIds } from "../Helpers/Enums";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { UserState, dispatch } = useContext(AuthContext)!;
  const { validationDispatch } = useContext(ValidationContext)!;

  const router = useRouter();
  const requestLoginAsGuest = async (
    firstName: string,
    lastName: string,
    email: string
  ) => {
    const expires = new Date();
    expires.setHours(expires.getHours() + 2);

    setLoading(true);
    try {
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: true,
          userId: 0,
          role: UserRole.Guest,
          profile: "",
          firstName: firstName,
          lastName: lastName,
          email: email,
          token: "",
          expires: expires,
        },
      });
      router.push("/Dashboard");
    } catch (error) {
      console.error("Guest login failed", error);
    } finally {
      setLoading(false);
    }
  };
  const HandleLogin = async (
    token: string,
    expires: Date,
    redirect?: boolean
  ) => {
    if (token) {
      configartion(token);
      try {
        const response = await quickFixAPI.get("/Users/profile");
        const user = response.data;
        dispatch({
          type: "LOGIN",
          payload: {
            isAuthenticated: true,
            userId: user.id,
            role: user.role,
            profile: user.profile,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: token,
            expires: expires,
          },
        });
        if (redirect) {
          if (user.role_id === UserRoleIds.SuperAdmin) {
            router.push("/Dashboard");
          } else router.push("/");
        }
      } catch (error) {
        setError("An unexpected error occurred.");
        Alert.alert("Login Failed", "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
  };

  const Validate = async (code: string, userId: number) => {
    const response = await quickFixAPI.post("/Account/validate", {
      userId: userId,
      code: code,
    });
    return response.data;
  };

  const requestLogin = async (
    email: string,
    password: string,
    setErrorMessage: (message: string) => void
  ) => {
    try {
      setLoading(true);
      let data;
      try {
        const response = await quickFixAPI.post("/Account/login", {
          EmailOrUserName: email,
          Password: password,
        });
        data = response.data;
      } catch (error) {
        console.error("Login request failed", error);
        setErrorMessage(
          "Invalid credentials. Please check your username and password and try again."
        );
        return;
      }
      if (data.requiresValidation) {
        validationDispatch({
          type: "SET_USER_ID",
          payload: { userId: data.userId },
        });
        router.push("/Account/OTPVerification");
      } else {
        await HandleLogin(data.token, data.expires, true);
      }
    } catch (error) {
      setErrorMessage(
        "Invalid credentials. Please check your username and password and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (UserState.role == UserRole.Guest) dispatch({ type: "LOGOUT" });
    else {
      resetConfigartion();
      try {
        quickFixAPI.get("/Account/logout");
      } catch (error) {
        console.error("Logout failed", error);
      }
      dispatch({ type: "LOGOUT" });
    }
    router.push("/Account/Login");
  };
  return {
    HandleLogin,
    loading,
    error,
    Validate,
    requestLogin,
    requestLoginAsGuest,
    handleLogout,
  };
};

export default useLogin;
