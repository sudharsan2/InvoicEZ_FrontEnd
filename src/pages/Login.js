import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button, notification } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import useIsMountedRef from "../hooks/useIsMountedRef";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginDetailsAsync,
  getIsAuthenticatedFromAuth,
  getIsLoadingFromAuth,
  getErrorFromAuth,
} from "../Store/authSlice";
// import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticatedFromAuth);
  const isError = useSelector(getErrorFromAuth);
  const LoginSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://invoicezapi.focusrtech.com:57/user/signin",
          {
            username: values.username,
            password: values.password,
          },
        );

        const { role, username, useremail, empcode } = response.data;
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        const tokens = response.data.tokens;
        localStorage.setItem("access_token", tokens.access_token);

        switch (role) {
          case "ROLE_ADMIN":
            navigate("/admin-page");
            break;
          case "ROLE_RECRUITER":
            navigate("/kanban-recruit");
            break;
          case "ROLE_INTERVIEWER":
            navigate("/kanban-interviewer");
            break;
          default:
            navigate("/dashboard");
        }

        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
        });
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }

        notification.error({
          message: "Login Failed",
          description:
            error.response?.data?.message || "An error occurred during login.",
        });

        setErrors({
          auth:
            error.response?.data?.message || "An error occurred during login.",
        });
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Login">
      <div className="login-container">
        <div className="form-container">
          <h1>Sign in</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error">{formik.errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <EyeOutlined
                  onClick={handleTogglePassword}
                  className="eye-icon"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
              </div>
            </div>
            <div className="additional-options">
              <label>
                <input type="checkbox" name="rememberMe" />
                Remember Me
              </label>
              <Link to="/forgotPassword" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            <Button
              className="log-button"
              type="primary"
              htmlType="submit"
              loading={isLoading || formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
