import React, {useState} from 'react'
import SkillList from './SkillList'
import AddSkillForm from './AddSkillForm'
import EditSkillForm from './EditSkillForm'
import { axiosWithAuth } from '../../utils.js'

const Skill = ({employee}) => {

    let employeeSkills = '';

    if ('skills' in employee) {
      employeeSkills = employee.skills;
    }

    const [skills, setSkills] = useState(employeeSkills ? [employeeSkills] : []);
    const [currentSkill, setCurrentSkill] = useState({ id: null, skill_name: ''});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const addSkill = skill => {

      skill && setSkills(skills => [...skills, skill]);
    }

    const editSkill = skill => {
      setCurrentSkill(skill);
      handleEditShow();

    }

    const updateSkill = (id, updateSkill) => {
      setSkills(skills.map(skill => (skill.id === id ? updateSkill : skill)))
    }

    const deleteSkill = id => {

      if (window.confirm("Are you sure your want to delete")) {

          axiosWithAuth()
            .delete(`https://droom1.herokuapp.com/api/skills/${id}`)
              .then(res => {
                console.log("Delete Skill", res);
                setSkills(skills.filter(skill => skill.id !== id));
              })
              // do stuff with whatever gets returned
              .catch(err => {
                console.log("Error:", err.response);          
          }); 
          
        } 
      
    }

    return (
        <section>
            <div className="section_content">
                <div className="section_top_content">
                    <h2 className="section_title">Skills &amp; Endorsements</h2>
                    <div className="section_action">
                        <div><button className="btn btn-success btn-lg" onClick={handleShow}>Add Skill</button></div>
                    </div>
                </div>
                <AddSkillForm show={show} handleClose={handleClose} addSkill={addSkill} />
                <SkillList  skills={skills} deleteSkill={deleteSkill} editSkill={editSkill} />
                <EditSkillForm editShow={editShow} handleEditClose={handleEditClose} currentSkill={currentSkill} updateSkill={updateSkill} />
            </div>
        </section>
    )
}

export default Skill;