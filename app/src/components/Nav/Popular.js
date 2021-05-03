import React, { Component } from 'react';

import ProductsScrollLeft from '../Product/ProductsScrollLeft';

class Popular extends Component{
    constructor(props){
        super(props);
        this.state = {
            popularClassName: "popular",
            popularState: "hide",
            caret: "caret-down",
            pops: [],
            position: 0,
        }
        this.windowResize = this.windowResizeHandler.bind(this);
        this.drop = this.dropHandler.bind(this);
        this.getProductByTypeId = this.getProductByTypeIdHandler.bind(this);
        this.getProductByGender = this.getProductByGenderHandler.bind(this);
        this.windowResize();
        this.data = this.props.pop;
    }

    windowResizeHandler(){
        window.addEventListener('resize', ()=>{
            try{
                if(window.innerWidth<=800){
                    let popular = document.getElementsByClassName('popular')[0];
                    let popularHeight = popular.offsetHeight + 100;
                    this.setState({ popularHeight });
                }
            }
            catch(err){

            }
        });
    }

    getProductByTypeIdHandler(type){
        let pops = this.data.filter(d => d.type_id[0] == type).slice(0, 4);

        this.setState({pops});
    }

    getProductByGenderHandler(gender){
        let pops = this.data.filter(d => d.oriented_id == gender).slice(0, 4);

        this.setState({pops});
    }

    dropHandler(){
        if(this.state.popularState == "show"){
            let popularState = "hide";
            let popularClassName = "popular";
            let caret = "caret-down";
            this.setState({popularClassName, popularState, caret});
        }else{

            let popularState = "show";
            let popularClassName = "popular popu-show";
            let caret = "caret-up";

            if(this.state.pops.length==0){
                let pops = this.props.pop.filter(d=> d.type_id[0] == 'C').slice(0, 8);
                this.setState({popularClassName, popularState, caret, pops});
            }
            else{
                this.setState({popularClassName, popularState, caret});
            }
        }
    }

    render = () =>{
        return(
            <li className={this.props.className + " popular-container"} style={window.innerWidth<=800?{width: `${window.innerWidth-25}px`, minWidth: "unset"}:{}}>
                <a onClick={this.drop} className="nav-link">Phổ biến <span className={this.state.caret}/></a>
                <div className={this.state.popularClassName}>
                    <div className="popular-products">
                        <div className="popular-option">
                            <ul className="pop-list">
                                <li onClick={() => {this.getProductByTypeId('C')}} className="pop-item">
                                    <a className="pop-option">Kính cận</a>
                                </li>
                                <li onClick={() => {this.getProductByTypeId('V')}} className="pop-item">
                                    <a className="pop-option">Kính viễn</a>
                                </li>
                                <li onClick = {() => {this.getProductByGender('m')}} className="pop-item">
                                    <a className="pop-option">Kính nam</a>
                                </li>
                                <li onClick = {() => {this.getProductByGender('f')}} className="pop-item">
                                    <a className="pop-option">Kính nữ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="pop-products-container">
                            <ProductsScrollLeft data = {this.state.pops}/>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}


export default Popular;
