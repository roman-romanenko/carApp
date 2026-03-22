import type {AdRequestType} from "./types.ts";

export const useFormDataHelper = () => {
    const buildAdFormData = (data: AdRequestType) => {
        const formData = new FormData();
        const { images, ...rest } = data;
        let newImageCount = 0;
        const existingImagesWithOrder: string[] = []

        console.log(images)
        if (images && images.length > 0) {
            images.forEach((img) => {
                if (typeof img === "string") {
                    existingImagesWithOrder.push(img)
                } else {
                    existingImagesWithOrder.push(`new_${newImageCount}`)
                    formData.append("newImages", img);
                    newImageCount++;
                }
            });
        }

        formData.append("data", new Blob(
            [JSON.stringify({...rest, images: existingImagesWithOrder})],
            { type: "application/json" }
        ))

        return formData;
    };

    return { buildAdFormData }

}
