import "../pages.css";
import RegistForm from "../component/regist";
import logo from "../../logo_blog.jpeg";
import login from "../../login.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [success, setsuccess] = useState(false);
  const [message, setmessage] = useState("");
  const handleSuccess = (msg) => {
    setsuccess(true);
    setmessage(msg);
  };

  if (success) {
    return (
      <div className="succes">
        <section>
          <h1 id="success">{message}</h1>
          <br />
          <p>Click the link bellow to return to login page</p>
          <Link to="/" id="link">
            {" "}
            Login
          </Link>
        </section>
      </div>
    );
  }
  return (
    <div className="outerregist">
      <div className="regist">
        <main className="image">
          <img src={login} alt="people" width={300} height={300} />
          <div>
            <h3>Connect with friends & have share for fun</h3>
            <h3 style={{ fontWeight: "lighter" }}>
              Share memories with friends and the work!
            </h3>
          </div>
        </main>
        <main className="form">
          <section className="formins">
            <div className="div1">
              <img src={logo} alt="blog_app" width={100} height={100} />
              <h1>AlphaChat</h1>
            </div>
            <div className="div2">
              <h3>Create new account</h3>
              <br />
              <p>Happy chatting</p>
            </div>
            <RegistForm success={success} handleSuccess={handleSuccess} />
          </section>
        </main>
      </div>
    </div>
  );
}
