export async function bufferToDataURL(buffer) {
    const { data } = buffer
    try {
        const dataURL = btoa(String.fromCharCode(...new Uint8Array(data)));
        return dataURL
    } catch (error) {
        console.error(error);
    }
}