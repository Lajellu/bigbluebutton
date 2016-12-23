import React, { Component, PropTypes, Children, cloneElement } from 'react';
import cx from 'classnames';
import styles from '../styles';
import Button from '/imports/ui/components/button/component';

const PLACEMENTS = [
  'top left', 'top', 'top right',
  'right top', 'right', 'right bottom',
  'bottom right', 'bottom', 'bottom left',
  'left bottom', 'left', 'left top',
];

const propTypes = {
  /**
   * Placements of the dropdown and its caret
   * @defaultValue 'top'
   */
  placement: PropTypes.oneOf(PLACEMENTS),
};

const defaultProps = {
  placement: 'top',
  'aria-expanded': false,
};

export default class DropdownContent extends Component {
  render() {
    const { placement, className, children, style } = this.props;
    const { dropdownToggle, dropdownShow, dropdownHide } = this.props;

    let placementName = placement.split(' ').join('-');

    const boundChildren = Children.map(children, child => cloneElement(child, {
      dropdownToggle: dropdownToggle,
      dropdownShow: dropdownShow,
      dropdownHide: dropdownHide,
    }));

    return (
      <div
        style={style}
        aria-expanded={this.props['aria-expanded']}
        className={cx(styles.content, styles[placementName], className)}
      >
        {/*TODO: Add a boolean to display only if screen width < 600px*/}
        <Button
          label="close" // {intl.formatMessage(intlMessages.optionsLabel)}
          icon="close"
          id="mobileCloseButton"
          ghost={true}
          circle={true}
          hideLabel={true}
          className={cx(styles.btn)}

          // TODO: Close the menu onclick
          onClick={() => null}
        />
        {boundChildren}
      </div>
    );
  }
}

DropdownContent.propTypes = propTypes;
DropdownContent.defaultProps = defaultProps;
