import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    // Gets called by react when component is ready to be mounted
    componentDidMount() {
        // Provided by React Router
        // Params holds all the different wildcard values in the URL.
        this.props.fetchPost(this.props.match.params.id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            // Callback function
            // Programmatical navigation
            // Instantly navigate to the root route
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        // post is undefined before the fetchPost finishes.
        // So post.title is going to throw an error.
        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
                <Link to="/">Back to index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete post
                </button>
            </div>
        );
    }
}

// 1st argument is the application state.
// 2nd argument is the set of props that are heading to this component PostsShow.
function mapStateToProps({ posts }, ownProps) {
    // ownProps === this.props from inside the component
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
