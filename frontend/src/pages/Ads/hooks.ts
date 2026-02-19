import type {AdRequestType} from "./types.ts";

export const useFormDataHelper = () => {
    const buildAdFormData = (data: AdRequestType) => {
        const formData = new FormData();
        const { images, ...rest } = data;

        formData.append("data", new Blob(
            [JSON.stringify(rest)],
            { type: "application/json" }
        ))

        if (images && images.length > 0) {
            images.forEach((file: File) => {
                formData.append("files", file);
            });
        }

        return formData;
    };

    return { buildAdFormData }

}
