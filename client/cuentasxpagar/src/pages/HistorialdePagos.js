import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:3799/pago";

class App extends Component {
    state = {
        data: [],
        items: [],
        show: false,
        form: {
            id_cabecera: ''
        }

    }

    seleccionarPagoId = (pagos) => {
        this.setState({
            form: {
                id_cabecera: pagos.id_cabecera
            }
        })
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        })
    }

    peticionDelete = () => {
        axios.put(url + "/" + this.state.form.id_cabecera).then(response => {
            this.peticionGet();
        })
    }


    componentDidMount() {
        this.peticionGet();
    }

    render() {
        const { form } = this.state;
        return (

            <div className="App">
                <br /><br />
                <h5>Historial de Pagos</h5>
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav.Item>
                </Nav>
                <br />

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Col sm={1}>
                        <Button variant="success">Crear</Button>{' '}
                    </Col>
                    <Col sm={6}></Col>
                    <Col sm={4}>
                        <Form.Control type="text" placeholder="Numero de Pago" />
                    </Col>
                    <Col sm={1}>
                        <Button variant="outline-secondary">Buscar</Button>{' '}
                    </Col>
                </Form.Group>

                <br /><br />
                <Table className='table' striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>Id Pago</th>
                            <th>Descripción Pago</th>
                            <th>Proveedor RUC</th>
                            <th>Tipo de Pago</th>
                            <th>Fecha de Pago</th>
                            <th>Detalles</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(pago => {

                            let detalles = [];
                            for (let i = 0; i < pago.cab_detalle.length; i++) {
                                detalles.push(<tr>
                                    <td>{pago.cab_detalle[i].id_detalle}</td>
                                    <td>{pago.cab_detalle[i].cantidad_a_pagar}</td>
                                    <td>{pago.cab_detalle[i].fcom_id}</td>
                                </tr>)
                            }

                            let active = 1;
                            let items = [];

                            for (let number = 1; number <= 2; number++) {
                                items.push(
                                    <Pagination.Item key={number} active={number === active}>
                                        {number}
                                    </Pagination.Item>,
                                );
                            }
                            this.state.items = items;





                            return (
                                <tr>
                                    <td>
                                        <Button variant="warning">Editar</Button>
                                        <Button variant="danger" onClick={() => { this.seleccionarPagoId(pago); this.setState({ show: true }) }}>Borrar</Button>
                                    </td>
                                    <td>{pago.id_cabecera}</td>
                                    <td>{pago.descripcion_pago}</td>
                                    <td>{pago.ruc_proveedor}</td>
                                    <td>{pago.cdgo_tipo_pago}</td>
                                    <td>{pago.fecha_pago = new Date().toLocaleDateString()}</td>
                                    <td>
                                        <Table className='table' striped bordered hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>ID Pago Factura</th>
                                                    <th>Cantidad a Pagar</th>
                                                    <th>Codigo de Factura</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detalles}
                                            </tbody>
                                        </Table>

                                    </td>
                                    <td>{pago.total}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>


                <Pagination style={{ alignItems: 'center', justifyContent: 'center' }}>{this.state.items}</Pagination>


                <Modal show={this.state.show} onHide={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>Borrar Pago</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> ¿Estás seguro que deseas eliminar el pago {form.id_cabecera}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.setState({ show: false })} >
                            No
                        </Button>
                        <Button variant="success" onClick={() => { this.peticionDelete(); this.setState({ show: false }) }}>
                            Si
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default App;