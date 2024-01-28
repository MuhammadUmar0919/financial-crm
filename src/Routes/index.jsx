// react import
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// components import
import Loadable from "Components/Loadable"
// routes import
import ProtectedRoute from "./ProtectedRoute"
// error pages import
import Error500 from "Pages/ErrorPages/Erro500"
import Error404 from "Pages/ErrorPages/Error404"
import Error503 from "Pages/ErrorPages/Error503"
import Error401 from "Pages/ErrorPages/Error401"
// layout import
import UserLayout from "Layout/UserLayout"
import BlankLayout from "@core/layouts/BlankLayout"
// auth pages import
import LoginV1 from "Pages/auth/login-v1"
import LoginV2 from "Pages/auth/login-v2"
import RegisterV1 from "Pages/auth/register-v1"
import RegisterV2 from "Pages/auth/register-v2"
import TwoStepsV1 from "Pages/auth/two-steps-v1"
import TwoStepsV2 from "Pages/auth/two-steps-v2"
import VerifyEmailV1 from "Pages/auth/verify-email-v1"
import VerifyEmailV2 from "Pages/auth/verify-email-v2"
import LoginWithAppBar from "Pages/auth/login-with-appbar"
import ResetPasswordV1 from "Pages/auth/reset-password-v1"
import ResetPasswordV2 from "Pages/auth/reset-password-v2"
import ForgotPasswordV1 from "Pages/auth/forgot-password-v1"
import ForgotPasswordV2 from "Pages/auth/forgot-password-v2"
import RegisterMultiSteps from "Pages/auth/register-multi-steps"

// pages with lazy imports
const InvoiceCreate = Loadable(
  React.lazy(() => import("Pages/apps/invoice/add"))
)
const InvoiceEdit = Loadable(
  React.lazy(() => import("Pages/apps/invoice/edit"))
)
const InvoicePrint = Loadable(
  React.lazy(() => import("Pages/apps/invoice/print"))
)
const Analytics = Loadable(
  React.lazy(() => import("Pages/dashboards/analytics"))
)
const Ecommerce = Loadable(
  React.lazy(() => import("Pages/dashboards/ecommerce"))
)
const HelpCenter = Loadable(
  React.lazy(() => import("Pages/settings/help-center"))
)
const InvoicePreview = Loadable(
  React.lazy(() => import("Pages/apps/invoice/preview"))
)
const UserProfile = Loadable(
  React.lazy(() => import("Pages/UserProfile/UserProfile"))
)
const AccountBilling = Loadable(
  React.lazy(() => import("Pages/AccountSettings/TabBilling"))
)
const AccountSecurity = Loadable(
  React.lazy(() => import("Pages/AccountSettings/TabSecurity"))
)
const AccountConnections = Loadable(
  React.lazy(() => import("Pages/AccountSettings/TabConnections"))
)
const AccountNotifications = Loadable(
  React.lazy(() => import("Pages/AccountSettings/TabNotifications"))
)
const Login = Loadable(React.lazy(() => import("Pages/Login")))
const Taxes = Loadable(React.lazy(() => import("Pages/TaxesPage")))
const Clients = Loadable(React.lazy(() => import("Pages/Clients")))
const Admins = Loadable(React.lazy(() => import("Pages/AdminPage")))
const Roles = Loadable(React.lazy(() => import("Pages/apps/roles")))
const FAQ = Loadable(React.lazy(() => import("Pages/settings/faq")))
const Services = Loadable(React.lazy(() => import("Pages/Services")))
const Status = Loadable(React.lazy(() => import("Pages/StatusPage")))
const Themes = Loadable(React.lazy(() => import("Pages/ThemesPage")))
const View = Loadable(React.lazy(() => import("views/apps/user/view")))
const Invoice = Loadable(React.lazy(() => import("Pages/InvoicePage")))
const PaymentMode = Loadable(React.lazy(() => import("Pages/PaymentPage")))
const Account = Loadable(React.lazy(() => import("Pages/AccountSettings")))
const Employees = Loadable(React.lazy(() => import("Pages/EmployeesPage")))
const Pricing = Loadable(React.lazy(() => import("Pages/settings/pricing")))
const DashboardCrm = Loadable(React.lazy(() => import("Pages/dashboards/crm")))
const Permissions = Loadable(React.lazy(() => import("Pages/apps/permissions")))

