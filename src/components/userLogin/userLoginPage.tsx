import {  faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Button, Card, Col, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api, { ApiResponse, saveToken,saveRefreshToken } from '../../api/api';


interface UserLoginPageState {
    email: string;
    password: string;
    errorMesage: string;
    isLoggedIn: boolean;
}

export default class UserLogin extends React.Component{
    state: UserLoginPageState;

    constructor(props: {} | Readonly<{}>){
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMesage: '',
            isLoggedIn: false,
        }
    }

    private formInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const newState = Object.assign(this.state, {
                [ event.target.id ]: event.target.value,
        });
        this.setState(newState);
    }

    private setErrorMesage(message: string){
        const newState = Object.assign(this.state, {
            errorMesage: message,
        });
        this.setState(newState);
    }

    private setLogginState(isLoggedIn: boolean){
        const newState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn,
        });
        this.setState(newState);
    }

    private doLogin() {
      api('auth/user/login', 'post',{
          email: this.state.email,
          password: this.state.password,
      })
      .then((res: ApiResponse) => {
        if(res.status === 'error'){
            this.setErrorMesage('System error try again please');
            return;
        }

        if(res.status === 'ok'){
            if(res.data.statusCode !== undefined){
                let message = '';
                switch (res.data.statusCode){
                    case -3001: message = 'Bad email';break;
                    case -3002: message = 'Bad password';break;
                }
                this.setErrorMesage(message);

                return;
            }
            saveToken('user',res.data.token);
            saveRefreshToken('user',res.data.refreshToken);

            this.setLogginState(true);
        }
      });
    }

    render() {
            if(this.state.isLoggedIn === true){
                return (
                    <Redirect to="/"/>
                );
            }
    return(
        <Container >
            <Col md={{ span: 6, offset: 3 }}>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faSignInAlt } />user Login
                    </Card.Title>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor="email">E= mail</Form.Label>
                                <Form.Control type="email" id="email"
                                            value={this.state.email}
                                            onChange={  event => this.formInputChange(event as any) }/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password">password</Form.Label>
                                <Form.Control type="password" id="password"
                                                value={this.state.password}
                                                onChange={  event => this.formInputChange(event as any) }/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary"
                                onClick={ () => this.doLogin() }>
                                    
                                    Log in
                                </Button>
                            </Form.Group>
                        </Form>
                        <Alert variant="danger"
                        className={ this.state.errorMesage ? '': 'd-none' }>
                            { this.state.errorMesage }
                        </Alert>
                </Card.Body>
            </Card>
            </Col>
        </Container>
       );
    }
}