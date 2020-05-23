import React from 'react';
import PropTypes from 'prop-types';

/* Renders the "Submit" and "Cancel" buttons of the form and any validation errors sent from the API 
via the <ErrorsDisplay> function component. */
const Form = props => {

    const { cancel, errors, submit, elements, submitButtonText } = props;

    function handleSubmit (event) {
        event.preventDefault ();
        submit ();
    }

    function handleCancel (event) {
        event.preventDefault ();
        cancel (); 
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} submitButtonText={submitButtonText} />
            <form 
                onSubmit={handleSubmit}>
                {elements ()}
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

function ErrorsDisplay ({ errors, submitButtonText }) {
    let errorsDisplay = null;
    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">
                    { submitButtonText !== 'Sign In' ? 'Validation Errors' : 'Incorrect e-mail or password' }
                </h2>
                <div className="validation-errors">
                    <ul>
                        { errors.map ((error, i) => <li key={i} >{ error }</li>)}
                    </ul>
                </div>
            </div>
        );
    } 
    return errorsDisplay;
}

Form.propTypes = {
    cancel: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    elements: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string.isRequired,
    errors: PropTypes.array
};

export default Form;