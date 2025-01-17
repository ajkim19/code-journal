const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): object {
  const dataJSON = localStorage.getItem('data-storage');
  const dataParsed = JSON.parse(dataJSON)
  if (!dataParsed) {
    return data
  }
  return dataParsed
}
