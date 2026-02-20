import type {FieldConfig} from "../../components/organisms/FormBuilder/types.ts";
import Input from "../../components/atoms/Input";
import ImageUploader from "../../components/molecules/ImageUploader";
import Textarea from "../../components/atoms/TextArea";

export const useSearchFormConfig = () => {
    return [
        {
            name: "brand",
            label: "Brand",
            component: Input,
            componentProps: {
                placeholder: "Brand",
            },
        },
        {
            name: "model",
            label: "Model",
            component: Input,
            componentProps: {
                placeholder: "Model",
            },
        },
        {
            name: "year",
            label: "Year",
            component: Input,
            componentProps: {
                type: "number",
                placeholder: "2013",
            },
        },
    ]
}

export const useCreateEditFormConfig = (): FieldConfig[][] => {
    const step1 = getStep1Config();
    const step2 = getStep2Config();
    const step3 = getStep3Config();

 return [step1, step2, step3]
}

const getStep1Config = (): FieldConfig[] => ([
        {
            name: "brand",
            label: "Brand",
            component: Input,
            componentProps: {
                placeholder: "Brand",
            },
        },
        {
            name: "model",
            label: "Model",
            component: Input,
            componentProps: {
                placeholder: "Model",
            },
        },
        {
            name: "year",
            label: "Year",
            component: Input,
            componentProps: {
                type: "number",
                placeholder: "2013",
            },
        },
        {
            name: "price",
            label: "Price",
            component: Input,
            componentProps: {
                type: "number",
                placeholder: "45000",
            },
        },
    ]
)

const getStep2Config = (): FieldConfig[] => ([
        {
            name: "images",
            label: "Photos",
            component: ImageUploader,
        },
        {
            name: "description",
            label: "Description",
            component: Textarea,
            componentProps: {
                placeholder: "Describe your car...",
            },
        },
    ]
)

const getStep3Config = (): FieldConfig[] => ([
        {
            name: "mileage",
            label: "Mileage",
            component: Input,
            componentProps: {
                type: "number",
                placeholder: "45000",
            },
        },
        {
            name: "fuel",
            label: "Fuel",
            component: Input,
            componentProps: {
                placeholder: "Fuel",
            },
        },
        {
            name: "transmission",
            label: "Transmission",
            component: Input,
            componentProps: {
                placeholder: "Transmission",
            },
        },
    ]
);