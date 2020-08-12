import React from 'react';
import ReactDOM from 'react-dom'


const Hello = ({name,age}) => {
  // 组件辅助函数
  // const bornYear = ()=>{
  //   const yearNow = new Date().getFullYear()
  //   return yearNow - props.age
  // }

  // 解构
  //const name = props.name
  //const age = props.age
  // const {name,age} = props
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
      Hello {name}, you are {age} years old
      </p>
  <p>So you were probaby born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
