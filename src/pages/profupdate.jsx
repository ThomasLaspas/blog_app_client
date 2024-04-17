import "../profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo_blog.jpeg";
import { server, handleFileUpload } from "../utils/axios";
import { useState, useEffect } from "react";

export default function Updatepr() {
  const location = useLocation();
  const { state } = location;
  const user = state.user;
  const accessToken = state.accessToken;
  const time = state.time;
  const [modalope, setmodal] = useState(false);

  const [load, setload] = useState(false);

  const [file, setfile] = useState(null);
  const [loc, setloc] = useState("");
  const [name, setname] = useState("");
  const [prof, setprf] = useState("");

  const navigate = useNavigate();
  const sub = async () => {
    const data = {
      userId: user._id,
      location: loc,
      username: name,
      profession: prof,
    };
    setload(true);
    try {
      const token = accessToken;
      console.log("file uploaded");
      const uri = file && (await handleFileUpload(file));

      const newdata = uri ? { ...data, image: uri } : data;
      const res = await server.put("users/update-user", newdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setmodal(true);
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
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const nav = () => {
    navigate("/mainP", {
      state: {
        userId: user._id,
        accessToken: accessToken,
        timer: time,
      },
    });
  };
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
        <div className="image3">
          <img
            src={user.image ? user.image : logo}
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
          <br />
          <h1>{user.username}</h1>
        </div>
        <br />

        <div className="update2">
          <form onSubmit={handleKeyDown}>
            <input
              type="text"
              placeholder="New username"
              value={name}
              onChange={(e) => setname(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={loc}
              onChange={(e) => setloc(e.target.value)}
              required
              onKeyDown={handleKeyDown}
            />
            <input
              type="text"
              placeholder="Profession"
              value={prof}
              onChange={(e) => setprf(e.target.value)}
              required
              onKeyDown={handleKeyDown}
            />
            <div className="subup">
              <div class="input-div">
                <input
                  class="input"
                  name="file"
                  type="file"
                  onChange={(e) => setfile(e.target.files[0])}
                  required
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
              <button onClick={sub} type="button">
                Update
              </button>
            </div>
          </form>
          <br />
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
      </main>
      {modalope && (
        <div className="modal">
          <hi> Your profile updated succefully. Return to Main page </hi>
          <br />
          <button onClick={nav}>Main page</button>
        </div>
      )}
    </div>
  );
}
