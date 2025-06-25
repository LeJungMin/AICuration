import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import {collection, addDoc, serverTimiestamp, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import Nweet from 'components/Nweet';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from "uuid"
import NweetFactory from "components/NweetFactory";

const Home = ( userObj ) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            }
            setNweets((prev) => [nweetObject, ...prev]);
            console.log(nweetObject)
        });
    }
    useEffect(() => {
        // getNweets();
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNweets(nweetArr);
        });
    }, []);
    
    return (
    <div className="container">
        <NweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
            {nweets.map((nweet) => (
                // <div key={nweet.id}>
                //     <h4>{nweet.text}</h4>
                // </div>
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>
    )};
export default Home;