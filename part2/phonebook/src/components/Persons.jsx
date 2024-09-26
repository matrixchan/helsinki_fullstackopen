import Person from './Person';

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          onClickHandler={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
