import logo from "./logo.svg";
import "./App.css";
import CustomLayout from "./components/layout";
import NavDrawerDefault from "./components/drawer";
import Sample from "./components/sample";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Employee from "./pages/Employee";
import EmployeeForm from "./pages/employeeform";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import UserApprove from "./pages/ApprovePage";
import ApprovePage from "./pages/ApproveDetails";
import NavDrawerDefaultAdmin from "./components/admindrawer";
import Admin from "./pages/UsagePage";
import LLMPage from "./pages/LLMPage";
import DocumentPage from "./pages/Document";
import BlobPage from "./pages/BlobPage";
import AIPage from "./pages/AIindentified";
import AIDetailPage from "./pages/AIindentifieddetails";
import IssuefixPage from "./pages/IssueFixPage";
import IssuefixDetails from "./pages/IssueFixDetails";
function App() {
  return (
    <Router basename="">
      <Routes>
        <Route path="" element={<Login />} />
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route
          path="dashboard"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <Dashboard />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route
          path="employee"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <Employee />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <CustomLayout>
              <ForgotPassword />
            </CustomLayout>
          }
        />
        <Route
          path="/resetPassword/resetPwd/:token"
          element={
            <CustomLayout>
              <ResetPassword />
            </CustomLayout>
          }
        />
        <Route
          path="/reset"
          element={
            <CustomLayout>
              <ResetPassword />
            </CustomLayout>
          }
        />
        <Route
          path="/approve"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <UserApprove />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route path="form/:token" element={<EmployeeForm />} />
        <Route
          path="/approvepage"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <ApprovePage />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <Admin />
              </NavDrawerDefaultAdmin>
            </CustomLayout>
          }
        />
        <Route
          path="/llm"
          element={
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <LLMPage />
              </NavDrawerDefaultAdmin>
            </CustomLayout>
          }
        />
        <Route
          path="/document"
          element={
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <DocumentPage />
              </NavDrawerDefaultAdmin>
            </CustomLayout>
          }
        />
        <Route
          path="/blob"
          element={
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <BlobPage />
              </NavDrawerDefaultAdmin>
            </CustomLayout>
          }
        />
        <Route
          path="/ai"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <AIPage />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route
          path="/aidetail"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <AIDetailPage />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />

        <Route
          path="/issuefix"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <IssuefixPage />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
        <Route
          path="/issuefixdetails"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <IssuefixDetails />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
