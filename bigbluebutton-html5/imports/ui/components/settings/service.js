import { callServer } from '/imports/ui/services/api/index.js';
import ClientServices from '/imports/ui/services/client-settings/index.js';

const getSavedFontSize = () => ClientServices.getSavedFontSize();


const getSavedFontSizeName = () => {
  console.log("settings service::getSavedFontSizeName");

  return ClientServices.getSavedFontSizeName();
};

const getFontSizeName = (fontSize) => {
  console.log("settings service::getFontSizeName(fontSize)");
  console.log("settings service::getFontSizeName(fontSize) fontSize");
  console.log(fontSize);
  return ClientServices.getFontSizeName(fontSize);
};

const saveTempIncFontChanges = function saveTempIncFontChanges() {
  console.log("settings service::saveTempIncFontChanges");
  console.log("settings service::saveTempIncFontChanges this");
  console.log(this); // ApplicationMenu

  const fs = Math.min(this.props.tempFontSize + 1, ClientServices.fontSizeEnum.EXTRA_LARGE);
  // Apply the CSS
  ClientServices.applyFontSize(fs);

  console.log("settings service::validate and return");
  console.log(fs);

  // Validate range of tempFontSize and return
  return fs
};

const saveTempDecFontChanges = function saveTempDecFontChanges() {
  console.log("settings service::saveTempDecFontChanges");
  console.log("settings service::saveTempDecFontChanges this");
  console.log(this); // ApplicationMenu

  const fs = Math.max(this.props.tempFontSize - 1, ClientServices.fontSizeEnum.EXTRA_SMALL);

  // Apply the CSS
  ClientServices.applyFontSize(fs);

  console.log("settings service::validate and return");
  console.log(fs);

  // Validate range of tempFontSize and return
  return fs;
};

const savePermanentSettings = (key, value) => {
  console.log("settings service::savePermanentSettings");

  ClientServices.storePermanentSettings(key, value);
};

export default {
  savePermanentSettings,
  getSavedFontSize,
  getSavedFontSizeName,
  getFontSizeName,
  saveTempIncFontChanges,
  saveTempDecFontChanges,
};
