import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import SettingsService from './service';
import Settings from './component';

const propTypes = {
  /** The font size the user saved
    */
  savedFontSize: PropTypes.string.isRequired,

  /** The font size name the user saved
   * Possible values: EXTRA_SMALL, SMALL, MEDIUM, LARGE, EXTRA_LARGE
   */
  savedFontSizeName: PropTypes.string.isRequired,

  actions: PropTypes.object.isRequired,

};

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      savedFontSize,
      savedFontSizeName,
      actions,
    } = this.props;

    return (
      <Settings
        savedFontSize={savedFontSize}
        savedFontSizeName={savedFontSizeName}
        actions={actions}
      />
    );

  }
}

export default createContainer(() => {
  console.log("settings/container createContainer()");
  const savedFontSize = SettingsService.getSavedFontSize();
  const savedFontSizeName = SettingsService.getSavedFontSizeName();

  return {
    savedFontSize,
    savedFontSizeName,
    actions: {
      getSavedFontSizeNameHandler: function getSavedFontSizeNameHandler() {
        console.log("settings/container createContainer() getSavedFontSizeNameHandler()");

        // console.log(this);
        SettingsService.getFontSizeName.call(this);
      },
      getFontSizeNameHandler: function getFontSizeNameHandler(fontsize) {
        console.log("settings/container createContainer() getFontSizeNameHandler()");

        // console.log(this);
        return SettingsService.getFontSizeName(fontsize);
      },
      saveTempIncFontChangesHandler: function saveTempIncFontChangesHandler() {
        return SettingsService.saveTempIncFontChanges.call(this);
      },
      saveTempDecFontChangesHandler: function saveTempDecFontChangesHandler() {
        return SettingsService.saveTempDecFontChanges.call(this);
      },
      savePermanentSettingsHandler: (key, value) =>
          SettingsService.savePermanentSettings(key, value),
    },
  };
}, SettingsContainer);

SettingsContainer.propTypes = propTypes;
