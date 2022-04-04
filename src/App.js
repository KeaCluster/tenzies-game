import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import Die from './Components/Die'
import { nanoid } from "nanoid";

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);


  // Effect to check if game is finished
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const val = dice[0].value
    const allSame = dice.every(die => die.value === val)
    if (allHeld && allSame) setTenzies(true)
  }, [dice])

  //New set of dice
  function allNewDice() {
    const newDice = []
    for (let i = 0; i <= 9; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      })
    }
    return newDice
  }

  // Roll dice that arent held
  const rollDice = () => {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
        die :
        { ...die, value: Math.ceil(Math.random() * 6), id: nanoid() }
    }))
  }

  const holdDice = id => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const btnHandler = () => {
    !tenzies ?
      rollDice() :
      setDice(allNewDice()); setTenzies(false)
  }

  const diceElements = dice.map(
    die => <Die isHeld={die.isHeld} key={die.id} value={die.value} holdDice={() => { holdDice(die.id) }} />
  )


  allNewDice()

  return (
    <div className="main">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die--container'>
        {diceElements}
      </div>
      <button
        className='roll-btn'
        onClick={btnHandler}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
