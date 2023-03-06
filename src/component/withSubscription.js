import React from "react";


export default function withSubscription(WrappedComponent, dataSource, title) {
    // ...trả về một component khác
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                dataSource: [],
            };
        }

        componentDidMount() {
            this.setState({ dataSource });
        }

        render() {
            // console.log(222,this.state.dataSource)
            // ... và render component đầu vào với dữ liệu mới!
            return (
                <>
                    <h1>{title}</h1>
                    <WrappedComponent {...this.props} data={this.state.dataSource} />
                </>
            );
        }
    };
}
