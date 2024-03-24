export const toFullName = (
    lastName: string,
    middleName: string,
    firstName: string,
    language: string
) => {
    if (language === 'vi') {
        return `${lastName ?? ''} ${middleName ?? ''} ${firstName ?? ''}`;
    }

    return `${firstName ?? ''} ${middleName ?? ''} ${lastName ?? ''}`;
};

export const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
};
