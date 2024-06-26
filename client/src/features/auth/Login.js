import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Form, FormFloating, FormLabel, Row, Stack} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useLoginMutation} from "./authApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentToken, setCredentials} from "./authSlice";

export const Login = () => {
    const token = useSelector(selectCurrentToken);
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (token !== null) {
            navigate('/')
        }
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({email: email, password: password}).unwrap()
            dispatch(setCredentials({...userData, user: email}))
            setEmail('')
            setPassword('')
            navigate('/')
        } catch (err) {
            if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)

    const handlePwdInput = (e) => setPassword(e.target.value)

    const content =
        isLoading ?
            <Row style={{
                justifyContent: "center",
                paddingTop: '15%',
            }}>Loading...</Row> :
            (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Row style={{
                            justifyContent: "center",
                            paddingTop: '15%',
                        }}>
                            <Col xs={5}>
                                <Stack gap={3}>
                                    <h2>Log In</h2>
                                    <FormFloating>
                                        <Form.Control ref={emailRef} type={'email'} value={email} onChange={handleUserInput}
                                                      autoComplete={'off'} placeholder={'Email'} name={'email'} required/>
                                        <FormLabel>Email</FormLabel>
                                    </FormFloating>
                                    <FormFloating>
                                        <Form.Control type={'password'} onChange={handlePwdInput}
                                                      value={password}
                                                      placeholder={'Password'} name={'password'} required/>
                                        <FormLabel>Password</FormLabel>
                                    </FormFloating>
                                    <Button className={'form__button'} variant={'primary'} type={'submit'}>
                                        Let me in!
                                    </Button>
                                    <Link to={'/register'} className={"text-decoration-none"}>
                                        Need to register an account?
                                    </Link>
                                </Stack>
                            </Col>
                        </Row>
                    </Form>
                    <Row
                        style={{
                            justifyContent: "center",
                            paddingTop: '15%',
                        }}
                        ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</Row>
                </>
            );


    return content;
}

