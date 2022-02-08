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
                {
                    props.jobs.map((item, index) => {
                        if (!props.jobs[index][0]) {
                            return ''
                        }
                        return (
                            <ul key={index}>
                                <a target="_blank" rel="noreferrer" href={item[1]} >
                                    <li>
                                        {item[0]}
                                        <br></br>
                                        {item[2]}
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

