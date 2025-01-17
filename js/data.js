var data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
function writeData() {
    var dataJSON = JSON.stringify(data);
    localStorage.setItem('data-storage', dataJSON);
}
function readData() {
    var dataJSON = localStorage.getItem('data-storage');
    if (!dataJSON) {
        return data;
    }
    var dataParsed = JSON.parse(dataJSON);
    return dataParsed;
}
writeData();
data = readData();
console.log('data', data);
