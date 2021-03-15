/**
 * 一个 REACT 需要实现的功能
 * 1. createElement
 * 2. render
 * 3. concurrent(同步) Mode
 *  递归改为 wipRoot, nextUnitOfWork, scheduler
 * 4. Fibers
 *  组织分片的任务；fiber tree, 每一个 fiber 相当与一个 工作单位
 * 5. render and commit phases
 *  performUnitOfWork, 内存中更新 workInprogressFiber 组件；双缓存
 * 6. Fiber reconcilation
 *  把可中断的任务切片处理
 *  能够调整优先级，重制并复用任务
 *  能够在父元素与子元素之间交错处理，以支持React中的布局
 *  能够在render() 中返回多个元素
 *  更好的支持错误边界
 * 7. function components
 * 8. hooks
 */

/*
 const element = {
   type: "h1",
   props: {
     title: "foo",
     children: "Hello"
   }
 }

 const container = document.getElementById("root")

 const node = document.createElement(element.type)
 node['title'] = element.props.title

 const text = document.createTextNode("")
 text['nodeValue'] = element.props.children
 */

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

// 处理基本元素
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
const isEvent = key => key.startsWith("on")
const isProperty = key => key !== "children" && !isEvent(key)

function createDom(fiber) {
  const dom =
  fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  // props
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => (dom[name] = fiber.props[name]));

  // children
  fiber.props.children.forEach((child) => render(child, dom));
  return dom;
}

function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })
​
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}

function commitDeletion(fiber, domParent) {
  if(fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

let nextUnitOfWork = null;
let wipRoot = null; // workinprogressFiber
let currentRoot = null;
let deletions = null;
/**
 * 渲染的时候考虑子节点问题
 * 递归调用问题，一旦开始递归，不能终止，否则有更新不全的问题
 */
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

/** 调度器
 * 为了解决更新问题，
 * 我们把任务分片，允许浏览器打断我们的任务
 * 并且在必要（idle: 空闲）时，接着执行我们的工作
 * React 使用 Scheduler 取代 requuestIdleCallback，但是概念上是一样的
 */

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if(!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requuestIdleCallback(workLoop);
}

/** 线程空闲的时候执行 loop */
requuestIdleCallback(workLoop);

const isFunctionComponent = fiber.type instanceof Function
let wipFiber = null // workinprogress fiber
let hookIndex = null

/**
 * 函数组件的子元素都来自参数
 */
function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children)
}

/* 在内存中执行任务，并返回下一个分片的任务
*/
function performUnitOfWork(fiber) {
  // 1. add dom node
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // if (!nextUnitOfWork && wipRoot) {
  //   commitRoot();
  // }
  // 2. create new fibers for children
  // const elements = fiber.props.children;
  // reconcileChildren(fiber, elements);

  // 3. return next unit of work; child -> sibling -> uncle
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

/**
 * 
 * 找出变化的组件
 * @param wipFiber 
 * @param elements 
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];

    const newFiber = null;

    // compare oldFiber to element
    const sameType = oldFiber && element && element.type == oldFiber.type;

    // 如果是相同， 则复用
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      // delete old node
      (oldFiber.effectTag = "UPDATE"), deletions.push(oldFiber);
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;

  let domParentFiber = fiber.parent
  while(!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION" && fiber.dom != null) {
    commitDeletion(fiber, domParent)
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

/** Fiber
 * render 方法中我们创建 rootfiber and set it as the nextUnitOfWork
 * rest of the work will happen on the performUnitOfWork, there we will do three things
 * 1. add the element to the DOM
 * 2. create the fibers for the elements's children
 * 3. select the next unit of work
 */

 /**
  * Hooks
  */
 function useState(initial) {
   const oldHook = wipFiber.alternate &&
   wipFiber.alternate.hooks &&
   wipFiber.alternate.hooks[hookIndex]
   const hook = {
     state: oldHook ? oldHook.state : initial,
     queue: []
   }

   const actions = oldHook ? oldHook.queue : []
   actions.forEach(action => {
     hook.state = action(hook.state)
   })

   const setState = action => {
     hook.queue.push(action)
     wipRoot = {
       dom: currentRoot.dom,
       props: currentRoot.props,
       alternate: currentRoot
     }
     nextUnitOfWork = wipRoot
     deletions = []
   }

   wipFiber.hooks.push(hook)
   hookIndex++
   return [hook.state, setState]
 }

const Didact = {
  createElement,
  render,
};

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
Didact.render(element, container);
