import React, { Component } from "react";
import { Row, Col, Container } from "../components/Grid";
import { ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";

class Detail extends Component {
  state = {
    books: []
  };
  componentDidMount() {
    this.loadbooks();
  }

  loadbooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data });
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => {
        this.loadbooks();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <h3>Book List</h3>
        {this.state.books.length ? (
          <Row>
            {this.state.books.map(book => (
              <Row key={book._id}>
                <ListItem>
                  <div className="card">
                    <h5 className="card-header">
                      {book.title} by {book.authors}
                    </h5>
                    <div className="card-body">
                      <Row>
                        <Col size="md-8">
                          <p className="card-text" name="description">
                            {book.description}
                          </p>
                        </Col>
                        <Col size="md-3">
                          <img
                            alt="small thumbnail"
                            className="card-img-top"
                            src={book.smallThumbnail}
                            style={{ width: 300, height: 300 }}
                          />
                        </Col>
                      </Row>
                      <a href={book.infoLink} className="btn btn-primary">
                        View
                      </a>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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

export default Detail;
