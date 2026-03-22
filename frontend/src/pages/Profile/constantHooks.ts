import Input from "../../components/atoms/Input";
import {useAuth} from "../../system/context/AuthContext.tsx";
import type {InputProps} from "../../components/atoms/Input/types.ts";

export const usePersonalFormConfig = () => {
    const { user } = useAuth();
    return [
        {
            name: "firstName",
            label: "First Name",
            component: Input,
            componentProps: {
                placeholder: "Name",
                disabled: !!user?.firstName
            } as InputProps,
        },
        {
            name: "lastName",
            label: "Last Name",
            component: Input,
            componentProps: {
                placeholder: "Last Name",
                disabled: !!user?.lastName
            } as InputProps,
        },
        {
            name: "phone",
            label: "Phone",
            component: Input,
            componentProps: {
                type: "number",
                placeholder: "0174 999 999 99",
            } as InputProps,
        },
    ]
}