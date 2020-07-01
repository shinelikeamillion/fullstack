import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 带参数的组件
// 使用 空元素 避免创建额外的 元素
const Hello = ({ name, age }) => (
    <>
        {/* 大括号内的内容会被计算 */}
        <p>Hello {name}, you are {age} years old</p>
        <p>So you were probably born in {new Date().getFullYear() - age}</p>
    </>
);

const App = () => {
    const name = 'lilsean'
    const age = 10
    return (
        <div>
            <Hello name={name} age={age} />
            <h3>and here is a counter {counter}</h3>
        </div>
    );
};

const rend = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    )
}

let counter = 0
setInterval(
    () => {
        rend()
        counter++
    },
    1000
)