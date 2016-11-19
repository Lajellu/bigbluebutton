import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Icon from '/imports/ui/components/icon/component';
import Button from '/imports/ui/components/button/component';
import BaseMenu from '../base/component';
import ReactDOM from 'react-dom';
import ClientServices from '/imports/ui/services/client-settings/index';
import styles from '../styles.scss';

const propTypes = {
  /**
   * Method that saves the temporary changes the client has made to the settings menu
   */
  saveTempChanges: PropTypes.func.isRequired,

  /**
   * The font size the user has chosen, may or may not yet be saved
   */
  tempFontSize: PropTypes.string.isRequired,

  /**
   * Methods that call ClientService's methods
   */
  actions: PropTypes.object.isRequired,
};

export default class ApplicationMenu extends BaseMenu {
  constructor(props) {
    super(props);
    console.log("ApplicationMenu::constructor");
    console.log("ApplicationMenu::constructor this.props.tempFontSize");
    console.log(this.props.tempFontSize);
  }

  saveTempIncFontChanges() {
    console.log("application::saveTempIncFontChanges");
    console.log("application::saveTempIncFontChanges this");
    console.log(this);

    // Prepare the in-range user's font choice, and apply the css
    const fs = this.props.actions.saveTempIncFontChangesHandler.call(this);

    console.log("application::saveTempIncFontChanges fs");
    console.log(fs);

    // Save the temp changes in parent state (with rest of temp changes)
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Changes to the settings state should trigger rerender, and cause appl.props.tempFontSize to change
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    this.props.saveTempChanges("tempFontSize", fs);
  }

  saveTempDecFontChanges() {
    console.log("application::saveTempDecFontChanges");

    // Prepare the in-range user's font choice, and apply the css
    const fs = this.props.actions.saveTempDecFontChangesHandler.call(this);

    // Save the temp changes in parent state (with rest of temp changes)
    this.props.saveTempChanges("tempFontSize", fs);
  }

  getContent() {
    return (
      <div className={styles.full} role='presentation'>
          <div className={styles.row} role='presentation'>
            <label><input type='checkbox' tabIndex='7' aria-labelledby='audioNotifLabel'
              aria-describedby='audioNotifDesc' />Audio notifications for chat</label>
            <div id='audioNotifLabel' hidden>Audio notifications</div>
            <div id='audioNotifDesc' hidden>
              Toggles the audio notifications for chat.</div>
          </div>
          <div className={styles.row} role='presentation'>
            <label><input type='checkbox' tabIndex='8' aria-labelledby='pushNotifLabel'
              aria-describedby='pushNotifDesc' />Push notifications for chat</label>
            <div id='pushNotifLabel' hidden>Push notifications</div>
            <div id='pushNotifDesc' hidden>
              Toggles the push notifications for chat.</div>
          </div>
        <div className={styles.applicationFontContainer} role='presentation'>
          <div className={styles.fontBarLeft}>
            <p>Font size</p>
          </div>
          <div className={styles.fontBarMid}>
            <p>{this.props.actions.getFontSizeNameHandler(this.props.tempFontSize)}</p>
          </div>
          <div className={styles.fontBarRight} role='presentation'>
            <Button
              onClick={this.saveTempIncFontChanges.bind(this)}
              icon={'circle-add'}
              circle={true}
              tabIndex={9}
              hideLabel={true}
              label={'Increase Font'}
              aria-labelledby={'sizeUpLabel'}
              aria-describedby={'sizeUpDesc'}
            />
            <div id='sizeUpLabel' hidden>Font size up</div>
            <div id='sizeUpDesc' hidden>
              Increases the font size of the application.</div>
            <Button
              onClick={this.saveTempDecFontChanges.bind(this)}
              icon={'circle-minus'}
              circle={true}
              tabIndex={10}
              hideLabel={true}
              label={'Decrease Font'}
              aria-labelledby={'sizeDownLabel'}
              aria-describedby={'sizeDownDesc'}
            />
          <div id='sizeDownLabel' hidden>Font size down</div>
          <div id='sizeDownDesc' hidden>
            Decreases the font size of the application.</div>
          </div>
        </div>
      </div>
    );
  }
};
