import { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card, Col, Row } from "react-bootstrap";
import instanceAxios from "../http/axios";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserDetail } from "../utils/common";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: "",
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
    const { name, email, password } = fields;
    if (name && email && password) {
      registerUser();
    }
  };

  const getUser = useCallback(async () => {
    const { categories, sources, authors } = await fetchUserDetail();
    if (categories.length || sources.length || authors.length) {
      navigate("/articles");
    } else {
      navigate("/preferences");
    }
  }, []);

  const registerUser = useCallback(async () => {
    try {
      const { token } = await instanceAxios.post("/register", fields);
      localStorage.setItem("token", token);
      getUser();
    } catch (error) {}
  }, [fields, getUser]);

  return (
    <>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">
                    InnoScripta Frontend
                  </h2>
                  <p className=" mb-5">Please enter your detail to Register!</p>
                  <div className="mb-3">
                    <Form noValidate onSubmit={formSubmitHandler}>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={fields.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={fields.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
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
                          Register
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Do you have an account?{" "}
                        <Link to={"/login"} className="text-primary fw-bold">
                          Login
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

      {/* <Container fluid="xs">
        <Form noValidate onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
            />
          </Form.Group>
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
          <Row>
            <Col>
              <Link to={"/login"}>Go to Login</Link>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container> */}
    </>
  );
};

export default SignUpPage;
