import React from 'react';
import Styles from "./Aboutstyle.module.css";
import { AiOutlineLinkedin } from "react-icons/ai";
import { CgMail} from "react-icons/cg";


const Card=(props)=>{
/**
  *   To show the 'about page' component in card style.
  */
    return (
        <div className={Styles.card}>
            <div>
                
                <img src={props.imagesrc} alt="teamImage"/>
                
                <h5>{props.name}</h5>
            </div>
            <div>
                <h5>
                    {props.designation}
                </h5>
                <div className={Styles.icons}>
                <a href="#"><AiOutlineLinkedin className={Styles.icon}/></a>
                <a href="#"> <CgMail className={Styles.icon}/></a>
                </div>
                
            </div>
            
        </div>
    )
}

export default Card;