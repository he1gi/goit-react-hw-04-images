import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearchengin } from 'react-icons/fa';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setInputValue(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return toast.error('Введите название');
    }
    onSubmit(inputValue);
  };

  return (
    <header className="searchbar">
      <form className="searchform" onSubmit={handleSubmit}>
        <button className="searchform-button" type="submit">
          <span className="button-label">
            <FaSearchengin className="svg" />
          </span>
        </button>

        <input
          className="searchform-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
