import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    // field object contains some event handlers that we need to wire up to the JSX that we are returning
    // {...field.input} says: gets all properties of the object field.input and put them as props to the input element it belongs to.
    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }

    render() {
        return (
            <form>
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
                    name="Content"
                    component={this.renderField}
                />
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
})(PostsNew);
