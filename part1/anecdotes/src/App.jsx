import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [voteResult, setVoteResult] = useState({});

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const voteAnecdote = () => {
    const newValue = {
      ...voteResult,
    };
    newValue[selected] ? (newValue[selected] += 1) : (newValue[selected] = 1);
    setVoteResult(newValue);
  };

  const ShowMostVoteAnecdote = () => {
    const keys = Object.keys(voteResult);
    if (keys.length === 0) {
      return (
        <div>
          <h1>Anecdote with most votes</h1>
          <div>No votes yet</div>
        </div>
      );
    }

    const maxVoteKey = keys.reduce((max, key) =>
      voteResult[key] > voteResult[max] ? key : max
    );

    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <div>{anecdotes[maxVoteKey]}</div>
        <div>has {voteResult[maxVoteKey] || 0} votes</div>
      </div>
    );
  };

  const VoteTotal = () => {
    return <div>has {voteResult[selected] || 0} votes</div>;
  };

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  );

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <VoteTotal />
      <div>
        <Button handleClick={() => voteAnecdote()} text="vote"></Button>
        <Button
          handleClick={() => setSelected(getRandomInt(0, 6))}
          text="next anecdote"
        ></Button>
      </div>
      <ShowMostVoteAnecdote />
    </div>
  );
};

export default App;
