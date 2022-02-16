import React, {Component} from 'react';
import './clientInput.css';
import Checkbox from './checkbox.js'
import axios from 'axios';


class ClientInput extends Component {
    constructor() {
        super()
        this.state = {
        }
      }

      initSearch = () => {
        if (!document.getElementById("jobSearchInput").value) {
            return
        }
        this.props.toggleReplaceJobs();

        let jobSearchInput = document.getElementById("jobSearchInput").value
        let country = document.getElementById("countryInput").value
        let USstate = document.getElementById("stateInput").value
        let city = document.getElementById("cityInput").value

        if (document.getElementById("adobe").checked) {
            axios.post('/adobe', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        }

        if (document.getElementById("amazon").checked) {
            axios.post('/amazon', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        }
        
        if (document.getElementById("paypal").checked) {
            axios.post('/paypal', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        }  

        if (document.getElementById("apple").checked) {
            axios.post('/apple', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 

        if (document.getElementById("uber").checked) {
            axios.post('/uber', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 

        if (document.getElementById("crateandbarrel").checked) {
            axios.post('/crateandbarrel', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        }
        
        if (document.getElementById("ebay").checked) {
            axios.post('/ebay', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 

        if (document.getElementById("microsoft").checked) {
            axios.post('/microsoft', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 

        if (document.getElementById("facebook").checked) {
            axios.post('/facebook', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 

        if (document.getElementById("sap").checked) {
            axios.post('/sap', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 
        
        if (document.getElementById("intuit").checked) {
            axios.post('/intuit', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 

        if (document.getElementById("shopify").checked) {
            axios.post('/shopify', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        } 
    }

    render() {
        return (
            <div id="inputArea">
                <h2>Careers Job Search:</h2>
                <div id="jobSearchInputContainer">
                    <label htmlFor="jobSearchInput">Job Search Input (required)</label>
                    <input type="text" id="jobSearchInput" name="jobSearchInput" placeholder='Enter Job Here' defaultValue={"Front End"}></input>
                </div>
                <div> 
                    <input type="text" id="countryInput" name="countryInput" placeholder='Country'></input>
                    <input type="text" id="stateInput" name="stateInput" placeholder='State' defaultValue={"Arizona"}></input>
                    <input type="text" id="cityInput" name="cityInput" placeholder='City' defaultValue={'Phoenix'}></input>
                </div>
                <div>
                    < Checkbox />
                    <input type="button" id="submit" value="Submit" onClick={this.initSearch}></input>
                </div> 
            </div>
        );
    }
    
}

    

export default ClientInput;
