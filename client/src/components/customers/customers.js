import React, { Component } from 'react';
import './customers.css';


class Customers extends Component {
 
    constructor() {
        super()
        this.state = {
            crawlerData: ""
        }
    }

    componentDidMount() {
        fetch('/api/test')
        .then(res => res.json())
        .then(crawlerData => this.setState({crawlerData}, () => console.log('Crawler Data fetched...')));
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
