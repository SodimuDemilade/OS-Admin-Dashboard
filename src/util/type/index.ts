import {type FormikValues, useFormik} from "formik";
import type {CSSProperties} from "react";

export type Formik<Values extends FormikValues = FormikValues> = ReturnType<typeof useFormik<Values>>;

export interface CustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number;
}

export type BaseResponse = {
    responseCode: string;
    responseMessage: string;
    data?: any
}

export type BaseErrorResponse = {
    "type": string,
    "title": string,
    "status": number,
    "errors": {
        [key: string]: string[]
    },
    "traceId": string
}


export type ReadJson = {
    showAllFields: boolean,
    fields: [
        {
            key: string,
            label: string
        }
    ],
    readEndpoint: string,
    uniqueColId: string, // the unique field for the entity
}

export type ModuleJson = [
    {
        moduleName: string;
        moduleItems: [
            {
                title: string;
                tabRoute: string; // the route to the page to find the appropriate component
            }
        ]
    }
]

export type formJson = [
    {
        name: string,//fieldName,
        label: string,// custom display label
        valueDataType: string | number | boolean | object | null | undefined,
        inputType: | "button"
            | "checkbox"
            | "color"
            | "date"
            | "datetime-local"
            | "email"
            | "file"
            | "hidden"
            | "image"
            | "month"
            | "number"
            | "password"
            | "radio"
            | "range"
            | "reset"
            | "search"
            | "submit"
            | "tel"
            | "text"
            | "time"
            | "url"
            | "week" | "select"
    }
]


export type StatCardProps = {
    title: string;
    value: string;
    // footerText: string;
    // trend: string
}
export type LearnerDataProps = {
    name: string;
    type: string;
    course: string;
    dateEnrolled: string
    status: string
}
export type InvoiceDataProps = {
    id: string;
    client: string;
    amount: string;
    status: string
}
export type InstitutionDataProps = {
    organisation: string;
    segment: string;
    learners: string;
    plan: string;
}