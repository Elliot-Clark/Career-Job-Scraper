import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClientInput from './components/clientInput/clientInput';
import JobDisplay from './components/jobDisplay/jobDisplay';


class App extends Component {
  constructor() {
    super()
    this.state = {
      replaceJobs: false,
      companies: [],
      searchlURLs: [],
      jobs: []
    }
  }

  toggleReplaceJobs = () => {
      this.setState({ replaceJobs: true});
  }

  handleCallBack = (fetchedJobResults) => {
    if (!this.state.replaceJobs) {
      this.setState({ 
        companies: [this.state.companies, fetchedJobResults[0]],
        searchlURLs: [this.state.searchlURLs, fetchedJobResults[1]],
        jobs: [this.state.jobs, fetchedJobResults.slice(2)]
      }, () => {
      });
    }
    if (this.state.replaceJobs) {
      this.setState({ 
        replaceJobs: false,
        companies: [fetchedJobResults[0]],
        searchlURLs: [fetchedJobResults[1]],
        jobs: fetchedJobResults.slice(2)
      }, () => {
      });
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
  
          <img src={logo} className="App-logo" alt="logo" />
          <ClientInput handleCallBack = {this.handleCallBack} toggleReplaceJobs = {this.toggleReplaceJobs}/>
          <JobDisplay 
            companies = {this.state.companies}
            searchlURLs = {this.state.searchlURLs}
            jobs = {this.state.jobs}
          />
        </header>
      </div>
    );
  }

}

export default App;
