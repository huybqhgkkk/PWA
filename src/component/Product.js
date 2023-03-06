import React from "react";
import {products} from  "../constant/constant"

function Product(props) {
    const { data } = props;
    return (
        <>
            <hr />
            <p>
                <b>Title:</b> {data.title}
            </p>
            <p>
                <b>Style:</b> {data.style}
            </p>
            <p>
                <b>Price:</b> {data.price}
            </p>
            <p>
                <b>Description:</b> {data.description}
            </p>
            <p>
                <b>Free shipping:</b> {data.isFreeShipping}
            </p>
        </>
    );
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.setState({ products });
    }

    render() {
        return (
            <>

                {this.state.products.map((product) => (
                    <Product data={product} />
                ))}
            </>
        );
    }
}

export default ProductList;
