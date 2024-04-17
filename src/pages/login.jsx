import "../pages.css";
import logo from "../../logo_blog.jpeg";
import LoginForm from "../component/loginform";
import { Link, useLocation } from "react-router-dom";
import login from "../../login.jpeg";

export default function Login() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  return (
    <div className="outerlogin">
      <div className="login">
        <main className="form">
          <section className="formins">
            <div className="div1">
              <img src={logo} alt="blog_app" width={100} height={100} />
              <h1>AlphaChat</h1>
            </div>
            <div className="div2">
              <h3>Log in to your account</h3>
              <br />
              <p>Welcome back</p>
            </div>
            {message ? <h4>{message}</h4> : null}
            <LoginForm />
            <p id="p">
              <b>Don't have acount? </b>{" "}
              <Link to="register" id="link">
                {" "}
                Create Acount
              </Link>
            </p>
          </section>
        </main>
        <main className="image">
          <img src={login} alt="people" width={300} height={300} />
          <div>
            <h3>Connect with friends & have share for fun</h3>
            <h3 style={{ fontWeight: "lighter" }}>
              Share memories with friends and the work!
            </h3>
          </div>
        </main>
      </div>
    </div>
  );
}
