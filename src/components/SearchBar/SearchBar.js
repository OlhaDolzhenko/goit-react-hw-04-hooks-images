import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function SearchBar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={search}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
