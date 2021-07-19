import React from "react";
import {Link} from "react-router-dom"


const Navigation = () => ( 
	<nav>
		<ul>
			<li>
				<Link to="/">홈</Link>
			</li>
		</ul>
		<ul>
			<li>
				<Link to="/profile">내 정보</Link>
			</li>
		</ul>
	</nav>
);
export default Navigation;
