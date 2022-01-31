import React, { Component } from 'react';
import './customers.css';


class Customers extends Component {
 
    constructor() {
        super()
        this.state = {
            crawlerData: "",
            test: ''
        }
    }

    componentDidMount() {
        fetch('/api/test')
        .then(res => res.json())
        .then(crawlerData => this.setState({crawlerData}, () => console.log('Crawler Data fetched...')))
        setInterval(this.updateLoop, 1000);

    }

    updateLoop = () => {
        fetch('/api/test')
        .then(res => res.json())
        .then(crawlerData => this.setState({crawlerData}, () => console.log('Crawler Data fetched again........')))
    }

    render() {
        return (
            <div>
                <h2>Data</h2>
                {this.state.crawlerData}
            </div>
        );
    }
}

export default Customers;
