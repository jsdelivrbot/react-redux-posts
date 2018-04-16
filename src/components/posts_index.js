import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
    // Lifecycle method. It will be automatically called by React when the component is ready to be shown up to the page.
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            )
        });
    }

    // Link component is used from React to navigate between links.
    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

// Null as 1st argument if we do not want any state
// { fetchPosts } = { fetchPosts:fetchPosts } puts the fetchPosts in our component. Same as mapDispatchToProps function. Use the latter if you want to do something on top of the function.
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
