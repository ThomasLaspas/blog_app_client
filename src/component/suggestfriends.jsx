import "../pages.css";
import logo from "../../logo_blog.jpeg";

export default function Suggest({ suggest, add, msg }) {
  return (
    <div className="suggest">
      <div className="title">
        <h2>Suggest Friends</h2>
      </div>
      <div className="req">
        {suggest.length > 0 ? (
          suggest.map((fr) => {
            // Check if fr is not null or undefined
            return (
              <section key={fr._id}>
                <div className="img">
                  <img src={logo} alt="friendrequest" width={50} height={50} />
                  <div>
                    <h3>{fr.username}</h3>
                    <p>{fr.profesion ? fr.profesion : "No profession"}</p>
                  </div>
                </div>

                <button id="add" onClick={() => add(fr.username)}>
                  {msg}
                </button>
              </section>
            );
          })
        ) : (
          <h3>There is no users for suggest</h3>
        )}
      </div>
    </div>
  );
}
