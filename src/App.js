import "./App.css";
import CustomLayout from "./components/layout";
import NavDrawerDefault from "./components/drawer";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import IssueFixPage from "./pages/IssueFixPage";
import IssuefixDetails from "./pages/IssueFixDetails";
import Matrimony from "./pages/MatrimonyPage";
import LoginPage from "./pages/new";
import InLoopPage from "./pages/Inloop";
import NavDrawerDefaultLoop from "./components/Inloopdrawer";
import NavDrawerDefaultStore from "./components/StoreUserDrawer";
import TodoPage from "./pages/Todo";
import RFQPage from "./pages/RFQ";
import TodoDrawer from "./components/TodoDrawer";
import RFQDrawer from "./components/RFQDrawer";
import CompareDrawer from "./components/CompareDrawer";
import PurchaseOrderPage from "./pages/PurchaseOrder";
import ASNPage from "./pages/ASNPage";
import CustomLayoutLoop from "./components/InloopLayout";
import SupplierPage from "./pages/SupplierPage";
import NavDrawerQuotationLoop from "./components/SupplierLayout";
import QuotationDrawerPage from "./pages/QuotationDrawerPage";
import ASNCreate from "./pages/ASNCreate";
import PreviewPage from "./pages/PreviewPage";
import ASNDrawerPage from "./pages/ASNDrawerPage";
import ASNStatus from "./pages/ASNStatus";
import ASNShipmentDrawer from "./components/ASNShipmentDrawer";
import ASNShipmentDrawerPage from "./pages/ASNShipmentDrawerPage";
import AckPage from "./pages/AckPage";
import StoreUser from "./pages/storeUser";
import StoreUserPage from "./pages/storeuserdetail";
import SummaryPage from "./pages/Summary";
import GateEntry from "./pages/GateEntry";
import History from "./pages/History";
import HistoryDetails from "./pages/HistoryDetails";
import StoreHistoryDetails from "./pages/StoreHistoryDetails";
import StoreHistory from "./pages/StoreHistory";
import StoreTagCounters from "./pages/StoreDashboard";
import UserPage from "./pages/UserPage";
import GateEntryDetails from "./pages/GateEntryDetails";

