import React from 'react';
import PropTypes from 'prop-types';
import City from './City';

class CityGroup extends React.Component {

    render() {
        return (
        this.props.cities.map(city => (
            <City key={city.section} 
                section={city.section} 
                selectedSection={this.props.selectedSection} 
                city={city.label} 
                onSelection={this.props.onSelection} 
            />
        ))
        );
    }
}

CityGroup.propTypes = {
    cities: PropTypes.array.isRequired,
    onSelection: PropTypes.func.isRequired,
    selectedSection: PropTypes.string
};

export default CityGroup;
