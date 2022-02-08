import React from 'react';
import './clientInput.css';
import axios from 'axios';


const ClientInput = (props) => {
    let dataSend = () => {
        if (!document.getElementById("jobSearchInput").value) {
            return
        }
        props.toggleReplaceJobs();
        axios.post('/jobSearch', {}, {
            params: {
                jobTitleSearch: document.getElementById("jobSearchInput").value,
                city: document.getElementById("cityInput").value,
                country: document.getElementById("countryInput").value,
                USstate: document.getElementById("stateInput").value,
                resultsPerCompany: document.getElementById("numberOfResults").value,
            }
        }).then(response => {
            console.log(response.data);
            props.handleCallBack(response.data);
        });
    }


    return (
        <div id="inputArea">
            <h2>Careers Job Search:</h2>
            <div>
                <input type="text" id="jobSearchInput" name="jobSearchInput" placeholder='Enter Job Here' defaultValue={"Front End"}></input>
                <input type="text" id="cityInput" name="cityInput" placeholder='City'></input>
                <input type="text" id="countryInput" name="countryInput" placeholder='Country'></input>
                <input type="text" id="stateInput" name="stateInput" placeholder='State' defaultValue={"Arizona"}></input>
                <input type="number" id="numberOfResults" name="numberOfResults" min="1" max="10" defaultValue={5}></input>
                <input type="button" value="Submit" onClick={dataSend}></input>
            </div> 
        </div>
    );
}

    

export default ClientInput;
