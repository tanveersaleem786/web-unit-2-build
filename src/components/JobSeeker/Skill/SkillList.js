import React from 'react'

const SkillList = (props)=> {

    return (
        <div>
            {props.skills.length > 0  ? (
                props.skills.map(skill => (
                <div key={skill.id}>
                    <div className="content-list">  
                        <span className="skills"><b>{skill.skill_name}</b></span>
                        <div>
                            <button className="btn btn-primary" onClick={() => props.editSkill(skill)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => props.deleteSkill(skill.id)} >Delete</button>
                        </div>
                        <div>
                    </div>
                    </div>
                    <hr></hr>
                    </div>
                    ))
                ) : (
                <div>    
                    <span><b>No Skills</b></span>
                </div>
            )}
        </div>
    )
}

export default SkillList;