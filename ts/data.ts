interface Data {
  view: string;
  entries: Entry[];
  editing: any;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeData(data: Data): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): Data {
  console.log("Reading data")
  const dataJSON = localStorage.getItem('data-storage');
  if (!dataJSON) {
    return data
  }
  const dataParsed = JSON.parse(dataJSON) as Data
  return dataParsed
}
data = readData();
