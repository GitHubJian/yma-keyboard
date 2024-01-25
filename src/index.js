function on(el, event, handler) {
    if (document.addEventListener) {
        if (el && event && handler) {
            el.addEventListener(event, handler, false);
        }
    } else {
        if (el && event && handler) {
            el.attachEvent('on' + event, handler);
        }
    }
}

function off(el, event, handler) {
    if (document.removeEventListener) {
        if (el && event) {
            el.removeEventListener(event, handler, false);
        }
    } else {
        if (el && event) {
            el.detachEvent('on' + event, handler);
        }
    }
}

let matchesSelector =
    typeof Element !== 'undefined' &&
    (Element.prototype.matches ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector);

function matches(el, query) {
    if (!matchesSelector) {
        throw new Error('No el matching method supported');
    }

    return matchesSelector.call(el, query);
}

const isHovered = function (el) {
    return matches(el, ':hover');
};

const isEditable = function (el) {
    return (
        matches(el, 'input,[contenteditable]') ||
        matches(el, 'select,[contenteditable]') ||
        matches(el, 'textarea,[contenteditable]') ||
        matches(el, 'button,[contenteditable]')
    );
};

export default function addKeyboardEvent(el, eventName, handler) {
    if (arguments.length < 2) {
        throw new Error('addKeyboardEvent 函数必须存在 2 个参数');
    }

    if (arguments.length === 2) {
        handler = eventName;
        eventName = 'keydown';
    }

    const ownerDoc = el.ownerDocument || document;

    const handleKeybord = function (e) {
        if (
            (e.isDefaultPrevented && e.isDefaultPrevented()) ||
            e.defaultPrevented
        ) {
            return;
        }

        if (!isHovered(el)) {
            return;
        }

        let activeElement = document.activeElement
            ? document.activeElement
            : ownerDocument.activeElement;
        if (activeElement) {
            if (activeElement.tagName === 'IFRAME') {
                activeElement = activeElement.contentDocument.activeElement;
            } else {
                while (activeElement.shadowRoot) {
                    activeElement = activeElement.shadowRoot.activeElement;
                }
            }

            if (isEditable(activeElement)) {
                return;
            }
        }

        handler(e);
    };

    on(ownerDoc, eventName, handleKeybord);

    return function () {
        off(ownerDoc, eventName, handleKeybord);
    };
}
