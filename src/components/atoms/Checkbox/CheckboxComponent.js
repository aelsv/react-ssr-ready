import React from 'react';
/* import {} from 'prop-types'; */

const propTypes = {};

const CheckboxComponent = () => {
  console.log('Checkbox');

  return <input type="checkbox" />;
};

CheckboxComponent.propTypes = propTypes;

CheckboxComponent.defaultProps = {};

CheckboxComponent.displayName = 'CheckboxComponent';

export default CheckboxComponent;
