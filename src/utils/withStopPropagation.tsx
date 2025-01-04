import type { ReactElement } from 'react';
import React from 'react';

export enum PropagationEventMap {
  'click' = 'onClick',
}

export default function withStopPropagation(
  element: ReactElement,
  events: string[] = ['click'],
) {
  const props: Record<string, any> = { ...element.props };
  for (const key of events) {
    if (PropagationEventMap[key]) {
      const eventName = PropagationEventMap[key];
      props[eventName] = function (e: Event) {
        e.stopPropagation();
        element.props[eventName]?.(e);
      };
    }
  }
  return React.cloneElement(element, props);
}
