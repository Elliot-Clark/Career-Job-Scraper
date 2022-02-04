import React, { Component } from 'react';
import './clientInput.css';


class ClientInput extends Component {
 
    constructor() {
        super()
        this.state = {
            scraperData: "",
        }
    }

    jobSearchInit = () => {
        fetch('/api/test')
        .then(res => res.json())
        .then(scraperData => this.setState({scraperData}, () => console.log('Scraper Data fetched...')))
    }

    render() {
        return (
            <div>
                <h2>Data:</h2>
                <button onClick={this.jobSearchInit}>Fetch Data</button>
                {this.state.scraperData}
            </div>
        );
    }
}

export default ClientInput;
