import React, { Component } from 'react';
import Icon from './Icon';
import Carousel from './Carousel';


import '../../css/Social/Social.css';
import '../../css/Social/Mobile.css';


class Social extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentBackground: "/img/body-bg.jpg",
        }
    }




    render = () =>{
        return(
            <div className="social" style={{height: `${window.innerHeight-75}px`, backgroundImage: `url(${this.state.currentBackground})`}}>
                <div className="social-container" >
                    <div className="social-icon-zone">
                    <h1 style={{marginTop: "25%"}}>Chúng tôi có trên</h1>
                        <div className="icon-container">
                            <Icon src="/img/fb.png" bg="/img/bg-fb.png" href="https://www.facebook.com/huynhvan.cong.58" />
                            <Icon src="/img/inst.png" bg="/img/bg-inst.png" href="https://www.instagram.com/mynupython" />
                            <Icon bg="/img/bg-twi.png" href="/" src="/img/twi.png" />
                        </div>
                    </div>
                    <div className="social-carousel">
                        <Carousel/>
                    </div>
                </div>
            </div>
        )
    }
}


export default Social;
