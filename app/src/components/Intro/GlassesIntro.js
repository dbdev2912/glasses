import React, { Component } from 'react';

import '../../css/Intro.css';

class GlassesIntro extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }




    render = () =>{
        return(
            <div className="head-intro" style={{backgroundImage: `url(${this.props.url})`, height: window.innerHeight/3, filter: "blur(8px)"}}>
            </div>
        )
    }
}


export default GlassesIntro;
