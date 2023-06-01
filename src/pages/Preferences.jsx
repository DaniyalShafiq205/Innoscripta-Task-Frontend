import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Select from "react-select";
import instanceAxios from "../http/axios";
import {
  fetchPreferences,
  fetchUserDetail,
  formatPreferencesList,
} from "../utils/common";

const PreferencesPage = () => {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSelectChange = (selectedOptions, setSelectedPreference) => {
    setSelectedPreference(selectedOptions);
  };

  const getPreferences = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchPreferences();
      setSources(formatPreferencesList(response.sources));
      setCategories(formatPreferencesList(response.categories));
      setAuthors(formatPreferencesList(response.authors));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async () => {
    try {
      const user = await fetchUserDetail();
      setSelectedSources(formatPreferencesList(user.sources));
      setSelectedCategories(formatPreferencesList(user.categories));
      setSelectedAuthors(formatPreferencesList(user.authors));
    } catch (error) {}
  }, []);

  useEffect(() => {
    getUser();
    getPreferences();
  }, [getUser, getPreferences]);

  const updatePreferences = useCallback(async (payload) => {
    try {
      setBtnLoading(true);
      const response = await instanceAxios.post(
        "/preferences/addToUser",
        payload
      );
    } catch (error) {
    } finally {
      setBtnLoading(false);
    }
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      selectedAuthors.length ||
      selectedCategories.length ||
      selectedSources.length
    ) {
      const payload = {
        authors: selectedAuthors.map((author) => author.id),
        categories: selectedAuthors.map((category) => category.id),
        sources: selectedAuthors.map((source) => source.id),
      };
      updatePreferences(payload);
    }
  };

  return (
    <Row className="mt-5 pt-5 d-flex justify-content-center align-items-center">
      <Col md={8} lg={6} xs={12}>
        <div className="border border-3 border-primary"></div>
        <Card className="shadow">
          <Card.Body>
            <div className="mb-3">
              <p className="mb-3 fw-bold">Preferences & Settings</p>
              <div className="mb-3">
                <Form noValidate onSubmit={formSubmitHandler}>
                  <Row className="align-items-center">
                    <Col xs={12}>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Sources</Form.Label>
                        <Select
                          isMulti
                          options={sources}
                          isLoading={isLoading}
                          closeMenuOnSelect={false}
                          value={selectedSources}
                          onChange={(selectedOptions) =>
                            handleSelectChange(
                              selectedOptions,
                              setSelectedSources
                            )
                          }
                          placeholder="Please Select Sources"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Categories</Form.Label>
                        <Select
                          isMulti
                          options={categories}
                          isLoading={isLoading}
                          closeMenuOnSelect={false}
                          value={selectedCategories}
                          onChange={(selectedOptions) =>
                            handleSelectChange(
                              selectedOptions,
                              setSelectedCategories
                            )
                          }
                          placeholder="Please Select Categories"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Authors</Form.Label>
                        <Select
                          isMulti
                          options={authors}
                          isLoading={isLoading}
                          closeMenuOnSelect={false}
                          value={selectedAuthors}
                          onChange={(selectedOptions) =>
                            handleSelectChange(
                              selectedOptions,
                              setSelectedAuthors
                            )
                          }
                          placeholder="Please Select Authors"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button
                        disabled={btnLoading}
                        className="float-end"
                        variant="primary"
                        type="submit"
                      >
                        {btnLoading && (
                          <Spinner
                            style={{ marginRight: "5px" }}
                            size="sm"
                            as="span"
                            animation="border"
                          />
                        )}
                        Save Preferences
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
  );
};

export default PreferencesPage;
