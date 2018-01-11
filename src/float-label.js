export default function ({
    selector = '.float-label',
    focusClass = 'float-label--has-focus',
    valueClass = 'float-label--has-value'
} = {}) {
    const els = document.querySelectorAll(selector);

    const getFocus = index => {
        els[index].classList.add(focusClass);
    };

    const loseFocus = index => {
        /*
        * Check inputs and textareas for values
        */
        const input = els[index].querySelector('input, textarea');
        els[index].classList.remove(focusClass);
        if (input) {
            if (input.value === '') {
                els[index].classList.remove(valueClass);
            } else {
                els[index].classList.add(valueClass);
            }
            return true;
        }
        /*
        * Check select controls to see if an option is selected
        */
        const select = els[index].querySelector('select');
        if (select) {
            if (select.selectedIndex.value) {
                els[index].classList.remove(valueClass);
            } else {
                els[index].classList.add(valueClass);
            }
            return true;
        }
        return false;
    };

    Object.keys(els).forEach(key => {
        els[key].addEventListener('focusin', () => {
            getFocus(key);
        });
        els[key].addEventListener('focusout', () => {
            loseFocus(key);
        });
    });
}
