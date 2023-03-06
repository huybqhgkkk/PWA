import React from "react";
// import {users} from  "../constant/constant"


function User(props) {
    const { data } = props;
    return (
        <>
            <hr />
            <p>
                <b>User name:</b> {data.username}
            </p>
            <p>
                <b>Job:</b> {data.job}
            </p>
            <p>
                <b>Level:</b> {data.level}
            </p>
            <p>
                <b>Contact:</b> {data.email}
            </p>
        </>
    );
}

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    // componentDidMount() {
    //     this.setState({ users });
    // }


    render() {
        return (
            <>
                {/*{this.state.users.map((user) => (*/}
                {this.props && this.props.data.map((user) => (
                    <User data={user} />
                ))}
            </>
        );
    }
}
export default UserList;
