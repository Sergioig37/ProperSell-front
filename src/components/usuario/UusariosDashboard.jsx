import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const UsuariosDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      } else {
        fetch("http://localhost:9090/usuario", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUsuarios(data);
          });
      }
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/usuario/edit/${id}`);
  };

  const handleDelete = (idUsuario) => {
    console.log("Eliminar usuario", idUsuario);
    var data = {
      id: idUsuario,
    };

    fetch(`http://localhost:9090/usuario/del/${data.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== idUsuario));
    });
    console.log("Eliminado Usuario", data.id);
  };

  const handleVer = (id) => {
    navigate(`/usuario/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Button
        variant="contained"
        color="primary"
        href="/usuario/create"
        sx={{ mt: 4 }}
      >
        Crear Usuario
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Correo</TableCell>
              <TableCell align="right">Nombre Real</TableCell>
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell component="th" scope="row">
                  {usuario.id}
                </TableCell>
                <TableCell align="right">{usuario.username}</TableCell>
                <TableCell align="right">{usuario.correo}</TableCell>
                <TableCell align="right">{usuario.nombreReal}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleVer(usuario.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(usuario.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(usuario.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};