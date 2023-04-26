import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Login = () => {
  const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });
  const [formMessage, setFormMessage] = useState({ type: "", msg: "" });

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
    const navigate = useNavigate;
    navigate("/signup");
  }

  return (
    <div>
      <h1>Please Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:
          <input
            type="email"
            value={loginCreds.email}
            onChange={(e) => setLoginCreds({...loginCreds, email: e.target.value})}
          />
        </label>
        <label>Password:
          <input
            type="text"
            value={loginCreds.password}
            onChange={(e) => setLoginCreds({...loginCreds, password: e.target.value})}
          />
        </label>
        <button type="submit" />
      </form>
      <p>New? Sign up here</p>
      <button onClick={handleSignup}/>

      { formMessage.msg.length > 0 && (
        <alert variant={formMessage.type} style={{ marginTop: "2em" }}>
          { formMessage.msg }
        </alert>
      )}
    </div>
  )
};

export default Login;