import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddQuestions from "./components/addQuestions";
import AllQuestions from "./components/allQuestions";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <AddQuestions /> },
    { path: "/questions", element: <AllQuestions /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
