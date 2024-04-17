import "../pages.css";
import logo from "../../logo_blog.jpeg";
import { useState } from "react";
import { server } from "../utils/axios";
import { Link } from "react-router-dom";

export default function Resetpass() {
  const [email, setemail] = useState("");
  const [error, seterr] = useState("");
  const [success, setsuc] = useState(false);

  const reset = async (e) => {
    e.preventDefault();
    try {
      const res = await server.post("users/request-resetpassword", {
        email: email,
      });
      setsuc(true);
    } catch (err) {
      seterr(err.response?.data?.message);
    }
  };

  if (success) {
    return (
      <div className="succes">
        <section>
          <h1 id="success">
            Email sent succesfully. Check your email for reset your password,
            also check spams.
          </h1>
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
    <div className="resetpas">
      <section className="resetform">
        <img src={logo} alt="blog" width={150} height={150} />
        <main className="cardreset">
          <div>
            <h1>Password reset</h1>
            <h4>Fill up the form bellow to reset your password</h4>
          </div>

          <form onSubmit={reset}>
            <label for="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <button type="submit"> Reset</button>
          </form>
          <h3 style={{ color: "red", textAlign: "center" }}>
            {error ? error : null}
          </h3>
        </main>
      </section>
    </div>
  );
}
