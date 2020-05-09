import React from 'react';
import PropTypes from 'prop-types';

const ITEM_PADDING = 10;
class City extends React.Component {
    state = {
        hoverState: false
    } 
    element = React.createRef();

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    // to update hoverState based on mouseenter/mouseleve
    onHoverOfCity = () => {
        this.setState({
            hoverState: !this.state.hoverState
        })
    }
    
    // to update color and fontweight styles based on mouseenter/mouseleave/onclick
    getCityStyle = () => {
        return {
            boxSizing: "border-box",
            padding: `${ITEM_PADDING}px`,
            color: this.props.isSelected ? 'black' : (this.state.hoverState ? 'blue' : 'gray'),
            paddingBottom: "25px",
            fontWeight: this.props.isSelected ? '600' : '400'
        }
    }

    // call click handler of city with new width and height
    callCityClickHandler = (target, id) => {
        let width = target.getBoundingClientRect().width - 2 * ITEM_PADDING,
            left = target.getBoundingClientRect().left;

        this.props.onClickOfCity(id, width, left);
    }

    // get new left and width values after window resize
    onWindowResize = () => {
        setTimeout(() => {
            if(this.props.isSelected) {
                this.callCityClickHandler(this.element.current, this.props.id);
            }
        }, 500);
    }
    

    render() {
        return (
            <div ref={this.element} style={this.getCityStyle()} 
                onMouseEnter={this.onHoverOfCity} onMouseLeave={this.onHoverOfCity} 
                onClick={(event) => this.callCityClickHandler(event.target, this.props.id)}>
                    {this.props.city}
            </div>
        );
    }
}


City.propTypes = {
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    onClickOfCity: PropTypes.func.isRequired
};

export default City;
