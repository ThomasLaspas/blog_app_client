import "../profile.css";
import logo from "../../logo_blog.jpeg";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { server } from "../utils/axios";
import Feed from "../component/feed";
export default function Profsearch() {
  const location = useLocation();
  const { state } = location;
  const userId = state.userId;
  const accessToken = state.accessToken;
  const postuser = state.postuser;
  const nameuser = state.username;
  const time = state.time;
  const [load, setload] = useState(false);
  const [req, setreg] = useState(true);
  const [post, setpost] = useState([]);
  const [otheruser, setotheruser] = useState([]);
  const navigate = useNavigate();

  const getfriend = async () => {
    try {
      const token = accessToken;
      const res = await server.post(
        "users/friend-request",
        {
          userId: userId,
          username: nameuser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setreg((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setload(true);
    const getotheruser = async () => {
      try {
        const token = accessToken;
        const res = await server.post(
          "users/get-anotheruser",

          {
            username: nameuser,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setotheruser(res.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setload(false);
      }
    };
    getotheruser();
  }, []);
  useEffect(() => {
    const post = async () => {
      try {
        const token = accessToken;
        const res = await server.post(
          `post/userposts/${postuser}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setpost(res.data.data);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    post();
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action if Enter key is pressed
    }
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const nav = () => {
    navigate("/mainP", {
      state: {
        userId: userId,
        accessToken: accessToken,
        timer: time,
      },
    });
  };
  const filter = otheruser.friends?.filter((elem) => elem._id === userId);
  console.log(filter);
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
    <div className="profilep">
      <header>
        <div className="headimg">
          <img
            src={logo}
            alt="Alphachat"
            width={70}
            height={70}
            onClick={nav}
          />
          <h1>Alphachat</h1>{" "}
        </div>
        <button id="logout" onClick={logout}>
          Log Out
        </button>
      </header>
      <br />
      <main className="updateprof">
        <div className="image2">
          <img
            src={otheruser.image ? otheruser.image : logo}
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <br />
        <div className="gridprof">
          <div className="info">
            <h1>{otheruser.username}</h1>
            <h1>
              {otheruser.profession ? otheruser.profession : "No profession"}
            </h1>
            <h1>{otheruser.location ? otheruser.location : "No location"}</h1>
            {otheruser.verified ? (
              <h2 style={{ color: "#4ecca3" }}>Acount verified</h2>
            ) : (
              <h2 style={{ color: "red" }}>Acoount not verified</h2>
            )}
          </div>

          <div className="update">
            {filter?.length <= 0 ? (
              // Display UI for when the user is a friend
              // For example, you can display a "Remove Friend" button
              <button onClick={getfriend}>{req ? "Add" : "Pending"}</button>
            ) : (
              <h1>Friends</h1>
              // Display UI for when the user is not a friend
              // For example, you can display an "Add Friend" button
            )}
          </div>
          <div className="friends">
            <h1>Friends:{otheruser.friends?.length}</h1>
            <br />
            <div className="friendsprof">
              {otheruser.friends?.length > 0 ? (
                otheruser.friends.map((fr) => {
                  // Check if fr is not null or undefined
                  return (
                    <section key={fr._id}>
                      <div className="img">
                        <img
                          src={fr.image ? fr.image : logo}
                          alt="friendrequest"
                          width={50}
                          height={50}
                        />
                        <div>
                          <h3>{fr.username}</h3>
                          <p>{fr.profesion ? fr.profesion : "No profession"}</p>
                        </div>
                      </div>
                    </section>
                  );
                })
              ) : (
                <h3>There is no friends.</h3>
              )}
            </div>
          </div>
        </div>
      </main>
      <br />
      <div className="profpost">
        {post !== null && post !== undefined && post.length > 0 ? (
          post.map((po) => {
            return (
              <Feed
                key={po._id}
                image={po.image}
                date={po.createdAt}
                name={po.userId.username}
                des={po.description}
                likes={po.likes}
                clikes={po.Comments.likes}
                com={po.Comments}
                postId={po._id}
                location={po.location}
                profilepic={po.userId.image}
                userId={userId}
                accessToken={accessToken}
                time={po.time}
                postuser={po.userId._id}
              />
            );
          })
        ) : (
          <h1>no post exist</h1>
        )}
      </div>
    </div>
  );
}
