interface Data {
  view: string;
  entries: Entry[];
  editing: any;
  nextEntryId: number;
}

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): Data {
  const dataJSON = localStorage.getItem('data-storage');
  if (!dataJSON) {
    return data
  }
  const dataParsed = JSON.parse(dataJSON) as Data
  return dataParsed
}

writeData()
data = readData();
