import {tokenCheck} from '../Functions/func'
import React, { useState, useEffect, createElement } from "react";
import axios from 'axios';
import token from '../Functions/giveToken'
import { useHistory } from "react-router-dom";

function Home({userData,setUserData}) {
    const [userRequest, setRequest] = useState([])
    let history = useHistory()
    useEffect(() => {
        getRequests()
       tokenCheck(setUserData)
    }, [])
    async function getRequests(){
        try{
        let requests = await axios.get("http://localhost:80/user/loginUser/requests",token())
        setRequest(requests.data.user)
        }
        catch(error){
            history.push("login")
            console.log(error)
        }
    }

    async function approveComplete(e){
        try {
            await axios.put("http://localhost:80/user/updateHistory",{id: e.target.value},token()) 
            getRequests()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <div className="home">
            <div className="background"></div>
            <h1>{userData.username}</h1>
            <div> Current services: </div>
            <div className="card_container">
            {userRequest.requests ? userRequest.requests.map((el)=>(
                <div className="card" style={el.completed ? {boxShadow: `2px 10px 10px rgb(145, 222, 145)`} : el.accepter ? {boxShadow: `2px 10px 10px rgb(255, 165, 0,1)`} : {boxShadow: `2px 10px 10px rgb(255, 255, 255, 1)`}}>
                <div className="card_background" style={{backgroundImage: `url(${el.service.image})`}}></div>
                <div className="card_content">{el.service.name}</div>
                <div className="card_footer" >{el.completed ? "Completed by: " : "Accepted by: "}  {el.accepter ? el.accepter.username : "Waiting..."}</div>
                <div className="card_schedule" >Scheduled on :
                <div>{el.date}</div>
                <div>{el.time}</div>
                </div>
                <div className="dimmer">
                <div className="card_description">Description: <span>{el.service.description}</span></div>
                <div className="card_fields">
                {el.fields.length>0 && el.fields.map((el)=>(
                    <div><span className="span1">{Object.keys(el)[0]} : </span> <span className="span2">{el[Object.keys(el)[0]]}</span></div>
                ))}
                </div>
                {el.completed && <button value={el._id} onClick={approveComplete} className="markComplete">Completed</button>}
                </div>
                </div>
            )): <div>You have no services</div>}
            </div>
            <h1>User History</h1>
            <div className="card_container">
            {userRequest.requestHistory ? userRequest.requestHistory.map((el)=>(
                <div className="card" style={el.completed ? {boxShadow: `2px 10px 10px rgb(145, 222, 145)`} : el.accepter ? {boxShadow: `2px 10px 10px rgb(255, 165, 0,1)`} : {boxShadow: `2px 10px 10px rgb(255, 255, 255, 1)`}}>
                <div className="card_background" style={{backgroundImage: `url(${el.service.image})`}}></div>
                <div className="card_content">{el.service.name}</div>
                <div className="card_footer" >{el.completed ? "Completed by: " : "Accepted by: "}  {el.accepter ? el.accepter.username : "Waiting..."}</div>
                <div className="card_schedule" >Scheduled on :
                <div>{el.date}</div>
                <div>{el.time}</div>
                </div>
                <div className="dimmer">
                <div className="card_description">Description: <span>{el.service.description}</span></div>
                <div className="card_fields">
                {el.fields.length>0 && el.fields.map((el)=>(
                    <div><span className="span1">{Object.keys(el)[0]} : </span> <span className="span2">{el[Object.keys(el)[0]]}</span></div>
                ))}
                </div>
                </div>
                </div>
            )): ""}
            </div>
        </div>
        </>
    )
}

export default Home
