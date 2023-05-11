import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import {
  pushToLocalStorage,
  getFromLocalStorage,
  clearStorage,
} from 'localStorage/local-storage';

import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const phonebook = getFromLocalStorage();

    if (phonebook !== null) {
      this.setState({ contacts: phonebook });
    }
  }

  componentDidUpdate() {
    const {
      state: { contacts },
    } = this;

    if (contacts.length > 0) {
      pushToLocalStorage(contacts);
    }

    if (contacts.length === 0) {
      clearStorage();
    }
  }

  addContact = inputData => {
    const { name, number } = inputData;
    const {
      state: { contacts },
      isContactPresent,
      createContactObj,
    } = this;

    if (!isContactPresent(name, number)) {
      this.setState({
        contacts: [...contacts, createContactObj(inputData)].sort(),
      });
    } else {
      alert(`${name} is already in the contacts`);
    }
  };

  createContactObj(inputData) {
    const id = nanoid();
    return { id, ...inputData };
  }

  isContactPresent = (name, number) => {
    const {
      state: { contacts },
    } = this;

    if (contacts.length > 0) {
      return contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() &&
          contact.number === number
      );
    } else {
      return false;
    }
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      return { contacts: contacts.filter(contact => contact.id !== id) };
    });
  };

  onChangeFilterInput = debounce(event => {
    this.setState({ filter: event.target.value.trim().toLowerCase() });
  }, 300);

  clearPhonebook = () => {
    this.setState({ contacts: [] });
  };

  render() {
    const {
      state: { contacts, filter },
      addContact,
      deleteContact,
      onChangeFilterInput,
      clearPhonebook,
    } = this;

    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <section className={css.contacts}>
          <h2>Contacts</h2>
          {contacts.length > 0 && (
            <Filter value={filter} onChange={onChangeFilterInput} />
          )}
          <ContactList
            contacts={contacts}
            filter={filter}
            onBtnClick={deleteContact}
            clearPhonebook={clearPhonebook}
          />
        </section>
      </div>
    );
  }
}

export default App;
