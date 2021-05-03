import React, { Component } from 'react';

import ProductDetail from './ProductDetail';
import '../../css/Product.css';

class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            titleState: "sa-title",
            bgState: "sa-bg",
        }
        this.seeAllHover = this.seeAllHoverHandler.bind(this);
        this.seeAllLeave = this.seeAllLeaveHandler.bind(this);
        this.clickHandler = this.clickHandler_.bind(this);
    }

    seeAllHoverHandler(){
        let titleState =  "sa-title sa-title-light";
        let bgState =  "sa-bg sa-bg-move";
        this.setState({titleState, bgState});
    }

    seeAllLeaveHandler(){
        let titleState =  "sa-title";
        let bgState =  "sa-bg";
        this.setState({titleState, bgState});
    }

    clickHandler_(){
        window.location = this.props.redirect;
    }

    render = () =>{
        return(
        <div className="products-container" style={{height: `${window.innerHeight - 100}px`}}>
            <div className="products-title" style={{display: "block"}}>
                <h2>{this.props.title}</h2>
                <img src="/img/art.png"/>
            </div>
            <div onMouseEnter={this.seeAllHover} onClick={this.clickHandler} onMouseLeave={this.seeAllLeave} className="seeAll-btn">
                <button>
                    <span className={this.state.titleState}>Xem tất cả</span>
                    <span className={this.state.bgState}></span>
                </button>
            </div>
            <div className="products">
            {this.props.data.map(d =>
                <ProductDetail data = {d}>
                </ProductDetail>
            )}
            </div>
        </div>
        )
    }
}


export default Product;
