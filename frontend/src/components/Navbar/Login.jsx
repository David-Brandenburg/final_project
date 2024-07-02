import { useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { LogginContext } from "../../contexts/LogginContext.js";
import "./Login.scss";
import { ModalContext } from "../../contexts/ModalContext.js";
import { useLanguage } from "../../contexts/LanguageContext.js";
import Logo from "../../assets/pixelPlaza.webp";
import { GoogleLogin } from "@react-oauth/google";
import emailjs from "@emailjs/browser";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const { language } = useLanguage();
  const { setOpenModalBlocker } = useContext(ModalContext);
  const { setLoggedInUser } = useContext(LogginContext);
  const emailRef = useRef();
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);
  const URL = process.env.REACT_APP_URL_BACKEND;

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
    const serviceID = "service_0yvloq6";
    const templateID = "template_4s591t7";

    if (emailError || passwordError) {
      toast.warn("Please fix the errors in the form.");
      return;
    }

    if (!nameRef.current.value || !emailRef.current.value) {
      toast.warn("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const formData = { benutzername: username, email, password };

      const resp = await fetch(`${URL}/accounts/create`, {
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
        console.log(data);
        toast.success(data.message);
        emailjs.init(data.publicID);

        // Ensure confirmation token is available
        if (!data.confirmationToken) {
          throw new Error("Confirmation token not received.");
        }

        await emailjs.send(serviceID, templateID, {
          name: nameRef.current.value,
          recipient: emailRef.current.value,
          confirmation_link: `${URL}/accounts/confirm/${data.confirmationToken}`,
        });
        setShowLogin(true);
      }
    } catch (error) {
      console.error("Error appending data to server", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const resp = await fetch(`${URL}/accounts/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        const data = await resp.json();
        toast.error(data.message);
      } else {
        const data = await resp.json();
        if (!data.token) {
          console.log("Token not found");
        } else {
          if (!data.user.isEmailVerified) {
            toast.error("Please verify your email address!");
            return;
          }
          setLoggedInUser({
            benutzername: data.user.benutzername,
            email: data.user.email,
            id: data.user._id,
            token: data.token,
          });
          localStorage.setItem("profilePic", data.user.profilePic);
          toast.success(data.message);
          setOpenModalBlocker(false);
        }
      }

      e.target.reset();
    } catch (error) {
      console.error("Error appending data to server!", error);
    }
  };

  const handleGoogleLogin = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log(userObject);

    // Sende das Google Token an dein Backend
    fetch(`${URL}/accounts/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setLoggedInUser({
          benutzername: data.benutzername,
          email: data.email,
          id: data._id,
          googleId: data.googleId,
        });
        toast.success(data.message);
        setOpenModalBlocker(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-modal" onClick={(e) => e.stopPropagation()}>
      {!showLogin && (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header-wrapper">
            <img src={Logo} alt="logo" />
            <h1 className=" ">
              {language === "en" ? "Sign Up" : "Registrieren"}
            </h1>
          </div>
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
              ref={nameRef}
              className="login-input"
              placeholder={language === "en" ? "Username" : "Benutzername"}
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
              ref={emailRef}
              className={
                "login-input" + (emailError ? " invalid-email" : " valid-email")
              }
              placeholder={
                language === "en"
                  ? "@ Sign & .de, .com, etc."
                  : "@ zeichen & .de, .com, etc."
              }
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
              placeholder={
                language === "en"
                  ? "min. 8 Signs, 1 A-Z, 1 a-z, 1 Number"
                  : "min. 8 Zeichen, 1 A-Z, 1 a-z, 1 Zahl"
              }
              autoComplete="off"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="login-btn-wrapper">
            <button className="login-button" disabled={loading} type="submit">
              {language === "en" ? "Sign Up!" : "Registrieren"}
            </button>
            <button className="login-button" onClick={() => setShowLogin(true)}>
              {language === "en" ? "Log In!" : "Einloggen"}
            </button>
          </div>
        </form>
      )}
      {showLogin && (
        <form className="login-form" onSubmit={handleSubmitLogin}>
          <div className="login-header-wrapper">
            <img src={Logo} alt="logo" />
            <h1 className=" ">{language === "en" ? "Login" : "Einloggen"}</h1>
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
              className="login-input"
              placeholder={
                language === "en"
                  ? "@ Sign & .de, .com, etc."
                  : "@ zeichen & .de, .com, etc."
              }
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
              placeholder={
                language === "en"
                  ? "min. 8 Signs, 1 A-Z, 1 a-z, 1 Number"
                  : "min. 8 Zeichen, 1 A-Z, 1 a-z, 1 Zahl"
              }
              autoComplete="off"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="login-btn-wrapper">
            <button className="login-button" type="submit">
              {language === "en" ? "Log In!" : "Einloggen"}
            </button>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <hr />
            <button
              className="login-button"
              onClick={() => setShowLogin(false)}>
              {language === "en" ? "Sign Up!" : "Registrieren"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
