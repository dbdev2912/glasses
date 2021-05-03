import React, { Component } from 'react';
import OfferCard from './OfferCard';
import '../../css/Offer/Offer.css';
import '../../css/Offer/Mobile.css';

class Offer extends Component {
    constructor(props){
        super(props);
        this.state = {
            offers: [
                {
                    offer_id: "off1",
                    bg: "/img/offers/offer1.jpg",
                    offer_name: "Ngày trái đất 2021",
                    from: "18/4/2021",
                    to: "23/4/2021",
                    content: "Chung tay bảo vệ môi trường vì trái đất thân yêu, vì ngày mai xanh, sạch",
                },
                {
                    offer_id: "off2",
                    bg: "/img/offers/offer2.jpg",
                    offer_name: "Ưu đãi dành cho những con Sen",
                    from: "Ngày mỹ nữ vào làm",
                    to: "Tận thế",
                    content: "Mèo méo meo mèo meo ngoa ngoa ngoa :3",
                },
                {
                    offer_id: "off3",
                    bg: "/img/offers/offer3.jpg",
                    offer_name: "Ưu đãi dành cho mấy đứa thất tình hoặc ế chảy nước",
                    from: "Ngày thành lập công ty",
                    to: "Tận thế",
                    content: "Cho dzừa =))))))))",
                },
                {
                    offer_id: "off4",
                    bg: "/img/offers/offer4.jpg",
                    offer_name: "Khuyến mãi cho thành viên mới",
                    from: "Hôm nay",
                    to: "Ngày mốt",
                    content: "Thành viên mới sẽ được hưởng một số ưu đãi đặc biệt khi mua sản phẩm",
                },
            ]
        }
    }

    componentDidMount = () =>{

    }

    render = () =>{
        return (
            <React.StrictMode>
            <div className="products-title" style={{display: "block"}}>
                <h2>Một vài Offer thú dzỵ nè :></h2>
                <img src="/img/art.png"/>
            </div>
                <div className="offers" style={{minHeight: `${window.innerHeight-100}px`}}>
                    <div className="offers-container">
                        {this.state.offers.map(o =>
                            <OfferCard data={o} />
                        )}
                    </div>
                </div>
            </React.StrictMode>
        )
    }
}


export default Offer;
