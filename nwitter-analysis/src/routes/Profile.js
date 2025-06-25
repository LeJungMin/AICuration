import Nweet from 'components/Nweet';
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

export default ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ?? "USER");
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/')
    }
    const getMyNweets = async () => {
        const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };
    const onchange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        // if(userObj.displayName !== newDisplayName){
        //     await userObj.updateProfile({
        //         displayName: newDisplayName,
        //     })
        // }
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    }
    useEffect(() => {
        getMyNweets();
    }, [])
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                onChange={onchange}
                type="text"
                autoFocus
                placeholder="Display name"
                value={newDisplayName}
                className="formInput"
                />
                <input
                type="submit"
                value="Update Profile"
                className="formBtn"
                style={{
                    marginTop: 10,
                }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};