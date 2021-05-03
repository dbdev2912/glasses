import React, { Component } from 'react';
import $ from 'jquery';

class Order extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render = () =>{
        let o =this.props.order;
        return(
            <div className="order">
                <div className="order-top">
                    <span className="order-id"><strong>Đơn hàng: </strong><span className="order-id-content">{o.order_id}</span></span>
                    <span className="order-status" style={{color: "#999"}}>{o.status}</span>
                </div>
                <div className="order-top">
                    <span className="order-date"><strong>Ngày đặt:</strong> {o.order_date}</span>
                    <span className="order-date"><strong>Dự kiến:</strong> {o.deliver_date}</span>
                </div>
                <span className="order-address"><strong>Đến địa chỉ:</strong> {o.address}</span>
            </div>
        )

    }
}


export default Order;
