import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  resetInput = () => {
    this.setState({ inputValue: '' });
  };

  onInputChange = e => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.resetInput();
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.SearchFormBtn}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            name="inputValue"
            value={this.state.inputValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
