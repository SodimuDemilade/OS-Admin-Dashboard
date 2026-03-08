import React, {SelectHTMLAttributes} from "react";

type BaseSelectProps = {
    labelStyle?: React.CSSProperties,
    inputStyle?: React.CSSProperties,
    errorStyle?: React.CSSProperties,
    error?: any,
    items?: { value: any, label: any }[],
    label?: string,
    formik?: any,
    leftIcon?: any
    width?: string
}
export const BaseSelect = ({
                               labelStyle,
                               inputStyle,
                               errorStyle,
                               formik,
                               // leftIcon,
                               // style,
                               // error,
                               items,
                               label,
                               // width,
                               ...props
                           }: BaseSelectProps & SelectHTMLAttributes<HTMLSelectElement>) => {

    errorStyle = errorStyle ? errorStyle : {};
    inputStyle = inputStyle ? inputStyle : {};
    // const [searchTerm, setSearchTerm] = useState('');
    // const [newItems, setNewItems] = useState<any>([]);
    if (formik.errors[props.name!] && formik.touched[props.name!]) inputStyle['borderColor'] = errorStyle['color'];


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
        }}>
            <label className={"form_field-label"} style={labelStyle} htmlFor={props.id}>{label}</label>
            {
                <select
                    value={formik.values[props.name!]}
                    onBlur={formik.handleBlur(props.name)}
                    onChange={formik.handleChange(props.name)}
                    style={{...inputStyle}}
                    {...props}
                >
                    {/*<option key={""} value={""}>Select</option>*/}
                    {items?.filter((item: any) => (item.label !== "")).map(
                        (item: any) => <option key={item.value} value={item.value}>{item.label}</option>
                    )}
                </select>
            }
            {
                formik.errors[props.name!] && formik.touched[props.name!] && (
                    <p style={errorStyle} className={"baseInput-error-text"}> {formik.errors[props.name!]} </p>
                )
            }
        </div>
    )
}