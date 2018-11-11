import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Dropdown} from "semantic-ui-react";
import axios from 'axios';

class SearchBookForm extends Component {
    state = {
        query: '',
        loading: false,
        options: [],
        books: {}
    };

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    };

    onChange = (e, data) => {
        this.setState({query: data.value});
        this.props.onBookSelect(this.state.books[data.value])
    };

    fetchOptions = () => {
        if (!this.state.query) return;
        this.setState({
            loading: true
        });
        axios
            .get(`/api/books/search?q=${this.state.query}`)
            .then(res => res.data.books)
            .then(books => {
                const options = [];
                const booksHash = {};
                books.forEach(book => {
                    booksHash[book.goodreadsId] = book;
                    options.push({
                        key: book.goodreadsId,
                        value: book.goodreadsId,
                        text: book.title
                    })
                });
                this.setState({
                    loading: false,
                    options,
                    books: booksHash
                });
            });
    };

    render() {
        const {query, options, loading} = this.state;
        console.log(query);
        return (
            <Form>
                <Dropdown
                    search
                    fluid
                    placeholder="Search for a book by title"
                    value={query}
                    onSearchChange={this.onSearchChange}
                    options={options}
                    loading={loading}
                    onChange={this.onChange}
                />
            </Form>
        );
    }
}

SearchBookForm.propTypes = {
    onBookSelect: PropTypes.func.isRequired
};

export default SearchBookForm;