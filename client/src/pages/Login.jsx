import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });
  const [formMessage, setFormMessage] = useState({ type: "info", msg: "" });

  // if (location.state != null){
  //   setFormMessage({ type: "info", msg: "test" });
  // }
  //setFormMessage({ type: "info", msg: "test" });

  const handleLogin = async (e) => {
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

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  }

  return (
    <div>
      <h1>Please Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            value={loginCreds.email}
            onChange={(e) => setLoginCreds({...loginCreds, email: e.target.value})}
          />
        <br />
        <label htmlFor="password">Password:</label><br />
          <input
            type="text"
            value={loginCreds.password}
            onChange={(e) => setLoginCreds({...loginCreds, password: e.target.value})}
          />
        <br />
        <button type="submit">
          Log In
        </button>
      </form>
      <br />
      <label>New? Sign up here</label><br />
      <button onClick={handleSignup}>
        Sign Up
      </button><br />
        

      { formMessage.msg.length > 0 && (
        <p variant={formMessage.type} style={{ marginTop: "2em" }}>
          { formMessage.msg }
        </p>
      )}
    </div>
  )
};

export default Login;