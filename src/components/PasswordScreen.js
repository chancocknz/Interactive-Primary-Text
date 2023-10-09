import React, { useState } from "react";

const PasswordScreen = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the entered password is correct
    // onPasswordSubmit(password);
    if (password === "1234") {
      onPasswordSubmit(true); // Password is correct, allow access
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="password-screen">
      <h2>Enter Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordScreen;
