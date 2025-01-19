// Creates the data type of an entry
interface Entry {
  title: string;
  photoURL: string;
  notes?: string;
  entryId: number;
}

// Selects the elements of the elements of entry-form
const $entryFormView = document.querySelector<HTMLDivElement>(".entry-form-view")
if (!$entryFormView) throw new Error('$entryFormView does not exist');
const $photoURL = document.querySelector<HTMLInputElement>("#photo-url");
if (!$photoURL) throw new Error("$photoURL does not exist");
const $photoPreview = document.querySelector<HTMLImageElement>(".photo-preview");
if (!$photoPreview) throw new Error("$photoPreview does not exist");
const $newEntryForm = document.querySelector<HTMLInputElement>('.new-entry-form');
if (!$newEntryForm) throw new Error('$newEntryForm does not exist');
const $title = document.querySelector<HTMLInputElement>('#title');
if (!$title) throw new Error('$title does not exist');
const $notes = document.querySelector<HTMLTextAreaElement>('#notes');
if (!$notes) throw new Error('$notes does not exist');
const $entriesList = document.querySelector<HTMLTextAreaElement>('.entries-list');
if (!$entriesList) throw new Error('$entriesList does not exist');

// Selects the elements of entries
const $entriesView = document.querySelector<HTMLDivElement>(".entries-view")
if (!$entriesView) throw new Error('$entriesView does not exist');
const $newBtn = document.querySelector<HTMLDivElement>(".new-btn")
if (!$newBtn) throw new Error('$newBtn does not exist');
const $codeJournalHeaderEntries = document.querySelector<HTMLAnchorElement>("#code-journal-header-entries")
if (!$codeJournalHeaderEntries) throw new Error('$codeJournalHeaderEntries does not exist');


// Changes the photo preview using the given photo URL input
function changePhotoPreview(): void {
  if($photoURL && $photoPreview) {
    $photoPreview.setAttribute('src', $photoURL.value);
  }
}

// Creates an li element for an entry
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
  $divColumnHalf2.className = "column-half entry-title-notes";
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
  renderEntry(entry);
  data.entries.unshift(entry);
  data.nextEntryId++
  writeData(data)

  // Resets the application to its original state
  $photoPreview.setAttribute('src', "images/placeholder-image-square.jpg");
  $title.value = "";
  $photoURL.value = "";
  $notes.value = "";
}

// Adds a placeholder if no entries exist
function toggleNoEntries(): void {
  const $entriesPlaceholder = document.querySelector<HTMLElement>(".entries-placeholder");
  if (!$entriesPlaceholder) throw new Error('$entriesPlaceholder does not exist');
  $entriesPlaceholder.style.display = "block";
}

// Swaps the page view between entry-form and entries  display: none;
function viewSwap(string: string) {
  if (!$entryFormView) throw new Error('$entryFormView does not exist');
  if (!$entriesView) throw new Error('$entriesView does not exist');
  if (string === "entries") {
    $entryFormView.style.display = "none";
    $entriesView.style.display = "block";
  } else if (string === "entry-form") {
    $entryFormView.style.display = "block";
    $entriesView.style.display = "none";
  }
  data.view = string;
}

$photoURL.addEventListener('input', changePhotoPreview);
$entryFormView.addEventListener('submit', submitForm);
document.addEventListener('DOMContentLoaded', () => {
  // Renders then appends each existing entry to the ul element
  if (data.entries) {
    for (const entry of data.entries) {
      const dataEntry = renderEntry(entry);
      $entriesList.append(dataEntry);
    }
  // Displays a placeholder if there are no entries to render
  } else {
    toggleNoEntries()
  }
})

$codeJournalHeaderEntries.addEventListener('click', (event: Event) => {
  viewSwap("entries");
  event.preventDefault();
});

$newBtn.addEventListener('click', (event: Event) => {
  viewSwap("entry-form");
  event.preventDefault();
});
