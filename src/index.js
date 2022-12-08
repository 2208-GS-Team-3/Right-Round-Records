import * as React from "react";
import * as ReactDOM from "react-dom/client";
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
        path: "records",
        element: <AllRecords />,
        errorElement: <ErrorBoundary />,
        children: [],
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
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
