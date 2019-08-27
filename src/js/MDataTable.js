export default class MDataTable {
    constructor ( obj ) {
        /*
        * multiple = querySelectorAll
        * single = querySelector
        */
        this.obj = obj;
        this.table = this.obj.multi ? document.querySelectorAll(this.obj.el) : document.querySelector(this.obj.el);
        this.editable = this.obj.editable;
        this.local = this.obj.local;
        
        // States
        this.states = {
            lastColumnValue: null,
        }
        
        // initialize Event Listener
        this.deleteEvent();
        
        if ( this.editable ) {
            this.editEvent();
        }
    }
    
    deleteEvent () {
        if ( this.obj.multi ) {
            for ( let i = 0; i < this.table.length; i += 1 ) {
                this.deleteAct = this.table[i].querySelectorAll('tbody tr td .delete');
                // All remove buttons loop
                for (let j = 0; j < this.deleteAct.length; j += 1) {
                    // Remove button
                    const item = this.deleteAct[j];
                    // Remove button init event
                    item.addEventListener('click', this.deleteEventManipulation.bind(this, item))
                }
            }
        } else {
            this.deleteAct = this.table.querySelectorAll('tbody tr td .delete');
            // All remove buttons loop
            for (let i = 0; i < this.deleteAct.length; i += 1) {
                // Remove button
                const item = this.deleteAct[i];
                // Remove button init event
                item.addEventListener('click', this.deleteEventManipulation.bind(this, item))
            }
        }
        
    }
    
    deleteEventManipulation (item) {
        this.item = item;
        this.row = this.item.parentNode.parentNode;
        
        // Initialize warn operations
        [ this.approveBtn, this.cancelBtn, this.warnDom ] = MDataTable.WarnOperation(this.row, this.local);
        
        // Delete operation button events
        
        /*
        * Approve Button
        */
        this.approveBtn.onclick = () => {
            // Delete warn dom
            this.warnDom.parentNode.removeChild(this.warnDom);
            
            // Delete row
            this.row.classList.add('delete-operation-start');
            
            setTimeout(() => {
                this.row.parentNode.removeChild(this.row);
                
                // Change count Index
                this.calcCountIndex();
                
            }, 501); // animation ended is remove row
        }
        
        /*
        * Cancel Button
        */
        this.cancelBtn.onclick = () => {
            this.warnDom.parentNode.removeChild(this.warnDom);
        }
    }
    
    static WarnOperation (row, local) {
        // Table row
        this.row = row;
        // Table row create bounding client rectangle
        this.rect = this.row.getBoundingClientRect();
        // Initialize warn dom
        return MDataTable.CreateWarnDom(this.rect.top, this.rect.left, this.row.clientWidth, this.row.clientHeight, local);
    }
    
    static CreateWarnDom (top, left, width, height, local) {
        // Distances & Height
        this.topDistance = top;
        this.leftDistance = left;
        this.rowWidth = width;
        this.rowHeight = height;
        this.local = local;
        
        if ( document.body.getElementsByClassName('m-table-warn').length !== 0 ) return;
        
        // Creating warn dom
        const warnDom = document.createElement('div');
        warnDom.classList.add('m-table-warn', 'delete-operation');
        warnDom.style.left = `${this.leftDistance + (this.rowWidth / 3.5)}px`;
        warnDom.style.top = `${this.topDistance + this.rowHeight}px`;
        
        // Creating warn dom header
        const warnDomHeader = document.createElement('div');
        warnDomHeader.classList.add('m-table-warn-header');
        
        // Creating header content
        const warnDomHeaderContent = document.createElement('h5');
        warnDomHeaderContent.classList.add('m-table-warn-header-content');
        warnDomHeaderContent.innerText = this.local.deleteWarn.title ? this.local.deleteWarn.title : 'Silmek istediğine emin misin ?';
        warnDomHeader.appendChild(warnDomHeaderContent);
        
        warnDom.appendChild(warnDomHeader);
        
        // Creating Action Buttons
        
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('m-table-button-container');
        
        const approveButton = document.createElement('button');
        const cancelButton = document.createElement('button');
        
        approveButton.innerText = this.local.deleteWarn.approveBtn ? this.local.deleteWarn.approveBtn : 'Silmek istediğine emin misin ?';;
        cancelButton.innerText = this.local.deleteWarn.cancelBtn ? this.local.deleteWarn.cancelBtn : 'Silmek istediğine emin misin ?';;
        
        approveButton.classList.add('approve-button');
        cancelButton.classList.add('btn-cancel');
        
        warnDom.appendChild(buttonContainer);
        
        buttonContainer.appendChild(approveButton);
        buttonContainer.appendChild(cancelButton);
        
        // Append Dom
        document.body.append(warnDom);
        
        return [approveButton, cancelButton, warnDom];
    }
    
    editEvent () {
        
        if (this.obj.multi) {
            for (let i = 0; i < this.table.length; i += 1 ) {
                const item = this.table[i];
                for (let j = 0; j < item.querySelectorAll('tbody tr td').length; j += 1 ) {
                    const column = item.querySelectorAll('tbody tr td')[j];
                    if (column.getAttribute('data-table-editable') !== "false") {
                        column.addEventListener('dblclick', this.dbClickEventManipulation.bind(this, column, false));
                    }
                }
            }
        } else {
            this.columns = document.querySelector(this.obj.el).getElementsByTagName('td');
            for ( let i = 0; i < this.columns.length; i += 1 ) {
                const item = this.columns[i];
                
                if ( item.getAttribute('data-table-editable') !== "false" ) {
                    item.addEventListener('dblclick', this.dbClickEventManipulation.bind(this, item, false));
                }
            }
        }
        
    }
    
    dbClickEventManipulation (column, type) {
        this.column = column;
        this.type = type;
        // Save last column
        this.states.lastColumnValue = this.column.innerText;
        // Create and add input area
        const createInput = document.createElement('input');
        createInput.type = 'text';
        createInput.classList.add('edit-column');
        createInput.value = this.column.innerText;
        this.column.innerText = '';
        this.column.append(createInput);
        
        // Create and add change button
        const createButton = document.createElement('button');
        createButton.innerText = this.local.changeButtonValue ? this.local.changeButtonValue : 'Change';
        this.column.append(createButton);
        
        // Create and add cancel button
        const cancelButton = document.createElement('button');
        cancelButton.innerText = this.local.cancelButtonValue ? this.local.cancelButtonValue : 'Cancel';
        this.column.append(cancelButton);
        
        // Click Events
        createButton.addEventListener('click', this.createButtonClickEventHandler.bind(this, this.column, createInput))
        cancelButton.addEventListener('click', this.changeInputCancelEventHandler.bind(this, this.column));
        // Keyboard Events
        createInput.addEventListener('keyup', (e) => { this.changeInputKeyEventHandler(e, this.column, createInput) });
    }
    
    createButtonClickEventHandler (column, input) {
        this.column = column;
        this.input = input;
        this.column.innerHTML = this.input.value;
    }
    
    changeInputCancelEventHandler (column) {
        this.column = column;
        
        this.column.innerHTML = this.states.lastColumnValue;
    }
    
    changeInputKeyEventHandler (event, column, input) {
        this.event = event;
        this.column = column;
        this.input = input;
        
        // Enter Keycode
        if ( this.event.keyCode === 13 ) {
            this.createButtonClickEventHandler(this.column, this.input);
        } else if ( this.event.keyCode === 27 ) {
            this.changeInputCancelEventHandler(this.column);
        }
    }
    
    calcCountIndex () { // Calc Index
        if ( this.obj.multi ) {
            // Multiple Table
            for (let i = 0; i < this.table.length; i += 1) {
                this.index = this.table[i].querySelectorAll('tbody th');
                
                for (let j = 0; j < this.index.length; j += 1) {
                    const elem = this.index[j];
                    elem.innerText = j + 1;
                }
            }
        } else {
            // Single table
            this.index = this.table.querySelectorAll('tbody th');
            
            for ( let i = 0; i < this.index.length; i += 1 ) {
                const elem = this.index[i];
                elem.innerText = i + 1;
            }
        }
    }
}

exports.module = MDataTable;
window.MDataTable = MDataTable;
