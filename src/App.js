import React from 'react';
import CityGroup from './CityGroup';
import navData from './navigation.json';

class App extends React.Component {
  state = {
    cities: navData.cities,
    leftOfLine: 0,
    widthOfLine: 0,
    time: ''
  }

  // update the states city, left and width (to handle underline of City and update time)
  onClickOfCity = (id, width, left) => {
    this.setState({
      cities: this.state.cities.map(city => {
        city.section===id ? city.selected = true : city.selected = false;
        return city;
      }),
      leftOfLine: left,
      widthOfLine: width
    })
    this.getTime(id); // to update the timezone when city is clicked
  }

  // to find time based on timezone name
  getTime = (id) => { 
    let timezoneName = '', time = '';
    
    this.state.cities.map(city => {
      if(city.section === id) {
        timezoneName =  city["timezone-name"];
      }
      return timezoneName;
    });
    time = new Date().toLocaleTimeString('en-US', {timeZone: timezoneName});
    time = time.replace(/:\d+ /, ' '); //to extract only hours and minutes
    this.setState({
      time: time
    });
  }

  // update left and width value based on clicked city to handle nav line style
  updatePosition = (left, width) => {
    this.setState({
      leftOfLine: left,
      widthOfLine: width
    })
  } 

  getNavLineStyle = () => {
    return {
      position: "relative",
      top: "-20px",
      left: this.state.leftOfLine,
      width: this.state.widthOfLine,
      borderBottom: "1px solid black",
      transition: "left 1s ease, width 1s ease"
    }
  }

  render() {
    return (
      <div>
        <div style={cityContainer}>
          <CityGroup cities={this.state.cities} onClickOfCity={this.onClickOfCity} 
            updatePosition={this.updatePosition} />
        </div>
        <div style={this.getNavLineStyle()}> </div>
        <hr  style={lineStyle} />
        <div style={timeStyle}>
          {this.state.time}
        </div>
      </div>
        
    );
  }
}

const lineStyle = {
  position: "relative",
  top: "-20px",
  margin: "0 20px",
  backgroundColor: "lightgray",
  height: "1px",
  border: "none"
};
const cityContainer = {
  margin: "10px 20px",
  display: "flex",
  justifyContent: "space-around",
};

const timeStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "50px"
};

export default App;
