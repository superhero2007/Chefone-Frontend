// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';
import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

class MenuDropdown extends React.Component<*, *> {
  state = {
    isActive: false,
  };
  componentDidMount() {
    if (!__SERVER__) {
      //$FlowIssue
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (!__SERVER__) {
      //$FlowIssue
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  handleClickOutside = e => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(e.target)) {
      this.setState({ isActive: false });
    }
  };
  handleTriggerClick = () => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  };
  deactivate = () => {
    this.setState({ isActive: false });
  };
  render() {
    const { trigger, contentItems } = this.props;
    const { isActive } = this.state;
    return (
      <Dropdown active={isActive}>
        <DropdownTrigger>
          <div onClick={this.handleTriggerClick}>{trigger}</div>
        </DropdownTrigger>
        {isActive && (
          <DropdownContent styleName="dropdown-content">
            {contentItems.map &&
              contentItems.map((item, key) => (
                <div
                  onClick={this.deactivate}
                  key={key}
                  styleName="dropdown-item"
                >
                  {item}
                </div>
              ))}
            {!contentItems.map && (
              <div onClick={this.deactivate}>{contentItems}</div>
            )}
          </DropdownContent>
        )}
      </Dropdown>
    );
  }
}

export default fixedCSSModules(styles)(MenuDropdown);
