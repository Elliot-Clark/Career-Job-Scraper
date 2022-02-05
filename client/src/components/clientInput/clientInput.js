import React, { Component } from 'react';
import './clientInput.css';
import axios from 'axios';


class ClientInput extends Component {
    constructor() {
        super()
        this.state = {
            scraperData: "",
            mainSearchQuery: "Front End Web Developer",
            city: "Phoenix",
            filterWords: "Web",
            bannedWords: "Fullstack",
            Companies: "Apple etc..."

        }
    }

    jobSearchInit = () => {
        fetch('/api/test')
        .then(res => res.text())
        .then(scraperData => this.setState({scraperData}, () => console.log('Scraper Data fetched...')))
    }

    testSend = () => {
        if (!document.getElementById("jobSearchInput").value) {
            return
        }
        axios.post('/aaa', {}, {
            params: {
                One: 'feaffaf',
                Two: 'lnhy;thktr',
                Three: document.getElementById("jobSearchInput").value
            }
          });
    }


    render() {
        return (
            <div>
                <h2>Data:</h2>
                <button onClick={this.jobSearchInit}>Fetch Data</button>
                <button onClick={this.testSend}>Test Send</button>
                {this.state.scraperData}

                <div id="inputArea">
                    <input type="text" id="jobSearchInput" name="jobSearchInput" placeholder='Enter Job Here'></input>
                    <input type="button" value="Submit" onClick={this.testSend}></input>
                </div> 
            </div>
        );
    }
}

export default ClientInput;
