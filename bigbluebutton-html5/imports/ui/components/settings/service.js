import { callServer } from '/imports/ui/services/api/index.js';
import ClientServices from '/imports/ui/services/client-settings/index.js';

const getSavedFontSize = () => ClientServices.getFontSize();


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

  // Apply the CSS
  ClientServices.applyFontSize.call(this);

  console.log("settings service::validate and return");
  console.log(Math.min(this.props.tempFontSize + 1, ClientServices.fontSizeEnum.EXTRA_LARGE));

  // Validate range of tempFontSize and return
  return Math.min(this.props.tempFontSize + 1, ClientServices.fontSizeEnum.EXTRA_LARGE);
};

const saveTempDecFontChanges = function saveTempDecFontChanges() {
  console.log("settings service::saveTempDecFontChanges");
  console.log("settings service::saveTempDecFontChanges this");
  console.log(this); // ApplicationMenu

  // Apply the CSS
  ClientServices.applyFontSize.call(this);

  console.log("settings service::validate and return");
  console.log(Math.max(this.props.tempFontSize - 1, ClientServices.fontSizeEnum.EXTRA_SMALL));

  // Validate range of tempFontSize and return
  return Math.max(this.props.tempFontSize - 1, ClientServices.fontSizeEnum.EXTRA_SMALL);
};

export default {
  getSavedFontSize,
  getSavedFontSizeName,
  getFontSizeName,
  saveTempIncFontChanges,
  saveTempDecFontChanges,
};
