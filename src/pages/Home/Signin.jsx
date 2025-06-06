import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import signinLottie from "../../assets/lotties/signin-lottie.json";
import Lottie from "lottie-react";
import SocialLogin from "../Shared/SocialLogin";
import { useLocation, useNavigate } from "react-router";

const Signin = () => {
  const { signinUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  console.log('Lacation in sign in page', location);

  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // sign-in-User
    signinUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            style={{ width: "300px" }}
            animationData={signinLottie}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Sign In now!</h1>
            <form onSubmit={handleSignin}>
              <fieldset className="fieldset">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  id="email"
                  required
                />
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  id="password"
                  required
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Sign In</button>
              </fieldset>
            </form>
            <SocialLogin from={from}></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
