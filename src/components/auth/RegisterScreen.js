import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../customHook/useForm";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const stateui = useSelector((state) => state.ui);
  const { msgError } = stateui;

  const [values, handleInputChange] = useForm({
    name: "Maxi",
    email: "mazi_all@hotmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, password2);
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "name is required",
      });
      return false;
    } else if (!regexEmail.test(email.trim())) {
      dispatch(setError("email is required"));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "email is required",
      });
      return false;
    } else if (!password || !password2) {
      dispatch(setError("password is required"));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password is required",
      });
      return false;
    } else if (password !== password2) {
      dispatch(setError("the passowrds are different"));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "the passowrds are different",
      });
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleSubmit}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Username"
          name="name"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already Registered?
        </Link>
      </form>
    </div>
  );
};

export default RegisterScreen;
