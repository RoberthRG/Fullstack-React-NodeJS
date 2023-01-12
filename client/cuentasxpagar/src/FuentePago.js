import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { Component } from 'react';

class App extends Component {
    state = {
        tipoPago: []
    }

    componentDidMount() {
        axios
            .get("https://backend-fuentespago.herokuapp.com/tipoPago")
            .then((response) => {
                console.log(response);
                this.setState({ tipoPago: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        return (
            <div className="container">
                <h1>Fuentes de Pagos</h1>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Código
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="AA-001" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>Tipo de Pago</Form.Label>
                            <Col sm={10}>
                                <Form.Select>
                                    {this.state.tipoPago.map(elemento => (
                                        <option key={elemento.id} value={elemento.id}>{elemento.tp_descripcion}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>Estado</Form.Label>
                            <Form.Check type="switch" id="custom-switch"></Form.Check>
                        </Form.Group>
                    </Row>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Número de Cuenta Bancaria
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="220444789" />
                        </Col>
                    </Form.Group>
                    <Button type="button" size="lg">Aceptar</Button>
                    <Button type="button" size="lg">Cancelar</Button>
                </Form>
            </div>
        );
    }
}
export default App;