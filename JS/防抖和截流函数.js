/**
 * 截流函数，单位时间内只执行一次
 * scroll 滚动事件
 * input 搜索发送请求等
 */
function throttle(fn, delay) {
  let flag = true,
    timer = null;
  return function (...args) {
    let context = this;
    if (!flag) return;

    flag = false;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
      flag = true;
    }, delay);
  };
}

/**
 * 第一次一定会触发
 */
function throttle(fn, delay) {
  let pre = 0;
  return function (...args) {
    if (Date.now() - pre > delay) {
      pre = Date.now();
      fn.apply(this, args);
    }
  };
}

/**
 * 定时器和时间戳结合
 */
function throttle(fn, delay) {
  let pre = 0;
  let timer = null;
  return function (...args) {
    if (Date.now() - pre > delay) {
      clearTimeout(timer);
      timer = null;
      pre = Date.now();
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
}

/**
 * 防抖，不论触发频率有多高，一定在触发 n 秒后才执行
 * 新的事件到来会覆盖掉之前的计时
 * 窗口 resize
 * 登录，发送短信避免多次请求
 * 文本编辑器实时保存
 */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

function debounce(fn, delay, immediate) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);

    if (immediate && timer) fn.apply(this, args);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const handleResize = () => {};

window.addEventListener("resize", debounce(handleResize, 200));
