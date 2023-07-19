import React from "react";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
export const Login = () => {
    return (
        <Form>
            <Row style={{
                justifyContent: "center",
                paddingTop: '15%',
            }}>
                <Col xs={5}>
                    <Stack gap={3}>
                        <h2>Log In</h2>

                        <Form.Control autoComplete={'off'} type={'text'} placeholder={'Email'} name={'email'}/>
                        <Form.Control type={'password'} placeholder={'Password'} name={'password'}/>
                        <Button className={'form__button'} variant={'primary'} type={'sumbit'}>
                            Let me in!
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

