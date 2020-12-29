import React, { useState, useEffect } from "react";
import axios from "axios"
import token from "../Functions/giveToken"
import { useHistory } from "react-router-dom";

function Cart() {
    let history = useHistory()
    const [cart, setCart] = useState([])
    const [fieldsInputs,setFieldsInput]=useState({})
    const [totalPrice, setTotalPrice]=useState(0)
    async function getUserCarts(){
        try {
        let result = await axios.get("http://localhost:80/user//loginUserCart",token())
            setCart(result.data.user.carts)
            console.log(result.data.user.carts)
        }
        catch(error){
            console.log(error)
            history.push("/login")
        }
    }
    function calcTotal(){
        let amount = totalPrice
        cart.forEach((el)=>{
            console.log("price", el)
            amount += el.price
        })
        setTotalPrice(amount)
    }

    function changeHandler(e){
        let temp = cart
        
        temp.forEach((el)=>{
            if (el.name == e.target.id){
                console.log("in")
                el.fieldsneeded.forEach((ele,index)=>{
                    if (Object.keys(ele)[0] == e.target.name){
                        console.log(e.target.name)
                        el.fieldsneeded[index][e.target.name]= e.target.value
                    }
                })
            }
        })
        console.log(temp)
        setCart(temp)
    }

    function changeInputHandlier(e){
        setFieldsInput((input)=>({...input, [e.target.name]: e.target.value}))
    }
    async function submitToBackEnd(){
        try{
        await axios.post("http://localhost:80/services/submitRequest",{cart:cart}, token())
        getUserCarts()
        }
        catch(error){
            console.log(error)
        }
       }
    
    async function removeItem(e){
        try {
            await axios.put("http://localhost:80/user/deleteCart",{id: e.target.value},token())
            setTotalPrice(0)
            getUserCarts()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserCarts()
    }, [])
    useEffect(() => {
        calcTotal()
    }, [cart])
    return (
        <div className="cart">
            <h1>Cart</h1>
            <div className="background"></div>
            {cart && cart.map((el)=>(
                <div className="card"> 
                <img src={el.image}/>
                <div className="card_detail">
                    <div className="card_title">{el.name} ${el.price}</div>
                    <p>{el.description}</p>


                    {el.fieldsneeded.map((ele)=>(
                        <div className="inputs"><div className="inputName">{Object.keys(ele)[0]} : </div>
                        <input autocomplete="off" onChange={changeHandler} id={el.name} name={Object.keys(ele)[0]}/>
                        </div>
                        
                    ))}

                    </div>
                    <button onClick={removeItem} value={el._id}>X</button>
                </div>
            ))}
            {cart.length>0 ? <div className="checkout" onClick={submitToBackEnd} >CheckOut : ${totalPrice}</div> : <div>Cart is Empty</div>}
            <div className="empty"></div>
        </div>
    )
}

export default Cart
