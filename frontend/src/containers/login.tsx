import { Form } from "react-bootstrap";

import { loginUser } from "utils/login-user";
import { useFormFields } from "lib/use-form-fields";
import { useUserData } from "lib/user-context";
import LoaderButton from "components/loader-button";
import { UserCredentials } from "types";

const initalUserCredentials: UserCredentials = {
  email: "",
  password: "",
};

const Login = () => {
  const { isLoading, setUser, setIsAuthenticated, setIsLoading } =
    useUserData();
  const [fields, handleFieldChange] = useFormFields(initalUserCredentials);

  const validateForm = () =>
    fields?.email.length > 0 && fields?.password.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const user = await loginUser({
      fields,
      setIsAuthenticated,
    });

    if (user) {
      setUser(user);
    }

    setIsLoading(false);
    handleFieldChange(initalUserCredentials);
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields?.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields?.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          size="lg"
          type="submit"
          className="w-100"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
};

export default Login;
