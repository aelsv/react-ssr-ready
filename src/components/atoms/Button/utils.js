/* @Libs */
import classNames from 'classnames/bind';

/* @Styles */
import css from './Button.scss';

const cx = classNames.bind(css);

export const getCalculatedAttributes = ({ loading, disabled, targetBlank, href, component, onClick }) => ({
  component,
  disabled: loading || disabled,
  onClick: disabled ? e => e.preventDefault() : onClick,

  ...(component === 'button' && { type: 'button', role: 'button' }),

  ...(component === 'submit' && {
    component: 'button',
    type: 'submit',
  }),

  ...(component === 'a' && {
    component: 'a',
    href,
    disabled: null,
    ...(targetBlank && { target: '_blank' }),
  }),

  /* TODO: Add Link */
});

export const getCSSClassNames = ({ appearance, size, type, disabled, /* loading, */ className }) => ({
  _className: cx('button', {
    button_disabled: disabled,
    [`button_${type}`]: type,
    [`button_${size}`]: size,
    [`button_${appearance}`]: appearance,
    [className]: !!className,
  }),
});
