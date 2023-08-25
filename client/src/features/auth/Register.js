import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Form, FormFloating, FormLabel, Row, Stack} from "react-bootstrap";
import '../../styles/form.scss'
import {Link, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "./authApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentToken, setCredentials} from "./authSlice";

export const Register = () => {
    const token = useSelector(selectCurrentToken);
    const nameRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const [register, {isLoading}] = useRegisterMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (token !== null) {
            navigate('/')
        }
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [name, email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await register({name: name, email: email, password: password}).unwrap()
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

    const handleNameInput = (e) => setName(e.target.value)


    const content = isLoading ?
        <Row style={{
            justifyContent: "center",
            paddingTop: '15%',
        }}>Loading...</Row> :
        (
            <>
                <Form onSubmit={handleSubmit}>
                    <Row style={{
                        justifyContent: 'center',
                        paddingTop: '15%'
                    }}>
                        <Col xs={5}>
                            <Stack gap={3}>
                                <h2>Sign Up</h2>
                                <FormFloating>
                                    <Form.Control ref={nameRef} onChange={handleNameInput} autoComplete={'off'} type={'text'}
                                                  placeholder={'Name'} name={'name'} required/>
                                    <FormLabel>Name</FormLabel>
                                </FormFloating>
                                <FormFloating>
                                    <Form.Control onChange={handleUserInput} autoComplete={'off'}
                                                  type={'email'} placeholder={'Email'} name={'email'} required/>
                                    <FormLabel>Email</FormLabel>
                                </FormFloating>
                                <FormFloating>
                                    <Form.Control onChange={handlePwdInput} type={'password'} placeholder={'Password'}
                                                  name={'password'} required/>
                                    <FormLabel>Password</FormLabel>
                                </FormFloating>
                                <Button className={'form__button'} type={'sumbit'}>
                                    Register me!
                                </Button>
                                <Link to={'/login'} className={"text-decoration-none"}>
                                    Already have an account?
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

