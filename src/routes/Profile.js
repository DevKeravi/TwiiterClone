import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const histroy = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    histroy.push("/");
  };
  /*
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .orderBy("createdAt")
      .where("creatorId", "==", userObj.uid)
      .get();
  };
  */
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  /*
  useEffect(() => {
    getMyNweets();
  }, []);
  */
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="사용자 이름"
          value={newDisplayName}
        />
        <input type="submit" value="프로필 갱신" />
      </form>

      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
