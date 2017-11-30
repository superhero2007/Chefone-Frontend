// @flow

// Used for calculations
import styleGlobals from '../../config/styles';

const { BRAND_GREEN, BRAND_PRIMARY } = styleGlobals;

var defaultWidth = 320;
var defaultColors = {
  success: {
    rgb: '94, 164, 0',
    hex: BRAND_GREEN,
    color: '#4b583a',
    backgroundColor: '#f0f5ea',
  },
  error: {
    rgb: '236, 61, 61',
    hex: BRAND_PRIMARY,
    color: '#412f2f',
    backgroundColor: '#f4e9e9',
  },
  warning: {
    rgb: '235, 173, 23',
    hex: '#ebad1a',
    color: '#5a5343',
    backgroundColor: '#f9f6f0',
  },
  info: {
    rgb: '54, 156, 199',
    hex: '#369cc7',
    color: '#41555d',
    backgroundColor: '#e8f0f4',
  },
};

var defaultShadowOpacity = '0.9';

export default {
  Wrapper: {},
  Containers: {
    DefaultStyle: {
      fontFamily: 'inherit',
      position: 'fixed',
      width: defaultWidth,
      padding: '0 10px 10px 10px',
      zIndex: 9998,
      WebkitBoxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box',
      height: 'auto',
    },
    tl: {
      top: '0px',
      bottom: 'auto',
      left: '0px',
      right: 'auto',
    },
    tr: {
      top: '0px',
      bottom: 'auto',
      left: 'auto',
      right: '0px',
    },
    tc: {
      top: '0px',
      bottom: 'auto',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2),
    },
    bl: {
      top: 'auto',
      bottom: '0px',
      left: '0px',
      right: 'auto',
    },
    br: {
      top: 'auto',
      bottom: '0px',
      left: 'auto',
      right: '0px',
    },
    bc: {
      top: 'auto',
      bottom: '0px',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2),
    },
  },
  NotificationItem: {
    DefaultStyle: {
      position: 'relative',
      width: '100%',
      cursor: 'pointer',
      borderRadius: '2px',
      fontSize: '13px',
      margin: '10px 0 0',
      padding: '10px',
      display: 'block',
      WebkitBoxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box',
      opacity: 0,
      transition: '0.3s ease-in-out',
      isHidden: {
        opacity: 0,
      },
      isVisible: {
        opacity: 1,
      },
    },
    success: {
      borderTop: '2px solid ' + defaultColors.success.hex,
      backgroundColor: defaultColors.success.backgroundColor,
      color: defaultColors.success.color,
      boxShadow:
        '0 0 1px rgba(' +
        defaultColors.success.rgb +
        ',' +
        defaultShadowOpacity +
        ')',
    },
    error: {
      borderTop: '2px solid ' + defaultColors.error.hex,
      backgroundColor: defaultColors.error.backgroundColor,
      color: defaultColors.error.color,
      boxShadow:
        '0 0 1px rgba(' +
        defaultColors.error.rgb +
        ',' +
        defaultShadowOpacity +
        ')',
    },
    warning: {
      borderTop: '2px solid ' + defaultColors.warning.hex,
      backgroundColor: defaultColors.warning.backgroundColor,
      color: defaultColors.warning.color,
      boxShadow:
        '0 0 1px rgba(' +
        defaultColors.warning.rgb +
        ',' +
        defaultShadowOpacity +
        ')',
    },
    info: {
      borderTop: '2px solid ' + defaultColors.info.hex,
      backgroundColor: defaultColors.info.backgroundColor,
      color: defaultColors.info.color,
      boxShadow:
        '0 0 1px rgba(' +
        defaultColors.info.rgb +
        ',' +
        defaultShadowOpacity +
        ')',
    },
  },
  Title: {
    DefaultStyle: {
      fontSize: '14px',
      margin: '0 0 5px 0',
      padding: 0,
      fontWeight: 'bold',
    },
    success: {
      color: defaultColors.success.hex,
    },
    error: {
      color: defaultColors.error.hex,
    },
    warning: {
      color: defaultColors.warning.hex,
    },
    info: {
      color: defaultColors.info.hex,
    },
  },
  MessageWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0,
    },
  },
  Dismiss: {
    DefaultStyle: {
      fontFamily: 'Arial',
      fontSize: '17px',
      position: 'absolute',
      top: '4px',
      right: '5px',
      lineHeight: '15px',
      backgroundColor: '#dededf',
      color: '#ffffff',
      borderRadius: '50%',
      width: '14px',
      height: '14px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    success: {
      color: '#f0f5ea',
      backgroundColor: '#b0ca92',
    },
    error: {
      color: '#f4e9e9',
      backgroundColor: '#e4bebe',
    },
    warning: {
      color: '#f9f6f0',
      backgroundColor: '#e1cfac',
    },
    info: {
      color: '#e8f0f4',
      backgroundColor: '#a4becb',
    },
  },
  Action: {
    DefaultStyle: {
      background: '#ffffff',
      borderRadius: '2px',
      padding: '6px 20px',
      fontWeight: 'bold',
      margin: '10px 0 0 0',
      border: 0,
    },
    success: {
      backgroundColor: defaultColors.success.hex,
      color: '#ffffff',
    },
    error: {
      backgroundColor: defaultColors.error.hex,
      color: '#ffffff',
    },
    warning: {
      backgroundColor: defaultColors.warning.hex,
      color: '#ffffff',
    },
    info: {
      backgroundColor: defaultColors.info.hex,
      color: '#ffffff',
    },
  },
  ActionWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0,
    },
  },
};
