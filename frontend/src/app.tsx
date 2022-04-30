/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Spinner } from "react-bootstrap";

import { useUserData } from "lib/user-context";
import { CognitoUser } from "types";
import Routes from "routes";

const App = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    setIsLoading,
    isLoading,
  } = useUserData();

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUser({} as CognitoUser);
    await Auth.signOut();
    navigate("/login");
  };

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return !isLoading ? (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Link to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <div className="d-flex justify-content-end w-100">
          {isAuthenticated ? (
            <>
              <Link to="/settings" className="nav-link text-info">
                Settings
              </Link>
              <Button className="btn-dark" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Navbar.Collapse className="justify-content-end">
              <Nav activeKey={window.location.pathname}>
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </Nav>
            </Navbar.Collapse>
          )}
        </div>
      </Navbar>
      <Routes />
    </div>
  ) : (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Spinner animation="grow" role="status" size="sm" className="mr-2" />
      <Spinner animation="grow" role="status" size="sm" className="mr-2" />
      <Spinner animation="grow" role="status" size="sm" />
    </div>
  );
};

export default App;
