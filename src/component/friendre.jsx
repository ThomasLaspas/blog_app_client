import "../pages.css";
import logo from "../../logo_blog.jpeg";

export default function Friendre({ friends, handle }) {
  return (
    <div className="friendreq">
      <div className="title">
        <h2>Friend Request</h2>
        <h2>{friends.length > 0 && friends !== null ? friends.length : 0}</h2>
      </div>
      <div className="req2">
        {friends !== null && friends !== undefined && friends.length > 0 ? (
          friends.map((fr) => {
            // Check if fr is not null or undefined
            if (fr && fr.requestFrom) {
              return (
                <section key={fr.requestFrom._id}>
                  <div className="img">
                    <img
                      src={logo}
                      alt="friendrequest"
                      width={50}
                      height={50}
                    />
                    <div>
                      <h5>{fr.requestFrom.username}</h5>
                      <p>
                        {fr.requestFrom.profesion
                          ? fr.requestFrom.profesion
                          : "No profession"}
                      </p>
                    </div>
                  </div>
                  <div id="friendsaccept">
                    <button id="one" onClick={() => handle(fr._id, "Accepted")}>
                      accept
                    </button>
                    <button id="two" onClick={() => handle(fr._id, "decline")}>
                      decline
                    </button>
                  </div>
                </section>
              );
            } else {
              return null; // Return null if fr or fr.requestFrom is null or undefined
            }
          })
        ) : (
          <h3>There is no friend request</h3>
        )}
      </div>
    </div>
  );
}
