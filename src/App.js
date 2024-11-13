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
import IssueFixPage from "./pages/IssueFixPage"
import IssuefixDetails from "./pages/IssueFixDetails";
import Matrimony from "./pages/MatrimonyPage";
import LoginPage from "./pages/new";
import InLoopPage from "./pages/Inloop";
import NavDrawerDefaultLoop from "./components/Inloopdrawer";
import TodoPage from "./pages/Todo";
import RFQPage from "./pages/RFQ";
import TodoDrawer from "./components/TodoDrawer";
import RFQDrawer from "./components/RFQDrawer";
import CompareDrawer from "./components/CompareDrawer";
import PurchaseOrderPage from "./pages/PurchaseOrder";
import ASNPage from "./pages/ASNPage";
function App() {
  return (
    <Router basename="">
      <Routes>
        <Route path="" element={<LoginPage />} />
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
          path="/matrimony"
          element={
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <Matrimony />
                </NavDrawerDefaultAdmin>
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

<Route
          path="/issuefix"
          element={
            <CustomLayout>
              <NavDrawerDefault>
                <IssueFixPage />
              </NavDrawerDefault>
            </CustomLayout>
          }
        />

<Route
          path="/inloop"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                <InLoopPage />
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />
        <Route
          path="/todo"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                <TodoPage />
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />
        <Route
          path="/rfq"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                <RFQPage />
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />
        <Route
          path="/tododrawer"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                < TodoDrawer/>
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />
        <Route
          path="/rfqdrawer"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                < RFQDrawer/>
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />
        <Route
          path="/compare"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                < CompareDrawer/>
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />

<Route
          path="/po"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                < PurchaseOrderPage/>
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />

<Route
          path="/asn"
          element={
            <CustomLayout>
              <NavDrawerDefaultLoop>
                < ASNPage/>
              </NavDrawerDefaultLoop>
            </CustomLayout>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
