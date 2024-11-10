import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddQuestions from "./dashboard/pages/addQuestions";
import AllQuestions from "./dashboard/pages/allQuestions";
import Layout from "./dashboard/layout/layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "dashboard",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <AllQuestions/>
        },
        {
          path: "addquestions",
          element: <AddQuestions/>
        }
      ]
    }
    // { path: "/", element: <AddQuestions /> },
    // { path: "/questions", element: <AllQuestions /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
