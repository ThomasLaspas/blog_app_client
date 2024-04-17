import "../pages.css";
import logo from "../../logo_blog.jpeg";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { LiaCommentAltSolid } from "react-icons/lia";
import { server } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Feed({
  location,
  image,
  clikes,
  name,
  des,
  likes,
  com,
  postId,
  profilepic,
  userId,
  accessToken,
  time,
  refresh,
  postuser,
  timeuser,
  userimg,
}) {
  const [comm, setcomm] = useState("");
  const [dis, setdis] = useState(true);
  const [getcom, setgetcom] = useState([]);
  const [comm2, setcomm2] = useState("");
  const [plike, setplike] = useState(false);
  const [clike, setclike] = useState(false);
  const navigate = useNavigate();

  const nav = async () => {
    try {
      const token = accessToken;
      const res = await server.post(
        `users/profile-view`,
        {
          userId: userId,
          username: name,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/profile", {
        state: {
          userId: userId,
          accessToken: accessToken,
          postuser: postuser,
          name: name,
          time: timeuser,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const formatTimeDifference = (time) => {
    const elapsedTime = Date.now() - time;
    // Assuming elapsedTime is in milliseconds
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };
  const getclikes = async (id) => {
    setclike((prev) => !prev);
    try {
      const token = accessToken;
      const res = await server.post(
        `post/like-comment/${id}`,
        userId,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      // refresh();
      getcomm();
    } catch (err) {
      console.log(err);
    }
  };
  const getlikes = async (post) => {
    setplike((prev) => !prev);
    try {
      const token = accessToken;
      const res = await server.post(
        `post/like/${post}`,
        userId,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const create2 = async (id) => {
    const data = { userId: userId, comment: comm2 };
    try {
      const token = accessToken;
      const res = await server.post(
        `post/comment-comment/${id}`,

        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      getcomm(postId);
      setcomm2("");
      refresh();
    } catch (err) {
      console.log(err);
    }
  };
  const create = async () => {
    const data = { userId: userId, comment: comm };

    try {
      const token = accessToken;
      const res = await server.post(
        `post/commentpost/${postId}`,

        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      getcomm(postId);
      setcomm("");
      refresh();
    } catch (err) {
      console.log(err);
    }
  };
  const viscom = (post) => {
    setdis((prev) => !prev);
    getcomm(post);
  };
  const getcomm = async (post) => {
    try {
      const token = accessToken;
      const res = await server.get(
        `post/coment/${post}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setgetcom(res.data);
    } catch (err) {
      //onsole.log(err);
    }
  };

  return (
    <div className="feed">
      <section id="section">
        <main id="headpost">
          <div onClick={nav}>
            <img
              src={profilepic ? profilepic : logo}
              id="log"
              alt="profile"
              width={80}
              height={80}
            />
            <span>
              <h1>{name}</h1>
              <p>{location ? location : null}</p>
            </span>
          </div>
          <h4>{formatTimeDifference(time)}</h4>
        </main>
        <br />
        <main>
          <p>{des}</p>
          <div id="feedimg">
            {image ? (
              <img
                src={image}
                alt=""
                height={300}
                style={{ width: "100%", marginTop: "3%" }}
              />
            ) : null}
          </div>
        </main>
        <main id="likes">
          <div>
            <p>
              {plike ? (
                <AiFillLike
                  style={{ cursor: "pointer" }}
                  onClick={() => getlikes(postId)}
                />
              ) : (
                <AiOutlineLike
                  style={{ cursor: "pointer" }}
                  onClick={() => getlikes(postId)}
                />
              )}{" "}
              {likes?.length ? likes.length : 0} Likes
            </p>
          </div>
          <div>
            <p id="comment1">
              <LiaCommentAltSolid
                style={{ cursor: "pointer" }}
                onClick={() => viscom(postId)}
              />
              {com?.length ? com.length : 0} Comments
            </p>
          </div>
        </main>
        <main id={dis ? "display" : "comments"}>
          <section className="addcomment">
            <img
              src={userimg ? userimg : logo}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
            <form>
              <input
                id="addcomment"
                type="text"
                placeholder="Your comment"
                value={comm}
                onChange={(e) => setcomm(e.target.value)}
              />
              <input
                id="addcommentsub"
                type="button"
                onClick={create}
                value="comment"
              />
            </form>
          </section>
          {getcom.data && getcom.data.length > 0 ? (
            getcom.data.map((cm) => {
              return (
                <div className="comments" key={cm._id}>
                  <div style={{ width: "100%" }}>
                    <img
                      src={cm.userId.image ? cm.userId.image : logo}
                      alt=""
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                    <div>
                      <h4>{cm.from}</h4> <p>{formatTimeDifference(cm.time)}</p>
                    </div>
                    <main id="likesc">
                      {" "}
                      {clike ? (
                        <AiFillHeart
                          style={{ cursor: "pointer" }}
                          onClick={() => getclikes(cm._id)}
                        />
                      ) : (
                        <AiOutlineHeart
                          style={{ cursor: "pointer" }}
                          onClick={() => getclikes(cm._id)}
                        />
                      )}
                      {cm.likes.length}
                    </main>
                  </div>

                  <div style={{ width: "100%" }}>
                    <h2> {cm.comment}</h2>
                  </div>
                  <section className="commenttocomment">
                    {cm.replies?.length > 0 ? (
                      cm.replies.map((rp) => {
                        return (
                          <div className="reply">
                            <div style={{ width: "100%" }}>
                              {" "}
                              <h4>{rp.from}</h4>
                              <p>{formatTimeDifference(rp.time)}</p>
                            </div>

                            <h3>{rp.comment}</h3>
                          </div>
                        );
                      })
                    ) : (
                      <h1>nothing there</h1>
                    )}
                    <br />
                    <div className="divcom">
                      <img
                        src={userimg ? userimg : logo}
                        alt=""
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%" }}
                      />
                      <form>
                        <input
                          id="addcommentoncomment"
                          type="text"
                          placeholder="reply on comment"
                          value={comm2}
                          onChange={(e) => setcomm2(e.target.value)}
                        />
                        <input
                          id="addcommentsuboncomment"
                          type="button"
                          onClick={() => create2(cm._id)}
                          value="comment"
                        />
                      </form>
                    </div>
                  </section>
                </div>
              );
            })
          ) : (
            <h2 id="h2com">there is no comment for this post</h2>
          )}
        </main>
      </section>
    </div>
  );
}
