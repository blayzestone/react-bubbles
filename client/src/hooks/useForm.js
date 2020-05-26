import { useState } from "react";

export const useForm = (state) => {
  const [values, setValues] = useState(state);

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    return setValues({
      ...values,
      [name]: value,
    });
  };

  const clearForm = () => setValues(state);

  return [values, changeHandler, clearForm];
};
