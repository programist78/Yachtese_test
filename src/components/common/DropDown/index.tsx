import { FC, MutableRefObject, useEffect } from 'react';
import { ReactNode, useRef } from 'react';

import { CSSTransition } from 'react-transition-group';

import s from './DropDown.module.scss';

type DropDownProps = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  isOpen: boolean;
  parent: MutableRefObject<HTMLDivElement | null>;
  onClickOutside?: (isOpen: boolean) => void;
  transition?: number;
};

export const DropDown: FC<DropDownProps> = ({
  children,
  className,
  contentClassName,
  isOpen,
  parent,
  onClickOutside,
  transition = 200
}) => {
  const nodeRef = useRef(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (onClickOutside && !parent?.current?.contains(e.target as Node)) {
      onClickOutside(false);
    }
  };

  useEffect(() => {
    if (onClickOutside) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, []);

  const transitionClasses = {
    enter: s.DropDown_enter,
    enterActive: s.DropDown_enterActive,
    exit: s.DropDown_exit,
    exitActive: s.DropDown_exitActive
  };

  return (
    <CSSTransition
      className={`${s.DropDown} ${className ? className : ''}`.trim()}
      in={isOpen}
      unmountOnExit
      mountOnEnter
      nodeRef={nodeRef}
      timeout={transition}
      classNames={transitionClasses}
    >
      <div ref={nodeRef}>
        <div
          className={`${s.DropDown_content} ${
            s.contentClassName ? contentClassName : ''
          }`.trim()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};
