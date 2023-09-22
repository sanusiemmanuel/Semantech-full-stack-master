import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";

const Login = (props) => {
    const { data: layoutData, dispatch: layoutDispatch } = useContext(
      LayoutContext
    );
  
    const [data, setData] = useState({
      email: "",
      password: "",
      error: false,
      loading: true,
    });
  
    const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;
  
    const formSubmit = async () => {
      setData({ ...data, loading: true });
      try {
        let responseData = await loginReq({
          email: data.email,
          password: data.password,
        });
        if (responseData.error) {
          setData({
            ...data,
            loading: false,
            error: responseData.error,
            password: "",
          });
        } else if (responseData.token) {
          setData({ email: "", password: "", loading: false, error: false });
          localStorage.setItem("jwt", JSON.stringify(responseData));
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Fragment>
        <div className="text-center text-2xl mb-6 text-gray-900">Welcome Back!</div>
        {layoutData.loginSignupError ? (
          <div className="bg-red-100 py-2 px-4 rounded text-red-600">
            You need to login to access certain features. Don't have an account? Sign up now.
          </div>
        ) : (
          ""
        )}
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-800">
              Username or Email Address
              <span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, email: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.email}
              type="text"
              id="name"
              className={`${
                !data.error ? "" : "border-red-500"
              } px-4 py-2 focus:outline-none border rounded`}
            />
            {!data.error ? "" : alert(data.error)}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-800">
              Password<span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.password}
              type="password"
              id="password"
              className={`${
                !data.error ? "" : "border-red-500"
              } px-4 py-2 focus:outline-none border rounded`}
            />
            {!data.error ? "" : alert(data.error)}
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center text-gray-800">
              <input
                type="checkbox"
                id="rememberMe"
                className="px-4 py-2 focus:outline-none border mr-1"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember Me
                <span className="text-sm text-gray-600">*</span>
              </label>
            </div>
            <a className="block text-gray-600 hover:underline" href="/">
              Forgot Your Password?
            </a>
          </div>
          <div
            onClick={(e) => formSubmit()}
            style={{ background: "#000080" }}
            className="font-medium px-4 py-2 text-white text-center cursor-pointer rounded hover:bg-gray-800"
          >
            Log In
          </div>
        </form>
      </Fragment>
    );
  };
  

export default Login;
