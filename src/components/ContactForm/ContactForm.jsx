import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = { name: '', number: '' };

  onInputChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  onFormBtnClick = event => {
    event.preventDefault();
    const form = event.currentTarget;
    this.setState({
      name: form.elements.name.value.trim(),
      number: form.elements.number.value.trim(),
    });
    this.props.onSubmit(this.state);
    form.reset();
  };

  render() {
    const { onFormBtnClick, onInputChange } = this;

    return (
      <form onSubmit={onFormBtnClick} className={css.form}>
        <label className={css.form_label}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            onChange={onInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.form_label}>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            onChange={onInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };

export default ContactForm;
