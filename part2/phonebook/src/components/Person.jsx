import Button from './Button';

const Person = ({ person, onClickHandler }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <Button handleClick={onClickHandler} text="delete" />
    </div>
  );
};

export default Person;
