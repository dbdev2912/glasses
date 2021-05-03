import React, { Component } from 'react';

import ProductDetail from '../Product/ProductDetail';

import '../../css/Trio/Trio.css';
import '../../css/Trio/Mobile.css';

class Trio extends Component {
    constructor(props){
        super(props);
        this.state = {
            to: "prev",

            Pleft: "trio-card trio-card-mid mid-to-left",
            Pmid: "trio-card trio-card-right right-to-mid",
            Pright: "trio-card trio-card-left left-to-right",

            Nleft: "trio-card trio-card-mid left-to-mid",
            Nmid: "trio-card trio-card-right mid-to-right",
            Nright: "trio-card trio-card-left right-to-left",

        }
        this.prev = this.prevHandler.bind(this);
        this.next = this.nextHandler.bind(this);
    }


    componentDidMount = () =>{

    }

    prevHandler(){
        let to = "prev";
        if(this.state.to==="prev"){
            let Pleft = this.state.Pleft;
            let Pmid = this.state.Pmid;
            let Pright = this.state.Pright;

            let tmp = Pleft;
            Pleft =  Pright;
            Pright =  Pmid;
            Pmid = tmp;


            let Nleft = this.state.Nleft;
            let Nmid = this.state.Nmid;
            let Nright = this.state.Nright;

            tmp = Nleft;
            Nleft =  Nmid;
            Nmid =  Nright;
            Nright = tmp;

            this.setState({to, Nleft, Nright, Nmid, Pleft, Pmid, Pright});
        }else{

            this.setState({to});
        }
    }

    nextHandler(){
        let to = "next";
        if(this.state.to==="next"){
            let Nleft = this.state.Nleft;
            let Nmid = this.state.Nmid;
            let Nright = this.state.Nright;



            let tmp = Nleft;
            Nleft =  Nmid;
            Nmid =  Nright;
            Nright = tmp;



            let Pleft = this.state.Pleft;
            let Pmid = this.state.Pmid;
            let Pright = this.state.Pright;

            tmp = Pleft;
            Pleft =  Pright;
            Pright =  Pmid;
            Pmid = tmp;

            this.setState({to, Nleft, Nright, Nmid, Pleft, Pmid, Pright});
        }else{

            this.setState({to});
        }
    }

    render = () =>{
        return (
            <div className="trio" style={{height: `${window.innerHeight - 100}px`, backgroundImage: `url(/img/trio-bg.jpg)`}}>
                <div className="utils">
                    <span className="next" onClick={this.next} style={window.innerWidth>800?{right: "50px", borderColor: "#fff"}: {right: "2px", borderColor: "#fff", top: "38%"}}/>
                    <span className="prev" onClick={this.prev} style={window.innerWidth>800?{left: "50px", borderColor: "#fff"}: {left: "2px", borderColor: "#fff", top: "38%"}}/>
                </div>
                <div className="trio-container">

                    <div className={this.state.to=="prev"? this.state.Pleft: this.state.Nleft}>
                        <div className="trio-pro-container">
                            <ProductDetail style={{width: "100%", background: "#fff"}} data={this.props.data[0]}/>
                        </div>
                    </div>

                    <div className={this.state.to=="prev"? this.state.Pmid: this.state.Nmid}>
                        <div className="trio-pro-container">
                            <ProductDetail style={{width: "100%", background: "#fff"}} data={this.props.data[1]}/>
                        </div>
                    </div>

                    <div className={this.state.to=="prev"? this.state.Pright: this.state.Nright}>
                        <div className="trio-pro-container">
                            <ProductDetail style={{width: "100%", background: "#fff"}} data={this.props.data[2]}/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Trio;
