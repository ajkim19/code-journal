interface Entry {
  title: String;
  photoURL
}

const $photoURL = document.querySelector<HTMLInputElement>("#photo-url");
if (!$photoURL) throw new Error("$photoURL does not exist");
const $photoPreview = document.querySelector<HTMLImageElement>(".photo-preview");
if (!$photoPreview) throw new Error("$photoPreview does not exist");
const $entryForm = document.querySelector('form.entry-form');
if (!$entryForm) throw new Error('$entryForm does not exist');

function changePhotoPreview(): void {
  if($photoURL && $photoPreview) {
    $photoPreview.setAttribute('src', $photoURL.value);
  }
}

function submitForm(event: Event): void {
  if ($entryForm) {
    event.preventDefault();
    console.log('Form submitted');
  }
}

$photoURL.addEventListener('keydown' || 'paste', changePhotoPreview);
$entryForm.addEventListener('submit', submitForm);
