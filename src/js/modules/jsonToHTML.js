export default class jsonToHTML {
    constructor (json, callback) {
        // Json Object
        this.json = json;
        this.callback = callback;
        
        // Convert
        this.convertJsonToHTML();
    }
    
    convertJsonToHTML () {
        // Create Table Element
        const createTableEl = document.createElement('table');
        // Table ClassList(s) Add
        if ( this.json.dataTableParentClass ) {
            const allClassLists = this.json.dataTableParentClass;
            const classListsLength = allClassLists.split(' ');
            for ( let i = 0; i < classListsLength.length; i += 1 ) {
                createTableEl.classList.add(classListsLength[i])
            }
        }
        if ( this.json.thead ) {
            // Create Thead Element
            const createTheadEl = document.createElement('thead');
            createTableEl.append(createTheadEl);
            // Create Thead -> Tr Element
            const createTheadRowEl = document.createElement('tr');
            createTheadEl.append(createTheadRowEl);
            // Create Thead -> Tr -> Td Element(s)
            for ( let i = 0; i < this.json.thead.length; i += 1 ) {
                const item = this.json.thead[i];
                const createTheadColEl = document.createElement('td');
                createTheadColEl.innerHTML = item;
                createTheadRowEl.append(createTheadColEl);
            }
            if ( this.json.tableEventsDelete ) {
                // Create Edit Thead Row
                const createTheadEditRow = document.createElement('td');
                createTheadEditRow.innerText = this.json.tableEventsHeaderText ? this.json.tableEventsHeaderText : 'Handle';
                createTheadRowEl.append(createTheadEditRow);
            }
        }
        // Create Tbody Element
        const createTbodyEl = document.createElement('tbody');
        createTableEl.append(createTbodyEl);
        // Create Tbody -> Tr Element(s)
        for ( let i = 0; i < this.json.columns.length; i += 1 ) {
            const item = this.json.columns[i];
            const createTbodyRowEl = document.createElement('tr');
            createTbodyEl.append(createTbodyRowEl);
            // Create Tbody -> Tr -> Td Element(s)
            const itemObjectKeys = Object.keys(item);
            for ( let j = 0; j < itemObjectKeys.length; j += 1 ) {
                const columnsItem = item[j];
                const createTbodyColEl = document.createElement('td');
                // Create Delete Column and Inner Element(s)
                if ( columnsItem[0] && columnsItem[0] === '$F3v.v5-rmv##' ) {
                    createTbodyColEl.classList.add('delete');
                    createTbodyColEl.innerHTML = columnsItem[1];
                } else {
                    createTbodyColEl.innerHTML = columnsItem;
                }
                createTbodyRowEl.append(createTbodyColEl);
            }
        }
        this.callback(createTableEl);
    }
}