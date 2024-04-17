import { Link } from "react-router-dom";
import "../pages.css";
import { server } from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [password, setpass] = useState("");
  const [email, setemail] = useState("");
  const [error, seterr] = useState("");
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setload(true);
    try {
      const res = await server.post("login", {
        email: email,
        password: password,
      });

      localStorage.setItem("key", true);

      const user = res.data.finuser._id;
      const token = res.data.accestoken;
      const time = res.data.time;
      navigate("/mainP", {
        state: {
          userId: user,
          accessToken: token,
          timer: time,
        },
      });
    } catch (err) {
      console.log(err.response.data.message);
      seterr(err.response.data.message);
    } finally {
      setload(false);
    }
  };

  return (
    <>
      <form onSubmit={login}>
        <span>
          <label for="email">
            <b>Email Address</b>
          </label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="  email@exable.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </span>
        <br />
        <span>
          <label for="password">
            {" "}
            <b>Password</b>
          </label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="  Password"
            value={password}
            onChange={(e) => setpass(e.target.value)}
          />
        </span>
        <span className="span">
          <Link to="reset-password" id="link">
            Forgot Password ?
          </Link>
        </span>
        <span>
          <button type="submit">Login</button>
        </span>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {load ? (
          <ul class="wave-menu">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        ) : null}
      </div>

      <h4 style={{ color: "red", textAlign: "center" }}>
        {" "}
        {error ? error : null}
      </h4>
    </>
  );
}
