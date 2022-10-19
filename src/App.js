import './App.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import '/node_modules/primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import axios from "axios";
import React from 'react';
import PrimeReact from "primereact/api";
import {Button, InputText} from "primereact";

PrimeReact.inputStyle = 'outlined';

function App() {
  return (
    <div className="App">
      <LinkInput/>
    </div>
  );
}

class LinkInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
    }

    render() {
        return(
            <div className="card">
              <h1 className="center-text">Convert a YouTube video to MP3</h1>
          <div className="p-inputgroup">
              <Button icon="pi pi-link" className="p-button-secondary"/>
              <InputText value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} placeholder="Paste YouTube link here" style={{width: '60%'}}/>
              <Button icon="pi pi-arrow-down" className="p-button-danger" onClick={this.onDownloadClick.bind(this)}/>
          </div>
            </div>
        );
      }

      updateInputValue = (evt) => {
        const val = evt.target.value;
        this.setState({
            inputValue: val
        });
    }


    onDownloadClick() {
        console.log(this.state.inputValue);
        axios({
            url: 'https://localhost:7136/api/mp3/download?link=' + this.state.inputValue, //your url
            method: 'POST',
            responseType: 'blob', // important
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'ytvideo.mp3'); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }
}


export default App;
