import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Icon from '/imports/ui/components/icon/component';
import Button from '/imports/ui/components/button/component';
import styles from './styles';
import { FormattedMessage } from 'react-intl';
import DropdownWrapper from '../dropdown/dropdown-wrapper/component';
import DropdownTrigger from '../dropdown/dropdown-trigger/component';
import DropdownContent from '../dropdown/dropdown-content/component';

const propTypes = {
  userEmojiStatus: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

export default class Emoji extends Component {
  constructor(props) {
    super(props);
    this.menus = [];
    this.openWithKey = this.openWithKey.bind(this);
    // this.clickMenu = this.clickMenu.bind(this); //add this to other places clickMenu is called
  }

  componentWillMount() {
    /* Fill this with your menu items */
    this.setState({ activeMenu: -1, focusedMenu: 0, });
    this.menus.push({ className: '',
        props: { title: 'Away', prependIconName: 'icon-', icon: 'bbb-time',
                ariaLabelleby: 'awayLabel', ariaDescribedby:'awayDesc',},
        tabIndex: 1, });
    this.menus.push({ className: '',
        props: { title: 'Raise', prependIconName: 'icon-', icon: 'bbb-hand',
                ariaLabelleby: 'raiseLabel', ariaDescribedby:'raiseDesc',},
        tabIndex: 2, });
    this.menus.push({ className: '',
        props: { title: 'Undecided', prependIconName: 'icon-', icon: 'bbb-undecided',
                ariaLabelleby: 'undecidedLabel', ariaDescribedby:'undecidedDesc',},
        tabIndex: 3, });
    this.menus.push({ className: '',
        props: { title: 'Confused', prependIconName: 'icon-', icon: 'bbb-confused',
                ariaLabelleby: 'confusedLabel', ariaDescribedby:'confusedDesc',},
        tabIndex: 4, });
    this.menus.push({ className: '',
        props: { title: 'Sad', prependIconName: 'icon-', icon: 'bbb-sad',
                ariaLabelleby: 'sadLabel', ariaDescribedby:'sadDesc',},
        tabIndex: 5, });
    this.menus.push({ className: '',
        props: { title: 'Happy', prependIconName: 'icon-', icon: 'bbb-happy',
                ariaLabelleby: 'happyLabel', ariaDescribedby:'happyDesc',},
        tabIndex: 6, });
    this.menus.push({ className: '',
        props: { title: 'Clear', prependIconName: 'icon-', icon: 'bbb-clear-status',
                ariaLabelleby: 'clearLabel', ariaDescribedby:'clearDesc',},
        tabIndex: 7, });
  }

  componentWillUpdate() {
    /* Reset each menuitem so it can be selected again */
    const DROPDOWN = this.refs.dropdown;
    if (DROPDOWN.state.isMenuOpen && this.state.activeMenu >= 0) {
      this.setState({ activeMenu: -1, focusedMenu: 0, });
    }
  }

  setFocus() {
    ReactDOM.findDOMNode(this.refs[`menu${this.state.focusedMenu}`]).focus();
  }

  handleListKeyDown(event) {
    const pressedKey = event.keyCode;
    let numOfMenus = this.menus.length - 1;

    // User pressed tab
    if (pressedKey === 9) {
      let newIndex = 0;
      if (this.state.focusedMenu >= numOfMenus) { // Checks if at end of menu
        newIndex = 0;
        if (!event.shiftKey) {
          this.refs.dropdown.hideMenu();
        }
      } else {
        newIndex = this.state.focusedMenu;
      }

      this.setState({ focusedMenu: newIndex, });
      return;
    }

    // User pressed shift + tab
    if (event.shiftKey && pressedKey === 9) {
      let newIndex = 0;
      if (this.state.focusedMenu <= 0) { // Checks if at beginning of menu
        newIndex = numOfMenus;
      } else {
        newIndex = this.state.focusedMenu - 1;
      }

      this.setState({ focusedMenu: newIndex, });
      return;
    }

    // User pressed up key
    if (pressedKey === 38) {
      if (this.state.focusedMenu <= 0) { // Checks if at beginning of menu
        this.setState({ focusedMenu: numOfMenus, },
           () => { this.setFocus(); });
      } else {
        this.setState({ focusedMenu: this.state.focusedMenu - 1, },
           () => { this.setFocus(); });
      }

      return;
    }

    // User pressed down key
    if (pressedKey === 40) {
      if (this.state.focusedMenu >= numOfMenus) { // Checks if at end of menu
        this.setState({ focusedMenu: 0, },
           () => { this.setFocus(); });
      } else {
        this.setState({ focusedMenu: this.state.focusedMenu + 1, },
           () => { this.setFocus(); });
      }

      return;
    }

    // User pressed enter and spaceBar
    if (pressedKey === 13 || pressedKey === 32) {
      this.clickMenu(this.state.focusedMenu);
      return;
    }

    //User pressed ESC
    if (pressedKey == 27) {
      this.setState({ activeMenu: -1, focusedMenu: 0, });
      this.refs.dropdown.hideMenu();
    }

    return;
  }

  handleFocus(index) {
    this.setState({ focusedMenu: index, },
       () => { this.setFocus(); });
  }

  clickMenu(indexChosenStatus) {
    const {
      userEmojiStatus,
      actions,
    } = this.props;

    this.setState({ activeMenu: indexChosenStatus, }, () => {
      // If an option was chosen, set it as the user's status
      if (indexChosenStatus >= 0) {
        console.log("---Emoji component.jsx---- clickMenu::An option was chosen");
        const status = this.menus[indexChosenStatus].props.title;
        actions.setEmojiHandler(status);
      }
    });

    this.refs.dropdown.hideMenu();
  }

  openWithKey(event) {
    // Focus first menu option
    if (event.keyCode === 9) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ focusedMenu: 0 }, () => { this.setFocus(); });
  }

  render() {
    const {
      userEmojiStatus,
    } = this.props;

    console.log("----imports/ui/components/emoji/component.jsx render-----");
    console.log("userEmojiStatus");
    console.log(userEmojiStatus);
    console.log("--------------");

    // style={{"color" : (userEmojiStatus === value.props.title) ? "$color-primary" : "$color-text"}}
    return (
      <div>
        {/* DropdownWrapper contains DropdownTrigger and DropdownContent */}
        <DropdownWrapper
          ref='dropdown'
          focusMenu={this.openWithKey}
          aria-labelledby='optionsLabel'
          aria-describedby='optionsDesc'>

          {/* Trigger to open dropdown menu */}
          <DropdownTrigger
            styleBtn={styles}
            labelBtn='Raise'
            iconBtn='hand'
            ghostBtn={false}
            colorBtn={'primary'}
            sizeBtn={'lg'}
            hideBtn={false}
            />

          {/* Content for the dropdown menu */}
          <DropdownContent>
            <div className={styles.triangleOnDropdown}></div>
            <div className={styles.dropdownActiveContent}>
              <ul className={styles.menuList} role="menu">
                {this.menus.map((value, index) => (
                  <li
                    key={index}
                    role='menuitem'
                    tabIndex={value.tabIndex}
                    onClick={this.clickMenu.bind(this, index)}
                    onKeyDown={this.handleListKeyDown.bind(this)}
                    onFocus={this.handleFocus.bind(this, index)}
                    ref={'menu' + index}
                    className={styles.emojiMenuItem}
                    aria-labelledby={value.props.ariaLabelleby}
                    aria-describedby={value.props.ariaDescribedby}>

                    <Icon
                      key={index}
                      prependIconName={value.props.prependIconName}
                      iconName={value.props.icon}
                      title={value.props.title}
                      className={styles.iconColor}/>

                    {/* Below is the label for each menuitem because this is not using Button
                        Using Button in a list confuses the screen reader.
                        (Complies with WAI-ARIA) */}
                    <span className={styles.emojiMenuItemText}>{value.props.title}</span>

                    {/* Dividing line after the first menuitem */}
                    {index == '5' ? <hr className={styles.hrDropdown}/> : null}
                  </li>
                ))}
              </ul>
              {this.renderAriaLabelsDescs()}
            </div>
          </DropdownContent>
        </DropdownWrapper>
      </div>
    );
  }

  renderAriaLabelsDescs() {
    return (
      <div>
        {/* Aria Labels and Descriptions for the trigger button*/}
        <p id="EmojiMenuTriggerLabel" hidden>
          <FormattedMessage
            id="app.emoji.EmojiMenuTriggerLabel"
            description="Aria label for the emoji trigger"
            defaultMessage="Status menu"
          />
        </p>
        <p id="EmojiMenuTriggerDesc" hidden>
          <FormattedMessage
            id="app.emoji.EmojiMenuTriggerDesc"
            description="Aria description for the emoji trigger"
            defaultMessage="Open the status menu to choose a status"
          />
        </p>

        {/* Aria Labels and Descriptions for each status option*/}
        <p id="awayLabel" hidden>
        <FormattedMessage
          id="app.emoji.awayLabel"
          description="Aria label for away status"
          defaultMessage="Away"
        />
        </p>
        <p id="awayDesc" hidden>
        <FormattedMessage
          id="app.emoji.awayDesc"
          description="Aria description for away status"
          defaultMessage="Choose your status as away"
        />
        </p>
        <p id="raiseLabel" hidden>
          <FormattedMessage
            id="app.emoji.raiseLabel"
            description="Aria label for raise status"
            defaultMessage="Raise"
          />
        </p>
        <p id="raiseDesc" hidden>
          <FormattedMessage
            id="app.emoji.raiseDesc"
            description="Aria description for raise status"
            defaultMessage="Raise your hand to ask a question"
          />
        </p>
        <p id="undecidedLabel" hidden>
          <FormattedMessage
            id="app.emoji.undecidedLabel"
            description="Aria label for undecided status"
            defaultMessage="Undecided"
          />
        </p>
        <p id="undecidedDesc" hidden>
          <FormattedMessage
            id="app.emoji.undecidedDesc"
            description="Aria description for undecided status"
            defaultMessage="Choose your status as undecided"
          />
        </p>
        <p id="confusedLabel" hidden>
          <FormattedMessage
            id="app.emoji.confusedLabel"
            description="Aria label for confused status"
            defaultMessage="Confused"
          />
        </p>
        <p id="confusedDesc" hidden>
          <FormattedMessage
            id="app.emoji.confusedDesc"
            description="Aria description for confused status"
            defaultMessage="Choose your status as confused"
          />
        </p>
        <p id="sadLabel" hidden>
          <FormattedMessage
            id="app.emoji.sadLabel"
            description="Aria label for sad status"
            defaultMessage="Sad"
          />
        </p>
        <p id="sadDesc" hidden>
          <FormattedMessage
            id="app.emoji.sadDesc"
            description="Aria description for sad status"
            defaultMessage="Choose your status as sad"
          />
        </p>
        <p id="happyLabel" hidden>
          <FormattedMessage
            id="app.emoji.happyLabel"
            description="Aria label for happy status"
            defaultMessage="Happy"
          />
        </p>
        <p id="happyDesc" hidden>
          <FormattedMessage
            id="app.emoji.happyDesc"
            description="Aria description for happy status"
            defaultMessage="Choose your status as happy"
          />
        </p>
        <p id="clearLabel" hidden>
          <FormattedMessage
            id="app.emoji.clearLabel"
            description="Aria label for clear status"
            defaultMessage="Clear"
          />
        </p>
        <p id="clearDesc" hidden>
          <FormattedMessage
            id="app.emoji.clearDesc"
            description="Aria description for clear status"
            defaultMessage="Clear your status"
          />
        </p>
      </div>
    );
  }
}

Emoji.propTypes = propTypes;
