import { useRef } from "react";
//import { FaBars, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./main.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/#">My work</a>
				<a href="/#">Blog</a>
				<a href="/#">About me</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
            <FontAwesomeIcon icon="fa-solid fa-bars" />
			</button>
		</header>
	);
}

export default Navbar;