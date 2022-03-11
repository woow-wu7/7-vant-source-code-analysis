import { get } from './basic';
import { camelize } from './format';
import { isFunction } from './validate';
import locale from '../locale';

// createTranslate
export function createTranslate(name: string) {
  const prefix = camelize(name) + '.';

  return (path: string, ...args: unknown[]) => {
    const messages = locale.messages();
    const message = get(messages, prefix + path) || get(messages, path);

    return isFunction(message) ? message(...args) : message;
  };
}

export type Translate = ReturnType<typeof createTranslate>;

export type Mod = string | { [key: string]: any }; // Mod 是一个 string | object
export type Mods = Mod | Mod[]; // string | object | array<object>


function genBem(name: string, mods?: Mods): string {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }

  if (Array.isArray(mods)) {
    return mods.reduce<string>((ret, item) => ret + genBem(name, item), ''); // 数组递归拼接
  }

  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name, key) : ''),
    ''
  );
}

/**
 * bem helper 重点看bem函数的示例
 * b() // 'button'
 * b('text') // 'button__text' ::------------------------------------------------------- block 块 --------------- '' 字符串表示block
 * b({ disabled }) // 'button button--disabled' ::-------------------------------------- modifier 修饰符 --------- {} 花括号表示修饰符
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary' ------------- 数组表示多个modifier
 */
export function createBEM(name: string) { // createBEM 返回一个函数
  return (el?: Mods, mods?: Mods): Mods => {
    // 1 string 时处理 el 和 mods
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    // 2 object | array ，因为上面是字符串的话 el 将被处理为 ''
    el = el ? `${name}__${el}` : name; // 生成block

    return `${el}${genBem(el, mods)}`;
  };
}

export type BEM = ReturnType<typeof createBEM>;

export function createNamespace(name: string) { // 命名空间
  const prefixedName = `van-${name}`; // 前缀eg, van-nav-bar
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName),
  ] as const;
}
