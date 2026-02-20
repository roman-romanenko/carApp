// {
//     title: "BMW M3",
//     description: "Sehr gepflegt",
//     price: 55000,
//     brand: "BMW",
//     model: "M3",
//     year: 2020,
//     images: [file1, file2], // File[] von ImageUploader
// }

export function buildFormData(
    data: Record<string, any>
): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        console.log(key, value)

        if (value instanceof File) {
            formData.append(key, value);
        }

        if (Array.isArray(value)) {
            value.forEach((item) => {
                formData.append(key, item);
            });
        } else {
            formData.append(key, value);
        }
    });

    return formData;
}
