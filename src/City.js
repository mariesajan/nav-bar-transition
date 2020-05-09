import React from 'react';
import PropTypes from 'prop-types';

const ITEM_PADDING = 10;
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
    

    render() {
        return (
            <div ref={this.cityRef} style={this.getCityStyle()} 
                onMouseEnter={this.onHoverOfCity} onMouseLeave={this.onHoverOfCity} 
                onClick={(event) => this.props.onSelection(this.props.section, this.cityRef)}>
                    {this.props.city}
            </div>
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
