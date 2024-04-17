import "../pages.css";
import { useLocation, Link } from "react-router-dom";
import Headm from "../component/headm";
import Maingrid from "../component/maingrid";
import { server, handleFileUpload } from "../utils/axios";
import { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiSolidHomeAlt2 } from "react-icons/bi";

export default function Mainp() {
  const location = useLocation();
  const [friends, setfriends] = useState([]);
  const [frienderr, setfriender] = useState("");
  const [trigger, settrigger] = useState(null);
  const [suggest, setsuggest] = useState([]);
  const [msg, setmsg] = useState("Add");
  const [load, setload] = useState(false);
  const [user, setuser] = useState([]);
  const [post, setpost] = useState([]);
  const [refreshpost, setrefresh] = useState(0);
  const [timeSinceLastLogin, setTimeSinceLastLogin] = useState("");
  const { state } = location;
  const userId = state.userId;
  const accessToken = state.accessToken;
  const time = state.timer;
  const [buttonTexts, setButtonTexts] = useState({});
  const [prof, setprof] = useState(true);
  const [feedm, setfeed] = useState(true);
  const [friendsm, setfriendsm] = useState(true);

  const refresh = () => {
    setrefresh((prev) => prev + 1);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const profm = () => {
    setprof(true);
    setfeed(false);
    setfriendsm(false);
  };
  const feedmob = () => {
    setprof(false);
    setfeed(true);
    setfriendsm(false);
  };
  const freindreqsug = () => {
    setprof(false);
    setfeed(false);
    setfriendsm(true);
  };

  useEffect(() => {
    if (isMobile) {
      setprof(false);
      setfriendsm(false);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const add = async (username) => {
    try {
      const token = accessToken;
      const res = await server.post(
        "users/friend-request",
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
      settrigger(1);
      setButtonTexts((prevState) => ({
        ...prevState,
        [username]: "Added", // Change this to whatever text you want
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handle = async (rid, statuss) => {
    try {
      const token = accessToken;
      const res = await server.post(
        "users/accept-request",
        {
          rid: rid,
          status: statuss,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      settrigger(2);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const suggestf = async () => {
      try {
        const token = accessToken;
        const res = await server.post(
          "users/suggested-firends",
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setsuggest(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    suggestf();
  }, [trigger]);
  useEffect(() => {
    if (time) {
      // Calculate time elapsed since last login timestamp
      const elapsedTime = Date.now() - time;

      // Convert milliseconds to days, hours, minutes, and seconds
      const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      // Construct the string to display
      const timeString = ` ${minutes} minutes ago`;

      // Set the time since last login state
      setTimeSinceLastLogin(timeString);
    }
  }, [time]);

  useEffect(() => {
    setload(true);
    const getuser = async () => {
      try {
        const token = accessToken;
        const res = await server.post(
          "users/get-user",

          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setuser(res.data.user);
      } catch (err) {
      } finally {
        setload(false);
      }
    };
    getuser();
  }, []);
  useEffect(() => {
    const post = async () => {
      try {
        const token = accessToken;
        const res = await server.post("post", userId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setpost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    post();
  }, [refreshpost]);

  useEffect(() => {
    const friendreq = async () => {
      try {
        const token = accessToken;
        const res = await server.post(
          "users/get-friend-request",
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setfriends(res.data.data);
      } catch (err) {
        setfriender(err);
        console.log(err);
      }
    };
    friendreq();
  }, [trigger]);

  if (load) {
    return (
      <div className="loader">
        <div>
          <h1>Alphachat</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="alphachat">
      <Headm
        accessToken={accessToken}
        userId={userId}
        logout={logout}
        time={time}
      />
      <br />
      <Maingrid
        friends={friends}
        handle={handle}
        suggest={suggest}
        add={add}
        msg={msg}
        user={user}
        timeSinceLastLogin={timeSinceLastLogin}
        userId={userId}
        accessToken={accessToken}
        refresh={refresh}
        post={post}
        time={time}
        prof={prof}
        friendsm={friendsm}
        feedm={feedm}
        buttonTexts={buttonTexts}
      />
      {isMobile ? (
        <div className="mobile">
          <button id={prof ? "mobilec" : null} onClick={profm}>
            <BiSolidUserCircle />
          </button>
          <button id={feedm ? "mobilec" : null} onClick={feedmob}>
            <BiSolidHomeAlt2 />
          </button>
          <button id={friendsm ? "mobilec" : null} onClick={freindreqsug}>
            <AiOutlineUsergroupAdd />
          </button>
        </div>
      ) : null}
    </div>
  );
}
