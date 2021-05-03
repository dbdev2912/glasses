import React, { Component } from 'react';

import '../../css/Intro.css';
import $ from 'jquery';
class Intro extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render = () =>{
        return(
        <React.StrictMode>
            <div className="head-intro" style={{backgroundImage: `url(${this.props.url})`, height: `${window.innerHeight/3}px`}}>
            </div>
            <div className="qualifies">
                <div className="qualifies-container">
                    <div className="qualify">
                        <div className="ql-img-container">
                            <img src="/img/delivery.png" />
                        </div>
                        <h2 className="qualify-title">GIAO HÀNG NHANH CHÓNG</h2>
                        <p className="qualify-content">Với hệ thống cửa hàng khắp ba miền, `O day co ban kính` có thể tiếp cận nhanh chống đến vị trí của khách hàng, hạn chế tối thiểu thời gian chờ đợi của quý khách.</p>
                    </div>
                    <div className="qualify">
                        <div className="ql-img-container">
                            <img src="/img/qual.png" />
                        </div>
                        <h2 className="qualify-title">CHẤT LƯỢNG ƯU VIỆT</h2>
                        <p className="qualify-content">Sản phẩm kính của `O day co ban kính` đảm bảo chất lượng, sản phẩm đến tay khách hàng là sản phẩm cho chính tay những người thợ được đào tạo bài bản nhất làm ra. Yên tâm nhé!</p>
                    </div>
                    <div className="qualify">
                        <div className="ql-img-container">
                            <img src="/img/catFan.png" />
                        </div>
                        <h2 className="qualify-title">ĐÃI NGỘ HẤP DẪN</h2>
                        <p className="qualify-content">`O day co ban kính` thường xuyên có những ưu đãi về giá mỗi khi có dịp lễ, Tết hay dịp đặc biệt. Ngoài ra, nếu bạn là một con Sen hoặc vừa mới bị bồ đá sẽ được hưởng đãi ngộ lớn do thành viên của `O day co ban kính` đa phần nếu không là dân FA thâm niên thì cũng là cuồng meowth thủ.</p>
                    </div>
                </div>
            </div>
        </React.StrictMode>
        )
    }
}


export default Intro;
