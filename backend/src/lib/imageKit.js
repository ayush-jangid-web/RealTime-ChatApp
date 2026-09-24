import pkg from "@imagekit/nodejs/client.js";

// Ensure we grab the module correctly whether it's directly exported or under .default
const ImageKit = pkg.ImageKit || pkg.default || pkg;
const toFile = pkg.toFile;

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

function hasImageKitConfig() {
    return Boolean(process.env.IMAGEKIT_PRIVATE_KEY)
}

// this function simply take the original file name and convert it's name to safe name so that no ambiguity in name of file's on imagekit 
function createFileName(originalName = "upload") {
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
    return `chat-${Date.now()}-${safeName}`;
}

async function uploadChatMedia(file) {

    const fileName = createFileName(file.originalName);

    const response = await imagekit.file.upload({
        file: await toFile(file.buffer, fileName, { type: file.mimetype }),
        fileName,
        folder: "/Real-Time-ChatApp"
    })

    return response.url
}

export {uploadChatMedia,hasImageKitConfig}