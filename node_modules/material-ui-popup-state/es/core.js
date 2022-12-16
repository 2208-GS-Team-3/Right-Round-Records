"use strict";

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

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-env browser */
const printedWarnings = {};

function warn(key, message) {
  if (printedWarnings[key]) return;
  printedWarnings[key] = true;
  console.error('[material-ui-popup-state] WARNING', message); // eslint-disable-line no-console
}

const initCoreState = {
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

function createPopupState({
  state,
  setState: _setState,
  parentPopupState,
  popupId,
  variant,
  disableAutoFocus
}) {
  const {
    isOpen,
    setAnchorElUsed,
    anchorEl,
    anchorPosition,
    hovered,
    focused,
    _openEventType,
    _childPopupState,
    _deferNextOpen,
    _deferNextClose
  } = state; // use lastState to workaround cases where setState is called multiple times
  // in a single render (e.g. because of refs being called multiple times)

  let lastState = state;

  const setState = nextState => {
    if (hasChanges(lastState, nextState)) {
      _setState(lastState = { ...lastState,
        ...nextState
      });
    }
  };

  const setAnchorEl = _anchorEl => {
    setState({
      setAnchorElUsed: true,
      anchorEl: _anchorEl
    });
  };

  const toggle = eventOrAnchorEl => {
    if (isOpen) close(eventOrAnchorEl);else open(eventOrAnchorEl);
  };

  const open = eventOrAnchorEl => {
    const eventType = eventOrAnchorEl && eventOrAnchorEl.type;
    const currentTarget = eventOrAnchorEl && eventOrAnchorEl.currentTarget;
    const clientX = eventOrAnchorEl && eventOrAnchorEl.clientX;
    const clientY = eventOrAnchorEl && eventOrAnchorEl.clientY;
    const anchorPosition = typeof clientX === 'number' && typeof clientY === 'number' ? {
      left: clientX,
      top: clientY
    } : undefined;

    if (eventType === 'touchstart') {
      setState({
        _deferNextOpen: true
      });
      return;
    }

    const doOpen = () => {
      if (!eventOrAnchorEl && !setAnchorElUsed) {
        warn('missingEventOrAnchorEl', 'eventOrAnchorEl should be defined if setAnchorEl is not used');
      }

      if (parentPopupState) {
        if (!parentPopupState.isOpen) return;

        parentPopupState._setChildPopupState(popupState);
      }

      const newState = {
        isOpen: true,
        anchorPosition,
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

  const close = arg => {
    const eventType = arg && arg.type;

    switch (eventType) {
      case 'touchstart':
        setState({
          _deferNextClose: true
        });
        return;
    }

    const doClose = () => {
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

  const setOpen = (nextOpen, eventOrAnchorEl) => {
    if (nextOpen) {
      open(eventOrAnchorEl);
    } else close(eventOrAnchorEl);
  };

  const onMouseLeave = event => {
    const relatedTarget = event.relatedTarget;

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

  const onBlur = event => {
    const relatedTarget = event.relatedTarget;

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

  const _setChildPopupState = _childPopupState => setState({
    _childPopupState
  });

  const popupState = {
    anchorEl,
    anchorPosition,
    setAnchorEl,
    setAnchorElUsed,
    popupId,
    variant,
    isOpen,
    open,
    close,
    toggle,
    setOpen,
    onBlur,
    onMouseLeave,
    disableAutoFocus: disableAutoFocus !== null && disableAutoFocus !== void 0 ? disableAutoFocus : Boolean(hovered || focused),
    _openEventType,
    _childPopupState,
    _setChildPopupState
  };
  return popupState;
}
/**
 * Creates a ref that sets the anchorEl for the popup.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function anchorRef({
  setAnchorEl
}) {
  return el => {
    if (el) setAnchorEl(el);
  };
}

function controlAriaProps({
  isOpen,
  open,
  popupId,
  variant
}) {
  return { ...(variant === 'popover' ? {
      'aria-haspopup': true,
      'aria-controls': isOpen && popupId != null ? popupId : undefined
    } : variant === 'popper' ? {
      'aria-describedby': isOpen && popupId != null ? popupId : undefined
    } : undefined)
  };
}
/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindTrigger(popupState) {
  return { ...controlAriaProps(popupState),
    onClick: popupState.open,
    onTouchStart: popupState.open
  };
}
/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindContextMenu(popupState) {
  return { ...controlAriaProps(popupState),
    onContextMenu: e => {
      e.preventDefault();
      popupState.open(e);
    }
  };
}
/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindToggle(popupState) {
  return { ...controlAriaProps(popupState),
    onClick: popupState.toggle,
    onTouchStart: popupState.toggle
  };
}
/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindHover(popupState) {
  const {
    open,
    onMouseLeave
  } = popupState;
  return { ...controlAriaProps(popupState),
    onTouchStart: open,
    onMouseOver: open,
    onMouseLeave
  };
}
/**
 * Creates props for a component that opens the popup while focused.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindFocus(popupState) {
  const {
    open,
    onBlur
  } = popupState;
  return { ...controlAriaProps(popupState),
    onFocus: open,
    onBlur
  };
}
/**
 * Creates props for a component that opens the popup while double click.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindDoubleClick({
  isOpen,
  open,
  popupId,
  variant
}) {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen ? popupId : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onDoubleClick: open
  };
}
/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopover({
  isOpen,
  anchorEl,
  anchorPosition,
  close,
  popupId,
  onMouseLeave,
  disableAutoFocus,
  _openEventType
}) {
  const useAnchorPosition = _openEventType === 'contextmenu';
  return {
    id: popupId,
    anchorEl,
    anchorPosition,
    anchorReference: useAnchorPosition ? 'anchorPosition' : 'anchorEl',
    open: isOpen,
    onClose: close,
    onMouseLeave,
    ...(disableAutoFocus && {
      disableAutoFocus: true,
      disableEnforceFocus: true,
      disableRestoreFocus: true
    })
  };
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


function bindMenu({
  isOpen,
  anchorEl,
  anchorPosition,
  close,
  popupId,
  onMouseLeave,
  disableAutoFocus,
  _openEventType
}) {
  const useAnchorPosition = _openEventType === 'contextmenu';
  return {
    id: popupId,
    anchorEl,
    anchorPosition,
    anchorReference: useAnchorPosition ? 'anchorPosition' : 'anchorEl',
    open: isOpen,
    onClose: close,
    onMouseLeave,
    ...(disableAutoFocus && {
      autoFocus: false,
      disableAutoFocusItem: true,
      disableAutoFocus: true,
      disableEnforceFocus: true,
      disableRestoreFocus: true
    })
  };
}
/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindPopper({
  isOpen,
  anchorEl,
  popupId,
  onMouseLeave
}) {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onMouseLeave
  };
}
/**
 * Creates props for a `Dialog` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */


function bindDialog({
  isOpen,
  close
}) {
  return {
    open: isOpen,
    onClose: close
  };
}

function getPopup({
  popupId
}) {
  return popupId && typeof document !== 'undefined' ? document.getElementById(popupId) // eslint-disable-line no-undef
  : null;
}

function isElementInPopup(element, popupState) {
  const {
    anchorEl,
    _childPopupState
  } = popupState;
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
  for (let key in nextState) {
    if (Object.prototype.hasOwnProperty.call(state, key) && state[key] !== nextState[key]) {
      return true;
    }
  }

  return false;
}