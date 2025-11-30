import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export const Portal = ({ children, containerId = 'portal-root' }: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);

    if (!element) {
      element = document.createElement('div');
      element.id = containerId;
      document.body.appendChild(element);
    }

    setContainer(element);

    return () => {
      // Cleanup if portal was created by this component
      if (element && element.childNodes.length === 0) {
        document.body.removeChild(element);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};
