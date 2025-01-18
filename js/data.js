var data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
function writeData(data) {
    var dataJSON = JSON.stringify(data);
    localStorage.setItem('data-storage', dataJSON);
}
function readData() {
    console.log("Reading data");
    var dataJSON = localStorage.getItem('data-storage');
    if (!dataJSON) {
        return data;
    }
    var dataParsed = JSON.parse(dataJSON);
    return dataParsed;
}
data = readData();
