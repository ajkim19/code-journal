var $photoURL = document.querySelector("#photo-url");
if (!$photoURL)
    throw new Error("$photoURL does not exist");
var $photoPreview = document.querySelector(".photo-preview");
if (!$photoPreview)
    throw new Error("$photoPreview does not exist");
var $entryForm = document.querySelector('form.entry-form');
if (!$entryForm)
    throw new Error('$entryForm does not exist');
var $title = document.querySelector('.title');
if (!$title)
    throw new Error('$title does not exist');
var $notes = document.querySelector('.notes');
if (!$notes)
    throw new Error('$notes does not exist');
function changePhotoPreview() {
    if ($photoURL && $photoPreview) {
        $photoPreview.setAttribute('src', $photoURL.value);
    }
}
function submitForm(event) {
    if (!$title)
        throw new Error('$title does not exist for submitForm()');
    if (!$photoURL)
        throw new Error('$photoURL does not exist for submitForm()');
    if (!$notes)
        throw new Error('$notes does not exist for submitForm()');
    if (!$photoPreview)
        throw new Error('$photoPreview does not exist for submitForm()');
    event.preventDefault();
    var entry = {
        title: $title.value,
        photoURL: $photoURL.value,
        notes: $notes.value,
        entryId: data.nextEntryId
    };
    console.log('The form has been submitted');
    // data.entries.unshift(entry);
    console.log("The form has been added to data.entries with the ID ".concat(data.nextEntryId));
    data.nextEntryId++;
    // Resets the application to its original state
    $photoPreview.setAttribute('src', "images/placeholder-image-square.jpg");
    $title.value = "";
    $photoURL.value = "";
    $notes.value = "";
}
$photoURL.addEventListener('keydown' || 'paste', changePhotoPreview);
$entryForm.addEventListener('submit', submitForm);
