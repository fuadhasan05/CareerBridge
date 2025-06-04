import Lottie from "lottie-react";
import React, { use } from "react";
import registerLottie from "../../assets/lotties/register-lottie.json";
import { AuthContext } from "../../context/AuthContext";
import SocialLogin from "../Shared/SocialLogin";


const Register = () => {

    const {createUser} = use(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value
        console.log(email, password);

        // createUser
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
           })
            .catch(error => {
                console.error("Error creating user:", error);
            });
        }       

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{width: '300px'}} animationData={registerLottie} loop={true}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label" htmlFor="email">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  id="email"
                  required
                />
                <label className="label" htmlFor="password">Password</label>
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
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
