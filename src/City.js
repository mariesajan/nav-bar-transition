import React from 'react';
import PropTypes from 'prop-types';

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
    // to get left and width of clicked city using getBoundingClientRect to pass to parent function.
    onClickOfCity = (event, id) => {
        const width = event.target.getBoundingClientRect().width,
            left = event.target.getBoundingClientRect().left;
        this.props.onClickOfCity(id, width, left);
    }
    // to update color and fontweight styles based on mouseenter/mouseleave/onclick
    getCityStyle = () => {
        return {
            margin: "10px",
            color: this.props.isSelected ? 'black' : (this.state.hoverState ? 'blue' : 'gray'),
            paddingBottom: "15px",
            fontWeight: this.props.isSelected ? '600' : '400'
        }
    }

    // get new left and width values after window resize
    onWindowResize = () => {
        setTimeout(() => {
            if(this.props.isSelected) {
                let width = this.element.current.getBoundingClientRect().width,
                    left = this.element.current.getBoundingClientRect().left;
                this.props.onClickOfCity(this.props.id, width, left);
            }
        }, 500);
    }
    

    render() {
        return (
            <div ref={this.element} style={this.getCityStyle()} 
                onMouseEnter={this.onHoverOfCity} onMouseLeave={this.onHoverOfCity} 
                onClick={(event) => this.onClickOfCity(event, this.props.id)}>
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
