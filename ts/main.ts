// Creates the data type of an entry
interface Entry {
  title: string;
  photoURL: string;
  notes?: string;
  entryId: number;
}

// Selects the elements of the form for adding new entries
const $photoURL = document.querySelector<HTMLInputElement>("#photo-url");
if (!$photoURL) throw new Error("$photoURL does not exist");
const $photoPreview = document.querySelector<HTMLImageElement>(".photo-preview");
if (!$photoPreview) throw new Error("$photoPreview does not exist");
const $entryForm = document.querySelector<HTMLInputElement>('form.entry-form');
if (!$entryForm) throw new Error('$entryForm does not exist');
const $title = document.querySelector<HTMLInputElement>('#title');
if (!$title) throw new Error('$title does not exist');
const $notes = document.querySelector<HTMLTextAreaElement>('#notes');
if (!$notes) throw new Error('$notes does not exist');

// Changes the photo preview using the given photo URL input
function changePhotoPreview(): void {
  if($photoURL && $photoPreview) {
    $photoPreview.setAttribute('src', $photoURL.value);
  }
}

// Submits the form using the given inputs of the form
function submitForm(event: Event): void {
  if (!$title) throw new Error('$title does not exist for submitForm()');
  if (!$photoURL) throw new Error('$photoURL does not exist for submitForm()');
  if (!$notes) throw new Error('$notes does not exist for submitForm()');
  if (!$photoPreview) throw new Error('$photoPreview does not exist for submitForm()');
  event.preventDefault();

  // Creates a new Entry and prepending it the entries array in data
  const entry: Entry = {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  }
  data.entries.unshift(entry);
  data.nextEntryId++
  writeData(data)

  // Resets the application to its original state
  $photoPreview.setAttribute('src', "images/placeholder-image-square.jpg");
  $title.value = "";
  $photoURL.value = "";
  $notes.value = "";
}

$photoURL.addEventListener('input', changePhotoPreview);
$entryForm.addEventListener('submit', submitForm);
