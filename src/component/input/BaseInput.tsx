import React, {InputHTMLAttributes, useRef, useState} from "react";
import {RotatingLines} from "react-loader-spinner";
import PasswordEyeIcon from "../../assets/images/passwordEyeIcon.svg";
import PasswordEyeInvisibleIcon from "../../assets/images/passwordEyeInvisible.svg";
import {FormUtil} from "@/util/formUtil.ts";


type BaseInputProps = {
    labelStyle?: React.CSSProperties,
    inputStyle?: React.CSSProperties,
    errorStyle?: React.CSSProperties,
    error?: any,
    label?: string,
    formik?: any,
    loading?: boolean,
    // props.name?: string,
    // leftIcon?: ReactSVG,
    leftIcon?: any,
    formatNumberWithCommas?: boolean;
    formatDecimalNumberWithCommas?: boolean;
    formatNegativeDecimalNumberWithCommas?: boolean;
    decimalPlaces?: number; // New prop for specifying decimal places
    maxNumberValue?: number // maximum number
    leftIconOnclick?: () => void
    noNegative?: boolean,
    mask?: boolean
}
export const BaseInput = ({
                              labelStyle,
                              inputStyle,
                              errorStyle,
                              formik,
                              leftIcon,
                              leftIconOnclick,
                              // style,
                              // error,
                              // props.name,
                              formatNumberWithCommas = false,
                              formatDecimalNumberWithCommas = false,
                              formatNegativeDecimalNumberWithCommas = false,
                              decimalPlaces = 2, // Default to 2 decimal places
                              maxNumberValue = 999999999999999,
                              label,
                              loading,
                              noNegative = false,
                              ...props
                          }: BaseInputProps & InputHTMLAttributes<HTMLInputElement>) => {
    errorStyle = errorStyle ? errorStyle : {}
    inputStyle = inputStyle ? inputStyle : {}
    // eslint-disable-next-line react-hooks/immutability
    if (formik.errors[props.name!] && formik.touched[props.name!]) inputStyle['borderColor'] = errorStyle['color']

    // console.log("erroe", formik.errors);

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleWholeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        const cursorPosition = e.target.selectionStart || 0;

        // Remove all commas first
        inputValue = inputValue.replace(/,/g, '');

        // Check if this input added a negative sign
        const negativeSignAdded = inputValue.includes('-') && !formik.values[props.name!].toString().includes('-');

        // Remove all non-numeric characters except one negative sign
        const cleanValue = inputValue.replace(/[^0-9-]/g, '');
        const negativeCount = (cleanValue.match(/-/g) || []).length;

        let finalValue = cleanValue;
        if (negativeCount > 0) {
            // Remove all negative signs and add one at the beginning
            finalValue = '-' + cleanValue.replace(/-/g, '');
        }

        // Handle empty or just negative sign cases
        if (!finalValue || finalValue === '-') {
            finalValue = '0';
        }

        // Check max value
        const numericValue = parseFloat(finalValue);
        if (Math.abs(numericValue) > maxNumberValue) {
            return;
        }

        // Remove leading zeros
        const numericPart = finalValue.replace('-', '').replace(/^0+/, '');
        finalValue = (finalValue.startsWith('-') ? '-' : '') + (numericPart || '0');

        // Format with commas
        const formattedValue = finalValue.replace('-', '').length > 0
            ? (finalValue.startsWith('-') ? '-' : '') + FormUtil.formatNumberWithCommas(finalValue.replace('-', ''))
            : '0';

        // Update input display
        if (inputRef.current) {
            inputRef.current.value = formattedValue;

            // Adjust cursor position if negative sign was added
            if (negativeSignAdded) {
                requestAnimationFrame(() => {
                    if (inputRef.current) {
                        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
                    }
                });
            }
        }

        // Set the actual numeric value in Formik
        formik.setFieldValue(props.name, finalValue);
    };
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const oldValue = input.value;
        const cursorPosition = input.selectionStart || 0;
        const isBackspace =
            e.nativeEvent instanceof InputEvent &&
            e.nativeEvent.inputType === "deleteContentBackward";

        // Negative handling
        const currentHasNegative = formik.values[props.name!]?.toString().includes("-");
        const inputHasNegative = oldValue.includes("-");

        let inputValue = oldValue;

        // Normalize negative signs
        if (inputHasNegative && !currentHasNegative) {
            inputValue = "-" + inputValue.replace(/-/g, "");
        }

        // Ensure only one negative at the front
        const isNegative = inputValue.startsWith("-");
        if (isNegative) {
            inputValue = "-" + inputValue.substring(1).replace(/-/g, "");
        }


        // Strip invalid characters
        const numericPart = inputValue.replace("-", "").replace(/[^0-9]/g, "");
        if (numericPart.length === 0) {
            formik.setFieldValue(props.name, `0.${"0".repeat(decimalPlaces)}`);
            return;
        }

        // Process numeric values
        const parsedValue = FormUtil.parseFormattedNumber(numericPart).toString();
        const paddedValue = parsedValue.padStart(decimalPlaces, "0");

        const integerPart =
            (isNegative ? "-" : "") + (paddedValue.slice(0, -decimalPlaces) || "0");
        const decimalPart = paddedValue.slice(-decimalPlaces);

        // Validate max number
        const fullNumericValue = parseFloat(`${integerPart}.${decimalPart}`);
        if (Math.abs(fullNumericValue) > maxNumberValue) {
            return;
        }

        // Format number with commas
        const formattedIntegerPart = FormUtil.formatNumberWithCommas(integerPart.replace("-", ""));
        const formattedValue = `${isNegative ? "-" : ""}${formattedIntegerPart}.${decimalPart}`;

        // 3) If user backspaced from e.g. "-0.05" -> "-", we can revert to "0.00"
        if (formattedValue === "-0.00") {
            formik.setFieldValue(props.name, `0.${"0".repeat(decimalPlaces)}`);
            return;
        }
        // Update Formik value
        formik.setFieldValue(props.name, `${integerPart}.${decimalPart}`);

        // Fix caret positioning
        requestAnimationFrame(() => {
            if (!inputRef.current) return;

            // Count commas before cursor in the old and new value
            const oldCommasBeforeCursor = (oldValue.slice(0, cursorPosition).match(/,/g) || []).length;
            const newCommasBeforeCursor = (formattedValue.slice(0, cursorPosition).match(/,/g) || []).length;

            // Adjust cursor for added/removed commas
            let newPosition = cursorPosition + (newCommasBeforeCursor - oldCommasBeforeCursor);

            // Specific fix for "0.<decimal>" cases
            if (isBackspace && formattedValue.startsWith("0.") || formattedValue.startsWith("-0.")) {
                const decimalStartIndex = formattedValue.indexOf(".");
                const decimalDigitStart = decimalStartIndex + 1;
                const endOfDecimal = formattedValue.length;

                // Place caret after first decimal digit if near decimal
                if (newPosition <= decimalStartIndex + 2) {
                    newPosition = decimalDigitStart + 1;
                }
                console.log("newPosition, endOfDecimal: ", newPosition, endOfDecimal)

                // Ensure caret clamps to the valid range
                newPosition = Math.max(decimalDigitStart, Math.min(newPosition + 1, endOfDecimal));
            }

            // Clamp position to ensure it remains valid
            newPosition = Math.max(0, Math.min(newPosition, formattedValue.length));

            inputRef.current.setSelectionRange(newPosition, newPosition);
        });
    };
    const formatWholeNumberDisplay = (value: string | number) => {
        if (!value) return '0';

        const stringValue = value.toString();
        const isNegative = stringValue.startsWith('-');

        // Handle zero case
        if (stringValue === '0' || stringValue === '-0') return '0';

        // Format with commas
        const numericValue = stringValue.replace(/[^0-9-]/g, '');
        return numericValue.replace('-', '').length > 0
            ? (isNegative ? '-' : '') + FormUtil.formatNumberWithCommas(numericValue.replace('-', ''))
            : '0';
    };
    const formatDisplayValue = (value: string | number) => {
        if (!value) return `0.${'0'.repeat(decimalPlaces)}`;

        const stringValue = value.toString();
        const isNegative = stringValue.startsWith('-');

        // Split into parts and handle decimal point
        const [integerPart = '0', decimalPart = ''] = stringValue.split('.');

        // Format integer part with commas
        const formattedIntegerPart = integerPart.replace('-', '').length > 0
            ? ((isNegative && !noNegative) ? '-' : '') + FormUtil.formatNumberWithCommas(integerPart.replace('-', ''))
            : '0';

        // Pad or truncate decimal part
        const formattedDecimalPart = decimalPart.padEnd(decimalPlaces, '0').slice(0, decimalPlaces);

        return `${formattedIntegerPart}.${formattedDecimalPart}`;
    };


    //from chatgpt
    const formatNegativeDisplayValue = (value: string | number) => {
        if (!value) return `0.${"0".repeat(decimalPlaces)}`;

        const numericValue = value.toString().replace(/[^0-9.-]/g, ""); // Allow negative sign
        const parsedValue = parseFloat(numericValue) || 0;

        const integerPart = Math.trunc(parsedValue).toString();
        const decimalPart = (parsedValue % 1).toFixed(decimalPlaces).split(".")[1];

        const formattedIntegerPart = integerPart.length > 3
            ? FormUtil.formatNumberWithCommas(integerPart.replace("-", ""))
            : integerPart;

        return `${parsedValue < 0 ? "-" : ""}${formattedIntegerPart}.${decimalPart || "00"}`;
    };

    const handleNegativeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^0-9.-]/g, ""); // Allow numbers, decimal, and negative sign

        // Validate negative sign position
        const validInput = inputValue.startsWith("-")
            ? `-${inputValue.replace(/-/g, "")}`
            : inputValue;

        // If input is empty, reset to initial state
        if (validInput.length === 0) {
            formik.setFieldValue(props.name, `0.${"0".repeat(decimalPlaces)}`);
            return;
        }

        const parsedValue = parseFloat(validInput) || 0; // Convert to float
        const clampedValue = Math.min(Math.max(parsedValue, -maxNumberValue), maxNumberValue); // Clamp within range

        const integerPart = Math.trunc(clampedValue).toString();
        const decimalPart = (clampedValue % 1).toFixed(decimalPlaces).split(".")[1];

        const formattedValue = `${integerPart.length > 3
            ? FormUtil.formatNumberWithCommas(integerPart.replace("-", ""))
            : integerPart}${decimalPart ? `.${decimalPart}` : ""}`;

        // Add negative sign back if applicable
        const finalValue = clampedValue < 0 ? `-${formattedValue}` : formattedValue;

        // Update Formik value and input display
        formik.setFieldValue(props.name, clampedValue.toFixed(decimalPlaces));
        requestAnimationFrame(() => {
            if (inputRef.current) {
                inputRef.current.value = finalValue;
            }
        });
    };


    return (

        <div style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: 0,
        }}>
            <label className={"form_field-label"} style={labelStyle} htmlFor={props.id}>{label}</label>
            {/*{!inline && <br/>}*/}
            {(props.type === 'submit' && loading) &&
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '25px'
                }}>
                    <RotatingLines
                        visible={true}
                        // height="30"
                        width="30"
                        // color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        // wrapperStyle={{}}
                        // wrapperClass=""
                    />
                </div>}
            {
                props.type === "color" &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <input
                        type="color"
                        value={formik.values[props.name!]}
                        onChange={formik.handleChange(props.name)}
                        style={{marginRight: "10px"}}
                    />
                    <input
                        type="text"
                        value={formik.values[props.name!]}
                        style={{...inputStyle}}
                        className={"form_input"}
                        onChange={formik.handleChange(props.name)}
                        maxLength={7}
                    />
                </div>
            }
            {
                !(props.type === 'submit' && loading) && props.type !== "color" &&
                <div style={{
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    // gap: '10px'
                }}>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        height: "max-content",
                    }}>
                        {(formatNegativeDecimalNumberWithCommas) && (
                            <input
                                ref={inputRef}
                                name={props.name}
                                type="text"
                                value={formatNegativeDisplayValue(formik.values[props.name!])} // Display formatted value
                                onChange={handleNegativeNumberChange} // Handle input change
                                onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)} // Cursor at end
                                onBlur={(e) => {
                                    const parsedValue = FormUtil.parseFormattedNumber(e.target.value);
                                    formik.setFieldValue(
                                        props.name,
                                        isNaN(parsedValue) ? `0.${"0".repeat(decimalPlaces)}` : parsedValue.toFixed(decimalPlaces)
                                    );
                                }}
                                {...props}
                                style={{...inputStyle}}
                            />
                        )}
                        {(formatDecimalNumberWithCommas) && (
                            <input
                                ref={inputRef}
                                name={props.name}
                                type="text"
                                value={formatDisplayValue(formik.values[props.name!])} // Display formatted value
                                onChange={handleNumberChange} // Handle input change
                                onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)} // Cursor at end
                                onBlur={(e) => {
                                    const parsedValue = FormUtil.parseFormattedNumber(e.target.value);
                                    formik.setFieldValue(props.name, isNaN(parsedValue) ? `0.${'0'.repeat(decimalPlaces)}` : parsedValue.toFixed(decimalPlaces));
                                }}
                                {...props}
                                style={{...inputStyle}}
                            />
                        )}
                        {(formatNumberWithCommas) && (
                            <input
                                ref={inputRef}
                                name={props.name}
                                type="text"
                                {...props}
                                value={formatWholeNumberDisplay(formik.values[props.name!])}
                                onChange={handleWholeNumberChange}
                                onBlur={(e) => {
                                    // Remove commas and ensure a numeric value
                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                    formik.setFieldValue(props.name, numericValue || '0');
                                }}
                                style={{...inputStyle}}
                            />
                        )}
                        {!(formatNumberWithCommas || formatDecimalNumberWithCommas || formatNegativeDecimalNumberWithCommas) && (
                            <input
                                value={formik.values[props.name!]}
                                onBlur={formik.handleBlur(props.name)}
                                onChange={formik.handleChange(props.name)}
                                style={{...inputStyle}}
                                {...props}
                                type={props.type === "password" ? (isPasswordVisible ? "text" : "password") : props.type === "phone" ? props.type : props.type}
                            />)}
                        {/*<label style={{*/}
                        {/*    color: 'red',*/}
                        {/*    fontSize: ".7rem",*/}
                        {/*    fontWeight: "400",*/}
                        {/*}}>*/}
                        {/*    {formik.touched[props.name!] && formik.errors[props.name!]}*/}
                        {/*</label>*/}
                        <label style={{color: 'red', fontSize: ".7rem", fontWeight: "400"}}>
                            {(formik.touched[props.name!] || formik.submitCount > 0) && formik.errors[props.name!]}
                        </label>

                    </div>

                    {
                        props.type === "password" && !props.mask &&
                        <div
                            style={{
                                right: 10,
                                top: 5,
                                position: "absolute",
                            }}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <img
                                src={isPasswordVisible ? PasswordEyeInvisibleIcon : PasswordEyeIcon}
                                width={18} height={18}
                                alt={"Password eye"}
                            />
                        </div>
                    }
                    {
                        leftIcon && <div
                            style={{
                                right: 10,
                                top: 5,
                                position: "absolute",
                            }}
                            onClick={leftIconOnclick}
                        >
                            <img
                                src={leftIcon}
                                width={18} height={18}
                                alt={"Password eye"}
                            />
                        </div>
                    }
                </div>

            }


            {/*{formik?.errors[props.name!] && formik?.touched[props.name!] && (*/}
            {/*    <p style={{fontSize: '11px', color: 'red'}}> {formik?.errors[props.name!]} </p>*/}
            {/*)}*/}
        </div>
    )
}

