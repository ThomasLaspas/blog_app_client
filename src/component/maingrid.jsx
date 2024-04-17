import "../pages.css";
import Friendre from "./friendre";
import Suggest from "./suggestfriends";
import Profile from "../pages/profile";
import Addpost from "./addpost";
import Feed from "./feed";
import { useState } from "react";

export default function Maingrid({
  friends,
  handle,
  suggest,
  add,
  msg,
  user,
  timeSinceLastLogin,
  userId,
  accessToken,
  post,
  refresh,
  time,
  prof,
  feedm,
  friendsm,
}) {
  return (
    <div className="grid">
      {prof ? (
        <main className="grid1">
          <Profile
            user={user}
            timeSinceLastLogin={timeSinceLastLogin}
            accessToken={accessToken}
            time={time}
          />
        </main>
      ) : null}
      {feedm ? (
        <main className="grid2">
          <Addpost
            userId={userId}
            accessToken={accessToken}
            user={user}
            refresh={refresh}
          />

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
                  userimg={user.image}
                  accessToken={accessToken}
                  time={po.time}
                  refresh={refresh}
                  postuser={po.userId._id}
                  timeuser={time}
                />
              );
            })
          ) : (
            <h1>no post exist</h1>
          )}
        </main>
      ) : null}
      {friendsm ? (
        <main className="grid3">
          <Friendre friends={friends} handle={handle} />
          <br />
          <br />
          <Suggest suggest={suggest} add={add} msg={msg} />
        </main>
      ) : null}
    </div>
  );
}
