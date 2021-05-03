import React, { Component } from 'react';
import $ from 'jquery';

class CreForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newMemeState: "hide"
        }

        this.labelFocus = this.labelFocusHandler.bind(this);
        this.inputFocus = this.inputFocusHandler.bind(this);
        this.inputBlur = this.inputBlurHandler.bind(this);
        this.btnHover = this.btnHoverHandler.bind(this);
        this.btnOut = this.btnOutHandler.bind(this);
        this.newMemberCall = this.newMemberCallHandler.bind(this);
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

    newMemberCallHandler(){
        let state = this.state.newMemeState;
        var newMemeState;
        switch(state){
            case "hide":
                newMemeState = "show";
                $('.new-member').eq(0).show();

                $('.nm-form-container').eq(0).animate({
                    right: "0px",
                });

                this.setState({newMemeState});
                break;
            case "show":
                newMemeState = "hide";

                $('.nm-form-container').eq(0).animate({
                    right: "-400px",
                });
                setTimeout(()=>{
                    $('.new-member').eq(0).hide();
                }, 500)

                this.setState({newMemeState});
                break;
        }
    }

    render = () =>{
        return(
            <div className="cre-form-container">
                <div className="cre-form">
                    <div className="form-title">
                        <h1>Hiii!</h1>
                        <span>Một ngày tốt lành nhé</span>
                        <img src="/img/art.png"/>
                    </div>
                    <div className="form-fields">
                        <div className="form-field">
                            <label onClick={this.labelFocus} className="form-label">Tài khoản</label>
                            <input onBlur = {this.inputBlur} onFocus={this.inputFocus} className="form-input" type="text" id="username"/>
                        </div>
                        <div className="form-field">
                            <label onClick={this.labelFocus} className="form-label">Mật khẩu</label>
                            <input onBlur = {this.inputBlur} onFocus={this.inputFocus} className="form-input" type="password" id="password"/>
                        </div>
                        <div className="form-field">
                            <button onClick={this.props.sendCredentialRequest} onMouseEnter={this.btnHover} onMouseLeave={this.btnOut} className="cre-btn">
                                <span className="cre-btn-content">Đăng nhập</span>
                                <span className="cre-false-bg"/>
                            </button>
                        </div>
                        <div className="form-field">
                            <span className="cred-error">{this.props.message}</span>
                        </div>
                        <div className="form-field sign-up-suggest-container">
                            <p className="sign-up-suggest"><span>Chưa có tài khoản </span><span onClick={this.newMemberCall} className="suggest-btn">Đăng ký ngay </span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CreForm;
