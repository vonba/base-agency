import React from 'react';
// import Proptypes from 'prop-types';
import { createLocaleTextGetter } from '../utils/localization';

function localize(Component) {
  return class Localize extends React.Component {
    constructor(props) {
      super(props);

      this.getLocalizedContent = createLocaleTextGetter(
        this.props.pageContext.locale
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          data={this.getLocalizedContent(this.props.data)}
        />
      );
    }
  };
}

export default localize;
