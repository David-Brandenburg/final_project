import React from "react";
import { Link } from "react-router-dom";
import "./EmailValidPage.scss";

const EmailValidPage = () => {
  return (
    <div className="main-wrapper error-wrapper">
      <p>Email Succssesfully Verified!</p>
      <Link className="redirect-link" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export default EmailValidPage;
