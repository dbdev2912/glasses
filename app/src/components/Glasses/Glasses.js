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
                                <span className="glasses-price"><span className="gl-price-title">Gi??: </span><span className="gl-price">{p.price}<sup>??</sup></span></span><span className="order-btn" onClick={()=>{this.props.addCart(p)}}>Th??m v??o gi???</span>
                            </div>
                            <div className="glasses-descriptions">
                                <h1 className="descriptions-title">Chi ti???t s???n ph???m</h1>
                                <div id="responsive-brand-material" className="desc-hori-groups">
                                    <div className="hori-child glasses-type">
                                        <span className="desc-title">Nh??n hi???u: </span><span className="desc-content">{p.brand_name}</span>
                                    </div>
                                    <div className="hori-child glasses-oriented">
                                        <span className="desc-title">Ch???t li???u: </span><span className="desc-content">{p.material_name}</span>
                                    </div>
                                </div>
                                <div className="desc-hori-groups">
                                    <div className="hori-child glasses-type">
                                        <span className="desc-title">Lo???i: </span><span className="desc-content">{p.type_group}</span>
                                    </div>
                                    <div className="hori-child glasses-oriented">
                                        <span className="desc-title">D??nh cho: </span><span className="desc-content">{p.oriented_name}</span>
                                    </div>
                                </div>
                                <h1 className="descriptions-title">M?? t???: </h1>
                                <div className="description-container">
                                    {description.map(desc => <p className="description">{desc}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="attachments">
                    <h3 className="attachments-title">Ph??? ki???n t???ng k??m theo s???n ph???m</h3>
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
                            <h3>Ch??nh s??ch b???o h??nh</h3>
                            <p className="description">- B???o h??nh v?? thay m???i ?????m m??i, ???c.</p>
                            <p className="description">- V??? sinh k??nh ?????nh k???.</p>
                            <p className="description">- Sau 1 th???i gian s??? d???ng, n???u k??nh b??? r???ng, cong v??nh, m??p m??o do v?? ??, s??? ???????c ch???nh k??nh mi???n ph?? cho kh??ch h??ng.</p>
                            <p className="description">- N???u k??nh h???p kim b??? g??y c?? th??? h??n l???i v?? xi m???i. (m???t ph??)</p>
                            <p className="description">- N???u k??nh l?? nh???a acetate, s??? ???????c ????nh b??ng, l??m m???i mi???n ph?? n???u k??nh b??? c??, tr???y x?????c.</p>
                        </div>
                    </div>
                    <div className="policy-col">
                        <div className="policy-container">
                            <h3>H?????ng d???n b???o qu???n</h3>
                            <p className="description">- N??n d??ng c??? hai tay khi ??eo v?? g??? k??nh</p>
                            <p className="description">- Tr??nh c???m v??o tr??ng k??nh</p>
                            <p className="description">- Th?????ng xuy??n v??? sinh v?? lau ch??i k??nh b???ng n?????c r???a, kh??n lau chuy??n d???ng</p>
                            <p className="description">- ????? k??nh v??o h???p khi kh??ng s??? d???ng</p>
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
