import React, { Component } from 'react';
import $ from 'jquery';


class ProductDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            className: 'product',
            detailBtnState: "pro-detail-btn pro-detail-btn-hide",
        }
        this.mouseOn = this.mouseOnHandler.bind(this);
        this.mouseOut = this.mouseOutHandler.bind(this);
        this.moveToGlassesPage = this.moveToGlassesPageHandler.bind(this);
    }

    moveToGlassesPageHandler(){
        window.location = `/p/${this.props.data.product_id}`;
    }

    mouseOnHandler(event){
        let className = 'product product-up';
        this.setState( { className } );

    }

    mouseOutHandler(event){
        let className = 'product';
        this.setState( { className } );
    }


    render = () =>{
        let d = this.props.data;

        return(
            <div onClick={this.moveToGlassesPage} onMouseEnter={this.mouseOn} onMouseLeave={this.mouseOut} style={this.props.style} className="product-container">
                <div className={this.state.className}>
                    <div className="product-img">
                        <img src={d.url} />
                    </div>
                    <div className="product-content">
                        <p className="product-name">{d.product_name}</p>
                        <p className="product-price"><span style={{color: "#333"}}>Giá: </span>{d.price}<sup>đ</sup></p>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductDetail;
