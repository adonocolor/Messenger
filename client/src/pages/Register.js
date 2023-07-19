import React from "react";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import '../styles/form.scss'
export const Register = () => {
    return (
        <Form>
            <Row style={{
                justifyContent: 'center',
                paddingTop: '15%'
            }}>
                <Col xs={5}>
                    <Stack gap={3}>
                        <h2>Sign Up</h2>

                        <Form.Control autoComplete={'off'} type={'text'} placeholder={'Name'} name={'name'}/>
                        <Form.Control autoComplete={'off'} type={'text'} placeholder={'Email'} name={'email'}/>
                        <Form.Control type={'password'} placeholder={'Password'} name={'password'}/>
                        <Button className={'form__button'} type={'sumbit'}>
                            Register me!
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

