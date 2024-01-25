# YMA Keyboard

addKeybordEvent 函数，简化给 HTMLElement 添加 keybord 事件

## Install

```sh
npm install yma-keyboard
```

## Usage

```js
const addKeybordEvent = require('yma-keyboard');
const el = document.getElementById('#el');
const remover = addKeybordEvent(el, function (e) {
    e.preventDefault(); // 阻止默认事件
});

remover(); // 移除事件
```
