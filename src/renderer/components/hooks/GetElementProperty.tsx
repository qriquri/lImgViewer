import React, { useCallback, useEffect, useState } from "react";
// https://zenn.dev/tm35/articles/7ac0a932c15ef8
// 引数のtargetProperty をDOMRectのもつPropertyに限定する
type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>;

export const useGetElementProperty = <T extends HTMLElement>(
  elementRef: React.RefObject<T>
) => {
  const getElementProperty = useCallback(
    () => {
      const clientRect = elementRef.current?.getBoundingClientRect();
      if (clientRect) {
        return clientRect;
      }

      // clientRect が undefined のときはデフォルトで0を返すようにする
    //   return 0;
    },
    [elementRef]
  );
  const [elementProperty, setElementProperty] = useState(getElementProperty())
  
  const getSelectedElementProperty = useCallback(
    (targetProperty: DOMRectProperty): number => {
        if(elementProperty){
            return elementProperty[targetProperty]
        }
        // undefined のときはデフォルトで0を返すようにする
        return 0
    },
    [elementProperty]
  );
  useEffect(() => {
    const onResize = () => {
      setElementProperty(getElementProperty());
    };
    setElementProperty(getElementProperty());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    getSelectedElementProperty,
  };
};