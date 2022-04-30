import { Auth } from "aws-amplify";

import { onError } from "lib/error-lib";
import { UserCredentials } from "types";

interface Props {
  fields: UserCredentials;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const loginUser = async ({ fields, setIsAuthenticated }: Props) => {
  try {
    const promise = await Auth.signIn(fields.email, fields.password);
    const data = await promise;
    setIsAuthenticated(true);

    return data;
  } catch (e: any) {
    onError(e);
  }
};
