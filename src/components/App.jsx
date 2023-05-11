import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = inputData => {
    const { name, number } = inputData;
    if (!this.isContactPresent(name, number)) {
      this.setState({
        contacts: [
          ...this.state.contacts,
          this.createContactObj(inputData),
        ].sort(),
      });
    } else {
      alert(`${name} is already in the contacts`);
    }
  };

  createContactObj(inputData) {
    const id = nanoid();
    return { id, ...inputData };
  }

  isContactPresent(name, number) {
    return this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number === number
    );
  }

  deleteContact = id => {
    this.setState(({ contacts }) => {
      return { contacts: contacts.filter(contact => contact.id !== id) };
    });
  };

  onChangeFilterInput = debounce(event => {
    this.setState({ filter: event.target.value.trim().toLowerCase() });
  }, 300);

  render() {
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <section className={css.contacts}>
          <h2>Contacts</h2>
          <Filter
            value={this.state.filter}
            onChange={this.onChangeFilterInput}
          />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
            onBtnClick={this.deleteContact}
          />
        </section>
      </div>
    );
  }
}

export default App;
