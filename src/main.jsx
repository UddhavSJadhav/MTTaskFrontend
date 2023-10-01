import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='273689847847-07v9sb7oapipj0386ta3hdlq67f9lsr1.apps.googleusercontent.com'>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
