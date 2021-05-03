import React, { Component } from 'react';
import '../../css/Cart/Cart.css';
import $ from 'jquery';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render = () =>{
        if(this.props.cart.length !== 0){
            return(
                <div className="cart" style={{height: `${window.innerHeight}px`}}>
                    <div onClick={this.props.showCart} className="cart-false-theme"></div>
                    <div id="cart" className="cart-container">

                        <button onClick={this.props.showCart} className="cre-close">
                            <span className="x-left"/>
                            <span className="x-right"/>
                        </button>

                        <div className="form-title">
                            <h1>Giỏ hàng</h1>
                            <span>Một ngày tốt lành nhé!</span>
                            <img src="/img/art.png"/>
                        </div>
                        <div className="cart-products" style={{height: `${window.innerHeight-125}px`}}>
                        {this.props.cart.map(c =>
                            <div className="cart-product">
                                <div className="cart-img">
                                    <img src={c.url}/>
                                </div>
                                <div className="cart-content">
                                    <h3 className="cart-pro-name">{c.product_name}</h3>
                                    <p className="cart-price"><span className="cart-price-title">Giá: </span> {c.price}<sup>đ</sup></p>
                                    <div className="cart-hori-gr">
                                        <div className="cart-hori-child">
                                            <span>Chất liệu: </span><span className="cart-infor"> {c.material_name}</span>
                                        </div>
                                        <div className="cart-hori-child">
                                            <span>Loại: </span><span className="cart-infor"> {c.type_group}</span>
                                        </div>
                                    </div>
                                    <div className="cart-hori-gr">
                                        <div className="cart-hori-child">
                                            <span>Nhãn hiệu: </span><span className="cart-infor"> {c.brand_name}</span>
                                        </div>
                                        <div className="cart-hori-child">
                                            <span>Dành cho: </span><span className="cart-infor"> {c.oriented_name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}

                            <div className="confirm">
                                <div className="confirm-container">
                                    <span onClick={this.props.orderConfirm} className="cf-btn cf-succ">Chốt đơn</span>
                                </div>
                                <div className="confirm-container">
                                    <span id="clearCart" onClick={this.props.clearCart} className="cf-btn cf-dang">Xóa hết</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="cart">
                    <div onClick={this.props.showCart} className="cart-false-theme"></div>
                    <div id="cart" className="cart-container">

                        <button onClick={this.props.showCart} className="cre-close">
                            <span className="x-left"/>
                            <span className="x-right"/>
                        </button>

                        <div className="form-title">
                            <h1>Giỏ hàng</h1>
                            <span>Một ngày tốt lành nhé!</span>
                            <img src="/img/art.png"/>
                            <h2>Hỏng có gì hết chơn á!</h2>
                        </div>
                        <div className="cart-products">

                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Cart;
