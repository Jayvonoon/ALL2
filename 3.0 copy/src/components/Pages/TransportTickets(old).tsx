import React from "react";
import { Col, Row } from 'react-bootstrap';
import TransportItem from '../Page_comp/TransportItem.tsx';
import transportItems from '../data/TransportItems.json';
import Navbar from '../Page_comp/Navbar.tsx'

function TransportTickets() {
  return (
    <>
      <Navbar />
      <h1>Transport Tickets</h1>
      <Row xs={1} md={2} lg={3} className="g-3">
        {transportItems.map(item => (
          <Col key={item.id}>
            <TransportItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default TransportTickets;
