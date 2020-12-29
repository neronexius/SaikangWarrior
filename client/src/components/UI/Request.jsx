import React, { useState, useEffect } from "react";
import axios from "axios"
import token from "../Functions/giveToken"

function Request() {
    const [allRequest, setRequests] = useState({})
    async function getRequest(){
        try {
            let result = await axios.get("http://localhost:80/services/getRequest")
            setRequests(result.data.request)
        } catch (error) {
            
        }
    }

    async function accepter(e){
        try {
            await axios.put("http://localhost:80/services/updateRequest",{request: e.target.value},token())
            getRequest()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getRequest()
    }, [])
    return (
        <div className="requestpage">
            <h1>Request Page</h1>
            <div className="background"></div>
            <div className="request_container">
            {allRequest && allRequest.length>0 && allRequest.map((el)=>{
                if (!el.accepter){
                    return (
                    <div className="request_card">
                        <div className="card_top">
                        <div className="card_background" style={{backgroundImage: `url(${el.service.image})`}}></div>
                        <div className="card_title"><div>{el.service.name}</div></div>
                        </div>
                        <div className="card_description">{el.service.description}</div>
                        <div className="card_field_container">{el.fields.map((el,index)=>(
                            <div className="card_fields">
                                <div>{Object.keys(el)[0]} : </div> <div>{el[Object.keys(el)[0]]}</div>
                            </div>
                        ))}</div>
                        <div className="accept_container">
                        <button className="accept" onClick={accepter} value={el._id}>Accept ${el.service.price}</button>
                        </div>
                    </div>
                    )
                }
            })}
            </div>
        </div>
    )
}

export default Request
