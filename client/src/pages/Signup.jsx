import { useState } from "react";
import Cookie from "js-cookie";

const Signup = () => {
  const [SignupCreds, setSignupCreds] = useState({ fname: "", lname: "", email: "", password: "" });
  const [formMessage, setFormMessage] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: "", msg: "" });
    const authCheck = await fetch("/api/user/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginCreds)
    });
    const authResult = await authCheck.json();

    // If the login was good, save the returned token as a cookie
    if (authResult.result === "success") {
      Cookie.set("auth-token", authResult.token);
      setFormMessage({ type: "success", msg: "Your login was successful. Proceed!" });
    } else {
      setFormMessage({ type: "danger", msg: "We could not log you in with the credentials provided." });
    };
    setLoginCreds({ email: "", password: "" });
  };
};

export default Signup;