import React from 'react'

const EducationList = (props)=> {

    return (
        <div>
            {props.educations.length > 0 ? (
                props.educations.map(education => (
                <div key={education.id}>
                    <div className="content-list">
                        <div className="educations">
                            <p><b>{education.school_name}</b></p>
                            <p>{education.degree_earned}</p>
                        </div>    
                        <div>
                        <button className="btn btn-primary" onClick={() => props.editEducation(education)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => props.deleteEducation(education.id)} >Delete</button>
                        </div>
                    </div>
                    <hr></hr>
                </div>
                    ))
                ) : (
                <div>    
                    <span><b>No Educations</b></span>
                </div>
            )}
        </div>
    )
}

export default EducationList;