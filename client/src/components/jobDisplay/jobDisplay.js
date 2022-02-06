import React from 'react';
import './jobDisplay.css';

const JobDisplay = (props) =>  {

    const filler = {
        replaceJobs: false,
        companies: ["Amazon"],
        searchlURLs: ["https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=relevant&&state%5B%5D=Arizona&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query=&base_query=Front%20End&city=&country=&region=&county=&query_options=&"],
        jobs: [
            [
                "Front-End Engineer II",
                "https://www.amazon.jobs/en/jobs/1791386/front-end-engineer-ii",
                "US, AZ, Tempe | Job ID: 1791386"
            ],
            [
                "Front End Engineer, FEE",
                "https://www.amazon.jobs/en/jobs/1745712/front-end-engineer-fee",
                "US, AZ, Tempe | Job ID: 1745712"
            ],
            [
                "Software Engineer - Many open jobs! Save time – apply once and you can be considered for multiple roles",
                "https://www.amazon.jobs/en/software-engineers/us?INTCMPID=JAAJCZ100003B",
                "10 locations in the United States"
            ],
            [
                "Front-End Engineer",
                "https://www.amazon.jobs/en/jobs/1874251/front-end-engineer",
                "US, AZ, Tempe | Job ID: 1874251"
            ],
            [
                "Senior Front End Engineer",
                "https://www.amazon.jobs/en/jobs/1745547/senior-front-end-engineer",
                "US, AZ, Tempe | Job ID: 1745547"
            ]
        ]
    }

    const jobDisplay = filler.companies.map((item, index) => {
        console.log(item);
        return (
            <div class="groupedJobList" key={index}>
                <a target="_blank" rel="noreferrer" href={filler.searchlURLs[index]}>{item}</a>
                {
                    filler.jobs.map((item, index) => {
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

