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
const $entryFormHeader = document.querySelector<HTMLDivElement>(".entry-form-header")
if (!$entryFormHeader) throw new Error('$entryFormHeader does not exist');
const $photoURL = document.querySelector<HTMLInputElement>("#photo-url");
if (!$photoURL) throw new Error("$photoURL does not exist");
const $photoPreview = document.querySelector<HTMLImageElement>(".photo-preview");
if (!$photoPreview) throw new Error("$photoPreview does not exist");
const $newEntryForm = document.querySelector<HTMLFormElement>('.new-entry-form');
if (!$newEntryForm) throw new Error('$newEntryForm does not exist');
const $title = document.querySelector<HTMLInputElement>('#title');
if (!$title) throw new Error('$title does not exist');
const $notes = document.querySelector<HTMLTextAreaElement>('#notes');
if (!$notes) throw new Error('$notes does not exist');
const $entriesList = document.querySelector<HTMLUListElement>('.entries-list');
if (!$entriesList) throw new Error('$entriesList does not exist');

// Selects the elements of entries
const $entriesView = document.querySelector<HTMLDivElement>(".entries-view")
if (!$entriesView) throw new Error('$entriesView does not exist');
const $newBtn = document.querySelector<HTMLDivElement>(".new-btn")
if (!$newBtn) throw new Error('$newBtn does not exist');
const $codeJournalHeaderEntries = document.querySelector<HTMLAnchorElement>("#code-journal-header-entries")
if (!$codeJournalHeaderEntries) throw new Error('$codeJournalHeaderEntries does not exist');
const $deleteEntryBtn = document.querySelector<HTMLAnchorElement>(".delete-entry-btn");
if (!$deleteEntryBtn) throw new Error('$deleteEntryBtn does not exist');
const $deleteModal = document.querySelector<HTMLDialogElement>(".delete-modal");
if (!$deleteModal) throw new Error('$deleteModal does not exist');
const $deleteModalCancelBtn = document.querySelector<HTMLButtonElement>(".delete-modal-cancel-btn");
if (!$deleteModalCancelBtn) throw new Error('$deleteModalCancelBtn does not exist');
const $deleteModalConfirmBtn = document.querySelector<HTMLButtonElement>(".delete-modal-confirm-btn");
if (!$deleteModalConfirmBtn) throw new Error('$deleteModalConfirmBtn does not exist');

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
  $liEntryItem.setAttribute("data-entry-id", entry.entryId.toLocaleString())
  const $divColumnHalf1 = document.createElement("div");
  $divColumnHalf1.className = "column-half";
  const $imgEntryImage = document.createElement("img");
  $imgEntryImage.className = "entry-image";
  $imgEntryImage.setAttribute("src", entry.photoURL);
  $divColumnHalf1.append($imgEntryImage);
  const $divColumnHalf2 = document.createElement("div");
  $divColumnHalf2.className = "row column-half entry-title-edit-notes";
  const $divColumnFull = document.createElement("div");
  $divColumnFull.className = "row column-full entry-title-edit";
  const $h2EntryTitle = document.createElement("h2");
  $h2EntryTitle.className = "entry-title";
  $h2EntryTitle.textContent = entry.title;
  const $iEdit = document.createElement("i");
  $iEdit.className = "fa-solid fa-pen";
  $divColumnFull.append($h2EntryTitle, $iEdit)
  const $divEntryNotes = document.createElement("div");
  $divEntryNotes.className = "entry-notes";
  let notesString = "<p>";
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
  $divColumnHalf2.append($divColumnFull, $divEntryNotes);
  $liEntryItem.append($divColumnHalf1, $divColumnHalf2);
  return $liEntryItem;
}

