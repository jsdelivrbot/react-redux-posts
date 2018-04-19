import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        // Provided by React Router
        // Params holds all the different wildcard values in the URL.
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                {this.props}
                Posts show!
            </div>
        );
    }
}

// 1st argument is the application state.
// 2nd argument is the props object that is headed to this component PostsShow.
function mapStateToProps({ posts }, ownProps) {
    // ownProps === this.props from inside the component
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
