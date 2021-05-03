import React, { Component } from 'react';


class Icon extends Component{
    constructor(props){
        super(props);
        this.state = {
            pref: "icon-img icon-up",
            post: "icon-img icon-down",
        }

        this.iconEnter = this.iconEnterHandler.bind(this);
        this.iconLeave = this.iconLeaveHandler.bind(this);
        this.toPage = this.toPageHandler.bind(this);
    }

    iconEnterHandler(){
        let pref =  "icon-img icon-down";
        let post =  "icon-img icon-up";
        this.setState({pref, post});
    }

    iconLeaveHandler(){
        let post =  "icon-img icon-down";
        let pref =  "icon-img icon-up";
        this.setState({pref, post});
    }

    toPageHandler(){
        window.location = this.props.href;
    }

    render = () =>{
        return(
            <div onClick={this.toPage} onMouseEnter={this.iconEnter} onMouseLeave={this.iconLeave} className="icon">
                <img className={window.innerWidth>800?this.state.pref: "icon-img icon-down"} src={this.props.src} />
                <img className={window.innerWidth>800?this.state.post: "icon-img icon-up"} src={this.props.bg} />
            </div>
        )
    }
}


export default Icon;
