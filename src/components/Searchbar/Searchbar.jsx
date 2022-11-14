import React, { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    imgName: '',
  };

  filterChange = event => {
    const { value } = event.currentTarget;
    this.setState({ imgName: value });
  };

  submitForm = e => {
    const { imgName } = this.state;
    e.preventDefault();
    this.props.searchImages(imgName);
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.filterChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
