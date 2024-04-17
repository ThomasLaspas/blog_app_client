import "../pages.css";
import logo from "../../logo_blog.jpeg";
import { useState } from "react";
import { server, handleFileUpload } from "../utils/axios";

export default function Addpost({ userId, accessToken, user, refresh }) {
  const [file, setfile] = useState(null);
  const [des, setdes] = useState("");
  const [load, setload] = useState(false);

  const sub = async () => {
    const data = { userId: userId, description: des };
    setload(true);
    try {
      const token = accessToken;
      console.log("file uploaded");
      const uri = file && (await handleFileUpload(file));

      const newdata = uri ? { ...data, image: uri } : data;
      const res = await server.post("post/create", newdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refresh();
      console.log(res);
      setdes("");
    } catch (err) {
      console.log(err);
    } finally {
      setload(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action if Enter key is pressed
    }
  };
  return (
    <div className="post">
      <section>
        <img
          src={user.image ? user.image : logo}
          alt="alphachat"
          width={100}
          height={100}
        />
        <form onSubmit={handleKeyDown}>
          <input
            type="text"
            placeholder="Whats on your mind"
            onKeyDown={handleKeyDown}
            value={des}
            onChange={(e) => setdes(e.target.value)}
          />
        </form>
      </section>
      <div className="postsub">
        <div class="input-div">
          <input
            class="input"
            name="file"
            type="file"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            stroke-linejoin="round"
            stroke-linecap="round"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
            class="icon"
          >
            <polyline points="16 16 12 12 8 16"></polyline>
            <line y2="21" x2="12" y1="12" x1="12"></line>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
            <polyline points="16 16 12 12 8 16"></polyline>
          </svg>
        </div>

        <button onClick={sub}>post</button>
      </div>
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
    </div>
  );
}
