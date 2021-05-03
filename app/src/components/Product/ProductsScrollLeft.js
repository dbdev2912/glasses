import React, { Component } from 'react';
import $ from 'jquery';
import ProductDetailScroll from './ProductDetailScroll';
import ProductDetail from './ProductDetail';
import '../../css/Product.css';

class ProductsScrollLeft extends Component{
    constructor(props){
        super(props);
        this.state = {
            marginLeft: 0,
            position: 0,
            nextState: "block",
            prevState: "none",
        }
        this.bigMoveNext = this.bigMoveNextHandler.bind(this);
        this.bigMovePrev = this.bigMovePrevHandler.bind(this);
        this.smallMoveNext = this.smallMoveNextHandler.bind(this);
        this.smallMovePrev = this.smallMovePrevHandler.bind(this);
    }


    bigMoveNextHandler(){
        let position = this.state.position;

        if(position>this.props.data.length - 3){
            position = this.props.data.length-4
        }

        position +=1;
        let marginLeft = -(position*280);

        let prevState="block";
        let nextState="block";
        if(position == 0){
            prevState="none";
        }
        if(position == this.props.data.length-3){
            nextState="none";
        }
        let $this = this;
        $('#pop-mark').animate({
            marginLeft: `${marginLeft}px`,
        });
        $this.setState({position, marginLeft, prevState, nextState});
    }
    bigMovePrevHandler(){
        let position = this.state.position;
        position-=1;
        let marginLeft = -(position*280);
        let prevState="block";
        let nextState="block";
        if(position == 0){
            prevState="none";
        }
        if(position == this.props.data.length-3){
            nextState="none";
        }

        let $this = this;

        $('#pop-mark').animate({
            marginLeft: `${marginLeft}px`,
        });
        $this.setState({position, marginLeft, prevState, nextState});
    }
    smallMoveNextHandler(){
        let position = this.state.position;
        let marginLeft = -position*window.innerWidth;
        position+=1;

        let prevState="block";
        let nextState="block";
        if(position == 0){
            prevState="none";
        }
        if(position == this.props.data.length-1){
            nextState="none";
        }

        let $this = this;
        let count = 0;

        setInterval(function(){
            if(count<window.innerWidth){
                count +=2;
                marginLeft -=2;
                $this.setState({marginLeft});
            }
        }, 2);
        $this.setState({position, marginLeft, prevState, nextState});

    }
    smallMovePrevHandler(){
        let position = this.state.position;
        let marginLeft = -position*window.innerWidth;
        position-=1;
        let prevState="block";
        let nextState="block";
        if(position == 0){
            prevState="none";
        }
        if(position == this.props.data.length-1){
            nextState="none";
        }

        let $this = this;
        let count = 0;

        setInterval(function(){
            if(count<window.innerWidth){
                count +=2;
                marginLeft +=2;
                $this.setState({marginLeft});
            }
        }, 2);
        $this.setState({position, marginLeft, prevState, nextState});
    }

    render = () =>{
        if(window.innerWidth>800){
            return(
        <div>
            <span onClick={this.bigMoveNext} style={{display: this.state.nextState}} className="next" />
            <span onClick={this.bigMovePrev} style={{display: this.state.prevState}} className="prev" />
            <div className="scrollContainer">
                <div className="products-container" style={{height: `${window.innerHeight - 100}px`, padding: "0"}}>
                    <div className="products-title">
                        <h2>{this.props.title}</h2>
                        <img src="/img/art.png"/>
                    </div>
                <div className="products products-scroll">
                    <div id="pop-mark"/>
                        {this.props.data.map(d =>
                                <ProductDetail style={window.innerWidth>800? {width: `${250}px`, margin: "15px"}: {width: `${window.innerWidth}px`, margin: "0", padding: "15px"}} data = {d}>
                                </ProductDetail>

                        )}
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        else{
            return(
        <div>
            <span onClick={this.smallMoveNext} style={{display: this.state.nextState}} class="next" />
            <span onClick={this.smallMovePrev} style={{display: this.state.prevState}} class="prev" />
            <div className="scrollContainer">
                <div className="products-container" style={{height: `${window.innerHeight - 100}px`}}>
                    <div className="products-title">
                        <h2>{this.props.title}</h2>
                    <img src="/img/art.png"/>
                </div>
                <div className="products products-scroll">

                    <div style={{marginLeft: `${this.state.marginLeft}px`}}/>
                    {this.props.data.map(d =>
                            <ProductDetailScroll style={window.innerWidth>800? {width: `${250}px`, margin: "15px"}: {width: `${window.innerWidth}px`, margin: "0"}} data = {d}>
                            </ProductDetailScroll>
                    )}
                    </div>
                </div>
            </div>
        </div>
            );
        }
    }
}


export default ProductsScrollLeft;
