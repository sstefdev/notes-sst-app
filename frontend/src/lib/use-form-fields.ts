import { useState } from "react";

export const useFormFields = (initialState: any): [any, (e: any) => void] => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    (event: any) => {
      setValues({
        ...fields,
        [event?.target?.attributes?.id?.value]: event?.target.value,
      });
    },
  ];
};
