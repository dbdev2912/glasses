import React, { Component } from 'react';
import GlassesIntro from '../Intro/GlassesIntro';
import "../../css/Glasses/Glasses.css";
import "../../css/Glasses/Mobile.css";

import $ from 'jquery';

const axios = require('axios');

class Glasses extends Component{

    constructor(props){
        super(props);
        this.state = {
            exists: false,
            message: "",
        }
        this.getSpecificGlasses = this.getSpecificGlassesCall.bind(this);


        this.getSpecificGlasses(this.props.match.params.id);
    }


    async getSpecificGlassesCall(id){
        let response = await axios.get(`/getGlass/${id}`, {mode: "cors"});

        if(response.data.exists){
            let exists = true;
            let glasses = response.data.product;
            let attachments = response.data.attachments;
            this.setState({exists, glasses, attachments});
        }else{
            let exists = false;
            let glasses = {};
            let message = "404 - NOT FOUND!";
            this.setState({exists, glasses, message});
        }
    }

    render = () =>{
        if(this.state.exists){
            let p = this.state.glasses;
            let description = p.description.split(/\r?\n/);

            return(
                <React.StrictMode>
                {window.innerWidth > 800 ? <GlassesIntro url={p.url}/>: null}
                <div className="glasses">
                    <div className="glasses-imgs-container">
                        <div className="glasses-imgs">
                            <div className="main-img-container">
                                <img src={p.url} className="main-img"/>
                            </div>
                            <div className="backup-imgs">
                            </div>
                        </div>
                    </div>
                    <div className="glasses-infors-container">
                        <div className="infors-container">
                            <div className="glasses-title">
                                <h3 className="glasses-name">{p.product_name}</h3>
                                <span className="glasses-price"><span className="gl-price-title">Giá: </span><span className="gl-price">{p.price}<sup>đ</sup></span></span><span className="order-btn" onClick={()=>{this.props.addCart(p)}}>Thêm vào giỏ</span>
                            </div>
                            <div className="glasses-descriptions">
                                <h1 className="descriptions-title">Chi tiết sản phẩm</h1>
                                <div id="responsive-brand-material" className="desc-hori-groups">
                                    <div className="hori-child glasses-type">
                                        <span className="desc-title">Nhãn hiệu: </span><span className="desc-content">{p.brand_name}</span>
                                    </div>
                                    <div className="hori-child glasses-oriented">
                                        <span className="desc-title">Chất liệu: </span><span className="desc-content">{p.material_name}</span>
                                    </div>
                                </div>
                                <div className="desc-hori-groups">
                                    <div className="hori-child glasses-type">
                                        <span className="desc-title">Loại: </span><span className="desc-content">{p.type_group}</span>
                                    </div>
                                    <div className="hori-child glasses-oriented">
                                        <span className="desc-title">Dành cho: </span><span className="desc-content">{p.oriented_name}</span>
                                    </div>
                                </div>
                                <h1 className="descriptions-title">Mô tả: </h1>
                                <div className="description-container">
                                    {description.map(desc => <p className="description">{desc}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="attachments">
                    <h3 className="attachments-title">Phụ kiện tặng kèm theo sản phẩm</h3>
                    <div className="attachment-container">
                        {this.state.attachments.map(a =>
                        <div className="attachment">
                            <div className="att-img-container">
                                <img src={a.url}/>
                            </div>
                            <div className="att-content">
                                <h3>{a.attachment_name}</h3>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
                <div className = "gl-policy">
                    <div className="policy-col">
                        <div className="policy-container">
                            <h3>Chính sách bảo hành</h3>
                            <p className="description">- Bảo hành và thay mới đệm mũi, ốc.</p>
                            <p className="description">- Vệ sinh kính định kỳ.</p>
                            <p className="description">- Sau 1 thời gian sử dụng, nếu kính bị rộng, cong vênh, móp méo do vô ý, sẽ được chỉnh kính miễn phí cho khách hàng.</p>
                            <p className="description">- Nếu kính hợp kim bị gãy có thế hàn lại và xi mới. (mất phí)</p>
                            <p className="description">- Nếu kính là nhựa acetate, sẽ được đánh bóng, làm mới miễn phí nếu kính bị cũ, trầy xước.</p>
                        </div>
                    </div>
                    <div className="policy-col">
                        <div className="policy-container">
                            <h3>Hướng dẫn bảo quản</h3>
                            <p className="description">- Nên dùng cả hai tay khi đeo và gỡ kính</p>
                            <p className="description">- Tránh cầm vào tròng kính</p>
                            <p className="description">- Thường xuyên vệ sinh và lau chùi kính bằng nước rửa, khăn lau chuyên dụng</p>
                            <p className="description">- Để kính vào hộp khi không sử dụng</p>
                        </div>
                    </div>
                </div>
                </React.StrictMode>
            )
        }else{
            return(
                <React.StrictMode>
                    <GlassesIntro url="/img/head-bg.jpg"/>
                    <h1>{this.state.message}</h1>
                </React.StrictMode>
            )
        }
    }

}


export default Glasses;
