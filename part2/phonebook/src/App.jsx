import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { useEffect } from 'react';
import personService from './services/persons';
import { v4 as uuidv4 } from 'uuid';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [message, setMessage] = useState(null);
  const [notifyType, setNotifyType] = useState('success');

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const isPersonExist = persons.some((person) => person.name === newName);

    if (!newName || !newNumber) {
      alert(`Name or number can't be null.`);
      return;
    }

    if (isPersonExist) {
      const msg = `${newName} is already added to phonebook, replace the old number with a new one?`;
      const replaceConfirm = window.confirm(msg);
      const personExist = persons.find((person) => person.name === newName);
      if (personExist.number === newNumber) {
        return;
      }
      const replacePersonObj = { ...personExist, number: newNumber };
      replaceConfirm &&
        personService
          .update(personExist.id, replacePersonObj)
          .then((response) => {
            const personUpdated = response.data;

            setPersons(
              persons.map((person) =>
                person.id !== personExist.id ? person : personUpdated
              )
            );

            setMessage(`Update number ${personUpdated.number}`);
            setNotifyType('success');
          })
          .catch((error) => {
            console.log(error);
            setMessage(error.message);
            setNotifyType('error');
          });

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: uuidv4(),
    };

    personService.create(personObject).then((respone) => {
      setPersons(persons.concat(respone.data));
      setNewName('');
      setNewNumber('');
      setMessage(`Add ${personObject.name}`);
      setNotifyType('success');
    });
  };

  const handleInputChange = (setNewValue) => (event) => {
    event.preventDefault();
    setNewValue(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const deletePersonOf = (id) => {
    const person = persons.find((person) => person.id === id);
    const delConfirm = window.confirm(`Delete ${person.name} ?`);

    delConfirm &&
      personService
        .remove(id)
        .then((respone) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setMessage(
            `Information of ${person.name} has already been removed from sever`
          );
          setNotifyType('error');
        });
  };

  const notifyAction = () => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>
        {message && (
          <Notification
            message={message}
            notifyType={notifyType}
            action={notifyAction}
          />
        )}
      </h3>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleInputChange(setNewName)}
        handleNumberChange={handleInputChange(setNewNumber)}
        handleSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePersonOf} />
    </div>
  );
}

export default App;
