import React from 'react';
import PropTypes from 'prop-types';
import City from './City';

class CityGroup extends React.Component {

  render() {
    return (
      this.props.cities.map(city => (
          <City key={city.section} 
            id={city.section} 
            isSelected={city.selected} 
            city={city.label} 
            onClickOfCity={this.props.onClickOfCity} 
            updatePosition={this.props.updatePosition} />
      ))
    );
  }
}

CityGroup.propTypes = {
    cities: PropTypes.array.isRequired
};

export default CityGroup;
