import hero from "../assets/hero.png";
import "./Home.css";

function Home() {
  return (
    <div className="hero-page-wrapper">
      <div className="home-container">
        <h1>
          Work Smarter with <span className="colorHighlight">Tic-Tasker </span>
        </h1>
        <div className="hero-and-discriptions">
          <div className="h3s">
            <h3 className="colorHighlight">Free</h3>
            <h3 className="colorHighlight">Easy to use</h3>
            <h3 className="colorHighlight">Works on All Devices</h3>
          </div>
          <div className="hero-wrapper">
            <img className="hero" src={hero} alt="hero-img" />
          </div>
        </div>
        <div className="para-bottom">
          <p className="para">What do you want to manage?</p>
          <p className="para2">
            <span className="color">Log-in</span> or{" "}
            <span className="color">Sign-up</span> to get started
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
