import React from 'react';
import CityGroup from './CityGroup';
import navData from './navigation.json';

const ITEM_PADDING = 10;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      cities: navData.cities,
      leftOfLine: 0,
      widthOfLine: 0,
      time: '',
      selectedSection: null, // to get the value of selected city 
      selectedCityRef: null,  // to handle the left and width position of nav underline
    };
  }
 
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
  }

  // on window resize, call onSelection() if city is selected 
  onWindowResize = () => { 
      if(this.timer) {
          window.cancelAnimationFrame(this.timer);
      }
      this.timer = window.requestAnimationFrame(() => {
          if(this.state.selectedSection) {
              this.onSelection(this.state.selectedSection, this.state.selectedCityRef);
          }
      })
  }

  // update the states city, left and width (to handle underline of City and update time)
  onSelection = (section, cityRef) => {
    let width = cityRef.current.getBoundingClientRect().width - 2 * ITEM_PADDING,
        left = cityRef.current.getBoundingClientRect().left;
    this.setState({
      leftOfLine: left,
      widthOfLine: width,
      selectedSection: section,
      selectedCityRef: cityRef
    })
    this.setTime(section); // to update the state 'time' when city is clicked
  }

  // to update state 'time' based on timezone name
  setTime = (id) => { 
    let timezoneName = '', time = '';
    
    this.state.cities.map(city => {
      if(city.section === id) {
        timezoneName =  city["timezoneName"];
      }
      return timezoneName;
    });
    time = new Date().toLocaleTimeString('en-US', {timeZone: timezoneName});
    time = time.replace(/:\d+ /, ' '); //to extract only hours and minutes
    this.setState({
      time: time
    });
  }

  

  getNavLineStyle = () => {
    return {
      position: "relative",
      top: "-20px",
      left: this.state.leftOfLine,
      width: this.state.widthOfLine,
      borderBottom: "1px solid black",
      transition: "left 300ms ease, width 300ms ease"
    }
  }
  render() {
    return (
      <div>
        <nav style={cityContainer}>
          <CityGroup 
            cities={this.state.cities} 
            onSelection={this.onSelection} 
            selectedSection={this.state.selectedSection} 
          />
        </nav>
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
  display: "grid",
  justifyContent: "space-around",
  gridAutoFlow: "column"
};

const timeStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "50px"
};

export default App;
