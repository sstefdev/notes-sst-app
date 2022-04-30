import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import { useUserData } from "lib/user-context";
import { useFormFields } from "lib/use-form-fields";
import { onError } from "lib/error-lib";
import LoaderButton from "components/loader-button";
import { UserSignupCredentials } from "types";

const Signup = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUserData();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  } as UserSignupCredentials);
  const [newUser, setNewUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () =>
    fields.email.length > 0 &&
    fields.password.length > 0 &&
    fields.password === fields.confirmPassword;

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      setIsAuthenticated(true);
      navigate("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const renderConfirmationForm = () => (
    <Form onSubmit={handleConfirmationSubmit}>
      <Form.Group controlId="confirmationCode">
        <Form.Label>Confirmation Code</Form.Label>
        <Form.Control
          autoFocus
          type="tel"
          onChange={handleFieldChange}
          value={fields.confirmationCode}
        />
        <Form.Text muted>Please check your email for the code.</Form.Text>
      </Form.Group>
      <LoaderButton
        size="lg"
        type="submit"
        isLoading={isLoading}
        disabled={!validateConfirmationForm()}
      >
        Verify
      </LoaderButton>
    </Form>
  );

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
          className="w-100"
        >
          Signup
        </LoaderButton>
      </Form>
    );
  };

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
};

export default Signup;
