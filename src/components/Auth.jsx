import React, { useState } from "react";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    const endpoint = isLogin
      ? "http://localhost:3000/auth/login"
      : "http://localhost:3000/auth/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // Signup successful
      if (!isLogin) {
        setMessage("Signup successful. Logging you in...");

        // Automatically login after signup
        const loginResponse = await fetch(
          "http://localhost:3000/auth/login",
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

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
          setMessage("Signup successful. Please login.");
          setIsLogin(true);
          setLoading(false);
          return;
        }

        localStorage.setItem("token", loginData.token);

        onLogin(loginData.token);

        return;
      }

      // Login successful
      localStorage.setItem("token", data.token);

      onLogin(data.token);
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }

    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="switch-auth">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsLogin((prev) => !prev);
              setMessage("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;