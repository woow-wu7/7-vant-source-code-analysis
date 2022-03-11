# Composables

### Intro

Vant provide some built-in composition APIs, you can directly use these APIs for development.

### Install

Although `@vant/use` is already included in Vant's dependencies, it is still recommended to install this package explicitly:

```shell
# with npm
npm i @vant/use

# with yarn
yarn add @vant/use

# with pnpm
pnpm add @vant/use
```

### Demo

```js
import { useWindowSize } from '@vant/use';

const { width, height } = useWindowSize();

console.log(width.value); // -> window width
console.log(height.value); // -> window height
```

### API List

| Name | Description |
| --- | --- |
| [useClickAway](#/en-US/use-click-away) | Triggers a callback when user clicks outside of the target element |
| [useCountDown](#/en-US/use-count-down) | Used to manage the countdown |
| [useToggle](#/en-US/use-toggle) | Used to switch between `true` and `false` |
