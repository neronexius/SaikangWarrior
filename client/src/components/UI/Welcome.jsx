import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useHistory } from "react-router-dom";

function Welcome() {
    let history = useHistory()
    function login(){
        history.push("login")
    }
useEffect(() => {
   AOS.init()
}, [])
    return (
        <div className="welcome">
            <div className="background1"></div>
            <h1 className="welcome_title" data-aos-duration='4000' data-aos-once="false" data-aos-delay="500" data-aos="fade-up" >Welcome to Saikang Warrior</h1>
            <p className="scroll_down" data-aos="ease-out">scroll down to understand more</p>
            <div data-aos="fade" className="intro_container" >
            <h1>Introducing "SaiKang Warriors"</h1>
            <p>Saikang warrior is an app that helps you to find the right person for your task! Now you would not have to do task by yourself! </p>
            </div>
            
            <div className="example2">
            <div data-aos="fade-left " className="question_container" >
                <h1 data-aos="fade-left">Why use SaiKang Warrior</h1>
                <p data-aos="fade-left">Ever wonder why you have to do some hassle tasks when you have other important things to do?</p>
                <p data-aos="fade-left">Ever tried to get someone to do something for you but ended up wasn't able to contact them or they simply just went missing?</p>
                <p data-aos="fade-left">Ever been so bored that you wish you could do something and earn some money without specific skills?</p>
                <p data-aos="fade-left">Ever felt tired or not in the mood to negotiate with people?</p>
                <h3 data-aos="fade-left"> SaiKang Warrior fixes that! And here's how...</h3>
            </div>
                <img data-aos="fade-right" src="https://proofthatblog.com/wp-content/uploads/2013/06/question-mark.jpg"/>
            </div>

            <p className="troll">WE HEARD YOU!</p>
            
            <div className="example1">
            <div>
            <h1 data-aos="fade-right">Want to clear your dishes? </h1>
            <p data-aos="fade-right">Step 1: Simply click on Services!</p>
            <p data-aos="fade-right">Step 2: Locate the service that you want!</p>
            <p data-aos="fade-right">Step 3: Add it to your cart!</p>
            <p data-aos="fade-right">Step 4: Fill up the required details!</p>
            <p data-aos="fade-right">Step 5: Checkout!</p>
            <p data-aos="fade-right">Step 6: Wait for people to pick up your task!</p>
            <p data-aos="fade-right">And there you go! Your task will be done in due time!</p>
            </div>
            <img data-aos="fade-left" src="https://image.freepik.com/free-vector/woman-is-washing-dishes-housewife-kitchen-cleaning-plates-after-dinner_101903-954.jpg"></img>
            </div>

            <div className="example2">
            <div>
            <h1 data-aos="fade-left">Can't find the Service you want? </h1>
            <p data-aos="fade-left">Step 1: Simply click on Post!</p>
            <p data-aos="fade-left">Step 2: Think of a service!</p>
            <p data-aos="fade-left">Step 3: Add an image that suits the theme!</p>
            <p data-aos="fade-left">Step 4: Add necessary fields needed for the service!</p>
            <p data-aos="fade-left">Step 5: Add a recommended price!</p>
            <p data-aos="fade-left">Step 6: Wait for approval!</p>
            <p data-aos="fade-left">And there you go! Once approve your service will go public!</p>
            </div>
            <img data-aos="fade-right" src="https://www.pngitem.com/pimgs/m/501-5017589_tablet-clip-cartoon-computer-cartoon-using-computer-png.png"></img>
            </div>

            <div className="example1">
            <div data-aos="fade-right">
            <h1 data-aos="fade-right">Want to earn Money during your free time?</h1>
            <p data-aos="fade-right">Step 1: Click on Requests!</p>
            <p data-aos="fade-right">Step 2: Browse all request that met your skills!</p>
            <p data-aos="fade-right">Step 3: Select a request!</p>
            <p data-aos="fade-right">Step 4: Monitor your tasks in the tasks</p>
            <p data-aos="fade-right">Step 5: Once complete click on done!</p>
            <p data-aos="fade-right">And you get money transferred to you</p>
            <p data-aos="fade-right" className="disclaimer">Disclaimer: Each service you picked up requires you to pay a certain amount of deposits, if task is not fulfilled, deposit will be given to the requester</p>
            </div>
            <img data-aos="fade-left" src="https://thumbs.dreamstime.com/b/pocket-money-falling-cartoon-banknote-coin-vector-flat-gold-coins-heap-bank-currency-sign-dollars-cash-bundle-banking-finance-178617205.jpg"/>
            </div>

            <div className="last">
            <h1> What are you waiting for? Join Today!</h1>
            <button onClick={login}>Sign Up</button>
            </div>


        
        </div>
    )
}

export default Welcome
