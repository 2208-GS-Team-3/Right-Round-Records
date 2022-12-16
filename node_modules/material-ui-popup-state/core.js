"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anchorRef = anchorRef;
exports.bindContextMenu = bindContextMenu;
exports.bindDialog = bindDialog;
exports.bindDoubleClick = bindDoubleClick;
exports.bindFocus = bindFocus;
exports.bindHover = bindHover;
exports.bindMenu = bindMenu;
exports.bindPopover = bindPopover;
exports.bindPopper = bindPopper;
exports.bindToggle = bindToggle;
exports.bindTrigger = bindTrigger;
exports.createPopupState = createPopupState;
exports.initCoreState = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var printedWarnings = {};

function warn(key, message) {
  if (printedWarnings[key]) return;
  printedWarnings[key] = true;
  console.error('[material-ui-popup-state] WARNING', message); // eslint-disable-line no-console
}

var initCoreState = {
  isOpen: false,
  setAnchorElUsed: false,
  anchorEl: null,
  anchorPosition: undefined,
  hovered: false,
  focused: false,
  _openEventType: null,
  _childPopupState: null,
  _deferNextOpen: false,
  _deferNextClose: false
};
exports.initCoreState = initCoreState;

function createPopupState(_ref) {
  var state = _ref.state,
      _setState = _ref.setState,
      parentPopupState = _ref.parentPopupState,
      popupId = _ref.popupId,
      variant = _ref.variant,
      disableAutoFocus = _ref.disableAutoFocus;
  var isOpen = state.isOpen,
      setAnchorElUsed = state.setAnchorElUsed,
      anchorEl = state.anchorEl,
      anchorPosition = state.anchorPosition,
      hovered = state.hovered,
      focused = state.focused,
      _openEventType = state._openEventType,
      _childPopupState = state._childPopupState,
      _deferNextOpen = state._deferNextOpen,
      _deferNextClose = state._deferNextClose; // use lastState to workaround cases where setState is called multiple times
  // in a single render (e.g. because of refs being called multiple times)

  var lastState = state;

  var setState = function setState(nextState) {
    if (hasChanges(lastState, nextState)) {
      _setState(lastState = _objectSpread(_objectSpread({}, lastState), nextState));
    }
  };

  var setAnchorEl = function setAnchorEl(_anchorEl) {
    setState({
      setAnchorElUsed: true,
      anchorEl: _anchorEl
    });
  };

  var toggle = function toggle(eventOrAnchorEl) {
    if (isOpen) close(eventOrAnchorEl);else open(eventOrAnchorEl);
  };

  var open = function open(eventOrAnchorEl) {
    var eventType = eventOrAnchorEl && eventOrAnchorEl.type;
    var currentTarget = eventOrAnchorEl && eventOrAnchorEl.currentTarget;
    var clientX = eventOrAnchorEl && eventOrAnchorEl.clientX;
    var clientY = eventOrAnchorEl && eventOrAnchorEl.clientY;
    var anchorPosition = typeof clientX === 'number' && typeof clientY === 'number' ? {
      left: clientX,
      top: clientY
    } : undefined;

    if (eventType === 'touchstart') {
      setState({
        _deferNextOpen: true
      });
      return;
    }

    var doOpen = function doOpen() {
      if (!eventOrAnchorEl && !setAnchorElUsed) {
        warn('missingEventOrAnchorEl', 'eventOrAnchorEl should be defined if setAnchorEl is not used');
      }

      if (parentPopupState) {
        if (!parentPopupState.isOpen) return;

        parentPopupState._setChildPopupState(popupState);
      }

      var newState = {
        isOpen: true,
        anchorPosition: anchorPosition,
        hovered: eventType === 'mouseover' || hovered,
        focused: eventType === 'focus' || focused,
        _openEventType: eventType
      };

      if (currentTarget) {
        if (!setAnchorElUsed) {
          newState.anchorEl = currentTarget;
        }
      } else if (eventOrAnchorEl) {
        newState.anchorEl = eventOrAnchorEl;
      }

      setState(newState);
    };

    if (_deferNextOpen) {
      setState({
        _deferNextOpen: false
      });
      setTimeout(doOpen, 0);
    } else {
      doOpen();
    }
  };

  var close = function close(arg) {
    var eventType = arg && arg.type;

    switch (eventType) {
      case 'touchstart':
        setState({
          _deferNextClose: true
        });
        return;
    }

    var doClose = function doClose() {
      if (_childPopupState) _childPopupState.close();
      if (parentPopupState) parentPopupState._setChildPopupState(null);
      setState({
        isOpen: false,
        hovered: false,
        focused: false
      });
    };

    if (_deferNextClose) {
      setState({
        _deferNextClose: false
      });
      setTimeout(doClose, 0);
    } else {
      doClose();
    }
  };

  var setOpen = function setOpen(nextOpen, eventOrAnchorEl) {
    if (nextOpen) {
      open(eventOrAnchorEl);
    } else close(eventOrAnchorEl);
  };

  var onMouseLeave = function onMouseLeave(event) {
    var relatedTarget = event.relatedTarget;

    if (hovered && !isElementInPopup(relatedTarget, popupState)) {
      if (focused) {
        setState({
          hovered: false
        });
      } else {
        close(event);
      }
    }
  };

  var onBlur = function onBlur(event) {
    var relatedTarget = event.relatedTarget;

    if (focused && !isElementInPopup(relatedTarget, popupState)) {
      if (hovered) {
        setState({
          focused: false
        });
      } else {
        close(event);
      }
    }
  };

  var _setChildPopupState = function _setChildPopupState(_childPopupState) {
    return setState({
      _childPopupState: _childPopupState
    });
  };

  var popupState = {
    anchorEl: anchorEl,
    anchorPosition: anchorPosition,
    setAnchorEl: setAnchorEl,
    setAnchorElUsed: setAnchorElUsed,
    popupId: popupId,
    variant: variant,
    isOpen: isOpen,
    open: open,
    close: close,
    toggle: toggle,
    setOpen: setOpen,
    onBlur: onBlur,
    onMouseLeave: onMouseLeave,
    disableAutoFocus: disableAutoFocus !== null && disableAutoFocus !== void 0 ? disableAutoFocus : Boolean(hovered || focused),
    _openEventType: _openEventType,
    _childPopupState: _childPopupState,
    _setChildPopupState: _setChildPopupState
  };
  return popupState;
}
/**
 * Creates a ref that sets the anchorEl for the popup.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function anchorRef(_ref2) {
  var setAnchorEl = _ref2.setAnchorEl;
  return function (el) {
    if (el) setAnchorEl(el);
  };
}

function controlAriaProps(_ref3) {
  var isOpen = _ref3.isOpen,
      open = _ref3.open,
      popupId = _ref3.popupId,
      variant = _ref3.variant;
  return _objectSpread({}, variant === 'popover' ? {
    'aria-haspopup': true,
    'aria-controls': isOpen && popupId != null ? popupId : undefined
  } : variant === 'popper' ? {
    'aria-describedby': isOpen && popupId != null ? popupId : undefined
  } : undefined);
}
/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindTrigger(popupState) {
  return _objectSpread(_objectSpread({}, controlAriaProps(popupState)), {}, {
    onClick: popupState.open,
    onTouchStart: popupState.open
  });
}
/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindContextMenu(popupState) {
  return _objectSpread(_objectSpread({}, controlAriaProps(popupState)), {}, {
    onContextMenu: function onContextMenu(e) {
      e.preventDefault();
      popupState.open(e);
    }
  });
}
/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindToggle(popupState) {
  return _objectSpread(_objectSpread({}, controlAriaProps(popupState)), {}, {
    onClick: popupState.toggle,
    onTouchStart: popupState.toggle
  });
}
/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindHover(popupState) {
  var open = popupState.open,
      onMouseLeave = popupState.onMouseLeave;
  return _objectSpread(_objectSpread({}, controlAriaProps(popupState)), {}, {
    onTouchStart: open,
    onMouseOver: open,
    onMouseLeave: onMouseLeave
  });
}
/**
 * Creates props for a component that opens the popup while focused.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindFocus(popupState) {
  var open = popupState.open,
      onBlur = popupState.onBlur;
  return _objectSpread(_objectSpread({}, controlAriaProps(popupState)), {}, {
    onFocus: open,
    onBlur: onBlur
  });
}
/**
 * Creates props for a component that opens the popup while double click.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindDoubleClick(_ref4) {
  var _ref5;

  var isOpen = _ref4.isOpen,
      open = _ref4.open,
      popupId = _ref4.popupId,
      variant = _ref4.variant;
  return _ref5 = {}, (0, _defineProperty2["default"])(_ref5, variant === 'popover' ? 'aria-controls' : 'aria-describedby', isOpen ? popupId : null), (0, _defineProperty2["default"])(_ref5, 'aria-haspopup', variant === 'popover' ? true : undefined), (0, _defineProperty2["default"])(_ref5, "onDoubleClick", open), _ref5;
}
/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopover(_ref6) {
  var isOpen = _ref6.isOpen,
      anchorEl = _ref6.anchorEl,
      anchorPosition = _ref6.anchorPosition,
      close = _ref6.close,
      popupId = _ref6.popupId,
      onMouseLeave = _ref6.onMouseLeave,
      disableAutoFocus = _ref6.disableAutoFocus,
      _openEventType = _ref6._openEventType;
  var useAnchorPosition = _openEventType === 'contextmenu';
  return _objectSpread({
    id: popupId,
    anchorEl: anchorEl,
    anchorPosition: anchorPosition,
    anchorReference: useAnchorPosition ? 'anchorPosition' : 'anchorEl',
    open: isOpen,
    onClose: close,
    onMouseLeave: onMouseLeave
  }, disableAutoFocus && {
    disableAutoFocus: true,
    disableEnforceFocus: true,
    disableRestoreFocus: true
  });
}
/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindMenu(_ref7) {
  var isOpen = _ref7.isOpen,
      anchorEl = _ref7.anchorEl,
      anchorPosition = _ref7.anchorPosition,
      close = _ref7.close,
      popupId = _ref7.popupId,
      onMouseLeave = _ref7.onMouseLeave,
      disableAutoFocus = _ref7.disableAutoFocus,
      _openEventType = _ref7._openEventType;
  var useAnchorPosition = _openEventType === 'contextmenu';
  return _objectSpread({
    id: popupId,
    anchorEl: anchorEl,
    anchorPosition: anchorPosition,
    anchorReference: useAnchorPosition ? 'anchorPosition' : 'anchorEl',
    open: isOpen,
    onClose: close,
    onMouseLeave: onMouseLeave
  }, disableAutoFocus && {
    autoFocus: false,
    disableAutoFocusItem: true,
    disableAutoFocus: true,
    disableEnforceFocus: true,
    disableRestoreFocus: true
  });
}
/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopper(_ref8) {
  var isOpen = _ref8.isOpen,
      anchorEl = _ref8.anchorEl,
      popupId = _ref8.popupId,
      onMouseLeave = _ref8.onMouseLeave;
  return {
    id: popupId,
    anchorEl: anchorEl,
    open: isOpen,
    onMouseLeave: onMouseLeave
  };
}
/**
 * Creates props for a `Dialog` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindDialog(_ref9) {
  var isOpen = _ref9.isOpen,
      close = _ref9.close;
  return {
    open: isOpen,
    onClose: close
  };
}

function getPopup(_ref10) {
  var popupId = _ref10.popupId;
  return popupId && typeof document !== 'undefined' ? document.getElementById(popupId) // eslint-disable-line no-undef
  : null;
}

function isElementInPopup(element, popupState) {
  var anchorEl = popupState.anchorEl,
      _childPopupState = popupState._childPopupState;
  return isAncestor(anchorEl, element) || isAncestor(getPopup(popupState), element) || _childPopupState != null && isElementInPopup(element, _childPopupState);
}

function isAncestor(parent, child) {
  if (!parent) return false;

  while (child) {
    if (child === parent) return true;
    child = child.parentElement;
  }

  return false;
}

function hasChanges(state, nextState) {
  for (var key in nextState) {
    if (Object.prototype.hasOwnProperty.call(state, key) && state[key] !== nextState[key]) {
      return true;
    }
  }

  return false;
}