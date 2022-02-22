import React, { Component } from 'react';
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
      notes: [],
      jobs: []
    }
  }

  toggleReplaceJobs = () => {
      this.setState({ replaceJobs: true});
  }
  handleCallBack = (fetchedJobResults) => {
    if (!this.state.replaceJobs) {
      this.setState({ 
        companies: this.state.companies.concat([fetchedJobResults[0]]),
        searchlURLs: this.state.searchlURLs.concat([fetchedJobResults[1]]),
        notes: this.state.notes.concat([fetchedJobResults[2]]),
        jobs: this.state.jobs.concat([fetchedJobResults.slice(3)])
      }, () => {
      });
    }
    if (this.state.replaceJobs) {
      this.setState({ 
        replaceJobs: false,
        companies: [fetchedJobResults[0]],
        searchlURLs: [fetchedJobResults[1]],
        notes: [fetchedJobResults[2]],
        jobs: [fetchedJobResults.slice(3)]
      }, () => {
      });
    }
  }

  render () {
    return (
      <div className="App">
        <ClientInput 
          handleCallBack = {this.handleCallBack} 
          toggleReplaceJobs = {this.toggleReplaceJobs}
        />
        <JobDisplay 
          companies = {this.state.companies}
          searchlURLs = {this.state.searchlURLs}
          jobs = {this.state.jobs}
          notes = {this.state.notes}
        />
      </div>
    );
  }

}

export default App;
