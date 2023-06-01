import { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  fetchPreferences,
  fetchUserDetail,
  formatPreferencesList,
} from "../utils/common";
import instanceAxios from "../http/axios";

const ArticlesPage = () => {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    article: "",
    from: "", //start date
    to: "", // end date
    category: "",
    source: "",
  });
  let currentRequestDataLimit = useRef(0);
  let page = useRef(1);
  const [articles, setArticles] = useState([]);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFields({
      ...fields,
      [evt.target.name]: value,
    });
  };

  const getPreferences = useCallback(async () => {
    try {
      const response = await fetchPreferences();
      setSources(formatPreferencesList(response.sources));
      setCategories(formatPreferencesList(response.categories));
    } catch (error) {}
  }, []);

  const getUser = useCallback(async () => {
    try {
      const user = await fetchUserDetail();
      setFields({
        ...fields,
        source: formatPreferencesList(user.sources)[0],
        category: formatPreferencesList(user.categories)[0],
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    getUser();
    getPreferences();
  }, [getUser, getPreferences]);

  const handleSelectChange = (selectedOptions, fieldKey) => {
    setFields({
      ...fields,
      [fieldKey]: selectedOptions,
    });
  };

  const fetchArticles = useCallback(
    async (payload) => {
      try {
        setLoading(true);
        const response = await instanceAxios.get("articles", {
          params: payload,
        });
        currentRequestDataLimit.current = response.length;
        setArticles([...articles, ...response]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [setArticles, articles]
  );

  const formSubmitHandler = (e) => {
    e && e.preventDefault();
    const payload = {
      ...(fields.article && { keyword: fields.article }),
      ...(fields.from && { from: fields.from }),
      ...(fields.to && { to: fields.to }),
      ...(fields.category && { category: fields.category.label }),
      ...(fields.source && { source: fields.source.label }),
      page: page.current,
    };
    if (Object.keys(payload).length) {
      fetchArticles(payload);
    }
  };
  return (
    <Container>
      <Row className="mt-5 d-flex justify-content-center align-items-center mb-5">
        <Col xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="">
            <Card.Body>
              <div className="mb-3">
                <p className="mb-3 fw-bold">Article Filter Form</p>
                <div className="mb-3">
                  <Form noValidate onSubmit={formSubmitHandler}>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Search Articles</Form.Label>
                          <Form.Control
                            type="text"
                            name="article"
                            value={fields.article}
                            onChange={handleChange}
                            placeholder="Search Article by Keywords"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Category</Form.Label>
                          <Select
                            isClearable
                            options={categories}
                            closeMenuOnSelect={false}
                            value={fields.category}
                            onChange={(selectedOptions) => {
                              handleSelectChange(selectedOptions, "category");
                            }}
                            placeholder="Please Select Categories"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Source</Form.Label>
                          <Select
                            isClearable
                            options={sources}
                            closeMenuOnSelect={false}
                            value={fields.source}
                            onChange={(selectedOptions) => {
                              handleSelectChange(selectedOptions, "source");
                            }}
                            placeholder="Please Select Source"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>From Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="from"
                            max={new Date().toISOString().split("T")[0]}
                            value={fields.from}
                            onChange={handleChange}
                            placeholder="select Date"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>To Date</Form.Label>
                          <Form.Control
                            disabled={!fields.from}
                            min={fields.from}
                            type="date"
                            name="to"
                            value={fields.to}
                            onChange={handleChange}
                            placeholder="select To"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Button
                          disabled={isLoading}
                          className="float-end"
                          variant="primary"
                          type="submit"
                        >
                          Search Article
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {isLoading && (
        <Row>
          <Col className="text-center">
            <Spinner
              style={{ width: "150px", height: "150px" }}
              animation="border"
              variant="secondary"
            />
          </Col>
        </Row>
      )}

      <Row>
        {articles.map((article, index) => {
          let imgUrl =
            article.image_url ||
            "https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg";
          return (
            <Col
              lg={4}
              md={6}
              className="mb-5"
              key={`${index} ${article.title}`}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={imgUrl}
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>
                    {article.excerptContent.substring(0, 250)}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {article.postDate && (
                    <ListGroup.Item>
                      {new Date(article.postDate).toISOString().split("T")[0]}
                    </ListGroup.Item>
                  )}
                  {article.categories && (
                    <ListGroup.Item>{article.categories}</ListGroup.Item>
                  )}
                  {article.source && (
                    <ListGroup.Item>{article.source}</ListGroup.Item>
                  )}
                </ListGroup>
                {article.webUrl && (
                  <Card.Body>
                    <Card.Link href={article.webUrl} target="_blank">
                      read more
                    </Card.Link>
                  </Card.Body>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>

      {currentRequestDataLimit.current === 10 && (
        <Row className="mb-5">
          <Col xs={12} className="text-center">
            <Button
              type="button"
              disabled={isLoading}
              onClick={(e) => {
                page.current = page.current + 1;
                formSubmitHandler(e);
              }}
            >
              {isLoading && (
                <Spinner
                  style={{ marginRight: "5px" }}
                  size="sm"
                  as="span"
                  animation="border"
                />
              )}
              Load more
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ArticlesPage;
