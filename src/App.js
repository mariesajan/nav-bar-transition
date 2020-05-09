import React from 'react';
import CityGroup from './CityGroup';
import navData from './navigation.json';
import styled from 'styled-components';

const ITEM_PADDING = 10;

const StyledMenuContainer = styled.nav`
  margin: 10px 20px;
  display: grid;
  justify-content: space-around;
  grid-auto-flow: column;
`;


const StyledTimeContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 50px;
`;

const StyledNavLineContainer = styled.div`
  position: relative;
  top: -20px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  border-bottom: 1px solid black;
  transition: left 300ms ease, width 300ms ease;
`;
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
  
  render() {
    return (
      <div>
        <StyledMenuContainer>
          <CityGroup 
            cities={this.state.cities} 
            onSelection={this.onSelection} 
            selectedSection={this.state.selectedSection} 
          />
          </StyledMenuContainer>
        <StyledNavLineContainer 
          left={this.state.leftOfLine}
          width={this.state.widthOfLine}/>
        <hr  style={lineStyle} />
        <StyledTimeContainer>
          {this.state.time}
        </StyledTimeContainer>
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




export default App;
