import React, { Component } from 'react';
import './clientInput.css';
import axios from 'axios';


class ClientInput extends Component {
    constructor() {
        super()
        this.state = {
            jobTitleSearch: "Front End Web Developer",
            city: "",
            USstate: "Arizona",
            country: "",
            resultsPerCompany: 5,
            filterWords: "Web",
            bannedWords: "Fullstack",
            Companies: "Apple etc..."

        }
    }

    // jobSearchInit = () => {
    //     fetch('/api/test')
    //     .then(res => res.text())
    //     .then(scraperData => this.setState({scraperData}, () => console.log('Scraper Data fetched...')))
    // }


    dataSend = () => {
        if (!document.getElementById("jobSearchInput").value) {
            return
        }
        this.props.toggleReplaceJobs();
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
            this.props.handleCallBack(response.data);
        });
    }


    render() {
        return (
            <div id="inputArea">
                <h2>Careers Job Search:</h2>
                <div>
                    <input type="text" id="jobSearchInput" name="jobSearchInput" placeholder='Enter Job Here' defaultValue={"Front End"}></input>
                    <input type="text" id="cityInput" name="cityInput" placeholder='City'></input>
                    <input type="text" id="countryInput" name="countryInput" placeholder='Country'></input>
                    <input type="text" id="stateInput" name="stateInput" placeholder='State' defaultValue={"Arizona"}></input>
                    <input type="number" id="numberOfResults" name="numberOfResults" min="1" max="10" defaultValue={5}></input>
                    <input type="button" value="Submit" onClick={this.dataSend}></input>
                </div> 
            </div>
        );
    }
}

export default ClientInput;
