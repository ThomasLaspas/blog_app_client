import { useState } from "react";
import "../pages.css";
import { server } from "../utils/axios";
import { Link } from "react-router-dom";
export default function RegistForm({ success, handleSuccess }) {
  const [username, setuser] = useState("");
  const [password, setpass] = useState("");
  const [email, setemail] = useState("");

  const regist = async (e) => {
    e.preventDefault();
    try {
      const res = await server.post("regist", {
        email: email,
        username: username,
        password: password,
      });
      console.log(res);
      // setmessage(res.data?.message);
      handleSuccess(res.data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={regist}>
        <span>
          <label for="ussername">
            <b>Username</b>
          </label>
          <br />
          <input
            type="text"
            name="username"
            placeholder=" Username"
            value={username}
            onChange={(e) => setuser(e.target.value)}
          />
        </span>
        <br />
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
        <br />
        <span>
          <button type="submit">Regist</button>
        </span>
      </form>
    </>
  );
}
