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
import NavDrawerDefaultStore from "./components/StoreUserDrawer";
import TodoPage from "./pages/Todo";
import RFQPage from "./pages/RFQ";
import TodoDrawer from "./components/TodoDrawer";
import RFQDrawer from "./components/RFQDrawer";
import CompareDrawer from "./components/CompareDrawer";
import PurchaseOrderPage from "./pages/PurchaseOrder";
import ASNPage from "./pages/ASNPage";
import CustomLayoutLoop from "./components/InloopLayout"
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
import StoreHistoryNavigate from "./pages/StoreHistoryNavigate";
import UserPage from "./pages/UserPage";
import GateEntryDetails from "./pages/GateEntryDetails";
import SankeyChart from "./components/SankeyChart";
import {  Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import React, {useState,useEffect} from "react";

// const getUserRoleFromToken = () => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       return decodedToken.role; 
//     } catch (error) {
//       console.error("Error decoding token", error);
//       return null;
//     }
//   }
//   return null;
// };

// const userRole = getUserRoleFromToken();

// console.log("roleAPP",userRole);

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
        <Route path="" element={<LoginPage setRoleFromChild={setRoleFromChild}/>} />
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route
          path="dashboard"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
              <NavDrawerDefault>
                <Dashboard />
              </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
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
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <UserApprove />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route path="form/:token" element={<EmployeeForm />} />
        <Route
          path="/approvepage"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <ApprovePage />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/gate-entry-det"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <GateEntryDetails />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route
          path="/admin"
          element={
            userRole === 'admin' ? (
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <Admin />
              </NavDrawerDefaultAdmin>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route
          path="/llm"
          element={
            userRole === 'admin' ? (
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <LLMPage />
              </NavDrawerDefaultAdmin>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
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
            userRole === 'admin' ? (
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <BlobPage />
              </NavDrawerDefaultAdmin>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route
          path="/ai"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
              <NavDrawerDefault>
                <AIPage />
              </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route
          path="/aidetail"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <AIDetailPage />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route
          path="/aidetail"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
              <NavDrawerDefault>
                <AIDetailPage />
              </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

        <Route
          path="/matrimony"
          element={
            userRole === 'admin' ? (
              
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <Matrimony />
                </NavDrawerDefaultAdmin>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/user"
          element={
            userRole === 'admin' ? (
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <UserPage />
                </NavDrawerDefaultAdmin>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route
          path="/issuefixdetails"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
              <NavDrawerDefault>
                <IssuefixDetails />
              </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/issuefix"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <IssueFixPage />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
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
                < TodoDrawer/>
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/rfqdrawer"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                < RFQDrawer/>
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/compare"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                < CompareDrawer/>
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/po"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                < PurchaseOrderPage/>
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/asn"
          element={
            <CustomLayoutLoop>
              <NavDrawerDefaultLoop>
                < ASNPage/>
              </NavDrawerDefaultLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/supplier"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                < SupplierPage/>
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
                <ASNCreate/>
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/preview"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <PreviewPage/>
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/asndrawer"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNDrawerPage/>
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/asnstatus"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNStatus/>
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/asnshipment"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNShipmentDrawer/>
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/asnshipmentpage"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <ASNShipmentDrawerPage/>
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/ack"
          element={
            <CustomLayoutLoop>
              <NavDrawerQuotationLoop>
                <AckPage/>
              </NavDrawerQuotationLoop>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/storeuser"
          element={
            userRole === 'storeuser' ? (
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreUser />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
         <Route
          path="/storedetails"
          element={
            userRole === 'storeuser' ? (
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreUserPage />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />
        <Route
          path="/summary"
          element={
              userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <SummaryPage />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/gateentry"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <GateEntry />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/history"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <History />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/historypage"
          element={
            userRole === 'invoice manager' ? (
            <CustomLayout>
               <NavDrawerDefault>
                <HistoryDetails />
                </NavDrawerDefault>
            </CustomLayout>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/storehistory"
          element={
            userRole === 'storeuser' ? (
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreHistory />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/storehistorydetails"
          element={
            userRole === 'storeuser' ? (
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreHistoryDetails />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/storedashboard"
          element={
            userRole === 'storeuser' ? (
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreTagCounters />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />

<Route
          path="/storehistorypage"
          element={
            userRole === 'storeuser' ? (
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreHistoryNavigate />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
            ) : (
              <Navigate to="/unauthorized" />  
            )
          }
        />




      </Routes>


    </Router>
  );
}

export default App;
