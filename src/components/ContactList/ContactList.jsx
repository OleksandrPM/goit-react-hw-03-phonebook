import PropTypes from 'prop-types';
import Contact from './Contact';
import css from './ContactList.module.css';

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  deletePhonebook: PropTypes.func.isRequired,
};

function ContactList({ contacts, filter, onBtnClick, deletePhonebook }) {
  const renderingContacts = filterContacts(contacts, filter);
  return (
    <>
      {contacts.length > 0 ? (
        renderingContacts.length > 0 ? (
          <>
            <ul className={css.contact_list}>
              {renderingContacts.map(contact => {
                const { id, name, number } = contact;
                return (
                  <li className={css.contact_item} key={id}>
                    <Contact
                      name={name}
                      number={number}
                      onClick={() => onBtnClick(id)}
                    />
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={deletePhonebook}
              className={css.delete_all_btn}
            >
              Delete all contacts
            </button>
          </>
        ) : (
          <p>No contacts were found for your request</p>
        )
      ) : (
        <p>There are no contacts in contact list</p>
      )}
    </>
  );
}

function filterContacts(contacts, filter) {
  if (filter === '') {
    return contacts;
  } else {
    return contacts.filter(contact =>
      contact['name'].toLowerCase().includes(filter)
    );
  }
}