import { jwtDecode } from "jwt-decode";
import OpenPo from "./pages/OpenPo";
import StoreOpenPO from "./pages/StoreOpenPo";
import React, { useState, useEffect } from "react";
import StoreOpenPODetails from "./pages/StoreOpenPODetails";
import OpenPODetails from "./pages/OpenPoDetails";
import DashboardDetails from "./pages/DashboardDetails";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserRoleFromToken = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
      } catch (error) {
        console.error("Error decoding token", error);
        return null;
      }
    }
    return null;
  };

  // Effect to fetch role on app load or token change
  useEffect(() => {
    const roleFromToken = getUserRoleFromToken();
    setUserRole(roleFromToken);
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ allowedRoles, userRole, children }) => {
    return allowedRoles.includes(userRole) ? (
      children
    ) : (
      <Navigate to="/unauthorized" />
    );
  };

  // Function to update role dynamically (for child components like Login)
  const setRoleFromChild = (role) => {
    setUserRole(role);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router basename="">
      <Routes>
        <Route
          path=""
          element={<LoginPage setRoleFromChild={setRoleFromChild} />}
        />
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <Dashboard />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
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
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <UserApprove />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/DashboardDetails"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <DashboardDetails />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/openpo"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <OpenPo />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/openpodet/:po_number" element={<OpenPODetails />} />
        <Route
          path="/openpodet"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <OpenPODetails />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/openpodet/:po_number" element={<OpenPODetails />} />
        <Route path="form/:token" element={<EmployeeForm />} />
        <Route
          path="/approvepage"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <ApprovePage />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gateentrydet"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <GateEntryDetails />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefaultAdmin>
                  <Admin />
                </NavDrawerDefaultAdmin>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/llm"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefaultAdmin>
                  <LLMPage />
                </NavDrawerDefaultAdmin>
              </CustomLayout>
            </ProtectedRoute>
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
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefaultAdmin>
                  <BlobPage />
                </NavDrawerDefaultAdmin>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <AIPage />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/aidetail"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <AIDetailPage />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-detail"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <DashboardDetails />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/aidetail"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <AIDetailPage />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/matrimony"
          element={
            <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
              <CustomLayout>
                <NavDrawerDefaultAdmin>
                  <Matrimony />
                </NavDrawerDefaultAdmin>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["admin"]} userRole={userRole}>
              <CustomLayout>
                <NavDrawerDefaultAdmin>
                  <UserPage />
                </NavDrawerDefaultAdmin>
              </CustomLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/issuefixdetails"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <IssuefixDetails />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/issuefix"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <IssueFixPage />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inloop"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <InLoopPage />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/todo"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <TodoPage />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/rfq"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <RFQPage />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/tododrawer"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <TodoDrawer />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/rfqdrawer"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <RFQDrawer />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/compare"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <CompareDrawer />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/po"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <PurchaseOrderPage />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/asn"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                <ASNPage />
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/supplier"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <SupplierPage />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/quotaiondrawer"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <QuotationDrawerPage />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/asncreate"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNCreate />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/preview"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <PreviewPage />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/asndrawer"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNDrawerPage />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/asnstatus"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNStatus />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/asnshipment"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNShipmentDrawer />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/asnshipmentpage"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNShipmentDrawerPage />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

        <Route
          path="/ack"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <AckPage />
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/storeuser"
          element={
            <ProtectedRoute allowedRoles={["storeuser"]} userRole={userRole}>
              <CustomLayoutLoop>
                <NavDrawerDefaultStore>
                  <StoreUser />
                </NavDrawerDefaultStore>
              </CustomLayoutLoop>
            </ProtectedRoute>
          }
        />

        <Route
          path="/storeopenpo"
          element={
            <ProtectedRoute allowedRoles={["storeuser"]} userRole={userRole}>
              <CustomLayoutLoop>
                <NavDrawerDefaultStore>
                  <StoreOpenPO />
                </NavDrawerDefaultStore>
              </CustomLayoutLoop>
            </ProtectedRoute>
          }
        />
        <Route
          path="/storeopenpodet"
          element={
            <ProtectedRoute allowedRoles={["storeuser"]} userRole={userRole}>
              <CustomLayoutLoop>
                <NavDrawerDefaultStore>
                  <StoreOpenPODetails />
                </NavDrawerDefaultStore>
              </CustomLayoutLoop>
            </ProtectedRoute>
          }
        />
        <Route
          path="/storedetails"
          element={
            <ProtectedRoute allowedRoles={["storeuser"]} userRole={userRole}>
              <CustomLayoutLoop>
                <NavDrawerDefaultStore>
                  <StoreUserPage />
                </NavDrawerDefaultStore>
              </CustomLayoutLoop>
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <SummaryPage />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gateentry"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <GateEntry />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <History />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/historypage"
          element={
            <ProtectedRoute
              allowedRoles={["invoice manager"]}
              userRole={userRole}
            >
              <CustomLayout>
                <NavDrawerDefault>
                  <HistoryDetails />
                </NavDrawerDefault>
              </CustomLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/storehistory"
          element={
            <ProtectedRoute allowedRoles={["storeuser"]} userRole={userRole}>
              <CustomLayoutLoop>
                <NavDrawerDefaultStore>
                  <StoreHistory />
                </NavDrawerDefaultStore>
              </CustomLayoutLoop>
            </ProtectedRoute>
          }
        />

        <Route
          path="/storehistorydetails"
          element={
            <ProtectedRoute allowedRoles={["storeuser"]} userRole={userRole}>
              <CustomLayoutLoop>
                <NavDrawerDefaultStore>
                  <StoreHistoryDetails />
                </NavDrawerDefaultStore>
              </CustomLayoutLoop>
            </ProtectedRoute>
          }
        />

        <Route
          path="/storedashboard"
          element={
            <ProtectedRoute allowedRoles={["storeuser"]} userRole={userRole}>
              <CustomLayoutLoop>
                <NavDrawerDefaultStore>
                  <StoreTagCounters />
                </NavDrawerDefaultStore>
              </CustomLayoutLoop>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
