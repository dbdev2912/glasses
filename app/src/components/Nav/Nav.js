import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popular from './Popular';


import '../../css/Nav.css';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            credential: "",
            listState: "hide",
            listClass: "nav-list",
        }
        this.navMove = this.navMovehandler.bind(this);
    }

    navMovehandler(){
        if(this.state.listState=="hide"){
            let listState = "show";
            let listClass = "nav-list from-left";
            this.setState({listClass, listState});
        }else{
            let listState = "hide";
            let listClass = "nav-list to-left";
            this.setState({listClass, listState});
        }
    }

    render = () =>{
        return(
            <nav className="navbar" style={this.props.navState}>
                <div className="switcher" onClick={this.navMove}>
                    <span className="switcher-line"></span>
                    <span className="switcher-line"></span>
                    <span className="switcher-line"></span>
                    <span className="switcher-line"></span>
                </div>
                <ul className={this.state.listClass}>
                    <li className="nav-item">
                        <a href="/" className="nav-link">Trang chủ</a>
                    </li>
                    <Popular pop = {this.props.pop} className="nav-item">
                        <a className="nav-link">Phổ biến</a>
                    </Popular>
                    <li className="nav-item">
                        <a href='/explore' className="nav-link">Khám phá</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={this.props.credentialShow} id="customeSwicth" className="nav-link">Khách</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={this.props.showCart} className="nav-link">Giỏ hàng</a>
                    </li>
                </ul>
                <div className="nav-form">
                    <input className="search-bar" placeholder="Tìm kiếm" />
                    <button className="search-btn">
                        <img src="/img/lup.png"/>
                    </button>
                </div>
            </nav>
        )
    }
}

export default Nav;
