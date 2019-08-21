export default class DataTable {
    constructor ( obj ) {
        this.table = obj.multi ? document.querySelectorAll(obj.el) : document.querySelector(obj.el);
        
        // initialize Event Listener
        this.deleteEvent();
    }
    
    deleteEvent () {
        this.deleteAct = this.table.querySelectorAll('tbody tr td .delete');
        
        for ( let i = 0; i < this.deleteAct.length; i += 1 ) {
            const item = this.deleteAct[i];
            
            item.addEventListener('click', this.deleteEventManipulation.bind(this, item))
        }
    }
    
    deleteEventManipulation (item) {
        this.item = item;
        this.row = this.item.parentNode.parentNode;
        
        DataTable.WarnOperation(this.row);
    }

    static WarnOperation (row) {
        this.row = row;
        this.rect = this.row.getBoundingClientRect();

        console.log(this.rect.top)

        // console.log(row.offsetTop);
    }
}

exports.module = DataTable;
window.DataTable = DataTable;
