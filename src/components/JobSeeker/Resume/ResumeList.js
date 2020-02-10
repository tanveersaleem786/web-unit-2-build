import React from 'react'

const ResumeList = (props)=> {

    return (
        <div>
            {props.resumes.length > 0 ? (
                props.resumes.map(resume => (
                <div key={resume.id}>
                    <div className="content-list">
                        <div className="educations">
                            <p><b>{resume.company_name}</b></p>
                            <p>{resume.title}</p>
                            <p>{resume.years} Years</p>
                        </div>    
                        <div>
                        <button className="btn btn-primary" onClick={() => props.editResume(resume)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => props.deleteResume(resume.id)} >Delete</button>
                        </div>
                    </div>
                    <hr></hr>
                </div>
                    ))
                ) : (
                <div>    
                    <span><b>No Resumes</b></span>
                </div>
            )}
        </div>
    )
}

export default ResumeList;