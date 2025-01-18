// Creates the data type that will be used for data
interface Data {
  view: string;
  entries: Entry[];
  editing: any;
  nextEntryId: number;
}

// Initializes the data that will be stored in local storage
let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

// Saves data to local storage for persistent data
function writeData(data: Data): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

// Retrieves the data from local storage for the application
function readData(): Data {
  const dataJSON = localStorage.getItem('data-storage');
  if (!dataJSON) {
    return data
  }
  const dataParsed = JSON.parse(dataJSON) as Data
  return dataParsed
}
data = readData();
