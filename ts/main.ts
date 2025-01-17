const photoURL = document.querySelector<HTMLInputElement>("#photo-url");
if (!photoURL) throw new Error("photoURL does not exist");
const photoPreview = document.querySelector<HTMLImageElement>(".photo-preview");
if (!photoPreview) throw new Error("photoPreview does not exist");

function changePhotoPreview(): void {
  if(photoURL && photoPreview) {
    photoPreview.setAttribute('src', photoURL.value);
  }
}

photoURL.addEventListener('keydown' || 'paste', changePhotoPreview);
