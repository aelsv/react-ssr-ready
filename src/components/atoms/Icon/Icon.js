import React from 'react';
import { string, bool, oneOf } from 'prop-types';

/* @Constants */
import * as ICONS from './ICONS';
import { ICON_SIZES, ICON_APPEARANCE } from './constants';

/* @Libs */
import classNames from 'classnames/bind';

/* @Styles */
import css from './Icon.scss';

const cx = classNames.bind(css);

const propTypes = {
  /** 🚩 Flag for CSS display: block */
  block: bool,
  /** 💬 Name of svg: */
  name: oneOf(Object.values(ICONS)),
  /** 🎚 Size for svg: */
  size: oneOf(Object.values(ICON_SIZES)),
  /** 🎨 Fill for svg: */
  appearance: oneOf(Object.values(ICON_APPEARANCE)),
  /** 🖖 Class for svg: */
  className: string,
};

const Icon = ({ name: icon, size, appearance, block, className }) => {
  return (
    <svg
      className={cx('icon', {
        icon_block: block,
        [`icon_${size}`]: size,
        [`icon_${appearance}`]: appearance,
        [className]: !!className,
      })}
    >
      <use xlinkHref={`#${icon?.id}`} />
    </svg>
  );
};

Icon.propTypes = propTypes;

Icon.defaultProps = {
  block: false,
  size: ICON_SIZES.MD,
};

Icon.displayName = 'Icon';

export { Icon };
