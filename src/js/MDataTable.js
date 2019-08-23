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
        
        // initialize Event Listener
        this.deleteEvent();
        
        if ( this.editable ) {
            this.editEvent();
        }
    }
    
    deleteEvent () {
        this.deleteAct = this.table.querySelectorAll('tbody tr td .delete');
        // All remove buttons loop
        for ( let i = 0; i < this.deleteAct.length; i += 1 ) {
            // Remove button
            const item = this.deleteAct[i];
            // Remove button init event
            item.addEventListener('click', this.deleteEventManipulation.bind(this, item))
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
            for (let i = 0; i < document.querySelectorAll(this.obj.el).length; i += 1 ) {
                const item = document.querySelectorAll(this.obj.el)[i];
                item.addEventListener('dbclick', this.dbClickEventManipulation.bind(this, item, true) );
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

        console.log(this.column);
        
    }
}

exports.module = MDataTable;
window.MDataTable = MDataTable;
