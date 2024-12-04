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
          path="/user"
          element={
            <CustomLayout>
              <NavDrawerDefaultAdmin>
                <UserPage />
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
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreUser />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
          }
        />
         <Route
          path="/storedetails"
          element={
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreUserPage />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
          }
        />
        <Route
          path="/summary"
          element={
            <CustomLayout>
               <NavDrawerDefault>
                <SummaryPage />
                </NavDrawerDefault>
            </CustomLayout>
          }
        />

<Route
          path="/gateentry"
          element={
            <CustomLayout>
               <NavDrawerDefault>
                <GateEntry />
                </NavDrawerDefault>
            </CustomLayout>
          }
        />

<Route
          path="/history"
          element={
            <CustomLayout>
               <NavDrawerDefault>
                <History />
                </NavDrawerDefault>
            </CustomLayout>
          }
        />

<Route
          path="/historypage"
          element={
            <CustomLayout>
               <NavDrawerDefault>
                <HistoryDetails />
                </NavDrawerDefault>
            </CustomLayout>
          }
        />

<Route
          path="/storehistory"
          element={
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreHistory />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/storehistorydetails"
          element={
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreHistoryDetails />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/storedashboard"
          element={
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreTagCounters />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
          }
        />

<Route
          path="/storehistorypage"
          element={
            <CustomLayoutLoop>
               <NavDrawerDefaultStore>
                <StoreHistoryNavigate />
                </NavDrawerDefaultStore>
            </CustomLayoutLoop>
          }
        />


      </Routes>


    </Router>
  );
}

export default App;
