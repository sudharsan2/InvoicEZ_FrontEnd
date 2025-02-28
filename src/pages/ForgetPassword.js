

import React, { useState } from "react";
import axios from "axios"; // Import axios
import { makeStyles, tokens} from "@fluentui/react-components";
import "./Forget.css";

const useStyles = makeStyles({
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    width: "100%",
    padding: "40px",
    textAlign: "center",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "0 20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1,
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
  },
  input: {
    marginBottom: "16px",
  },
  submitButton: {
    padding: tokens.spacingHorizontalS,
    backgroundColor: "#1677ff",
    color: tokens.colorNeutralForegroundInverted,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: tokens.spacingVerticalS,
    fontSize: "16px",
    fontWeight: "bold",
    width: "70%",
    marginLeft: "2em",
  },
  message: {
    marginTop: tokens.spacingVerticalM,
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
  },
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const styles = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://invoicezapi.focusrtech.com:57/user/forgot-password",
        {
          email,
        },
      );

      setMessage(
        response.data.message || "Password reset link successfully sent!",
      );
    } catch (error) {
      setMessage("Failed to send reset link. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="Forget">
      <div className={styles.pageWrapper}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Forget Password</h2>
          <form onSubmit={handleSubmit} className={styles.field}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={styles.input}
              appearance="underline" // Keeps the Fluent UI underline appearance
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>

          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
