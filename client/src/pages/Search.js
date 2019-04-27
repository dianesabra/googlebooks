import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Container } from "../components/Grid";
import { ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";

class Books extends Component {
  state = {
    books: [],
    title: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    return axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.title)
      .then(response => {
        this.setState({ books: response.data.items });
      })
      .catch(err => console.log(err));
  };

  saveBook = bookData => {
    API.saveBook(bookData)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <form>
            <h3>Search</h3>
            <Input
              value={this.state.title}
              type="text"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              className="form-control"
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn
              disabled={!this.state.title}
              onClick={this.handleFormSubmit}
            >
              Search
            </FormBtn>
          </form>
        </Row>
        <h3>Results</h3>
        {this.state.books.length ? (
          <Row>
            {this.state.books.map(book => (
              <Row key={book.id}>
                <ListItem>
                  <div className="card">
                    <h5 className="card-header">
                      {book.volumeInfo.title} by {book.volumeInfo.authors}
                    </h5>
                    <div className="card-body">
                      <Row>
                        <Col size="md-8">
                          <p className="card-text" name="description">
                            {book.volumeInfo.description}
                          </p>
                        </Col>
                        <Col size="md-3">
                          <img
                            alt="small thumbnail"
                            className="card-img-top"
                            src={book.volumeInfo.imageLinks.smallThumbnail}
                            style={{ width: 300, height: 300 }}
                          />
                        </Col>
                      </Row>
                      <a
                        href={book.volumeInfo.infoLink}
                        className="btn btn-primary"
                      >
                        View
                      </a>
                      <SaveBtn onClick={() => this.saveBook(book.volumeInfo)} />
                    </div>
                  </div>
                </ListItem>
              </Row>
            ))}
          </Row>
        ) : (
          <h4>No Results to Display</h4>
        )}
      </Container>
    );
  }
}

export default Books;
