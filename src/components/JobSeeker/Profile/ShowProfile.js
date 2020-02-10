import React from 'react'

const ShowProfile = (props)=> {

    return (
        <section className="resume-header">
            <div className="section_content">
                <h2 className="section_title resume-title">{props.employee.name}</h2>
                <p><a href={props.employee.portfolio_link} target="_blank">{props.employee.portfolio_link}</a></p>
                <button className="btn btn-primary" onClick={() => props.handleEditShow()}>Edit</button>
            </div>
        </section>
    )
}

export default ShowProfile;