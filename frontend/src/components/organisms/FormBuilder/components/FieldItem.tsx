import type {FieldItemProps} from "../types.ts";

const FieldItem = ({ field, value, onChange }: FieldItemProps) => {
    const Component = field.component;

    return (
        <label className="form-field">
            {field.label}
            <Component
                {...field.componentProps}
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

export default FieldItem;
