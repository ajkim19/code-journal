var $photoURL = document.querySelector("#photo-url");
if (!$photoURL)
    throw new Error("$photoURL does not exist");
var $photoPreview = document.querySelector(".photo-preview");
if (!$photoPreview)
    throw new Error("$photoPreview does not exist");
var $entryForm = document.querySelector('form.entry-form');
if (!$entryForm)
    throw new Error('$entryForm does not exist');
function changePhotoPreview() {
    if ($photoURL && $photoPreview) {
        $photoPreview.setAttribute('src', $photoURL.value);
    }
}
function submitForm(event) {
    if ($entryForm) {
        event.preventDefault();
        console.log('Form submitted');
    }
}
$photoURL.addEventListener('keydown' || 'paste', changePhotoPreview);
$entryForm.addEventListener('submit', submitForm);
