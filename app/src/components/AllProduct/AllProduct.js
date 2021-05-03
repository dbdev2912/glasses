import React, { Component } from 'react';
import ProductDetail from '../Product/ProductDetail';
import '../../css/AllProduct/AllProduct.css';

class AllProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount = () =>{
        let data = this.props.data;
        let products = [];
        switch (this.props.match.params.type.toLowerCase()) {
            case "o":
                products = data.filter(d => d.oriented_id === this.props.match.params.type_key.toLowerCase());
                this.setState({products});
                break;
            default:
                this.setState({products});
                break;
        }

    }

    render = () =>{
        return(
            <React.StrictMode>
                <div className="all-products">
                {this.state.products.map(p=>
                    <ProductDetail data={p}/>
                )}
                </div>

            </React.StrictMode>
        )
    }
}


export default AllProduct;
