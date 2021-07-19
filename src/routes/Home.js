import React, { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet"

const Home = ({ userObj }) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [attachment, setAttachment] = useState();

	useEffect(() => {
		dbService.collection("nweets").onSnapshot(snapshot => {
			const nweetArray = snapshot.docs.map(doc => ({
				id:doc.id,
				...doc.data(),
			}));
			setNweets(nweetArray);
		});
	},[]);
	const onSubmit = async (event) => {
		event.preventDefault();
		let attachmentUrl = "";
		if(attachment !== ""){
			const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
			const response = await attachmentRef.putString(attachment, "data_url");
			attachmentUrl = await response.ref.getDownloadURL();
		}
		const nweetObj = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		}
		await dbService.collection('nweets').add(nweetObj);
		setNweet("");
		setAttachment("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	const onFileChange = (event) => {
		const {
			target:{ files },
		} = event;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const result = reader.result;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	}
	const onClearAttachment = () => setAttachment(null);

	return (
		<div>
			<form onSubmit={onSubmit}> 
				<input type="text" value={nweet} onChange={onChange} placeholder="어떤 생각을 하고 계세요?" maxLength="120"></input>
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="트윗하기"/>

				{attachment && (
					<div>	
						<img src={attachment} alt="" width="50px" height="50px" />
						<button onClick={onClearAttachment}>지우기</button>
					</div>
				)}
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid } />
				))}
			</div>
		</div>
	);
};

export default Home;
