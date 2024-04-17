import "../pages.css";
import logo from "../../logo_blog.jpeg";
import { useEffect, useState } from "react";
import { server } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Headm({ userId, accessToken, logout, time }) {
  const [username, setusername] = useState("");
  const [list, setlist] = useState(false);
  const [quer, setquer] = useState("");
  const [names, setnames] = useState([]);
  const [user, setuser] = useState([]);
  const navigate = useNavigate();

  const gotouserpage = async () => {
    try {
      const token = accessToken;
      const res = await server.post(
        "users/get-anotheruser",

        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setuser(res.data.user);
      nav(res.data.user._id);
    } catch (err) {
      console.log(err);
    }
  };
  const nav = async (id) => {
    try {
      const token = accessToken;
      const res = await server.post(
        `users/profile-view`,
        {
          userId: userId,
          username: username,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/profilesearch", {
        state: {
          userId: userId,
          accessToken: accessToken,
          time: time,
          username: username,
          postuser: id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const lista = () => {
    setlist((prev) => !prev);
  };

  const value = (value) => {
    setusername(value);
    setquer(value);
  };
  useEffect(() => {
    const user = async () => {
      try {
        const token = accessToken;

        const res = await server.post(
          "users",
          {
            userId: userId,
            query: quer,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setnames(res.data.usernames);
      } catch (err) {
        console.log(err);
      }
    };
    user();
  }, [quer]);
  return (
    <div className="headm">
      <div className="headimg">
        <img src={logo} alt="Alphachat" width={70} height={70} />
        <h1>Alphachat</h1>{" "}
      </div>

      <div>
        <section>
          <form className="search">
            <input
              type="text"
              value={quer}
              onChange={(e) => setquer(e.target.value)}
              onClick={lista}
              placeholder="Search"
            />
            <button type="button" onClick={gotouserpage}>
              Search
            </button>
          </form>
          <ul className={list ? "" : "display"}>
            {names.length > 0
              ? names.map((sy) => {
                  return (
                    <li onClick={() => value(sy)} className="li">
                      {sy}
                    </li>
                  );
                })
              : null}
          </ul>
        </section>
      </div>
      <button id="logout" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}
