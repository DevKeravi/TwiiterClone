import React,{ useEffect } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userobj }) => {
	const histroy = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		histroy.push("/");
};

const getMyNweets = async() => {

};

useEffect(() => {

},[]);
	return (
		<>
			<button onClick={onLogOutClick}>로그아웃</button>
		</>
	);
};

export default Profile;
