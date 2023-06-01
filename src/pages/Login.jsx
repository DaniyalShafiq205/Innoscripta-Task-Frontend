import { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import instanceAxios from "../http/axios";
import { fetchUserDetail } from "../utils/common";

const LoginPage = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFields({
      ...fields,
      [evt.target.name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { email, password } = fields;
    if (email && password) {
      loginUser();
    }
  };

  const getUser = useCallback(async () => {
    const { categories, sources, authors } = await fetchUserDetail();
    if (categories.length || sources.length || authors.length) {
      window.location.replace("/articles");
    } else {
      window.location.replace("/preferences");
    }
  }, []);

  const loginUser = useCallback(async () => {
    try {
      const { token } = await instanceAxios.post("/login", fields);
      localStorage.setItem("token", token);
      getUser();
    } catch (error) {}
  }, [fields, getUser]);

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">
                  Innoscripta Frontend
                </h2>
                <p className=" mb-5">Please enter your login and password!</p>
                <div className="mb-3">
                  <Form noValidate onSubmit={formSubmitHandler}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={fields.password}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <Link to={"/register"} className="text-primary fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
