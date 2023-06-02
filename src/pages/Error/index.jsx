import styles from "./styles.module.css";

function Home(userDetails) {
	const user = userDetails.user;
	const logout = () => {
		window.open(`http://localhost:8080/auth/logout`, "_self");
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				NO ACCESS, login with college mail id
					<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
				</div>
			</div>
		
	);
}

export default Home;
