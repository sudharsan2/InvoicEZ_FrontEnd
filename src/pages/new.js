import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
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
import { jwtDecode } from "jwt-decode";
const LoginPage = () => {
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
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(typeof token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const roleFromToken = decodedToken.role;

        setRole(roleFromToken);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);
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
          "http://172.235.21.99:57/user/signin",
          {
            username: values.username,
            password: values.password,
          },
        );

        const { username } = response.data;
        localStorage.setItem("username", username);
        // localStorage.setItem("role", role);

        const tokens = response.data.tokens;
        localStorage.setItem("access_token", tokens.access_token);
        console.log("ROLE", role);
        switch (role) {
          case "admin":
            navigate("/matrimony");
            break;
          case "invoice manager":
            navigate("/inloop");
            break;
          case "supplier":
            navigate("/supplier");
          default:
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // console.log("Login attempted with:", formData);
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #EDE9FE, #DBEAFE)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "30rem", // Increased maxWidth for the outer card
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          padding: "2rem", // Increased padding for better spacing
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Welcome back
          </h2>
          <p
            style={{
              color: "#6B7280",
              textAlign: "center",
              fontSize: "0.875rem",
            }}
          >
            Enter your credentials to access your account
          </p>
        </div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{ position: "relative", marginLeft: "6em", width: "70%" }}
            >
              {/* <Mail
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "0.75rem",
                  height: "1.25rem",
                  width: "1.25rem",
                  color: "#9CA3AF",
                }}
              /> */}
              <input
                type="test"
                id="username"
                name="username"
                placeholder="Enter username"
                style={{
                  width: "100%",
                  padding: "1em",
                  borderRadius: "0.5rem",
                  border: "1px solid #D1D5DB",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                value={formik.values.username}
                onChange={formik.handleChange}
                required
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error">{formik.errors.username}</div>
              )}
            </div>

            <div
              style={{ position: "relative", marginLeft: "6em", width: "70%" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: "1em",
                  paddingRight: "2.5em", // Add extra padding to the right for the icon
                  borderRadius: "0.5rem",
                  border: "1px solid #D1D5DB",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                value={formik.values.password}
                onChange={formik.handleChange}
                required
              />
              <EyeOutlined
                onClick={handleTogglePassword}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#9CA3AF",
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "6em",
                // gap:"12em",
              }}
            >
              {/* <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    borderRadius: "0.25rem",
                    borderColor: "#D1D5DB",
                    accentColor: "#9333EA",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#4B5563",
                  }}
                >
                  Remember me
                </span>
              </label> */}
              <a
                href="/forgotPassword"
                style={{
                  fontSize: "0.875rem",
                  color: "#9333EA",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="primary"
              htmlType="submit"
              loading={isLoading || formik.isSubmitting}
              disabled={formik.isSubmitting}
              // disabled={isLoading}
              style={{
                width: "30%",
                padding: "1em", // Reduced padding for smaller button
                backgroundColor: "#9333EA",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.75 : 1,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "1rem",
                marginLeft: "10em",
              }}
            >
              <span>{isLoading ? "Signing in..." : "Sign in"}</span>
              {!isLoading && (
                <ArrowRight style={{ height: "1rem", width: "1rem" }} />
              )}
            </button>
          </form>
          {/*
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "#4B5563",
                fontSize: "0.875rem",
              }}
            >
              Don't have an account?
            </span>
            <a
              href="#"
              style={{
                color: "#9333EA",
                textDecoration: "none",
                marginLeft: "0.5rem",
                fontSize: "0.875rem",
                transition: "color 0.3s ease",
              }}
            >
              Sign up
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
