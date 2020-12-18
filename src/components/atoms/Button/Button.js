import React from 'react';
import { bool, oneOf, func, string, node } from 'prop-types';

/* @Constants */
import { BUTTON_APPEARANCE, BUTTON_HTML_TYPES, BUTTON_SIZES, BUTTON_TYPES } from './constants';

/* @Utils */
import { getCalculatedAttributes, getCSSClassNames } from './utils';

const propTypes = {
  /** ♻️ Processing behaviour: */
  loading: bool,
  /** 🚫 Default html attribute: */
  disabled: bool,
  /** ➡️ 🖼 Default html attribute: */
  targetBlank: bool,
  /** 🖖 Class for root element: */
  className: string,
  /** 🔗 Default html attribute for `a href={href}`: */
  href: string,
  /** 🎚 Size of item: */
  size: oneOf(Object.values(BUTTON_SIZES)),
  /** 🎨 Decoration variant: */
  type: oneOf(Object.values(BUTTON_TYPES)),
  /** 🧱 HTML component: */
  component: oneOf(Object.values(BUTTON_HTML_TYPES)),
  /** 🌈 Custom size for component: */
  appearance: oneOf(Object.values(BUTTON_APPEARANCE)),
  /** 💬 Content for Button. Could be anything: */
  children: node,
  /** 🖱 Click handler: */
  onClick: func,
};

const Button = ({
  disabled,
  loading,
  targetBlank,
  className,
  size,
  href,
  type,
  appearance,
  children,
  component,
  onClick,
  ...props
}) => {
  const calculatedAttributes = getCalculatedAttributes({
    disabled,
    loading,
    targetBlank,
    href,
    component,
    onClick,
  });

  const { _className } = getCSSClassNames({ appearance, size, type, disabled, loading, className });

  const CustomButton = calculatedAttributes.component;
  delete calculatedAttributes.component;

  return (
    <CustomButton {...props} {...calculatedAttributes} className={_className}>
      {children}
    </CustomButton>
  );
};

Button.propTypes = propTypes;

Button.displayName = 'Button';

Button.defaultProps = {
  loading: false,
  disabled: false,
  size: BUTTON_SIZES.MD,
  type: BUTTON_TYPES.DEFAULT,
  appearance: BUTTON_APPEARANCE.BLUE,
  component: BUTTON_HTML_TYPES.BUTTON,
};

export { Button };
