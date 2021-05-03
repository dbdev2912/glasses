import React, { Component } from 'react';
import $ from 'jquery';

import '../../css/Footer/Footer.css';
import '../../css/Footer/Mobile.css';

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render = () =>{
        return(
            <div className="footer" style={{marginTop: "150px"}}>
                <div className="notify-assign">
                    <div className="notify-assign-label">
                        <div className="label-container">
                            <h1>Bạn gì ơi!!</h1>
                            <span>Nếu bạn không muốn gia nhập với chúng tôi bằng cách <span className="suggest-btn" onClick={this.props.credentialShow} style={{display: "unset"}}>đăng ký</span> nhưng vẫn muốn nhận thông báo thì option này là dành cho bạn.</span>
                        </div>
                    </div>
                    <div className="notify-assign-form">
                        <div className="na-field">
                            <label className="na-label">Quý danh</label>
                            <input type="text" placeholder="Aa.." className="na-input"/>
                        </div>
                        <div className="na-field">
                            <label className="na-label">Email</label>
                            <input type="text" placeholder="example@email.com" className="na-input"/>
                        </div>
                        <div className="na-field-btn">
                            <button>Gửi</button>
                        </div>
                    </div>
                </div>

                <div className="footer-container-theme">
                    <div className="footer-container">
                        <div className="footer-brand">
                            <div className="brand-logo-container">
                                <img className="brand-logo" src="/img/main-logo.png"/>
                            </div>
                            <div className="brand-address-container">
                                <h2 className="brand-name">O Day Co Ban Kính</h2>
                                <span className="brand-address">Số 57 CMT8, P. Bùi Hữu Nghĩa, Q. Bình Thủy, Tp. Cần Thơ</span>
                            </div>
                        </div>
                        <div className="footer-contact">
                            <div className="footer-contact-component">
                                <ul className="contact-list">
                                    <li className="contact-item">
                                        <span>Điện thoại</span>
                                        <ul className="sub-list">
                                            <li className="sub-list-item">
                                                <span>Hotline: 191101101</span>
                                            </li>
                                            <li className="sub-list-item">
                                                <span>Di động: 0368474601 (Gặp mỹ nữ)</span>
                                            </li>
                                            <li className="sub-list-item">
                                                <span>Di động: 0348661993 (Gặp mỹ nam)</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="contact-item">
                                        <span>Email</span>
                                        <ul className="sub-list">
                                            <li className="sub-list-item">
                                                <span>Dành cho đối tác: odaycobankinh@mail.porn.com</span>
                                            </li>
                                            <li className="sub-list-item">
                                                <span>Dành cho nhân sự và tuyển dụng: banhthimynu@mail.porn.cum</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className="footer-utilities-container">
                                    <ul class="footer-utilities">
                                        <li className="footer-util">
                                            <a className="footer-link">Đổi trả và bảo hành</a>
                                        </li>
                                        <li className="footer-util">
                                            <a className="footer-link">API</a>
                                        </li>
                                        <li className="footer-util">
                                            <a className="footer-link">Tuyển dụng</a>
                                        </li>
                                        <li className="footer-util">
                                            <a className="footer-link">Blog</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Footer;
