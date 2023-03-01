import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Home from "./components/Home/Home";
import LoginPage from "./components/LoginPage";
import AllRecords from "./components/AllRecords";
import AllOrders from "./components/AllOrders";
import SingleRecord from "./components/SingleRecord";
import Dashboard from "./components/AdminDashboard/Dashboard";
import authTest from "./helpers/authTest";
import Cart from "./components/Cart/Cart";
import CreateUserPage from "./components/CreateUserPage/CreateUserPage";
import UserAccountPage from "./components/UserAccountPage/UserDisplay";
import Orders from "./components/AdminDashboard/Orders";
import DashboardHome from "./components/AdminDashboard/DashboardHome";
import Products from "./components/AdminDashboard/Products";
import EditProductForm from "./components/AdminDashboard/EditProductForm";
import NewProductForm from "./components/AdminDashboard/NewProductForm";
import UsersAdminView from "./components/AdminDashboard/UsersAdminView";
import UserAdminEdit from "./components/AdminDashboard/UserAdminEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "createuser",
        element: <CreateUserPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "records",
        element: <AllRecords />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "records/:id",
        element: <SingleRecord />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "orders",
        element: <AllOrders />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "orders",
        element: <AllOrders />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorBoundary />,
        loader: authTest,
        children: [
          {
            path: "",
            element: <DashboardHome />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "orders",
            element: <Orders />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "products",
            element: <Products />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users",
            element: <UsersAdminView />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users/add",
            element: <CreateUserPage />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users/:id",
            element: <UserAdminEdit />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "products/add",
            element: <NewProductForm />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "products/:id",
            element: <EditProductForm />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: "account",
        element: <UserAccountPage />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
