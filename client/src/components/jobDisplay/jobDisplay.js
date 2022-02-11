import React from 'react';
import './jobDisplay.css';

const JobDisplay = (props) =>  {

    const jobDisplay = props.companies.map((item, index) => {

        return (
            <div className="groupedJobList" key={index}>
                <a target="_blank" rel="noreferrer" className="companyTitle" href={props.searchlURLs[index]}>
                    <span>{item}</span>
                    <img src={require(`./logos/${item}.png`)} alt={item + " Logo"} ></img>
                </a>
                {props.jobs[index].length ? '' : <div className="NoResults">Nothing</div>}
                {   
                    props.jobs[index].map((item, index) => {
                        return (
                            <ul key={index}>
                                <a target="_blank" rel="noreferrer" href={item[1]} >
                                    <li>
                                        <div>
                                            <span className="jobTitle">{item[0]}</span>
                                            <br></br>
                                            <span className="jobLocation">{item[2]}</span>
                                            <br></br>
                                        </div>
                                        <div>
                                            <span className="jobPostDate">{item[3]}</span>
                                        </div>                                       
                                    </li>
                                </a>
                            </ul>
                        )
                    })
                }
            </div>
        )
    });

    return(
        <div id="jobDisplay">
            {jobDisplay}
        </div>
    )


}

export default JobDisplay

