import React from "react";
import "../styles/project.css";

function Form({
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  label,
}) {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
}

export default Form;
