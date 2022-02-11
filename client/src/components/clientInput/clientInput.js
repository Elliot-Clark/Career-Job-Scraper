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
        let city = document.getElementById("cityInput").value
        let zipCode = document.getElementById("zipCodeInput").value
        let country = document.getElementById("countryInput").value
        let USstate = document.getElementById("stateInput").value

        if (document.getElementById("Amazon").checked) {
            axios.post('/amazon', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, zipCode: zipCode, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        }
        
        if (document.getElementById("Paypal").checked) {
            axios.post('/paypal', {}, {
                params: { jobTitleSearch: jobSearchInput, city: city, zipCode: zipCode, country: country, USstate: USstate,}
            }).then(response => {
                this.props.handleCallBack(response.data);
            });
        }  
    }

    render() {
        return (
            <div id="inputArea">
                <h2>Careers Job Search:</h2>
                <div>
                    <input type="text" id="jobSearchInput" name="jobSearchInput" placeholder='Enter Job Here' defaultValue={"Janitor"}></input>
                    <input type="text" id="cityInput" name="cityInput" placeholder='City'></input>
                    <input type="number" id="zipCodeInput" name="zipCodeInput" placeholder="Zip Code" defaultValue={85262}></input>
                    <input type="text" id="countryInput" name="countryInput" placeholder='Country'></input>
                    <input type="text" id="stateInput" name="stateInput" placeholder='State' defaultValue={"Arizona"}></input>
                    <Checkbox 
                        handleCallBack = {this.props.handleCallBack}
                        jobTitleSearch = {this.state.jobTitleSearch}
                        city = {this.state.city}
                        zipCode = {this.state.zipCode}
                        country = {this.state.country}
                        USstate = {this.state.USstate}
                    />
                    <input type="button" value="Submit" onClick={this.initSearch}></input>
                </div> 
            </div>
        );
    }
    
}

    

export default ClientInput;
