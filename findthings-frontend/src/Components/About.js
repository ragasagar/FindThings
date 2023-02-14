import React from 'react';
import Styles from "./Aboutstyle.module.css";
import img1 from "../Assets/image1.png";
import img2 from "../Assets/image2.png";
import img3 from "../Assets/image3.png";
import Card from "./Card";


/**   
 *   @component About:
  *   Will display the about page of the product. Shows details about the developers.
  */
export const About = () => {
    
    const team = [
        {
            name:"Sagar",
            designation:"Fullstack developer",
            linkedIn:"linkedurl",
            imagesrc:img3,

        },
        {
            name:"Pooja",
            designation:"Frontend developer",
            linkedIn:"linkedurl",
            imagesrc:img2,

        },
        {
            name:"Aditya",
            designation:"UI/UX Developer",
            linkedIn:"linkedurl",
            imagesrc:img1,

        }
       

    ]
    return (

        <div className={Styles.d}>
        <div className={Styles.heading}>
            <h1>About Us</h1>
        </div>
        <section className={Styles.section1}>
            <h2>Who We Are - </h2>
            <p>Creative people</p>
        </section >

        <section className={Styles.section1}>
           
            
        </section>

        <section className={Styles.section1}>
            <h2>Our Team</h2>
            {team.map((el,i)=><Card name={el.name} designation={el.designation} linkedIn={el.linkedIn} imagesrc={el.imagesrc} key={i}/>)}
        </section>
        
        </div>
    )
}
