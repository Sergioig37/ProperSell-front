import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";


export const PropiedadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [propiedad, setPropiedad] = useState({});
  const [propietario, setPropietario] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/propiedad/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            navigate("/"); // Navigate back if property not found
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            setPropiedad(data);
            fetch(`http://localhost:9090/propiedad/propietario/${id}`, {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
              },
            })
              .then((res) => res.json())
              .then((data) => setPropietario(data));
          }
        })
        .catch((error) => {
          console.error("Error fetching property:", error);
        });
    }
  }, [id, token, navigate]);
  


  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12} md={4} className="text-center">
              
                <h5>{propiedad.tipo}</h5>
              </Col>
              <Col xs={12} md={8}>
                <h6>Información de la Propiedad</h6>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Localización:</strong> {propiedad.localizacion}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Precio:</strong> {propiedad.precio}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contactar al dueño:</strong>{" "}
                    {propietario.numeroTelefono}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
