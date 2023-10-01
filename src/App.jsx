import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import useStore from "./store.js";

import Layout from "./components/Layout.jsx";

import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const auth = useStore((state) => state.auth);

  const PrivateRoute = ({ ...rest }) =>
    auth?.email ? (
      <Outlet />
    ) : (
      <Navigate to='/' state={{ from: rest.location }} replace />
    );

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/auth' element={<Auth />} />
        <Route element={<PrivateRoute />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
