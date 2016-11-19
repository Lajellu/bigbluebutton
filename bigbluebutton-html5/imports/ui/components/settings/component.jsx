import React, { Component, PropTypes } from 'react';
import Icon from '/imports/ui/components/icon/component';
import Button from '/imports/ui/components/button/component';
import Modal from '/imports/ui/components/modal/component';
import AudioMenu from './submenus/audio/component';
import VideoMenu from './submenus/video/component';
import ApplicationMenu from './submenus/application/component';
import UsersMenu from './submenus/users/component';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import styles from './styles.scss';

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

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    console.log("settings::constructor");
    console.log("settings::constructor savedFontSize");
    console.log(this.props.savedFontSize);
    console.log("settings::constructor savedFontSizeName");
    console.log(this.props.savedFontSizeName);

    this.submenus = [];
    this.state = { tempFontSize: this.props.savedFontSize };
  }

  componentWillMount() {
    /* activeSubmenu represents the submenu in the submenus array to be displayed to the user,
     * initialized to 0
     */
    this.setState({ activeSubmenu: 0 });
    /* focusSubmenu represents the submenu in the submenus array which currently has focus,
     * initialized to 0
     */
    this.setState({ focusSubmenu: 0 });
    this.submenus.push({ componentName: AudioMenu, tabIndex: 3,
      props: { title: 'Audio', prependIconName: 'icon-', icon: 'bbb-audio', }, });
    this.submenus.push({ componentName: VideoMenu, tabIndex: 4,
      props: { title: 'Video', prependIconName: 'icon-', icon: 'bbb-video', }, });
    this.submenus.push({ componentName: ApplicationMenu, tabIndex: 5,
      props: { title: 'Application', prependIconName: 'icon-', icon: 'bbb-application', }, });
    this.submenus.push({ componentName: UsersMenu, tabIndex: 6,
      props: { title: 'Participants', prependIconName: 'icon-', icon: 'bbb-user', }, });
  }

  createMenu() {
    const curr = this.state.activeSubmenu === undefined ? 0 : this.state.activeSubmenu;

    let props = {
      title: this.submenus[curr].props.title,
      prependIconName: this.submenus[curr].props.prependIconName,
      icon: this.submenus[curr].props.icon,
      saveTempChanges: this.saveTempChanges.bind(this),
      tempFontSize: this.state.tempFontSize,
      actions: this.props.actions,
    };

    const Submenu = this.submenus[curr].componentName;
    return <Submenu {...props}/>;
  }

  saveTempChanges(key, value) {
    console.log("settings::saveTempChanges");
    this.setState({ [key]: value }, () => {
      console.log("this.state");
      console.log(this.state);
    });
  }

  savePermanentChanges() {
    console.log("Settings::savePermanentChanges()");
    console.log("this.state");
    console.log(this.state);

    console.log(Object.keys(this.state));
    console.log(Object.values(this.state));

    const keys = Object.keys(this.state);
    const values = Object.values(this.state);

    for (let i = 0; i < keys.length; i++) {
      ClientServices.storePermanentSettings.call(this, keys[i], values[i]);
    }

  }

  /* When an option in the menu is clicked, set the activeSubmenu and focusSubmenu
   * to the value of index. If clicked out of bounds set to 0 or end of submenus array accordingly.
   *
   * activeSubmenu: the submenu to be displayed to the user
   * focusSubmenu: the submenu to set focus to
   */
  clickSubmenu(i) {
    if (i <= 0) {
      this.setState({ activeSubmenu: 0, focusSubmenu: 0, });
      return;
    }

    if (i >= this.submenus.length) {
      this.setState({ activeSubmenu: this.submenus.length - 1,
        focusSubmenu: this.submenus.length - 1, });
      return;
    } else {
      this.setState({ activeSubmenu: i, focusSubmenu: i, });
    }
  }

  /* calls the focus method on an object in the submenu */
  setFocus() {
    ReactDOM.findDOMNode(this.refs[`submenu${this.state.focusSubmenu}`]).focus();
  }

  /* Checks for key presses within the submenu list. Key behaviour varies.
   *
   * Tab: changes focus to next submenu or element outside of menu
   * Shift+Tab: changes focus to previous submenu or element outside of menu
   * Up Arrow: changes focus to previous submenu, can cycle through menu
   * Down Arrow: changes focus to next submenu, can cycle through menu
   * Spacebar: selects submenu in focus and sets as active
   * Enter: selects submenu in focus and sets as active
   */
  handleKeyDown(event) {
    // tab
    if (event.keyCode === 9) {
      let newIndex = 0;
      if (this.state.focusSubmenu >= this.submenus.length - 1) {
        newIndex = this.submenus.length - 1;
      } else {
        newIndex = this.state.focusSubmenu + 1;
      }

      this.setState({ focusSubmenu: newIndex });
      return;
    }

    // shift+tab
    if (event.shiftKey && event.keyCode === 9) {
      let newIndex = 0;
      if (this.state.focusSubmenu <= 0) {
        newIndex = 0;
      } else {
        newIndex = this.state.focusSubmenu - 1;
      }

      this.setState({ focusSubmenu: newIndex });
      return;
    }

    // up arrow
    if (event.keyCode === 38) {
      if (this.state.focusSubmenu <= 0) {
        this.setState({ focusSubmenu: this.submenus.length - 1 }, function () {
          this.setFocus();
        });
      } else {
        this.setState({ focusSubmenu: this.state.focusSubmenu - 1 }, function () {
          this.setFocus();
        });
      }

      return;
    }

    // down arrow
    if (event.keyCode === 40) {
      if (this.state.focusSubmenu >= this.submenus.length - 1) {
        this.setState({ focusSubmenu: 0 }, function () {
          this.setFocus();
        });
      } else {
        this.setState({ focusSubmenu: this.state.focusSubmenu + 1 }, function () {
          this.setFocus();
        });
      }

      return;
    }

    // spacebar or enter
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.setState({ activeSubmenu: this.state.focusSubmenu });
      return;
    }
  }

  /* Keeps the focusSubmenu variable at the correct value when
   * tabbing or shift-tabbing out of the submenu array
   */
  handleFocus(index) {
    this.setState({ focusSubmenu: index });
  }

  render() {
    return (
      <Modal
        title="Settings"
        confirm={{
          callback: (() => {
            this.setState({ activeSubmenu: 0, focusSubmenu: 0 });
            this.savePermanentChanges();
            console.log('SHOULD APPLY SETTINGS CHANGES');
          }),
          label: 'Save',
          description: 'Saves the changes and close the settings menu',
        }}
        dismiss={{
          callback: (() => {
            this.setState({ activeSubmenu: 0, focusSubmenu: 0 });
            console.log('SHOULD DISCARD SETTINGS CHANGES');
          }),
          label: 'Cancel',
          description: 'Discard the changes and close the settings menu',
        }}>
        <div className={styles.full} role='presentation'>
          <div className={styles.settingsMenuLeft}>
            <ul className={styles.settingsSubmenu} role='menu'>
              {this.submenus.map((value, index) => (
                <li key={index} ref={'submenu' + index} role='menuitem' tabIndex={value.tabIndex}
                  onClick={this.clickSubmenu.bind(this, index)}
                  onKeyDown={this.handleKeyDown.bind(this)}
                  onFocus={this.handleFocus.bind(this, index)}
                  className={classNames(styles.settingsSubmenuItem,
                    index == this.state.activeSubmenu ? styles.settingsSubmenuItemActive : null)}

                  >
                  <Icon key={index} prependIconName={value.props.prependIconName}
                    iconName={value.props.icon} title={value.props.title}/>
                  <span className={styles.settingsSubmenuItemText}>{value.props.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.settingsMenuRight} role='presentation'>
            {this.createMenu()}
          </div>
        </div>
      </Modal>
    );
  }
};

Settings.defaultProps = { title: 'Settings' };
Settings.propTypes = propTypes;
