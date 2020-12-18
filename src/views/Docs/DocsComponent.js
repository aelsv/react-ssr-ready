import React from 'react';
/* import {} from 'prop-types'; */

/* @Constants */
import * as ICONS from 'components/atoms/Icon/ICONS';

/* @Components */
import { Icon } from 'components/atoms/Icon';

const propTypes = {};

const DocsComponent = () => (
  <div>
    <h1>Hello from Docs!Q</h1>
    <Icon name={ICONS.AVATAR} />
    <p>
      Get the details, frameworks, and tools you need to use system fonts for Apple platforms in your apps. These
      typefaces offer the control and flexibility to optimally display text at a variety of sizes, in many different
      languages, across multiple interfaces.
    </p>
  </div>
);

DocsComponent.propTypes = propTypes;

DocsComponent.displayName = 'DocsComponent';

export default DocsComponent;
