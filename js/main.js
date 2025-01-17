var photoURL = document.querySelector("#photo-url");
if (!photoURL)
    throw new Error("photoURL does not exist");
var photoPreview = document.querySelector(".photo-preview");
if (!photoPreview)
    throw new Error("photoPreview does not exist");
function changePhotoPreview() {
    if (photoURL && photoPreview) {
        photoPreview.setAttribute('src', photoURL.value);
    }
}
photoURL.addEventListener('keydown' || 'paste', changePhotoPreview);
