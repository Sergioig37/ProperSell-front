import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavbarGeneral } from "../NavbarGeneral";

export const UsuarioUpdate = () => {
  const [correo, setCorreo] = useState("");
  const [nombreReal, setNombreReal] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const token = useAuth().getToken();
  const passwrd = useAuth().getAuthPassword();
  const idUser = useAuth().getId();
  const user= useAuth().getUser();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/${idUser}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCorreo(data.correo);
          setNombreReal(data.nombreReal);
          setNumeroTelefono(data.numeroTelefono ? data.numeroTelefono : "");
          setPassword(passwrd);
          setUsername(data.username);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [idUser, token, navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        username: username,
        correo: correo,
        nombreReal: nombreReal,
        numeroTelefono: numeroTelefono,
        password: password,
      };
      console.log(user);
      fetch(`http://localhost:9090/usuario/edit/${idUser}/${user}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.token) {
            setToken(res.token);
          }
          navigate(-1, { replace: true });
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!nombreReal.trim()) {
      formIsValid = false;
      errors["nombreReal"] = "Ingrese su nombre real";
    }

    if (!correo.trim()) {
      formIsValid = false;
      errors["correo"] = "Ingrese su correo electrónico";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      formIsValid = false;
      errors["correo"] = "Ingrese un correo electrónico válido";
    }

    if (!numeroTelefono.trim()) {
      formIsValid = false;
      errors["numeroTelefono"] = "Ingrese su número de teléfono";
    } else if (!/^\d+$/.test(numeroTelefono)) {
      formIsValid = false;
      errors["numeroTelefono"] =
        "El número de teléfono debe contener solo números";
    } else if (numeroTelefono.trim().length !== 9) {
      formIsValid = false;
      errors["numeroTelefono"] = "El número de teléfono debe tener 9 dígitos";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <>
    <NavbarGeneral/>
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Actualizar Usuario</h2>
          <Form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
              <Alert variant="danger">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            )}
            <Form.Group controlId="nombreReal" className="mb-3">
              <Form.Label>Nombre Real</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre real"
                value={nombreReal}
                onChange={(e) => setNombreReal(e.target.value)}
                isInvalid={!!errors["nombreReal"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["nombreReal"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="numeroTelefono" className="mb-3">
              <Form.Label>Número de Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su número de teléfono"
                value={numeroTelefono}
                onChange={(e) => setNumeroTelefono(e.target.value)}
                isInvalid={!!errors["numeroTelefono"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["numeroTelefono"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="correo" className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                isInvalid={!!errors["correo"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["correo"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors["password"]}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors["password"]}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};
