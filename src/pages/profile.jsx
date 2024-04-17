import "../pages.css";
import { BsGeoAlt } from "react-icons/bs";
import { LiaBriefcaseSolid } from "react-icons/lia";
import logo from "../../logo_blog.jpeg";
import { AiOutlineForm } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({
  user,
  timeSinceLastLogin,
  accessToken,
  time,
}) {
  const navigate = useNavigate();
  const toggleModal = () => {
    navigate("/profileUpdate", {
      state: {
        user: user,
        accessToken: accessToken,
        time: time,
      },
    });
  };

  const nav = () => {
    navigate("/viewprof", {
      state: {
        user: user,
        accessToken: accessToken,
        time: time,
      },
    });
  };

  return (
    <div className="profile">
      <div className="baiscs">
        <div onClick={nav}>
          <img
            src={user.image ? user.image : logo}
            alt="profileimg"
            width={70}
            height={70}
            style={{ cursor: "pointer" }}
          />
          <section>
            <h1>{user.username}</h1>
            <p style={{ textWrap: "nowrap" }}>
              {user.profession ? user.profession : "No profession"}
            </p>
          </section>
        </div>
        <button onClick={toggleModal}>
          <AiOutlineForm />
        </button>
      </div>
      <br />
      <section className="info">
        <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <BsGeoAlt /> {user.location ? user.location : "Add location"}
        </p>
        <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <LiaBriefcaseSolid />{" "}
          {user.profession ? user.profession : "No profession"}
        </p>
      </section>
      <br />
      <div className="info2">
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <h2>{user.friends?.length ? user.friends.length : 0}</h2>
          <h2>Friends</h2>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>who viewed your profile </p>
          <h3>{user.views?.length ? user.views.length : 0}</h3>
        </div>

        <br />
        {user.verified ? (
          <p style={{ color: "#4ecca3" }}>verified account </p>
        ) : (
          <p style={{ color: "red" }}> account not verified </p>
        )}
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <p>joined</p>
          <h4> {timeSinceLastLogin}</h4>
        </div>
      </div>
    </div>
  );
}