// Submits the form using the given inputs of the form
function submitForm(event: Event): void {
  if (!$title) throw new Error('$title does not exist for submitForm()');
  if (!$photoURL) throw new Error('$photoURL does not exist for submitForm()');
  if (!$notes) throw new Error('$notes does not exist for submitForm()');
  if (!$photoPreview) throw new Error('$photoPreview does not exist for submitForm()');
  if (!$entriesList) throw new Error('$entriesList does not exist for');
  if (!$entryFormHeader) throw new Error('$entryFormHeader does not exist for');
  if (!$deleteEntryBtn) throw new Error('$deleteEntryBtn does not exist for submitForm()');

  event.preventDefault();

  // Displays entries is there is no entry to edit
  if (!data.editing) {
    // Creates a new Entry and prepending it the entries array in data
    const entry: Entry = {
      title: $title.value,
      photoURL: $photoURL.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    }

    // Appends new entry to data.entries and saved in local storage
    data.entries.push(entry);
    data.nextEntryId++
    writeData(data)

  } else {
    const editedEntry: Entry = {
      title: $title.value,
      photoURL: $photoURL.value,
      notes: $notes.value,
      entryId: data.editing.entryId
    }
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries.splice(i, 1, editedEntry)
      }
    }
    $entryFormHeader.textContent = "New Entry";
    console.log("New Entry Button")
    $deleteEntryBtn.style.opacity = "0";
    data.editing = null
    writeData(data)
  }

  if (data.entries) {
    $entriesList.innerHTML = "";
    for (const entry of data.entries) {
      // Renders a DOM tree for the newly submitted entry object
      const dataEntry = renderEntry(entry);
      // Prepends the new DOM tree to the unordered list.
      $entriesList.prepend(dataEntry);
    }
  // Displays a placeholder if there are no entries to render
  } else {
    toggleNoEntries()
  }
  // Shows the ”entries” view
  viewSwap("entries");

  // Resets the application to its original state
  $entryFormHeader.textContent = "New Entry";
  console.log("New Entry Button")
  $deleteEntryBtn.style.opacity = "0";
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
  writeData(data);
}


$photoURL.addEventListener('input', changePhotoPreview);
$newEntryForm.addEventListener('submit', submitForm);
document.addEventListener('DOMContentLoaded', () => {
  // Shows the view which was displayed prior to page refresh
  viewSwap(data.view)

  // Renders then appends each existing entry to the ul element
  if (data.entries) {
    for (const entry of data.entries) {
      const dataEntry = renderEntry(entry);
      $entriesList.prepend(dataEntry);
    }
  // Displays a placeholder if there are no entries to render
  } else {
    toggleNoEntries()
  }
  writeData(data)
})

$codeJournalHeaderEntries.addEventListener('click', (event: Event) => {
  event.preventDefault();
  viewSwap("entries");
});

$newBtn.addEventListener('click', (event: Event) => {
  event.preventDefault();
  viewSwap("entry-form");
  $entryFormHeader.textContent = "New Entry";
  $deleteEntryBtn.style.opacity = "0";
  $photoPreview.setAttribute('src', "images/placeholder-image-square.jpg");
  $title.value = "";
  $photoURL.value = "";
  $notes.value = "";
});

$entriesList.addEventListener('click', (event: Event) => {
  if (!$title) throw new Error('$title does not exist for submitForm()');
  if (!$photoURL) throw new Error('$photoURL does not exist for submitForm()');
  if (!$notes) throw new Error('$notes does not exist for submitForm()');
  if (!$photoPreview) throw new Error('$photoPreview does not exist for submitForm()');
  if (!$deleteEntryBtn) throw new Error('$deleteEntryBtn does not exist for submitForm()');
  // Find the entry object in the data.entries array whose id matches the data-entry-id
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.classList.contains("fa-pen")) {
    viewSwap("entry-form")
    const entryID = eventTarget.closest("li")?.getAttribute("data-entry-id");
    for (const entry of data.entries) {
      if (entry.entryId === Number(entryID)) {
        data.editing = entry;
      }
    }
  }
  // Pre-populates the entry form with the clicked entry's values
  $title.value = data.editing.title;
  $photoURL.value = data.editing.photoURL;
  $photoPreview.setAttribute('src', data.editing.photoURL);
  $notes.value = data.editing.notes;

  // Updates the title of the entry-form view
  $entryFormHeader.textContent = "Edit Entry";
  $deleteEntryBtn.style.opacity = "100";
})

$deleteEntryBtn.addEventListener("click", () => {
  $deleteModal.showModal();
})

$deleteModalCancelBtn.addEventListener("click", () => {
  $deleteModal.close();
})

$deleteModalConfirmBtn.addEventListener("click", () => {
  if (!$entryFormHeader) throw new Error('$entryFormHeader does not exist for submitForm()');
  if (!$deleteEntryBtn) throw new Error('$deleteEntryBtn does not exist for submitForm()');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1)
    }
  }
  writeData(data)
  $entryFormHeader.textContent = "New Entry";
  $deleteEntryBtn.style.opacity = "0";
  data.editing = null

  if (data.entries) {
    $entriesList.innerHTML = "";
    for (const entry of data.entries) {
      // Renders a DOM tree for the newly submitted entry object
      const dataEntry = renderEntry(entry);
      // Prepends the new DOM tree to the unordered list.
      $entriesList.prepend(dataEntry);
    }
  // Displays a placeholder if there are no entries to render
  } else {
    toggleNoEntries()
  }
  // Shows the ”entries” view
  viewSwap("entries");

  $deleteModal.close();
})
