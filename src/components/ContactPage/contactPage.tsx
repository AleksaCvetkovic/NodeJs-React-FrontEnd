import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Container } from 'react-bootstrap';


export default class COntactPage extends React.Component {
    render() {
    return (
        <Container >
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faPhone } />Contact details
                    </Card.Title>
                    <Card.Text>
                        Konrakt podaci....
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
        );
    }
}