import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddQuestions from "./dashboard/pages/addQuestions";
import AllQuestions from "./dashboard/pages/allQuestions";
import Layout from "./dashboard/layout/layout";
import { ToastContainer } from "react-toastify";
import UpdateQuestion from "./dashboard/pages/updateQuestion";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <AllQuestions />,
        },
        {
          path: "addquestions",
          element: <AddQuestions />,
        },
        {
          path: "updatequestions",
          element: <UpdateQuestion />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
