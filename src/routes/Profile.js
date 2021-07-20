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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="사용자 이름"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="프로필 갱신"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>

      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>
    </div>
  );
};

export default Profile;
