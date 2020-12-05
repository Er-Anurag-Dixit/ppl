import React from "react";
const SignupForm = props => {
  const { submitFunction, status } = props;
  return (
    <form onSubmit={submitFunction}>
      <ul>
        <li>
          <span>Username</span>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            required
          />
        </li>
        <li>
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            required
          />
        </li>
        <li>
          <span>Email</span>
          <input
            id="input"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
          />
        </li>
        <li>{status}</li>
        <li>
          <span>First Name</span>
          <input
            type="text"
            placeholder="Enter your first name"
            name="fname"
            required
          />
        </li>
        <li>
          <span>Last Name</span>
          <input
            type="text"
            placeholder="Enter your last name"
            name="lname"
            required
          />
        </li>
        <li>
          <input type="checkbox" required />I agree to Term &amp; Conditions
        </li>
        <li>
          <input type="submit" />
        </li>
      </ul>
    </form>
  );
};

export default SignupForm;
