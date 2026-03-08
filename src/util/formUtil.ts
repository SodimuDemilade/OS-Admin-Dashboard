import {FormikTouched, FormikValues} from "formik";
import type {Formik} from "./type";

export class FormUtil {
    static touchAllFields = <T extends FormikValues>(formik: Formik<T>) => {
        const touchedFields = Object.keys(formik.values).reduce((acc: any, key) => {
            acc[key] = true;
            return acc;
        }, {} as FormikTouched<typeof formik.values>);
        formik.setTouched(touchedFields);
    };

    static isErrorInForm = async <T extends FormikValues>(formik: Formik<T>) => {
        this.touchAllFields(formik);
        const errors = await formik.validateForm();
        console.log("error in form", errors)
        return Object.keys(errors).length > 0;
    }

    static handleNonNegativeInput(event: React.ChangeEvent<HTMLInputElement>, formik: any) {
        const inputElement = event.target;
        let value = Number(inputElement.value);

        // Clamp the value to a minimum of 0
        if (value < 0) {
            value = 0;
        }

        // Update Formik with the sanitized value
        formik.setFieldValue(inputElement?.name, value);

        // Update the input field value
        inputElement.value = value.toString();
    }

    static handlePercentageInput<T extends FormikValues>(event: React.ChangeEvent<HTMLInputElement>, formik: Formik<T>) {
        const inputValue = event.target.value;

        // Remove any non-numeric characters except decimal point
        const numericValue = inputValue.replace(/[^\d.]/g, '');

        // Parse the input, ensuring it doesn't exceed 100
        const parsedValue = Math.min(parseFloat(numericValue), 100);

        // Format the value
        const formattedValue = isNaN(parsedValue) ? '' : parsedValue.toString();

        formik.setFieldValue("taxSubTotalCategoryPercent", formattedValue);
    }

    static formatDisplayPercentage = (value: number | string) => {
        // Ensure the value is a number and has two decimal places
        const numValue = Number(value);
        return isNaN(numValue) ? '' : `${numValue.toFixed(2)}%`;
    };


// Touch only specific fields for the current step
    static touchFieldsForStep = <T extends FormikValues>(formik: Formik<T>, fields: string[]) => {
        const touchedFields = fields.reduce((acc: any, key) => {
            acc[key] = true;
            return acc;
        }, {} as FormikTouched<typeof formik.values>);
        formik.setTouched(touchedFields);
    };

    // Validate specific fields for the current step
    static isErrorInFormForStep = async <T extends FormikValues>(formik: Formik<T>, fields: string[]) => {
        this.touchFieldsForStep(formik, fields);  // Touch only fields for current step
        const errors = await formik.validateForm();

        // Only consider errors for the fields in the current step
        const stepErrors = fields.reduce((acc: any, key) => {
            if (errors[key]) {
                acc[key] = errors[key];
            }
            return acc;
        }, {} as typeof errors);

        console.log("errors for current step", stepErrors);
        return Object.keys(stepErrors).length > 0;
    };

    static cleanInputToAcceptOnlyNumberText = (inputValue: string) => {
        if (!inputValue) return ""
        return inputValue.replace(/[^\d\s]/g, "");
    }


    // Utility function to format numbers with commas
    // static formatNumberWithCommas = (value: string) => {
    //     if (!value) return ""
    //     const onlyNumbers = value?.replace(/,/g, ''); // Remove existing commas
    //     return Number(onlyNumbers).toLocaleString(); // Add commas to the number
    // };
    //
    // static formatDecimalNumberWithCommas = (value: string) => {
    //     if (!value) return ""
    //     const parts = value.split('.');
    //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas to integer part
    //     return parts.join('.'); // Rejoin the integer and decimal parts
    // };

    static formatNumberWithCommas = (number: string | number): string => {
        return number
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    static formatDecimalNumberWithCommas = (
        number: string | number,
        decimalPlaces: number
    ): string => {
        const [integerPart, decimalPart] = number.toString().split(".");
        const formattedInteger = this.formatNumberWithCommas(integerPart);
        const formattedDecimal = decimalPart
            ? decimalPart.slice(0, decimalPlaces)
            : "0".repeat(decimalPlaces);
        return `${formattedInteger}.${formattedDecimal}`;
    };

    static parseFormattedNumber(value: string): number {
        // Remove commas and ensure only one decimal point
        const cleanedValue = value
            .replace(/,/g, '')  // Remove all commas
            .replace(/\.(?=.*\.)/g, '')  // Remove extra decimal points, keeping only the first
            .trim();

        // Parse the cleaned value
        const parsedNumber = parseFloat(cleanedValue);

        // Return the parsed number or 0 if invalid
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    }

    static convertObjFieldsFromEmptyStringToNull = <T extends Record<string, any>>(obj: T): { [K in keyof T]: T[K] | null } => {
        return Object.keys(obj).reduce((acc, key) => {
            const typedKey = key as keyof T;
            acc[typedKey] = obj[typedKey] === '' ? null : obj[typedKey];
            return acc;
        }, {} as { [K in keyof T]: T[K] | null });
    };


}
