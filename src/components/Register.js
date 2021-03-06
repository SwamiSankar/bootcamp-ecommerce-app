// react related
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
// action creators
import { registerUser } from '../actions';
// utils
import { validatePassword } from '../components/utils/utilFunctions';

function Register(props) {
    const { registerUser, history } = props;

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
    };
    const validationSchema = Yup.object({
        fullName: Yup.string().required('name is mandatory'),
        email: Yup.string()
            .email('invalid email')
            .required('email is mandatory'),
        password: Yup.string().test(
            'test-pwd',
            'password must have uppercase, lowercase, numbers and special charachers and atleast 7 characters',
            (value) => validatePassword(value)
        ),
    });
    const onSubmit = (values, onSubmitProps) => {
        console.log(values);
        console.log(onSubmitProps);
        const body = values;
        body.name = values.fullName;
        body.thirdParty = false;
        body.role = 'user';
        registerUser(body, history);
    };

    return (
        <div className="signup-container">
            <div className="signup-container-message">
                Sign Up and Enroll !!
            </div>
            <div className="signup-container-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        console.log(formik);
                        return (
                            <Form className="signup-container-form-details">
                                <div className="signup-container-form-input">
                                    <Field
                                        name="fullName"
                                        type="text"
                                        placeholder="Full Name"
                                    />
                                    <ErrorMessage name="fullName">
                                        {(errorMsg) => (
                                            <span className="errorMessage">
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="signup-container-form-email">
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email">
                                        {(errorMsg) => (
                                            <span className="errorMessage">
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="signup-container-form-password">
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password">
                                        {(errorMsg) => (
                                            <span className="errorMessage">
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="signup-container-form-submit">
                                    <button className="btn btn-loginpage">
                                        Register
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <div className="signup-container-signin">
                Already have an account ? <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
    };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