const protectedRoutes = [
  {
    component: Roles,
    subject: "access-control",
    path: "/access-control/roles",
  },
  {
    component: Account,
    subject: "user-settings",
    path: "/user-settings/account",
  },
  {
    subject: "user-settings",
    component: AccountSecurity,
    path: "/user-settings/security",
  },
  {
    subject: "user-settings",
    component: AccountBilling,
    path: "/user-settings/billing",
  },
  {
    subject: "user-settings",
    component: AccountNotifications,
    path: "/user-settings/notifications",
  },
  {
    subject: "user-settings",
    component: AccountConnections,
    path: "/user-settings/connections",
  },
  {
    component: UserProfile,
    subject: "user-settings",
    path: "/user-settings/profile",
  },
  {
    component: Pricing,
    subject: "public-details",
    path: "/public-details/pricing",
  },
  {
    subject: "invoice",
    component: InvoicePreview,
    path: "/invoice/preview/:id",
  },
  {
    component: Permissions,
    subject: "access-control",
    path: "/access-control/permissions",
  },
  {
    component: HelpCenter,
    subject: "public-settings",
    path: "/public-settings/help-center",
  },
  {
    component: Services,
    subject: "service",
    path: "/services",
  },
  {
    component: Status,
    subject: "public-settings",
    path: "/public-settings/statuses",
  },
  {
    component: PaymentMode,
    subject: "public-settings",
    path: "/public-settings/payment-mode",
  },
  { path: "/admins", component: Admins, subject: "admins" },
  { path: "/clients", component: Clients, subject: "clients" },
  { path: "/invoice", component: Invoice, subject: "invoice" },
  { path: "/", component: DashboardCrm, subject: "dashboards" },
  { path: "/:role/view/:id", component: View, subject: "dashboards" },
  { path: "/employees", component: Employees, subject: "employees" },
  { path: "/analytics", component: Analytics, subject: "dashboards" },
  { path: "/ecommerce", component: Ecommerce, subject: "dashboards" },
  { path: "/public-settings/taxes", component: Taxes, subject: "public-settings" },
  { path: "/invoice/create", component: InvoiceCreate, subject: "invoice" },
  { path: "/invoice/edit/:id", component: InvoiceEdit, subject: "invoice" },
  { path: "/public-settings/themes", component: Themes, subject: "public-settings" },
  { path: "/public-settings/faq", component: FAQ, subject: "public-settings" },
  // { path: "/invoice/print/:id", component: InvoicePrint, subject: "invoice" },
]

const authRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/invoice/print/:id",
    component: InvoicePrint,
  },
  {
    path: "/auth/forgot-password-v1",
    component: ForgotPasswordV1,
  },
  {
    path: "/auth/forgot-password-v1",
    component: ForgotPasswordV1,
  },
  {
    path: "/auth/forgot-password-v2",
    component: ForgotPasswordV2,
  },
  {
    path: "/auth/login-v1",
    component: LoginV1,
  },
  {
    path: "/auth/login-v2",
    component: LoginV2,
  },
  {
    path: "/auth/login-with-appbar",
    component: LoginWithAppBar,
  },
  {
    path: "/auth/register-multi-steps",
    component: RegisterMultiSteps,
  },
  {
    path: "/auth/register-v1",
    component: RegisterV1,
  },
  {
    path: "/auth/register-v2",
    component: RegisterV2,
  },
  {
    path: "/auth/reset-password-v1",
    component: ResetPasswordV1,
  },
  {
    path: "/auth/reset-password-v2",
    component: ResetPasswordV2,
  },
  {
    path: "/auth/two-steps-v1",
    component: TwoStepsV1,
  },
  {
    path: "/auth/two-steps-v2",
    component: TwoStepsV2,
  },
  {
    path: "/auth/verify-email-v1",
    component: VerifyEmailV1,
  },
  {
    path: "/auth/verify-email-v2",
    component: VerifyEmailV2,
  },
]

const RouterPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* / Public Routes / */}
        {authRoutes.map(({ path, component: Component }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <BlankLayout>
                <Component />
              </BlankLayout>
            }
          />
        ))}

        {/* Protected Routes */}
        <Route element={<UserLayout />}>
          {protectedRoutes.map(({ subject, path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute subject={subject} component={Component} />
              }
            />
          ))}
        </Route>

        {/* Error Routes */}
        <Route path="*" element={<Error404 />} />
        <Route path="/server-error" element={<Error500 />} />
        <Route path="/unauthorized" element={<Error401 />} />
        <Route path="/service-unvailable" element={<Error503 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterPage
