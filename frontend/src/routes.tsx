import { cloneElement } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useUserData } from "lib/user-context";
import NotFound from "containers/not-found";
import Home from "containers/home";
import Login from "containers/login";
import Signup from "containers/signup";
import NewNote from "containers/new-note";
import Notes from "containers/notes";
import Settings from "containers/settings";
import { querystring } from "utils/query-string";

const RoutesComponent = () => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useUserData();
  const redirect = querystring("redirect");

  const privateRoute = (props: JSX.Element) =>
    isAuthenticated ? (
      props
    ) : (
      <Navigate to={`/login?redirect=${pathname}${search}`} />
    );

  const publicRoute = (props: JSX.Element) =>
    !isAuthenticated ? (
      cloneElement(props)
    ) : (
      <Navigate to={redirect ? redirect : "/"} />
    );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={publicRoute(<Login />)} />
      <Route path="/signup" element={publicRoute(<Signup />)} />
      <Route path="/notes/new" element={privateRoute(<NewNote />)} />
      <Route path="/notes/:id" element={privateRoute(<Notes />)} />
      <Route path="/settings" element={privateRoute(<Settings />)} />
      <Route element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
