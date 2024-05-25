import { app } from "../firebase/client";
import { getStorage, ref, uploadBytesResumable} from "firebase/storage";

const storage = getStorage(app)

export function upload_file(filename, file, progress_bar){

    const fileRef = ref(storage, filename)


    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log('Upload is ' + progress + '% done');

            // Update the width of the progress bar element
            progress_bar.style.width = progress + '%';

            // Optionally, update the progressBar element with additional styles like transition to smooth the width change
            progress_bar.style.transition = 'width 0.5s ease';
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed', error);
        }, 
        () => {
            console.log("Done")
        }
    );

    return uploadTask
}