// 使用 let 作块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i*1000);
}

// 使用闭包
for (let i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 1000 * i);
  })(i);
}
