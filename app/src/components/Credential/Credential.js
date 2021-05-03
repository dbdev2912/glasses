import React, { Component } from 'react';
import CreForm from './CreForm';
import Customer from './Customer';
import $ from 'jquery';

import '../../css/Credential/Credential.css';
import '../../css/Credential/Mobile.css';

class Credential extends Component{
    constructor(props){
        super(props);
        this.state = {
        }

        this.classify = this.classifyHandler.bind(this);
        this.switchActive = this.switchActiveHandler.bind(this);
        this.classify();
    }

    renderArray(list, cri){
        let arr = [];
        for(var i = 0; i< list.length; i++){
            if(list[i].status == cri){
                arr.push(list[i]);
            }
        }
        return arr;
    }

    classifyHandler(){

        let accepted = this.renderArray(this.props.orders, "accepted");
        let shipped = this.renderArray(this.props.orders, "shipped");
        let done =  this.renderArray(this.props.orders, "done");
        this.setState({accepted, shipped, done});
    }

    switchActiveHandler(type){
        this.classify();
        var orders, details;
        switch (type) {
            case "accepted":
                orders = this.state.accepted;
                this.setState({orders});
                break;
            case "shipped":
                orders = this.state.shipped;
                this.setState({orders});
                break;
            case "done":

                orders = this.state.done;
                this.setState({orders});
                break;
        }
    }

    render = () =>{
        if(!this.props.signed){
            return(
                <div className="credential">
                    <div onClick={this.props.credentialShow} className="cre-false-theme"/>
                    <div id="credential" className="credential-theme" style={{height: `${window.innerHeight}px`}}>
                        <button onClick={this.props.credentialShow} className="cre-close">
                            <span className="x-left"/>
                            <span className="x-right"/>
                        </button>
                        <CreForm message={this.props.credential} sendCredentialRequest={this.props.sendCredentialRequest} />
                    </div>
                </div>
            )
        }else{
            return(
                <div className="credential">
                    <div onClick={this.props.credentialShow} className="cre-false-theme"/>
                    <div id="credential" className="credential-theme" style={{height: `${window.innerHeight}px`}}>
                        <button onClick={this.props.credentialShow} className="cre-close">
                            <span className="x-left"/>
                            <span className="x-right"/>
                        </button>
                        <Customer switchActive={this.switchActive} orders={this.state.orders?this.state.orders:[]} details={this.props.details} signOut={this.props.signOut} data={this.props.credential}/>
                    </div>
                </div>
            )
        }
    }
}


export default Credential;
