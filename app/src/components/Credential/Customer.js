import React, { Component } from 'react';
import $ from 'jquery';
import Order from './Order';


class CreForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayOrders: [],
        }

        this.labelFocus = this.labelFocusHandler.bind(this);
        this.inputFocus = this.inputFocusHandler.bind(this);
        this.inputBlur = this.inputBlurHandler.bind(this);
        this.btnHover = this.btnHoverHandler.bind(this);
        this.btnOut = this.btnOutHandler.bind(this);
    }


    labelFocusHandler(event){
        $(event.target).parent().find('input').eq(0).focus();

    }

    inputFocusHandler(event){
        let target = event.target;

        $(target).parent().find('label').eq(0).animate({
            top: "-15px",
        });
    }

    inputBlurHandler(event){
        let target = event.target;
        if(!$(target).val()){
            $(target).parent().find('label').eq(0).animate({
                top: "5px",
            });
        }
    }

    btnHoverHandler(event){
        $(".cre-btn-content").eq(0).css({
            color: "white",
        });

        $(".cre-false-bg").eq(0).animate({
            left: "0",
        });
    }

    btnOutHandler(event){
        $(".cre-false-bg").eq(0).css({
            left: "-100%",
        });
        $(".cre-btn-content").eq(0).css({
            color: "#777",
        });
    }


    render = () =>{
        return(
            <div className="cre-form-container" style={{height: `${window.innerHeight-75}px`, overflowY: "scroll"}}>
                <div className="cre-form">
                    <div className="form-title">
                        <h1>Hiii!</h1>
                        <span>Một ngày tốt lành nhé</span>
                        <img src="/img/art.png"/>
                    </div>
                    <div className="customer">
                        <div className="cus-infor">
                            <p className="cus-info-content"><span className="infor-title">Mã khách hàng: </span> {this.props.data.customer_id.toUpperCase()}</p>
                        </div>
                        <div className="cus-infor">
                            <p className="cus-info-content"><span className="infor-title">Quý danh: </span> {this.props.data.customer_name}</p>
                        </div>
                        <div className="cus-infor">
                            <p className="cus-info-content"><span className="infor-title">Di động: </span> {this.props.data.phone}</p>
                        </div>
                        <div className="cus-infor">
                            <p className="cus-info-content"><span className="infor-title">Email: </span> {this.props.data.email}</p>
                        </div>
                        <div className="cus-infor">
                            <p className="cus-info-content"><span className="infor-title">Địa chỉ: </span> {this.props.data.address}</p>
                        </div>
                        <div className="cus-sign-out-container">
                            <button onClick={this.props.signOut} className="btn-sign-out" >Đăng xuất</button>
                        </div>
                    </div>
                    <div className="cus-orders">
                        <div className="cus-options">
                            <div className="cus-option">
                                <span id="init-click" onClick={() => {this.props.switchActive('accepted')}} className="cus-option-btn">Đã tiếp nhận</span>
                            </div>
                            <div className="cus-option">
                                <span onClick={() => {this.props.switchActive('shipped')}} className="cus-option-btn">Đang giao</span>
                            </div>
                            <div className="cus-option">
                                <span onClick={() => {this.props.switchActive('done')}} className="cus-option-btn">Hoàn thành</span>
                            </div>
                        </div>
                        <div className="cus-order">
                            {this.props.orders.map(o=>

                            <Order order={o}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CreForm;
