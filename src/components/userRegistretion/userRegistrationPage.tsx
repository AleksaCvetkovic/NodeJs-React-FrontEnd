import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';

interface UserRegistratinPageState {
    formData: {
        email: string;
        password: string;
    };
    message?: string;

    isRegistrationComplete: boolean;
}


export class UserRegistrationPage extends React.Component {
state: UserRegistratinPageState;

constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state= {
        isRegistrationComplete: false,
        formData: {
            email: '',
            password: '',
        },

        };
    }
    private formInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const newFormData = Object.assign(this.state.formData,{
            [ event.target.id ]: event.target.value,
        })
        const newState = Object.assign(this.state, {
            formData: newFormData,
        });
        this.setState(newState);
    }

    render() {
        return (
        <Container >
        <Col md={{ span: 8, offset: 2 }}>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faUserPlus } />User Register
                    </Card.Title>
                    {
                         (this.state.isRegistrationComplete === false)?
                             this.renderForm():
                        
                         this.renderRegistrationCompleteMessage()
                    }
                </Card.Body>
            </Card>
        </Col>
        </Container>
        );
       
    }
    private renderForm() {
        return (
            <>
            <Form>
            <Form.Group>
                <Form.Label htmlFor="email">E= mail</Form.Label>
                <Form.Control type="email" id="email"
                            value={this.state.formData.email}
                            onChange={  event => this.formInputChange(event as any) }/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">password</Form.Label>
                <Form.Control type="password" id="password"
                                value={this.state.formData.password}
                                onChange={  event => this.formInputChange(event as any) }/>
            </Form.Group>
            <Form.Group>
                <Button variant="primary"
                onClick={ () => this.doRegister() }>
                    
                     Register
                </Button>
            </Form.Group>
        </Form>
        <Alert variant="danger"
        className={ this.state.message ? '': 'd-none' }>
            { this.state.message  }
        </Alert>
        </>
        );
    }
    private renderRegistrationCompleteMessage() {
        return (
            <p>
                Uspesna registracija.<br />
                <Link to="/user/login">Click here</Link> Da biste otisli na login stranicu
            </p>
        );
    }

    private doRegister(){
        const data = {
            email: this.state.formData.email,
            password: this.state.formData.password,
        };

        api('auth/user/register', 'post', data)
        .then((res: ApiResponse) => {
            if(res.status === 'error'){
                this.setErrorMesage('System error')
                return;
            }

            if(res.data.statusCode !== undefined){
                this.hanldeErrors(res.data);
                return;
            }

            this.registrationComplete();
        })
    }
    private setErrorMesage(message: string){
        const newState = Object.assign(this.state, {
            message: message,
        });
        this.setState(newState);
    }
    private hanldeErrors(data: any){
        let message = '';

        switch (data.statusCode){
            case -6001: message = 'Vec postoji korisnik'; break;
        }
        this.setErrorMesage(message);
    }
    private registrationComplete(){
        const newState = Object.assign(this.state,{
            isRegistrationComplete: true,
        });
        this.setState(newState);
    }
}