import React, { Component } from 'react';
import $ from 'jquery';

class Carousel extends Component{
    constructor(props){
        super(props);
        this.state = {
            position: 0,
            margin: 0,
            distance: window.innerWidth>800? window.innerWidth*45/100: window.innerWidth,
        }
        this.resize = this.windowResize.bind(this);
        this.resize();
        this.next = this.nextHandler.bind(this);
        this.prev = this.prevHandler.bind(this);
    }

    windowResize(){
        if(window.innerWidth<800){
            this.setState({distance: window.innerWidth})
        }
        window.addEventListener('resize', ()=>{
            if(window.innerWidth > 800){
                this.setState({ distance: window.innerWidth*45/100 })
            }else{
                this.setState({distance: window.innerWidth*100})
            }
        });
    }
    nextHandler(){
        let length = document.getElementsByClassName('slide').length;
        let position = this.state.position;
        let distance = this.state.distance;
        let $this = this;

        let margin = -position*distance;
        if(position<length){
            position+=1;
            $('#mark').animate({
                marginLeft: `${margin}px`,
            });
        }
        this.setState({position});
    }
    prevHandler(){
        let length = document.getElementsByClassName('slide').length;
        let position = this.state.position;
        let distance = this.state.distance;
        if(position!=0){
            position-=1;
            let margin = -position*distance;
            $('#mark').animate({
                marginLeft: `${margin}px`,
            });
        }
        this.setState({position});
    }


    render = () =>{
        return(
            <div className="carousel">
                <div className="car-utils">
                    <span onClick={this.prev} style={{top: "35%"}} className="prev"/>
                    <span onClick={this.next} style={{top: "35%"}} className="next"/>
                </div>
                <div className="slides">
                    <div id="mark" />
                    <div className="slide" style={{backgroundImage: "url(/img/social/wall1.jpg)", width: `${window.innerWidth>800? window.innerWidth*45/100: window.innerWidth}px`}}>
                        <div className="gradient-theme">
                            <div className="slide-title">
                                <img src="/img/bg-fb.png" />
                                <h1 style={{color: "#4267B2", margin: "0"}}>Facebook</h1>
                                <span style={{color: "#4267B2", fontSize: "18px", fontStyle: "intalic", fontWeight: "bold"}}>https://www.facebook.com/huynhvan.cong.58/</span>
                            </div>
                        </div>
                    </div>
                    <div className="slide" style={{backgroundImage: "url(/img/social/wall2.jpg)", width: `${window.innerWidth>800? window.innerWidth*45/100: window.innerWidth}px`}}>
                        <div className="gradient-theme">
                            <div id="inst" className="slide-title">
                                <img src="/img/bg-inst.png" />
                                <h1 style={{margin: "0"}}>Instagram</h1>
                                <span style={{fontSize: "18px", fontStyle: "intalic", fontWeight: "bold"}}>https://www.instagram.com/mynupython/</span>
                            </div>
                        </div>
                    </div>
                    <div className="slide" style={{backgroundImage: "url(/img/social/wall3.jpg)", width: `${window.innerWidth>800? window.innerWidth*45/100: window.innerWidth}px`}}>
                        <div id="twi" className="gradient-theme">
                            <div className="slide-title">
                                <img src="/img/bg-twi.png" />
                                <h1 style={{margin: "0"}}>Twitter</h1>
                                <span style={{fontSize: "18px", fontStyle: "intalic", fontWeight: "bold"}}>Chúng tôi vừa bị đánh pây ặc Twitter</span>
                            </div>
                        </div>
                    </div>
                    <div className="slide" style={{backgroundImage: "url(/img/social/wall4.jpg)", width: `${window.innerWidth>800? window.innerWidth*45/100: window.innerWidth}px`}}>
                        <div id="meowth" className="gradient-theme">
                            <div className="slide-title">
                                <img src="/img/social/meo.png" />
                                <h1 style={{margin: "0"}}>~ meowth ~ </h1>
                                <span style={{fontSize: "18px", fontStyle: "intalic", fontWeight: "bold"}}>Chúng tôi có Offer đặc biệt cho những con Sen</span>
                                <a className="btn">Khám phá ngay :3</a>
                            </div>
                        </div>
                    </div>
                    <div className="slide" style={{backgroundImage: "url(/img/social/wall5.jpg)", width: `${window.innerWidth>800? window.innerWidth*45/100: window.innerWidth}px`}}>
                    </div>
                </div>
            </div>
        )
    }
}


export default Carousel;
