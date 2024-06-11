import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { LogginContext } from "../../contexts/LogginContext.js";
import "../../styles/modals.scss";
import { ModalContext } from "../../contexts/ModalContext.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLogin, setShowLogin] = useState(true);

	const { setLoggedInUser, isLoggedIn } = useContext(LogginContext);
	const { setOpenModalBlocker } = useContext(ModalContext);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    return re.test(password);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format!");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character (!@#$%^&*()_-=[]{};':\"|,.<>/?)."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      toast.warn("Please fix the errors in the form.");
      return;
    }

    try {
      const formData = { benutzername: username, email, password };

      const resp = await fetch("http://localhost:3001/accounts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        const data = await resp.json();
        toast.warn(data.message);
      } else {
        const data = await resp.json();
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error appending data to server", error);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const resp = await fetch("http://localhost:3001/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

			if (!resp.ok){
				const data = await resp.json();
				toast.error(data.message)
			} else {
				const data = await resp.json();
				if (!data.token) {
					console.log("Token not found")
				} else {
					setLoggedInUser({
						benutzername: data.user.benutzername,
						email: data.user.email,
						id: data.user._id,
						profilePic: data.user.profilePic,
						token: data.token,
					})
					toast.success(data.message)
					setOpenModalBlocker(false)
				}
			}

      e.target.reset();
    } catch (error) {
      console.error("Error appending data to server!", error);
    }
  };

  return (
    <div className="login-modal" onClick={(e) => e.stopPropagation()}>
      {!showLogin && (
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className=" ">Sign Up</h1>
          <div className="">
            <svg
              viewBox="0 0 16 16"
              fill="transparent"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="self-center text-white">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              type="text"
              name="benutzername"
              value={username}
              className="login-input"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className=" ">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              type="text"
              name="email"
              value={email}
              className={
                "login-input" + (emailError ? " invalid-email" : " valid-email")
              }
              placeholder="@ zeichen & .de, .com, etc."
              autoComplete="off"
              onChange={handleEmailChange}
            />
          </div>
          <div className="">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className=" self-center">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              type="password"
              name="password"
              value={password}
              className={
                "login-input" +
                (passwordError ? " invalid-email" : " valid-email")
              }
              placeholder="min. 8 Zeichen, 1 A-Z, 1 a-z, 1 Zahl"
              autoComplete="off"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="login-btn-wrapper">
            <button className="login-button" type="submit">
              Sign Up!
            </button>
            <button className="login-button" onClick={() => setShowLogin(true)}>
              Log In!
            </button>
          </div>
        </form>
      )}
      {showLogin && (
        <form className="login-form" onSubmit={handleSubmitLogin}>
          <h1 className=" ">Login</h1>
          <div className="">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className=" ">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              type="text"
              name="email"
              value={email}
              className="login-input"
              placeholder="@ zeichen & .de, .com, etc."
              autoComplete="off"
              onChange={handleEmailChange}
            />
          </div>
          <div className="">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className=" self-center">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              type="password"
              name="password"
              value={password}
              className="login-input"
              placeholder="min. 8 Zeichen, 1 A-Z, 1 a-z, 1 Zahl"
              autoComplete="off"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="login-btn-wrapper">
            <button
              className="login-button"
              onClick={() => setShowLogin(false)}>
              Sign Up!
            </button>
            <button className="login-button" type="submit">
              Log In!
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
