import React, { useState } from "react";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    const endpoint = isLogin
      ? "login"
      : "signup";

    try {
      const response = await fetch(
        `http://localhost:3000/auth/${endpoint}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);

        onLogin();
      } else {
        setMessage("Signup successful. Please login.");

        setIsLogin(true);

        setPassword("");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server is not running");
    }
  }

  return (
    <div className="auth-container" >

      <form className="auth-box" onSubmit={handleSubmit}>

        <h2>
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <button
          type="button"
          className="auth-switch"
          onClick={() => {
            setIsLogin((prev) => !prev);
            setMessage("");
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>

      </form>

    </div>
  );
}

export default Auth;