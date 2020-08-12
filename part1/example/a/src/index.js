import React from 'react';
import ReactDOM from 'react-dom'

// 简写
// const App = () => (
//   <div>
//     <p>Hello world</p>
//   </div>
// )

// const App = () => {
//   console.log('Hello from component')
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }

//在组件内部渲染动态内容
// const now = new Date()
// const a = 10
// const b = 20
// const App = () => {
//   return (
//     <div>
//       <p>Hello world, it is {now.toString()}</p>
//       <p>
//         {a} plus {b} is {a + b}
//       </p>
//     </div>  
//   )
// }

//多组件
// const Hello = () => {
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }

// const App = () => {
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello />
//       <Hello />
//     </div>
//   )
// }

// 传数据
const Hello = (props) => {
  return (
    <div>
      Hello {props.name}, you are {props.age} years old
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
