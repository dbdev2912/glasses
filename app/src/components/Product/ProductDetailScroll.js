import React, { Component } from 'react';

class ProductDetailScroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            className: 'product',
        }
        this.mouseOn = this.mouseOnHandler.bind(this);
        this.mouseOut = this.mouseOutHandler.bind(this);
        this.moveToGlassesPage = this.moveToGlassesPageHandler.bind(this);
    }

    moveToGlassesPageHandler(){
        window.location = `/p/${this.props.data.product_id}`;
    }

    mouseOnHandler(){
        let className = 'product product-up';
        this.setState( {className} );
    }

    mouseOutHandler(){
        let className = 'product';
        this.setState( {className} );
    }


    render = () =>{
        let d = this.props.data;

        return(
            <div onClick={this.moveToGlassesPage} onMouseEnter={this.mouseOn} onMouseLeave={this.mouseOut} style={this.props.style} className="product-container">
                <div className={this.state.className} style={{width: "70%", maxWidth: "275px",margin: "auto"}}>
                    <div className="product-img">
                        <img src={d.url} />
                    </div>
                    <div className="product-content">
                        <p className="product-name">{d.product_name}</p>
                        <p className="product-price">{d.price}</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductDetailScroll;
