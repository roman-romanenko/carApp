import type {FieldConfig} from "../../components/organisms/FormBuilder/types.ts";
import Input from "../../components/atoms/Input";
import ImageUploader from "../../components/molecules/ImageUploader";
import Textarea from "../../components/atoms/TextArea";
import type {CreateEditConfig} from "./types.ts";

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

export const useCreateEditFormConfig = ({ isEdit }: CreateEditConfig = {}): FieldConfig[][] => {
    const step1 = getStep1Config();
    const step2 = getStep2Config({ isEdit });
    const step3 = getStep3Config();
    const step4 = getStep4Config();
    const step5 = getStep5Config();

    if(isEdit) {
        return [step2, step3, step5]
    }

    return [step1, step2, step3, step4, step5]
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

    ]
)

const getStep2Config = ({ isEdit }: CreateEditConfig = {}): FieldConfig[] => ([
        {
            name: "fuel",
            label: "Fuel",
            component: Input,
            componentProps: {
                placeholder: "Fuel",
                disabled: isEdit
            },
        },
        {
            name: "transmission",
            label: "Transmission",
            component: Input,
            componentProps: {
                placeholder: "Transmission",
                disabled: isEdit
            },
        },
        {
            name: "mileage",
            label: "Mileage",
            component: Input,
            componentProps: {
                type: "number",
                placeholder: "45000",
            },
        },
    ]
);

const getStep3Config = (): FieldConfig[] => ([
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


const getStep4Config = (): FieldConfig[] => ([
        {
            name: "country",
            label: "Country",
            component: Input,
            componentProps: {
                placeholder: "Germany",
            },
        },
        {
            name: "city",
            label: "City",
            component: Input,
            componentProps: {
                placeholder: "Berlin",
            },
        },
        {
            name: "zip",
            label: "Postal Code",
            component: Input,
            componentProps: {
                placeholder: "42285",
            },
        },
    ]
);

const getStep5Config = (): FieldConfig[] => ([
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
);