import React, { createElement, useState } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";

function Post() {
    let history=useHistory()
    const [inputField, setInputField]=useState({})
    const [fieldInput, setFieldInput] = useState([])
    const [showImage,setImage] = useState("")
    function inputHandler(e){
        if(e.target.name== "image"){
            setImage(e.target.value)
        }
        setInputField((input)=>({...input, [e.target.name]: e.target.value}))

    }

    function fieldInputHandler(e){
        let field = document.querySelector(".field")
        if (field != ""){
        let obj = {[field.value]: ""}
        let index = fieldInput.findIndex((el)=>Object.keys(el)[0] == field.value)
        if (index == -1){
            setFieldInput([...fieldInput, obj])}
            field.value = ""
        }
        // setFieldInput([...fieldInput, obj])
    }

    async function retreiveAllServices(){
        console.log(fieldInput)
    }

    async function addServices(){
        try{
            await axios.post("http://localhost:80/services/addService",{name: inputField.name,image: inputField.image, description: inputField.description,price: inputField.price, fields: fieldInput})
            history.push("search")
        }
        catch(error){
            console.log(error)
        }
    }
    function removeFromList(e){
        let index = fieldInput.findIndex((el)=>Object.keys(el)[0] == e.target.value)
        let temp = [...fieldInput]
        temp.splice(index,1)
        setFieldInput(temp)
    }

    return (
        <div className="post">
            <h1>Can't find a service? Recommend one!</h1>
            <div className="background"></div>
            <div id="fields">
                <div>
                    <div className="inputs"><div>Name: </div> <input onChange={inputHandler} name="name" /></div>
                    <div className="inputs"><div>Image: </div> <input onChange={inputHandler} name="image" /></div>
                    <div className="inputs"><div>Description: </div> <input onChange={inputHandler} name="description" /></div>
                    <div className="inputs"><div>Price: </div> <input onChange={inputHandler} name="price" type="number" /></div>
                </div>
                <img src={showImage} className="image"/>
                <h1>Add the details needed for this task!</h1>
                <div className="inputs space">
                    <div>Fields :</div> <input className="field"/><button onClick={fieldInputHandler}>Add</button>
                </div>
                <div className="fieldsContainer">
                {fieldInput.map((tag)=>(
                    <button className="eachfield" onClick={removeFromList} value={Object.keys(tag)[0]} >{Object.keys(tag)[0]}</button>
                )) }
                </div>
                
            </div>
            <button className="tobackend" onClick={addServices}>Submit</button>
            
        </div>
    )
}

export default Post
