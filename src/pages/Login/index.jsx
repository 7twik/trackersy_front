// import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";
function Login() {
  const googleAuth = () => {
    window.open(`https://trackersy-back.onrender.com/auth/google/callback`, "_self");
  };
  return (
    <div className={styles.bgm}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <div className={styles.left}>
            {/* <h3>{user.q}</h3> */}
            {/* <img className={styles.img} src="https://source.unsplash.com/1600x900/?money" alt="login" />  */}
            <img
              className={styles.img}
              src="./images/ppnobg2.png"
              alt="login"
            />
          </div>
          <div className={styles.right}>
            <h2 className={styles.from_heading}>Members Log in</h2>
            {/* <input type="text" className={styles.input} placeholder="Email" />
					<input type="text" className={styles.input} placeholder="Password" /> */}
            {/* <button className={styles.btn}>Log In</button> */}
            <p className={styles.text}>Login with College mail id</p>
            <button className={styles.google_btn} onClick={googleAuth}>
              <img src="./images/google.png" alt="google icon" />
              <span>Sign in with Google</span>
            </button>
            {/* <p className={styles.text}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
