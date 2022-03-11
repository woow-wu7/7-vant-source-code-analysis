import { Ref } from 'vue';
import { useHeight } from './use-height';
import type { BEM } from '../utils/create';

export function usePlaceholder(contentRef: Ref<Element | undefined>, bem: BEM) {
  const height = useHeight(contentRef); // 获取 van-nav-bar 的高度

  // usePlaceholder ( 返回一个函数 )，该函数的 ( 参数也是一个函数 eg: renderNavBar )
  return (renderContent: () => JSX.Element) => (
    <div
      class={bem('placeholder')}
      style={{ height: height.value ? `${height.value}px` : undefined }}
    >
      {renderContent()} 
      {/* 执行参数函数 */}
    </div>
  );
}
