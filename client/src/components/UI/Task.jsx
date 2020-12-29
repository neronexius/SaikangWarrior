import React, {useState,useEffect} from 'react'
import axios from 'axios'
import token from '../Functions/giveToken'

function Task() {
    const [requestData, setRequestData]=useState({})
    async function getTask(){
        try {
            let result = await axios.get("http://localhost:80/user/loginUser/task",token())
            setRequestData(result.data.request.accepted)
        } catch (error) {
            console.log(error)
        }
    }

    async function doneTask(e){
        try{
            await axios.put("http://localhost:80/services/updateRequestStatus",{id: e.target.value},token())
            getTask()
        }catch(error){
            console.log(error)
        }
    }    
    useEffect(() => {
        getTask()
    }, [])

    return (
        <div className="taskPage">
            <h1>My Task</h1>
            <div className="background"></div>
            <div className="card_container">
            {requestData && requestData.length>0 && requestData.map((el)=>{
                if (!el.completed){
                return <div className="request_card">
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
                <button className="accept" onClick={doneTask} value={el._id}>Done </button>
                </div>
            </div>
                }
            })}
            </div>
        </div>
    )
}

export default Task
