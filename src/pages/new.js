import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import "./login.css";
import { notification } from "antd";


import { jwtDecode } from "jwt-decode";
import logo from "../media/logo1000.png";


const LoginPage = ({ setRoleFromChild }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const LoginSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const [role, setRole] = useState("");

  console.log(role)
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
          "https://invoicezapi.focusrtech.com:57/user/signin",
          {
            username: values.username,
            password: values.password,
          }
        );

        const tokens = response.data.tokens;
        const { access_token } = tokens;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("username", response.data.username);

        // Decode the role directly from the access token
        const decodedToken = jwtDecode(access_token);
        const roleFromToken = decodedToken.role;

        // Update role in App.js immediately
        setRoleFromChild(roleFromToken);

        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in",
        });

        // Navigate based on role
        switch (roleFromToken) {
          case "admin":
            navigate("/matrimony");
            break;
          case "invoice manager":
            navigate("/dashboard");
            break;
          case "supplier":
            navigate("/supplier");
            break;
          case "storeuser":
            navigate("/storeuser");
            break;
          default:
            navigate("/unauthorized");
        }
      } catch (error) {
        console.error("Login failed:", error);

        notification.error({
          message: "Login Failed",
          description:
            error.response?.data?.message || "An error occurred during login.",
        });

        if (error.response) {
          setErrors({ auth: error.response.data.message });
        } else {
          setErrors({ auth: "An error occurred during login." });
        }
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
    <div className="Login"
>
  

  {/* Right Side - Login Section */}
  <div
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "30rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        padding: "2rem",
      }}
    >
      <div style={{ marginBottom: "1rem",display:"flex"}}>
        <div>
        <img src={logo} alt="Description" style={{ width: "9vw", height: "50px" }} />
        </div>
        <div style={{display:"flex",justifyContent:"center",marginLeft:"4em"}}>
          <h2>InvoiceEZ</h2>
        </div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
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

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "1em",
              paddingRight: "2.5em",
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
          }}
        >
          <a
            href="/forgotPassword"
            style={{
              fontSize: "0.875rem",
              color: "black",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "1em",
            backgroundColor: "#e6c5e2",
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
          }}
          disabled={isLoading || formik.isSubmitting}
        >
          <span style={{color:"black"}}>{isLoading ? "Signing in..." : "Sign in"}</span>
        </button>
      </form>
    </div>
  </div>
  
</div>

  );
};

export default LoginPage;
