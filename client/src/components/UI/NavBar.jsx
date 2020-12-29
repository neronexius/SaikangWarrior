import React from 'react'
import { useHistory } from "react-router-dom";

function NavBar({userData,setUserData}) {
    let history = useHistory()
    function nav_toggle(){
        if (document.getElementById("nav_options").style.transform != "translateY(0%)"){
        document.getElementById("nav_options").style.transform = "translateY(0%)"
        }
        else{
            document.getElementById("nav_options").style.transform = "translateY(-100%)"
        }
    }

    function homepage(){
        history.push("home")
        nav_toggle()
    }

    function search(){
        history.push("search")
        nav_toggle()
    }

    function logout(){
        localStorage.removeItem("token")
        setUserData({})
        history.push("login")
        nav_toggle()
    }
    function login(){
        history.push("login")
        nav_toggle()
    }

    function cart(){
        history.push("cart")
        nav_toggle()
    }

    function post(){
        history.push("post")
        nav_toggle()
    }

    function request(){
        history.push("request")
        nav_toggle()
    }

    function mytask(){
        history.push("task")
        nav_toggle()
    }
    return (
        <div className="nav_all">
        <div className="nav_hider" onClick={nav_toggle}><i class="fas fa-align-justify margin_top"></i></div>
        <div className="nav_container">
        <nav id="nav_options">
            <ul>
                <li onClick={homepage}>
                <div className="home-icon"><i class="fas fa-home"></i></div>
                </li>
                <li onClick={search}>
                <div class="about-icon"><i class="fas fa-search"></i>
                </div>
                </li>
                <li onClick={post}>
                <div class="work-icon"><i class="fas fa-location-arrow"></i>
                </div>
                </li>
                <li onClick={cart}>
                <div class="mail-icon"><i class="fas fa-shopping-cart"></i>
                </div>
                </li>
                <li onClick={request}>
                <div class="mail-icon"><i class="fas fa-money-bill"></i>
                </div>
                </li>
                <li onClick={mytask}>
                <div class="mail-icon"><i class="fas fa-thumbtack"></i>
                </div>
                </li>
                <li onClick={logout}>
                <div class="mail-icon"><i class="fas fa-sign-out-alt"></i>
                </div>
                </li>
            </ul>
        </nav>
        </div>
        </div>
    )
}

export default NavBar
