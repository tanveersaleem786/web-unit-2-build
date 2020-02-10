import React, {useState, useEffect, useRef} from 'react'
import ShowProfile from './ShowProfile'
import AddProfileForm from './AddProfileForm'
import EditProfileForm from './EditProfileForm'
import Skill from '../Skill/Skill'
import Resume from '../Resume/Resume'
import Education from '../Education/Education'
import { axiosWithAuth } from '../../utils.js'
import "bootstrap/dist/css/bootstrap.min.css"
import '../JobSeeker.css'
import {TweenMax, Power3} from 'gsap';

const Profile = () => {

    const [employee, setEmployee] = useState([]);

    let profileTxt = useRef(null);

    useEffect(() => {

        const token = localStorage.getItem('token')
        const user = JSON.parse(atob(token.split('.')[1])) 
        
        axiosWithAuth()            
            .get(`https://droom1.herokuapp.com/api/employee/${user.id}`)          
          
            .then(res => {
                setEmployee(res.data);                
                 // Set employee in local storage.
                localStorage.setItem('employee', JSON.stringify(res.data));                                         
                console.log("Success:", res);
            })
            // do stuff with whatever gets returned
            .catch(err => {
            console.log("Error:", err.response);           
        });


        TweenMax.to(profileTxt,
            .8,
            {
                opacity:0,
                x:-200,
                ease: Power3.easeOut,
               

            }          
        )

        TweenMax.to(profileTxt,
            .8,
            {
                opacity:1,
                x:0,
                left: 50,
                ease: Power3.easeOut,
                delay:.5

            }      
        )
      

    }, []);



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const addProfile = (profile) => {
        setEmployee(profile);
    }

    const updateProfile = (updateProfile) => {
        setEmployee(updateProfile);
    }

    return (
        <div>
            <h2 ref={el => {profileTxt=el}} className="profile-title">Seeker Profile</h2>
            {employee.length === 0 ? (
                <div className="profile-content">
                 <section className="add-profile">
                <div className="section_content">
                    <div className="section_top_content">
                        <div className="section_action">
                            <div className="resume-header"><button className="btn  btn-lg add-button" onClick={handleShow}>Add Profile</button></div>
                        </div>
                    </div>
                    <AddProfileForm show={show} handleClose={handleClose} addProfile={addProfile} />
                </div>
                </section>
                </div>
               ) : (
                <div className="profile-content">
                    <ShowProfile employee={employee} handleEditShow={handleEditShow} />
                    <EditProfileForm editShow={editShow} handleEditClose={handleEditClose} employee={employee} updateProfile={updateProfile} />
                    <Skill employee={employee} />
                    <Resume employee={employee} />
                    <Education employee={employee} />
                </div>
             )}
        </div>
    )
}

export default Profile;