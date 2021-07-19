import React, { useState } from "react";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {

	const [editing,setEditing] = useState(false);
	const [newNweet, setNewNeet] = useState(nweetObj.text);
	const onDeleteClick = async () => {
		const ok = window.confirm("트윗을 삭제하시겠습니까?");

		if(ok){
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
		}
	};

	const toggleEditing = () => setEditing(prev => !prev);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweetObj.id}`).update({
			text: newNweet
		});
		setEditing(false);
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewNeet(value);
	};

	return (
		<div>
			{editing ? (
				<>
				<form onSubmit={onSubmit}>
					<input onChange={onChange} type="text" placeholde="수정할 내용을 적어주세요" value={newNweet} required />
					<input type="submit" value="업데이트 트윗" />
				</form>
				<button onClick={toggleEditing}>취소</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>트윗 삭제</button>
							<button onClick={toggleEditing}>트윗 수정</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
