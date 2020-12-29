import React, { useState, useEffect } from "react";
import axios from "axios"
import token from "../Functions/giveToken"
import {useHistory} from "react-router-dom"
function Search() {
    const [allServices,setServices] = useState([])
    const [cart, setcart] = useState([])
    let history = useHistory()
    async function getServices(){
        try {
        let result = await axios.get("http://localhost:80/services")
            setServices(result.data.service)
        }
        catch(error){
            console.log(error)
        }
    }

    function addToCart(e){
        let temp = cart
        console.log(e.target.id)
        let index = temp.indexOf(e.target.id)
        if (index == -1){
            setcart([...cart, e.target.id])
        }
        else{
            temp.splice(index,1);
            setcart([...cart.splice(e.target.id,1)])
        }
    }

    useEffect(() => {
    }, [cart])

    function addCart(e){
        let temp = cart
        let index = temp.indexOf(e.target.value)
        if (index == -1){
            temp.push(e.target.value)
            setcart(temp)
        }
        else{
            temp.splice(index,1);
            setcart(temp)
        }
    }

    async function buyCart(){
        try {
            console.log("click")
            await axios.post("http://localhost:80/services/addtocart",{cart: cart},token())
            history.push("/cart")
        } catch (error) {
            console.log(error)
        }
    }

    async function searchService(e){
        try{
            let result = await axios.put("http://localhost:80/services/specific",{name: e.target.value})
            setServices(result.data.service)
            console.log(result)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        getServices()
    }, [])
    return (
        <div className="search">
            <h1>Search Page</h1>
            <input className="searchInput"onChange={searchService} placeholder="Search for a service"/>
            <div className="background"></div>
            {allServices && allServices.map((el)=>(
                <div className="card">
                <img src={el.image}/>
                <div className="card_content">
                <div>{el.name}</div>
                <div>{el.description}</div>
                </div>
                <div className="card_price">${el.price}</div>
                <button onClick={addToCart} id={el.name}>Add</button>
                </div>
            ))}
            <div className="selectedServices">
            <div className="selectedTitle">Selected</div>
            {cart && cart.map((el)=>(
                <div className="selected_content">{el}</div>
            ))}
            <button onClick={buyCart}>Add To Cart</button>
            </div>
        </div>
    )
}

export default Search
