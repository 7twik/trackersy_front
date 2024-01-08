import styles from "./styles.module.css";

import { useAuth0 } from "@auth0/auth0-react";
function Home(userDetails) {
	const user = userDetails.user;
	
	const { logout } = useAuth0();
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				NO ACCESS, login with college mail id
					<button className={styles.btn} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
						Log Out
					</button>
				</div>
			</div>
		
	);
}

export default Home;
