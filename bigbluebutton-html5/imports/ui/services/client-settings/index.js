class ClientServices {
  static get fontSizeEnum() {
    return {
      EXTRA_SMALL: 1,
      SMALL: 2,
      MEDIUM: 3,
      LARGE: 4,
      EXTRA_LARGE: 5,

      properties: {
        1: { size: '12px', name: 'Extra Small' },
        2: { size: '14px', name: 'Small' },
        3: { size: '16px', name: 'Medium' },
        4: { size: '18px', name: 'Large' },
        5: { size: '20px', name: 'Extra Large' },
      },
    };
  }

  // Changing the font size in the CSS
  static applyFontSize(fontSize) {
    console.log("ClientServices::applyFontSize");
    // console.log("ClientServices::applyFontSize this");
    // console.log(this);
    //
    // console.log("ClientServices::applyFontSize this.state");
    // console.log(this.state);

    // if (this.props && this.props.tempFontSize) {
    //   console.log("ClientServices::applyFontSize this.props.tempFontSize");
    //   console.log(this.props.tempFontSize);
    // }

    // const size = (this.state && this.state.tempFontSize) ?
    //                 ClientServices.fontSizeEnum.properties[this.state.tempFontSize].size :
    //                 ClientServices.fontSizeEnum.properties[this.props.tempFontSize].size;

    const size = ClientServices.fontSizeEnum.properties[fontSize].size;
    console.log("size");
    console.log(size);
    document.getElementsByTagName('html')[0].style.fontSize = size;
  }

  // Load the font size that has been Permanently saved (in localStorage)
  static loadFontSize() {
    console.log("ClientServices::loadFontSize");
    console.log("this");
    console.log(this);

    const existingFontSize = localStorage.getItem('tempFontSize');
    let newFontSize = null;
    if (existingFontSize &&
      existingFontSize >= ClientServices.fontSizeEnum.EXTRA_SMALL &&
      existingFontSize <= ClientServices.fontSizeEnum.EXTRA_LARGE) {
      newFontSize = existingFontSize;
    } else {
      newFontSize = ClientServices.fontSizeEnum.MEDIUM;
    }

    // If the font size had been stored out of bounds, store medium instead
    ClientServices.storePermanentSettings('tempFontSize', newFontSize);
  }

  // Permanently store (until deleted) UI Settings
  static storePermanentSettings(key, value) {
    console.log("ClientServices::storePermanentSettings()");
    localStorage.setItem(key, value);

    switch (key) {
      case "tempFontSize":
        ClientServices.applyFontSize(value);
    }
  }

  static increaseFontSize() {
    const fs = Math.min(this.state.currentFontSize + 1, ClientServices.fontSizeEnum.EXTRA_LARGE);
    ClientServices.storeFontSize.call(this, fs);
  };

  static decreaseFontSize() {
    const fs = Math.max(this.state.currentFontSize - 1, ClientServices.fontSizeEnum.EXTRA_SMALL);
    ClientServices.storeFontSize.call(this, fs);
  };

  static getSavedFontSize() {
    /////////////////////////////////////
    // Chang applyFontSize to accept a value, not this
    /////////////////////////////////////
    const existingFontSize = localStorage.getItem('tempFontSize');
    ClientServices.applyFontSize(existingFontSize);

    return existingFontSize;

  };

  static getSavedFontSizeName() {
    console.log("client-services::getSavedFontSizeName()");

    // console.log("this");
    // console.log(this);
    // console.log("this.props");
    // console.log(this.props);
    // console.log("existingFontSize");
    // console.log(existingFontSize);
    // console.log("ClientServices.fontSizeEnum.properties");
    // console.log(ClientServices.fontSizeEnum.properties);
    // console.log("ClientServices.fontSizeEnum.properties[this.props.savedFontSize]");
    // console.log(ClientServices.fontSizeEnum.properties[this.props.savedFontSize]);

    const existingFontSize = localStorage.getItem('tempFontSize');

    console.log(ClientServices.fontSizeEnum.properties[existingFontSize].name);
    return ClientServices.fontSizeEnum.properties[existingFontSize].name;
  };

  static getFontSizeName(tempFontSize) {
    console.log("client-services::getFontSizeName(tempFontSize)");
    console.log("client-services::getFontSizeName(tempFontSize) tempFontSize name:");
    console.log(ClientServices.fontSizeEnum.properties[tempFontSize].name);
    return ClientServices.fontSizeEnum.properties[tempFontSize].name;
  }
};
export default ClientServices;
