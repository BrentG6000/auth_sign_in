import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupCreds, setSignupCreds] = useState({ fname: "", lname: "", email: "", password: "" });
  const [formMessage, setFormMessage] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: "", msg: "" });
    const authCheck = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupCreds)
    });

    // If the login was good, save the returned token as a cookie
    if (authCheck.status === 200) {
      navigate("/login", {
        state: {
          message: "Your account is created. Please log in."
        }
      });

    } else {
      setFormMessage({ type: "danger", msg: "We could not log you in with the credentials provided." });
    };
    setSignupCreds({ email: "", password: "" });
  };

  return (
    <div>
      <h1>Please Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name</label><br />
        <input
          type="text"
          value={signupCreds.fname}
          onChange={(e) => setSignupCreds({...signupCreds, fname: e.target.value})}
        /><br />
        <label htmlFor="lname">Last Name</label><br />
        <input
          type="text"
          value={signupCreds.lname}
          onChange={(e) => setSignupCreds({...signupCreds, lname: e.target.value})}
        /><br />
        <label htmlFor="email">Email</label><br />
        <input
          type="email"
          value={signupCreds.email}
          onChange={(e) => setSignupCreds({...signupCreds, email: e.target.value})}
        /><br />
        <label htmlFor="password">Password</label><br />
        <input
          type="text"
          value={signupCreds.password}
          onChange={(e) => setSignupCreds({...signupCreds, password: e.target.value})}
        /><br /><br />
        <button type="submit">
          Sign In
        </button>
      </form><br />

      { formMessage.msg.length > 0 && (
        <alert variant={formMessage.type} style={{ marginTop: "2em" }}>
          { formMessage.msg }
        </alert>
      )}
    </div>
  )
};

export default Signup;