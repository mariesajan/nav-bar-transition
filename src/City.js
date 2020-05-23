import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ITEM_PADDING = 10;
// to update color and fontweight styles based on mouseenter/mouseleave/onclick
getCityStyle = () => {
    const isSelected = (this.props.selectedSection === this.props.section) ;
    return {
        boxSizing: "border-box",
        padding: `${ITEM_PADDING}px`,
        color: isSelected
            ? 'black' 
            : (this.state.hoverState ? '#4795d5' : 'gray'),
        paddingBottom: "25px",
        fontWeight: isSelected  ? '600' : '400'
    }
}

const StyledCity = styled.div`
    box-sizing: border-box;
    padding: ${ITEM_PADDING}px;
    color: 
`;
class City extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverState: false
        } 
        this.cityRef = React.createRef();
        this.timer = null;
    }

    // to update hoverState based on mouseenter/mouseleve
    onHoverOfCity = () => {
        this.setState({
            hoverState: !this.state.hoverState
        })
    }
    
    render() {
        return (
            <StyledCity 
                ref={this.cityRef} 
                isSelected={this.props.selectedSection === this.props.section}
        
                onMouseEnter={this.onHoverOfCity} 
                onMouseLeave={this.onHoverOfCity} 
                onClick={(event) => this.props.onSelection(this.props.section, this.cityRef)}>
                {this.props.city}
            </StyledCity>
        );
    }
}


City.propTypes = {
    section: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
    selectedSection: PropTypes.string
};

export default City;
