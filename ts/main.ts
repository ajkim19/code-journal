// Creates the data type of an entry
interface Entry {
  title: string;
  photoURL: string;
  notes?: string;
  entryId: number;
}

const entry: Entry = {
  title: "Swedish Vallhund",
  photoURL: "https://pet-health-content-media.chewy.com/wp-content/uploads/2024/09/11170242/202106swedish-vallhund-4.jpg",
  notes: "The long and low Swedish Vallhund, Viking Dog of ancient legend, is a smart and sociable herder of dense coat and boundless energy.\nThese rugged cattle dogs are known for their zest for life, unique vocalizations, and cheerful demeanor.",
  entryId: 7,
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
const $entriesList = document.querySelector<HTMLTextAreaElement>('.entries-list');
if (!$entriesList) throw new Error('$entriesList does not exist');

// Changes the photo preview using the given photo URL input
function changePhotoPreview(): void {
  if($photoURL && $photoPreview) {
    $photoPreview.setAttribute('src', $photoURL.value);
  }
}

function renderEntry(entry: Entry): HTMLLIElement {
  const $liEntryItem = document.createElement("li");
  $liEntryItem.className = "row entry-item";
  const $divColumnHalf1 = document.createElement("div");
  $divColumnHalf1.className = "column-half";
  const $imgEntryImage = document.createElement("img");
  $imgEntryImage.className = "entry-image";
  $imgEntryImage.setAttribute("src", entry.photoURL);
  $divColumnHalf1.append($imgEntryImage);
  const $divColumnHalf2 = document.createElement("div");
  $divColumnHalf2.className = "column-half";
  const $h2EntryTitle = document.createElement("h2");
  $h2EntryTitle.className = "entry-title";
  $h2EntryTitle.textContent = entry.title;
  const $divEntryNotes = document.createElement("div");
  $divEntryNotes.className = "entry-notes";
  let notesString = "<p>"
  if (entry.notes) {
    for (let i = 0; i < entry.notes.length; i++) {
      if (entry.notes[i] === "\n") {
        notesString += "</p><p></p><p>";
      } else {
        notesString += entry.notes[i];
      }
    }
  }
  notesString += "</p>"
  $divEntryNotes.innerHTML = notesString;
  $divColumnHalf2.append($h2EntryTitle, $divEntryNotes);
  $liEntryItem.append($divColumnHalf1, $divColumnHalf2);
  return $liEntryItem;
}

console.log(renderEntry(entry))

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
