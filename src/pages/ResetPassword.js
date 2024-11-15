// import React, { useState } from 'react';
// import {
//   makeStyles,
//   tokens,
//   Input,
//   Label,
//   Button,
// } from '@fluentui/react-components';

// // Styles for centering and enhancing the appearance
// const useStyles = makeStyles({
//   pageWrapper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     width: '100vw',
//     backgroundImage: 'url("../media/Dusk.jpg")', // Change the path if necessary
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   formWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     maxWidth: '400px',
//     width: '100%',
//     padding: '40px',
//     textAlign: 'center',
//     border: '1px solid #e0e0e0',
//     borderRadius: '12px',
//     backgroundColor: tokens.colorNeutralBackground1,
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     margin: '0 20px',
//   },
//   title: {
//     fontSize: '24px',
//     marginBottom: '20px',
//     fontWeight: 'bold',
//     color: tokens.colorNeutralForeground1,
//   },
//   field: {
//     display: 'grid',
//     gridRowGap: tokens.spacingVerticalXXS,
//     marginTop: tokens.spacingVerticalMNudge,
//   },
//   input: {
//     width: "90%",
//     marginBottom: '16px',
//     border: 'none',
//     backgroundColor: 'transparent',
//     borderBottom: `1px solid ${tokens.colorNeutralStroke1}`, // Consistent bottom border
//     outline: 'none',
//     transition: 'border-bottom-color 0.3s ease',

//     '&:focus': {
//       borderBottom: `1px solid ${tokens.colorBrandStroke1}`, // Change color on focus
//       outline: 'none',
//     },
//     '&:hover': {
//       borderBottom: `1px solid ${tokens.colorBrandStroke1}`, // Change color on hover
//     },
//   },
//   submitButton: {
//     padding: tokens.spacingHorizontalS,
//     backgroundColor: tokens.colorBrandBackground,
//     color: tokens.colorNeutralForegroundInverted,
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginTop: tokens.spacingVerticalS,
//     fontSize: '16px',
//     fontWeight: 'bold',
//     width: '60%',
//     marginLeft: '6em',
//   },
//   message: {
//     marginTop: tokens.spacingVerticalM,
//     fontSize: '16px',
//     color: tokens.colorNeutralForeground1,
//   },
// });

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const styles = useStyles();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newPassword === confirmPassword) {
//       setMessage('Password updated successfully!');
//     } else {
//       setMessage("Passwords do not match!");
//     }
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.formWrapper}>
//         <h2 className={styles.title}>Confirm Password</h2>
//         <form onSubmit={handleSubmit} className={styles.field}>
//           <Input
//             id="new-password"
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             className={styles.input}
//           />
//           <Input
//             id="confirm-password"
//             type="password"
//             value={confirmPassword}
//             placeholder="Confirm Password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className={styles.input}
//           />
//           <Button type="submit" className={styles.submitButton}>Submit</Button>
//         </form>

//         {message && <p className={styles.message}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

// import React, { useState } from 'react';
// import axios from 'axios'; // Import axios
// import {
//   makeStyles,
//   tokens,
//   Input,
//   Button,
// } from '@fluentui/react-components';
// import { Link, useParams } from "react-router-dom";

// // Styles for centering and enhancing the appearance
// const useStyles = makeStyles({
//   pageWrapper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     width: '100vw',
//     backgroundImage: 'url("../media/Dusk.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   formWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     maxWidth: '400px',
//     width: '100%',
//     padding: '40px',
//     textAlign: 'center',
//     border: '1px solid #e0e0e0',
//     borderRadius: '12px',
//     backgroundColor: tokens.colorNeutralBackground1,
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     margin: '0 20px',
//   },
//   title: {
//     fontSize: '24px',
//     marginBottom: '20px',
//     fontWeight: 'bold',
//     color: tokens.colorNeutralForeground1,
//   },
//   field: {
//     display: 'grid',
//     gridRowGap: tokens.spacingVerticalXXS,
//     marginTop: tokens.spacingVerticalMNudge,
//   },
//   input: {
//     width: "90%",
//     marginBottom: '16px',
//     border: 'none',
//     backgroundColor: 'transparent',
//     borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
//     outline: 'none',
//     transition: 'border-bottom-color 0.3s ease',

//     '&:focus': {
//       borderBottom: `1px solid ${tokens.colorBrandStroke1}`,
//       outline: 'none',
//     },
//     '&:hover': {
//       borderBottom: `1px solid ${tokens.colorBrandStroke1}`,
//     },
//   },
//   submitButton: {
//     padding: tokens.spacingHorizontalS,
//     backgroundColor: tokens.colorBrandBackground,
//     color: tokens.colorNeutralForegroundInverted,
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginTop: tokens.spacingVerticalS,
//     fontSize: '16px',
//     fontWeight: 'bold',
//     width: '60%',
//     marginLeft: '6em',
//   },
//   message: {
//     marginTop: tokens.spacingVerticalM,
//     fontSize: '16px',
//     color: tokens.colorNeutralForeground1,
//   },
// });

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const styles = useStyles();
//   const { token } = useParams();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword === confirmPassword) {
//       try {

//         const response = await axios.post('http://127.0.0.1:8000/reset-password', {
//           newPassword,

//         });

//         setMessage('Password updated successfully!');
//       } catch (error) {

//         setMessage('Error updating password. Please try again.');
//       }
//     } else {
//       setMessage("Passwords do not match!");
//     }
//   };

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.formWrapper}>
//         <h2 className={styles.title}>Confirm Password</h2>
//         <form onSubmit={handleSubmit} className={styles.field}>
//           <Input
//             id="new-password"
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             className={styles.input}
//           />
//           <Input
//             id="confirm-password"
//             type="password"
//             value={confirmPassword}
//             placeholder="Confirm Password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className={styles.input}
//           />
//           <Button type="submit" className={styles.submitButton}>Submit</Button>
//         </form>

//         {message && <p className={styles.message}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import axios from "axios"; // Import axios
import { makeStyles, tokens, Input, Button } from "@fluentui/react-components";
import { useParams, useNavigate } from "react-router-dom";
import "./Forget.css";

// Styles for centering and enhancing the appearance
const useStyles = makeStyles({
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
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
    width: "90%",
    marginBottom: "16px",
    border: "none",
    backgroundColor: "transparent",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    outline: "none",
    transition: "border-bottom-color 0.3s ease",

    "&:focus": {
      borderBottom: `1px solid ${tokens.colorBrandStroke1}`,
      outline: "none",
    },
    "&:hover": {
      borderBottom: `1px solid ${tokens.colorBrandStroke1}`,
    },
  },
  submitButton: {
    padding: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: tokens.spacingVerticalS,
    fontSize: "16px",
    fontWeight: "bold",
    width: "60%",
    marginLeft: "6em",
  },
  message: {
    marginTop: tokens.spacingVerticalM,
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
  },
});

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const styles = useStyles();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = newPassword;
    if (newPassword === confirmPassword) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/user/reset-password",
          {
            password,
            token,
          },
        );

        setMessage("Password updated successfully!");

        // Optionally, redirect the user after success
        setTimeout(() => {
          navigate("");
        }, 2000);
      } catch (error) {
        setMessage("Error updating password. Please try again.");
      }
    } else {
      setMessage("Passwords do not match!");
    }
  };

  return (
    <div className="Forget">
      <div className={styles.pageWrapper}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Reset Your Password</h2>
          <form onSubmit={handleSubmit} className={styles.field}>
            <input
              id="new-password"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={styles.input}
            />
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
            <Button type="submit" className={styles.submitButton}>
              Submit
            </Button>
          </form>

          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
