import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

import Nav from './Nav/Nav';
import Intro from './Intro/Intro';
import Footer from './Footer/Footer';
import Social from './Social/Social';
import Product from './Product/Product';
import Credential from './Credential/Credential';
import NewMember from './NewMember/NewMember';
import Glasses from './Glasses/Glasses';
import Cart from './Cart/Cart';
import Offer from './Offer/Offer';
import AllProduct from './AllProduct/AllProduct';
import Trio from './Trio/Trio';

const axios = require('axios');

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            credential: "",
            data: [],
            creState: "hide",
            cartState: "hide",
            signed: false,
            cart: [],
        }
        this.windowScroll           = this.windowScrollHandler.bind(this);
        this.getProduct             = this.getProductHandler.bind(this);
        this.credentialShow         = this.credentialShowHandler.bind(this);
        this.sendCredentialRequest  = this.sendCredentialRequestHandler.bind(this);
        this.newMember              = this.newMemberHandler.bind(this);
        this.getSessionCredential   = this.getSessionCredentialHandler.bind(this);
        this.logOut                 = this.logOutHandler.bind(this);
        this.showCart               = this.showCartHandler.bind(this);
        this.addCart                = this.addCartHandler.bind(this);
        this.clearCart              = this.clearCartHandler.bind(this);
        this.orderConfirm           = this.orderConfirmHandler.bind(this);

        this.windowScroll();
        this.getProduct();
        this.getSessionCredential();
    }




    credentialShowHandler(){
        var creState;

        $('#init-click').click(); // ??????


        switch(this.state.creState){
            case "hide":
                creState = "show";

                $('.credential').show();

                $('#credential').animate({
                    right: "0px"
                });


                this.setState({creState});

                break;

            case "show":
                creState = "hide";

                $('#credential').animate({
                    right: "-400px"
                });
                setTimeout(()=>{
                    $('.credential').hide();
                }, 500);

                this.setState({creState});
                break;
        }
    }

    showCartHandler(){
        if(this.state.credential.customer_id){

            var cartState;
            switch(this.state.cartState){
                case "hide":
                cartState = "show";

                $('.cart').show();

                $('#cart').animate({
                    right: "0px"
                });


                this.setState({cartState});

                break;

                case "show":
                cartState = "hide";

                $('#cart').animate({
                    right: "-400px"
                });
                setTimeout(()=>{
                    $('.cart').hide();
                }, 500);

                this.setState({cartState});
                break;
            }
        }else{
            this.credentialShow();
        }
    }

    async addCartHandler(newGlasses){

        let cart = this.state.cart;
        let id = newGlasses.product_id;
        let filter = cart.filter(c => c.product_id === id);

        if(filter.length==0){

            let response = await axios.post('/addCart', { glasses: newGlasses }, { mode: "cors" });

            if(response.data.added){
                this.setState({cart: response.data.cart});
            }
        }
    }

    async clearCartHandler(){
        let cart = [];

        let response = await axios.post('/clearCart', {}, {mode: "cors"});

        this.setState({cart});
    }

    async orderConfirmHandler(){
        let cart = this.state.cart;
        if(cart.length>0){
            let response = await axios.post('/makeOrder', {cart}, {mode: "cors"});
            $('#clearCart').click();
            let orders = response.data.orders;
            let details = response.data.details;

            this.setState({orders, details});
        }
    }


    windowScrollHandler(){

        document.addEventListener('scroll', ()=>{
            if(window.pageYOffset > 0){
                this.setState({
                    navState: {
                        background: `white`,
                        color: "#888",
                    }
                });
            }else{
                this.setState({
                    navState: {
                        background: `transparent`,

                    }
                });
            }
        }, false);
    }

    async getProductHandler(){
        let response = await axios.get('/getProduct', {}, {mode: "cors"});

        let data = response.data.products;
        this.setState({data});
    }

    async sendCredentialRequestHandler(){
        let username = $('#username').val();
        let password = $('#password').val();
        if(username && password){

            let data = {
                username: username,
                password: password
            };

            let response = await axios.post('/login', data, {
                mode: "cors",
            });

            let credential = response.data.credential;
            if(response.data.signed){
                let signed = true;

                let orders = response.data.orders;
                let details = response.data.details;

                this.setState({signed, credential, orders, details});
            }else{
                let message = response.data.message;
                let signed = false;
                this.setState({signed, message});
            }
        }

    }

    async logOutHandler(){
        let response = await axios.post('/logout', {}, {
            mode: "cors",
        });
        let signed = false;
        let message = "";
        let cart = [];
        this.setState({signed, message, cart});
    }

    async getSessionCredentialHandler(){
        let response = await axios.get('/session',{}, {
            mode: "cors",
        });

        if(response.data.signed){
            let credential = response.data.credential;
            let signed = true;
            let cart = response.data.cart;
            let orders = response.data.orders;
            let details = response.data.details;
            this.setState({signed, credential, cart, orders, details});
        }else{
            let signed = false;
            let message = "";
            this.setState({signed, message});
        }
    }

    async newMemberHandler(){
        let nUser = $('#nUser').val();
        let nPass = $('#nPass').val();
        let nReen = $('#nReen').val();
        let nName = $('#nName').val();
        let nPhon = $('#nPhon').val();
        let nMail = $('#nMail').val();
        let nAddr = $('#nAddr').val();
        console.log(nUser + "   " + nPass + "   " + nReen + "   " + nName + "   " + nPhon + "   " + nMail + "   " + nAddr)

        if(nPass === nReen){
            let data = {
                nUser: nUser,
                 nPass: nPass,
                  nReen: nReen,
                   nName: nName,
                    nPhon: nPhon,
                     nMail: nMail,
                      nAddr: nAddr
                  }

            let response = await axios.post('/newCustomer', data, { mode: "cors" });

            let credential = response.data.credential;
            if(response.data.signed){
                $('.new-member').fadeOut(200);
                let signed = true;
                let cart = [];
                this.setState({signed, credential, cart});
            }else{
                let message = response.data.message;
                let signed = false;
                this.setState({signed, message});
            }
        }
    }

    render = () =>{
        if(this.state.data.length>0){

            return(
                <React.StrictMode>
                    <Router>
                        <Nav showCart={this.showCart} credentialShow={this.credentialShow} navState={this.state.navState} pop={this.state.data} />
                        <Credential signOut={this.logOut} signed={this.state.signed} credential={this.state.signed?this.state.credential:this.state.message} orders={this.state.orders?this.state.orders:[]} details={this.state.details?this.state.details:[]} sendCredentialRequest={this.sendCredentialRequest} credentialShow={this.credentialShow} />
                        <NewMember newMember={this.newMember} />
                        <Cart cart={this.state.cart?this.state.cart:[]} showCart={this.showCart} clearCart={this.clearCart} orderConfirm={this.orderConfirm} />
                            <Route path="/" exact render={(props)=>
                                <React.StrictMode>
                                    <Intro url="/img/head-bg.jpg"/>
                                    <Social />
                                </React.StrictMode>
                            }/>
                            <Route path="/p/:id" addCart={this.addCart} render={(props)=><Glasses addCart={this.addCart} match={props.match}/>}/>
                            <Route path='/explore' render={(props)=>
                                    <React.StrictMode>
                                        <Intro url="/img/cat-bg.jpg"/>
                                        <Offer />

                                        <Trio data={this.state.data.slice(0, 3)}/>
                                        <Product data = {this.state.data.filter(d => d.oriented_id==="m").slice(0, 4)} redirect="/cat/o/m" title="Kính cận cho nam nè"/>
                                        <Product data = {this.state.data.filter(d => d.oriented_id==="f").slice(0, 4)} redirect="/cat/o/f" title="Kính cận cho nữ nè"/>
                                        <Product data = {this.state.data.filter(d => d.oriented_id==="y").slice(0, 4)} redirect="/cat/o/y" title="Kính cận cho trẻ nè"/>


                                    </React.StrictMode>
                            }/>
                            <Route path="/cat/:type/:type_key" render={(props)=>
                                <React.StrictMode>
                                    <Intro url="/img/all-pro-bg.jpg"/>
                                    <AllProduct data={this.state.data} match={props.match} />
                                </React.StrictMode>
                            }/>
                    <Footer credentialShow={this.credentialShow}/>
                    </Router>
                </React.StrictMode>
            )
        }else{
            return(
                <React.StrictMode>

                </React.StrictMode>
            )
        }
    }
}

export default App;
