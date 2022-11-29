import React from 'react';
import axios from 'axios'
import { Select, Card } from 'antd';
import { API1, API2 } from "./backend";
import Container from 'react-bootstrap/Container';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      weather: [],
      country_name: "",
      show: false
    }

  }


  componentDidMount = () => {
    this.fetchcountries()
  }

  fetchcountries = () => {
    axios.get(`${API1}/countries`).then(res => {
      this.setState({
        countries: res.data.data,
      })
    })
  }


  onChange = (value) => {
    axios.get(`${API2}?q=${value}&APPID=794ee95e63c5a32aaf88cd813fa2e425`).then(res => {
      this.setState({
        weather: res.data,
        country_name: value,
        show: true,
      })
    })
  };


  render() {

    const countriesvalue = this.state.countries.map(item => (
      <option key={item.country} value={item.country}>
        {item.country}
      </option>
    ))

    return (
      <div className="container mt-5 pt-2">
        <div className='row'>
          <div className='col-6'>
            <h4>Select a Country to view Weather Details:</h4>
            <Select
              showSearch
              placeholder="Select a country"
              optionFilterProp="children"
              onChange={this.onChange}
              style={{ width: "100%" }}
            >
              {countriesvalue}
            </Select>
          </div>
          {this.state.show &&
            <Card title={`Weather Details`} style={{ width: "100%" }} className="col-6">
              <h5><b>#Country Name:</b></h5>
              <p>{this.state.country_name}</p>
              <h5><b>#Temperature Data:</b></h5>
              <p className='mb-0'><b>Temperature:</b> {this.state.weather.main.temp}</p>
              <p className='mb-0'><b>Max Temperature:</b> {this.state.weather.main.temp_max}</p>
              <p><b>Min Temperature:</b> {this.state.weather.main.temp_min}</p>
              <h5><b>#Humidity:</b></h5>
              <p>{this.state.weather.main.humidity}</p>
              <h5><b>#Wind Data:</b></h5>
              <p className='mb-0'><b>Degree:</b> {this.state.weather.wind.deg}</p>
              <p className='mb-0'><b>Gust:</b> {this.state.weather.wind.gust}</p>
              <p className='mb-0'><b>Speed:</b> {this.state.weather.wind.speed}</p>
            </Card>}
        </div>
      </div>
    );
  }
}
export default App;