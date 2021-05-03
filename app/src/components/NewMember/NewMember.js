import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/NewMember/NewMember.css';

class NewMember extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.hideNewMem = this.hideNewMemHandler.bind(this);
        this.labelFocus = this.labelFocusHandler.bind(this);
        this.inputFocus = this.inputFocusHandler.bind(this);
        this.inputBlur = this.inputBlurHandler.bind(this);
    }

    hideNewMemHandler(){
        $('.suggest-btn').eq(0).click();
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

    render = () =>{
        return(
            <div className="new-member">
                <div onClick={this.hideNewMem} className="nm-false-theme"/>
                <div className="nm-form-container" style={{height: `${window.innerHeight}px`}}>
                    <button onClick={this.hideNewMem} className="cre-close">
                        <span className="x-left"/>
                        <span className="x-right"/>
                    </button>
                    <div className="nm-title">
                        <h1>Hiii!</h1>
                        <span>Gia nhập với chúng tôi nhé!!</span>
                        <img src="/img/art.png"/>
                    </div>
                    <div className="nm-form">
                        <div className="nm-form-fields">
                            <div className="nm-field">
                                <label onClick={this.labelFocus} className="nm-label">Tài khoản</label>
                                <input id="nUser" onBlur = {this.inputBlur} onFocus={this.inputFocus} className="nm-input"/>
                            </div>
                            <div className="nm-field">
                                <label onClick={this.labelFocus} className="nm-label">Mật khẩu</label>
                                <input type="password" id="nPass" onBlur = {this.inputBlur} onFocus={this.inputFocus} className="nm-input"/>
                            </div>
                            <div className="nm-field">
                                <label onClick={this.labelFocus} className="nm-label">Xác nhận mật khẩu</label>
                                <input type="password" id="nReen" onBlur = {this.inputBlur} onFocus={this.inputFocus} className="nm-input"/>
                            </div>
                            <div className="nm-field">
                                <label onClick={this.labelFocus} className="nm-label">Quý danh</label>
                                <input id="nName" onBlur = {this.inputBlur} onFocus={this.inputFocus} className="nm-input"/>
                            </div>
                            <div className="nm-field">
                                <label onClick={this.labelFocus} className="nm-label">Số di động</label>
                                <input id="nPhon" onBlur = {this.inputBlur} onFocus={this.inputFocus} className="nm-input"/>
                            </div>
                            <div className="nm-field">
                                <label onClick={this.labelFocus} className="nm-label">Email</label>
                                <input id="nMail" onBlur = {this.inputBlur} onFocus={this.inputFocus} className="nm-input"/>
                            </div>
                            <div className="nm-field">
                                <label onClick={this.labelFocus} className="nm-label">Địa chỉ</label>
                                <textarea spellcheck="false" id="nAddr" onBlur = {this.inputBlur} onFocus={this.inputFocus} className="nm-input"/>
                            </div>
                            <div className="nm-field">
                                <button onClick={this.props.newMember} className="nm-btn">Đăng ký ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default NewMember;
