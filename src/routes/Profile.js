import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default () => {
	const histroy = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		histroy.push("/");
}
	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};
