import React from "react";
import ReactDOM from "react-dom/client";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { requireAuth } from "./utils/auth";
import Login from "./pages/login";
import Error, { Error2 } from "./utils/error";
import Register from "./pages/regist";
import Resetpass from "./pages/passreset";
import Mainp from "./pages/main";
import Profpage from "./pages/profilepage";
import Profsearch from "./pages/profilefromse";
import Updatepr from "./pages/profupdate";
import Viewprof from "./pages/viewprof";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<Error2 />}>
      <Route path="*" element={<Error />} />
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<Resetpass />} />
      <Route
        path="/mainP"
        element={<Mainp />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/profile"
        element={<Profpage />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/profilesearch"
        element={<Profsearch />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/profileUpdate"
        element={<Updatepr />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/viewprof"
        element={<Viewprof />}
        loader={async () => await requireAuth()}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  /*<Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<Resetpass />} />
      <Route path="/mainP" element={<Mainp />} />

      <Route path="*" element={<Error />} />
    </Routes>
  </Router>*/
  <RouterProvider router={router} />
);
