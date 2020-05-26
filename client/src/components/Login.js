import React, { useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useForm } from "../hooks/useForm";

const Login = (props) => {
  const initialFormValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues, clearForm] = useForm(initialFormValues);

  const submitLogin = (evt) => {
    evt.preventDefault();

    axiosWithAuth()
      .post("/login", formValues)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/home");
      })
      .catch((err) => {
        clearForm();
        console.log(err);
      });
  };

  return (
    <form onSubmit={submitLogin}>
      <label>
        Username:
        <input
          onChange={setFormValues}
          type="text"
          name="username"
          value={formValues.username}
        />
      </label>
      <label>
        password:
        <input
          onChange={setFormValues}
          type="password"
          name="password"
          value={formValues.password}
        />
      </label>
      <button>Log in</button>
    </form>
  );
};

export default Login;
