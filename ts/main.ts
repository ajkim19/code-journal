interface Entry {
  title: string;
  photoURL: string;
  notes?: string;
  entryId: number;
}

const $photoURL = document.querySelector<HTMLInputElement>("#photo-url");
if (!$photoURL) throw new Error("$photoURL does not exist");
const $photoPreview = document.querySelector<HTMLImageElement>(".photo-preview");
if (!$photoPreview) throw new Error("$photoPreview does not exist");
const $entryForm = document.querySelector<HTMLInputElement>('form.entry-form');
if (!$entryForm) throw new Error('$entryForm does not exist');
const $title = document.querySelector<HTMLInputElement>('.title');
if (!$title) throw new Error('$title does not exist');
const $notes = document.querySelector<HTMLTextAreaElement>('.notes');
if (!$notes) throw new Error('$notes does not exist');

function changePhotoPreview(): void {
  if($photoURL && $photoPreview) {
    $photoPreview.setAttribute('src', $photoURL.value);
  }
}

function submitForm(event: Event): void {
  if (!$title) throw new Error('$title does not exist for submitForm()');
  if (!$photoURL) throw new Error('$photoURL does not exist for submitForm()');
  if (!$notes) throw new Error('$notes does not exist for submitForm()');
  if (!$photoPreview) throw new Error('$photoPreview does not exist for submitForm()');
  event.preventDefault();
  const entry: Entry = {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  }
  console.log('The form has been submitted');
  data.entries.push(entry);
  console.log(`The form has been added to data.entries with the ID ${data.nextEntryId}`)
  data.nextEntryId++
  $photoPreview.setAttribute('src', "images/placeholder-image-square.jpg");
  $title.value = "";
  $photoURL.value = "";
  $notes.value = "";
}

$photoURL.addEventListener('keydown' || 'paste', changePhotoPreview);
$entryForm.addEventListener('submit', submitForm);
