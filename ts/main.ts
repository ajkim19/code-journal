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
  if ($entryForm && $title && $photoURL && $notes) {
    event.preventDefault();
    console.log('Form submitted');
    const entry: Entry = {
      title: $title.value,
      photoURL: $photoURL.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    }
    data.entries.push(entry);
    data.nextEntryId++
  }
}

$photoURL.addEventListener('keydown' || 'paste', changePhotoPreview);
$entryForm.addEventListener('submit', submitForm);
