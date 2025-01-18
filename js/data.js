"use strict";
// Initializes the data that will be stored in local storage
let data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
// Saves data to local storage for persistent data
function writeData(data) {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('data-storage', dataJSON);
}
// Retrieves the data from local storage for the application
function readData() {
    const dataJSON = localStorage.getItem('data-storage');
    if (!dataJSON) {
        return data;
    }
    const dataParsed = JSON.parse(dataJSON);
    return dataParsed;
}
data = readData();
