import React, { Component } from 'react';

class OfferCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            contentState: "offer-content offer-content-show"
        }

        this.mouseEnter = this.mouseEnterHandler.bind(this);
        this.mouseLeave = this.mouseLeaveHandler.bind(this);
        this.mouseClick = this.mouseClickHandler.bind(this);
    }

    mouseEnterHandler(){
        let contentState = "offer-content offer-content-show";
        this.setState({contentState});
    }

    mouseLeaveHandler(){
        let contentState = "offer-content";
        this.setState({contentState});
    }

    mouseClickHandler(){
        console.log('click');
        window.location = `/offer/${this.props.data.offer_id}`;
    }

    componentDidMount = () =>{

    }

    render = () =>{
        return (
            <div onMouseEnter={this.mouseEnter} onMouseLeave = {this.mouseLeave} className="offer" style={{backgroundImage: `url(${this.props.data.bg})`}}>
                <div className={this.state.contentState} onClick={this.mouseClick}>
                    <div className="offer-title">
                        <h3>{this.props.data.offer_name}</h3>
                    </div>
                    <div className="offer-interval">
                        <span>Từ: </span>
                        <span className="offer-date">{this.props.data.from} </span>
                        <span className="offer-divider">Đến: </span>
                        <span className="offer-date">{this.props.data.to} </span>
                        <p>{this.props.data.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default OfferCard;
