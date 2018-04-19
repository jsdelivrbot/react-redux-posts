import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    // field object contains some event handlers that we need to wire up to the JSX that we are returning
    // {...field.input} says: gets all properties of the object field.input and put them as props to the input element it belongs to.
    // meta.error is added by our validator. gets passed from React
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // this === component
        console.log(values);
        this.props.createPost(values, () =>{
            //Callback function
            // Instantly navigate to the root route
            this.props.history.push('/'); 
        });
    }

    // Redux form does not take care of posting data to somewhere. Takes care of the state and validation of the form.
    // We are responsible of taking data from the form and do smth with them.
    render() {
        const { handleSubmit } = this.props;
        // With handleSubmit we now can extract values from the form
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title for post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        )
    }
}

// By convention: values
// It will be called whenever the user submits the form.
function validate(values) {
    const errors = {};
    // Validata inputs from values object
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }
    if (!values.content) {
        errors.content = "Enter some content!";
    }
    // Return errors object. If it empty, redux form assumes there is nothing wrong with the form.
    return errors;
}

export default reduxForm({
    // Name of the form. Must be unique.
    form: 'PostsNewForm',
    validate: validate
})(
    // This returns a React component
    connect(null, { createPost })(PostsNew)
);
