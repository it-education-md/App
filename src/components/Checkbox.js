import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import themeColors from '../styles/themes/default';
import stylePropTypes from '../styles/stylePropTypes';
import Icon from './Icon';
import * as Expensicons from './Icon/Expensicons';

const propTypes = {
    /** Whether checkbox is checked */
    isChecked: PropTypes.bool,

    /** A function that is called when the box/label is pressed */
    onPress: PropTypes.func.isRequired,

    /** Should the input be styled for errors  */
    hasError: PropTypes.bool,

    /** Should the input be disabled  */
    disabled: PropTypes.bool,

    /** Children (icon) for Checkbox */
    children: PropTypes.node,

    /** Additional styles to add to checkbox button */
    style: stylePropTypes,

    /** Additional styles to add to checkbox container */
    containerStyle: stylePropTypes,

    /** Callback that is called when mousedown is triggered. */
    onMouseDown: PropTypes.func,

    /** A ref to forward to the Pressable */
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.instanceOf(React.Component)})]),
};

const defaultProps = {
    isChecked: false,
    hasError: false,
    disabled: false,
    style: [],
    containerStyle: [],
    forwardedRef: undefined,
    children: null,
    onMouseDown: undefined,
};

const Checkbox = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleSpaceKey = (event) => {
        if (event.code !== 'Space') {
            return;
        }

        props.onPress();
    };

    const firePressHandlerOnClick = (event) => {
        // Pressable can be triggered with Enter key and by a click. As this is a checkbox,
        // We do not want to toggle it, when Enter key is pressed.
        if (event.type && event.type !== 'click') {
            return;
        }

        const wasChecked = props.isChecked;

        // If checkbox is checked and focused, make sure it's unfocused when pressed.
        if (isFocused && wasChecked) {
            setIsFocused(false);
        }

        props.onPress();
    };

    return (
        <Pressable
            disabled={props.disabled}
            onPress={firePressHandlerOnClick}
            onMouseDown={props.onMouseDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={props.forwardedRef}
            onPressOut={() => setIsFocused(false)}
            style={props.style}
            onKeyDown={handleSpaceKey}
            accessibilityRole="checkbox"
            accessibilityState={{checked: props.isChecked}}
        >
            {props.children ? (
                props.children
            ) : (
                <View
                    style={[
                        styles.checkboxContainer,
                        props.containerStyle,
                        props.isChecked && styles.checkedContainer,
                        props.hasError && styles.borderColorDanger,
                        props.disabled && styles.cursorDisabled,
                        (isFocused || props.isChecked) && styles.borderColorFocus,
                    ]}
                >
                    {props.isChecked && (
                        <Icon
                            src={Expensicons.Checkmark}
                            fill={themeColors.textLight}
                            height={14}
                            width={14}
                        />
                    )}
                </View>
            )}
        </Pressable>
    );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
