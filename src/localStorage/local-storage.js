export { pushToLocalStorage, getFromLocalStorage, clearStorage };

const PHONEBOOK_KEY = 'GOIT-REACT-HW-03-PHONEBOOK';

function pushToLocalStorage(data) {
  try {
    localStorage.setItem(PHONEBOOK_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function getFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(PHONEBOOK_KEY));
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(PHONEBOOK_KEY);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
