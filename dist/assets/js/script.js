(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @type {el: string}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @type {local: string}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @type {multi: boolean}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @type {editable: boolean}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * @type {countIndex: boolean}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

// Modules


var _jsonToHTML = require('./modules/jsonToHTML');

var _jsonToHTML2 = _interopRequireDefault(_jsonToHTML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MDataTable = function () {
    function MDataTable(obj) {
        var _this = this;

        _classCallCheck(this, MDataTable);

        /*
        * multiple = querySelectorAll
        * single = querySelector
        */
        this.obj = obj;
        this.HTMLData = null;
        if (this.obj.jsonData) {
            new _jsonToHTML2.default(this.obj.jsonData, function (data) {
                console.log(data);
                if (_this.obj.multi) {}
            });
        }

        this.table = this.obj.multi ? document.querySelectorAll(this.obj.el) : document.querySelector(this.obj.el);
        this.editable = this.obj.editable;
        this.local = this.obj.local;

        // States
        this.states = {
            lastColumnValue: null

            // initialize Event Listener
        };this.deleteEvent();

        if (this.editable) {
            this.editEvent();
        }
    }

    // Create Delete Event for Dynamic datas.


    _createClass(MDataTable, [{
        key: 'deleteEvent',
        value: function deleteEvent() {
            if (this.obj.multi) {
                for (var i = 0; i < this.table.length; i += 1) {
                    this.deleteAct = this.table[i].querySelectorAll('tbody tr td .delete');
                    // All remove buttons loop
                    for (var j = 0; j < this.deleteAct.length; j += 1) {
                        // Remove button
                        var item = this.deleteAct[j];
                        // Remove button init event
                        item.addEventListener('click', this.deleteEventManipulation.bind(this, item));
                    }
                }
            } else {
                this.deleteAct = this.table.querySelectorAll('tbody tr td .delete');
                // All remove buttons loop
                for (var _i = 0; _i < this.deleteAct.length; _i += 1) {
                    // Remove button
                    var _item = this.deleteAct[_i];
                    // Remove button init event
                    _item.addEventListener('click', this.deleteEventManipulation.bind(this, _item));
                }
            }
        }
    }, {
        key: 'deleteEventManipulation',
        value: function deleteEventManipulation(item) {
            var _this2 = this;

            this.item = item;
            this.row = this.item.parentNode.parentNode;

            // Initialize warn operations

            // Delete operation button events

            /*
            * Approve Button
            */
            var _MDataTable$WarnOpera = MDataTable.WarnOperation(this.row, this.local);

            var _MDataTable$WarnOpera2 = _slicedToArray(_MDataTable$WarnOpera, 3);

            this.approveBtn = _MDataTable$WarnOpera2[0];
            this.cancelBtn = _MDataTable$WarnOpera2[1];
            this.warnDom = _MDataTable$WarnOpera2[2];
            this.approveBtn.onclick = function () {
                // Delete warn dom
                _this2.warnDom.parentNode.removeChild(_this2.warnDom);

                // Delete row
                _this2.row.classList.add('delete-operation-start');

                setTimeout(function () {
                    _this2.row.parentNode.removeChild(_this2.row);

                    // Change count Index
                    _this2.calcCountIndex();
                }, 501); // animation ended is remove row
            };

            /*
            * Cancel Button
            */
            this.cancelBtn.onclick = function () {
                _this2.warnDom.parentNode.removeChild(_this2.warnDom);
            };
        }
    }, {
        key: 'editEvent',
        value: function editEvent() {

            if (this.obj.multi) {
                for (var i = 0; i < this.table.length; i += 1) {
                    var item = this.table[i];
                    for (var j = 0; j < item.querySelectorAll('tbody tr td').length; j += 1) {
                        var column = item.querySelectorAll('tbody tr td')[j];
                        if (column.getAttribute('data-table-editable') !== "false") {
                            column.addEventListener('dblclick', this.dbClickEventManipulation.bind(this, column, false));
                        }
                    }
                }
            } else {
                this.columns = document.querySelector(this.obj.el).getElementsByTagName('td');
                for (var _i2 = 0; _i2 < this.columns.length; _i2 += 1) {
                    var _item2 = this.columns[_i2];

                    if (_item2.getAttribute('data-table-editable') !== "false") {
                        _item2.addEventListener('dblclick', this.dbClickEventManipulation.bind(this, _item2, false));
                    }
                }
            }
        }
    }, {
        key: 'dbClickEventManipulation',
        value: function dbClickEventManipulation(column, type) {
            var _this3 = this;

            this.column = column;
            this.type = type;
            // Save last column
            this.states.lastColumnValue = this.column.innerText;
            // Create and add input area
            var createInput = document.createElement('input');
            createInput.type = 'text';
            createInput.classList.add('edit-column');
            createInput.value = this.column.innerText;
            this.column.innerText = '';
            this.column.append(createInput);

            // Create and add change button
            var createButton = document.createElement('button');
            createButton.innerText = this.local.changeButtonValue ? this.local.changeButtonValue : 'Change';
            this.column.append(createButton);

            // Create and add cancel button
            var cancelButton = document.createElement('button');
            cancelButton.innerText = this.local.cancelButtonValue ? this.local.cancelButtonValue : 'Cancel';
            this.column.append(cancelButton);

            // Click Events
            createButton.addEventListener('click', this.createButtonClickEventHandler.bind(this, this.column, createInput));
            cancelButton.addEventListener('click', this.changeInputCancelEventHandler.bind(this, this.column));
            // Keyboard Events
            createInput.addEventListener('keyup', function (e) {
                _this3.changeInputKeyEventHandler(e, _this3.column, createInput);
            });
        }
    }, {
        key: 'createButtonClickEventHandler',
        value: function createButtonClickEventHandler(column, input) {
            this.column = column;
            this.input = input;
            this.column.innerHTML = this.input.value;
        }
    }, {
        key: 'changeInputCancelEventHandler',
        value: function changeInputCancelEventHandler(column) {
            this.column = column;
            this.column.innerHTML = this.states.lastColumnValue;
        }
    }, {
        key: 'changeInputKeyEventHandler',
        value: function changeInputKeyEventHandler(event, column, input) {
            this.event = event;
            this.column = column;
            this.input = input;

            // Enter Keycode
            if (this.event.keyCode === 13) {
                this.createButtonClickEventHandler(this.column, this.input);
            } else if (this.event.keyCode === 27) {
                this.changeInputCancelEventHandler(this.column);
            }
        }
    }, {
        key: 'calcCountIndex',
        value: function calcCountIndex() {
            // Calc Index
            if (this.obj.multi) {
                // Multiple Table
                for (var i = 0; i < this.table.length; i += 1) {
                    this.index = this.table[i].querySelectorAll('tbody th');

                    for (var j = 0; j < this.index.length; j += 1) {
                        var elem = this.index[j];
                        elem.innerText = j + 1;
                    }
                }
            } else {
                // Single table
                this.index = this.table.querySelectorAll('tbody th');

                for (var _i3 = 0; _i3 < this.index.length; _i3 += 1) {
                    var _elem = this.index[_i3];
                    _elem.innerText = _i3 + 1;
                }
            }
        }
    }], [{
        key: 'createDeleteColumnAuth',
        value: function createDeleteColumnAuth(innerEl) {
            this.innerEl = innerEl;
            return ['$F3v.v5-rmv##', this.innerEl];
        }
    }, {
        key: 'WarnOperation',
        value: function WarnOperation(row, local) {
            // Table row
            this.row = row;
            // Table row create bounding client rectangle
            this.rect = this.row.getBoundingClientRect();
            // Initialize warn dom
            return MDataTable.CreateWarnDom(this.rect.top, this.rect.left, this.row.clientWidth, this.row.clientHeight, local);
        }
    }, {
        key: 'CreateWarnDom',
        value: function CreateWarnDom(top, left, width, height, local) {
            // Distances & Height
            this.topDistance = top;
            this.leftDistance = left;
            this.rowWidth = width;
            this.rowHeight = height;
            this.local = local;

            if (document.body.getElementsByClassName('m-table-warn').length !== 0) return;

            // Creating warn dom
            var warnDom = document.createElement('div');
            warnDom.classList.add('m-table-warn', 'delete-operation');
            warnDom.style.left = this.leftDistance + this.rowWidth / 3.5 + 'px';
            warnDom.style.top = this.topDistance + this.rowHeight + 'px';

            // Creating warn dom header
            var warnDomHeader = document.createElement('div');
            warnDomHeader.classList.add('m-table-warn-header');

            // Creating header content
            var warnDomHeaderContent = document.createElement('h5');
            warnDomHeaderContent.classList.add('m-table-warn-header-content');
            warnDomHeaderContent.innerText = this.local.deleteWarn.title ? this.local.deleteWarn.title : 'Silmek istediğine emin misin ?';
            warnDomHeader.appendChild(warnDomHeaderContent);

            warnDom.appendChild(warnDomHeader);

            // Creating Action Buttons

            var buttonContainer = document.createElement('div');
            buttonContainer.classList.add('m-table-button-container');

            var approveButton = document.createElement('button');
            var cancelButton = document.createElement('button');

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
    }]);

    return MDataTable;
}();

exports.default = MDataTable;


exports.module = MDataTable;
window.MDataTable = MDataTable;

},{"./modules/jsonToHTML":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsonToHTML = function () {
    function jsonToHTML(json, callback) {
        _classCallCheck(this, jsonToHTML);

        // Json Object
        this.json = json;
        this.callback = callback;

        // Convert
        this.convertJsonToHTML();
    }

    _createClass(jsonToHTML, [{
        key: 'convertJsonToHTML',
        value: function convertJsonToHTML() {
            // Create Table Element
            var createTableEl = document.createElement('table');
            // Table ClassList(s) Add
            if (this.json.dataTableParentClass) {
                var allClassLists = this.json.dataTableParentClass;
                var classListsLength = allClassLists.split(' ');
                for (var i = 0; i < classListsLength.length; i += 1) {
                    createTableEl.classList.add(classListsLength[i]);
                }
            }
            if (this.json.thead) {
                // Create Thead Element
                var createTheadEl = document.createElement('thead');
                createTableEl.append(createTheadEl);
                // Create Thead -> Tr Element
                var createTheadRowEl = document.createElement('tr');
                createTheadEl.append(createTheadRowEl);
                // Create Thead -> Tr -> Td Element(s)
                for (var _i = 0; _i < this.json.thead.length; _i += 1) {
                    var item = this.json.thead[_i];
                    var createTheadColEl = document.createElement('td');
                    createTheadColEl.innerHTML = item;
                    createTheadRowEl.append(createTheadColEl);
                }
                if (this.json.tableEventsDelete) {
                    // Create Edit Thead Row
                    var createTheadEditRow = document.createElement('td');
                    createTheadEditRow.innerText = this.json.tableEventsHeaderText ? this.json.tableEventsHeaderText : 'Handle';
                    createTheadRowEl.append(createTheadEditRow);
                }
            }
            // Create Tbody Element
            var createTbodyEl = document.createElement('tbody');
            createTableEl.append(createTbodyEl);
            // Create Tbody -> Tr Element(s)
            for (var _i2 = 0; _i2 < this.json.columns.length; _i2 += 1) {
                var _item = this.json.columns[_i2];
                var createTbodyRowEl = document.createElement('tr');
                createTbodyEl.append(createTbodyRowEl);
                // Create Tbody -> Tr -> Td Element(s)
                var itemObjectKeys = Object.keys(_item);
                for (var j = 0; j < itemObjectKeys.length; j += 1) {
                    var columnsItem = _item[j];
                    var createTbodyColEl = document.createElement('td');
                    // Create Delete Column and Inner Element(s)
                    if (columnsItem[0] && columnsItem[0] === '$F3v.v5-rmv##') {
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
    }]);

    return jsonToHTML;
}();

exports.default = jsonToHTML;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvTURhdGFUYWJsZS5qcyIsInNyYy9qcy9tb2R1bGVzL2pzb25Ub0hUTUwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztxakJDQUE7Ozs7Ozs7O0FBUUE7OztBQUNBOzs7Ozs7OztJQUVxQixVO0FBQ2pCLHdCQUFjLEdBQWQsRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEI7Ozs7QUFJQSxhQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsWUFBSyxLQUFLLEdBQUwsQ0FBUyxRQUFkLEVBQXlCO0FBQ3JCLGdCQUFJLG9CQUFKLENBQWUsS0FBSyxHQUFMLENBQVMsUUFBeEIsRUFBa0MsZ0JBQVE7QUFDdEMsd0JBQVEsR0FBUixDQUFZLElBQVo7QUFDQSxvQkFBSyxNQUFLLEdBQUwsQ0FBUyxLQUFkLEVBQXNCLENBRXJCO0FBQ0osYUFMRDtBQU1IOztBQUVELGFBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxDQUFTLEtBQVQsR0FBaUIsU0FBUyxnQkFBVCxDQUEwQixLQUFLLEdBQUwsQ0FBUyxFQUFuQyxDQUFqQixHQUEwRCxTQUFTLGFBQVQsQ0FBdUIsS0FBSyxHQUFMLENBQVMsRUFBaEMsQ0FBdkU7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsS0FBSyxHQUFMLENBQVMsUUFBekI7QUFDQSxhQUFLLEtBQUwsR0FBYSxLQUFLLEdBQUwsQ0FBUyxLQUF0Qjs7QUFFQTtBQUNBLGFBQUssTUFBTCxHQUFjO0FBQ1YsNkJBQWlCOztBQUdyQjtBQUpjLFNBQWQsQ0FLQSxLQUFLLFdBQUw7O0FBRUEsWUFBSyxLQUFLLFFBQVYsRUFBcUI7QUFDakIsaUJBQUssU0FBTDtBQUNIO0FBQ0o7O0FBRUQ7Ozs7O3NDQU1lO0FBQ1gsZ0JBQUssS0FBSyxHQUFMLENBQVMsS0FBZCxFQUFzQjtBQUNsQixxQkFBTSxJQUFJLElBQUksQ0FBZCxFQUFp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S0FBa0IsWUFBWSxDQUFaLE1BQW1CLGVBQTFDLEVBQTREO0FBQ3hELHlDQUFpQixTQUFqQixDQUEyQixHQUEzQixDQUErQixRQUEvQjtBQUNBLHlDQUFpQixTQUFqQixHQUE2QixZQUFZLENBQVosQ0FBN0I7QUFDSCxxQkFIRCxNQUdPO0FBQ0gseUNBQWlCLFNBQWpCLEdBQTZCLFdBQTdCO0FBQ0g7QUFDRCxxQ0FBaUIsTUFBakIsQ0FBd0IsZ0JBQXhCO0FBQ0g7QUFDSjtBQUNELGlCQUFLLFFBQUwsQ0FBYyxhQUFkO0FBQ0g7Ozs7OztrQkFsRWdCLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcclxuKiBAdHlwZSB7ZWw6IHN0cmluZ31cclxuKiBAdHlwZSB7bG9jYWw6IHN0cmluZ31cclxuKiBAdHlwZSB7bXVsdGk6IGJvb2xlYW59XHJcbiogQHR5cGUge2VkaXRhYmxlOiBib29sZWFufVxyXG4qIEB0eXBlIHtjb3VudEluZGV4OiBib29sZWFufVxyXG4qL1xyXG5cclxuLy8gTW9kdWxlc1xyXG5pbXBvcnQganNvblRvSFRNTCBmcm9tICcuL21vZHVsZXMvanNvblRvSFRNTCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRGF0YVRhYmxlIHtcclxuICAgIGNvbnN0cnVjdG9yICggb2JqICkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiBtdWx0aXBsZSA9IHF1ZXJ5U2VsZWN0b3JBbGxcclxuICAgICAgICAqIHNpbmdsZSA9IHF1ZXJ5U2VsZWN0b3JcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JqID0gb2JqO1xyXG4gICAgICAgIHRoaXMuSFRNTERhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmICggdGhpcy5vYmouanNvbkRhdGEgKSB7XHJcbiAgICAgICAgICAgIG5ldyBqc29uVG9IVE1MKHRoaXMub2JqLmpzb25EYXRhLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMub2JqLm11bHRpICkge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGFibGUgPSB0aGlzLm9iai5tdWx0aSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vYmouZWwpIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9iai5lbCk7XHJcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IHRoaXMub2JqLmVkaXRhYmxlO1xyXG4gICAgICAgIHRoaXMubG9jYWwgPSB0aGlzLm9iai5sb2NhbDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTdGF0ZXNcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHtcclxuICAgICAgICAgICAgbGFzdENvbHVtblZhbHVlOiBudWxsLFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBpbml0aWFsaXplIEV2ZW50IExpc3RlbmVyXHJcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICggdGhpcy5lZGl0YWJsZSApIHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0RXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIENyZWF0ZSBEZWxldGUgRXZlbnQgZm9yIER5bmFtaWMgZGF0YXMuXHJcbiAgICBzdGF0aWMgY3JlYXRlRGVsZXRlQ29sdW1uQXV0aCAoaW5uZXJFbCkge1xyXG4gICAgICAgIHRoaXMuaW5uZXJFbCA9IGlubmVyRWw7XHJcbiAgICAgICAgcmV0dXJuIFsnJEYzdi52NS1ybXYjIycsIHRoaXMuaW5uZXJFbF07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlbGV0ZUV2ZW50ICgpIHtcclxuICAgICAgICBpZiAoIHRoaXMub2JqLm11bHRpICkge1xyXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYmxlLmxlbmd0aDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVBY3QgPSB0aGlzLnRhYmxlW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyIHRkIC5kZWxldGUnKTtcclxuICAgICAgICAgICAgICAgIC8vIEFsbCByZW1vdmUgYnV0dG9ucyBsb29wXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZGVsZXRlQWN0Lmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRlbGV0ZUFjdFtqXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYnV0dG9uIGluaXQgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWxldGVFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGl0ZW0pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVBY3QgPSB0aGlzLnRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyIHRkIC5kZWxldGUnKTtcclxuICAgICAgICAgICAgLy8gQWxsIHJlbW92ZSBidXR0b25zIGxvb3BcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRlbGV0ZUFjdC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGVsZXRlQWN0W2ldO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvbiBpbml0IGV2ZW50XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWxldGVFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGl0ZW0pKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWxldGVFdmVudE1hbmlwdWxhdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5yb3cgPSB0aGlzLml0ZW0ucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgd2FybiBvcGVyYXRpb25zXHJcbiAgICAgICAgWyB0aGlzLmFwcHJvdmVCdG4sIHRoaXMuY2FuY2VsQnRuLCB0aGlzLndhcm5Eb20gXSA9IE1EYXRhVGFibGUuV2Fybk9wZXJhdGlvbih0aGlzLnJvdywgdGhpcy5sb2NhbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRGVsZXRlIG9wZXJhdGlvbiBidXR0b24gZXZlbnRzXHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICAqIEFwcHJvdmUgQnV0dG9uXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFwcHJvdmVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gRGVsZXRlIHdhcm4gZG9tXHJcbiAgICAgICAgICAgIHRoaXMud2FybkRvbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMud2FybkRvbSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBEZWxldGUgcm93XHJcbiAgICAgICAgICAgIHRoaXMucm93LmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1vcGVyYXRpb24tc3RhcnQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3cucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnJvdyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBjb3VudCBJbmRleFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjQ291bnRJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sIDUwMSk7IC8vIGFuaW1hdGlvbiBlbmRlZCBpcyByZW1vdmUgcm93XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiBDYW5jZWwgQnV0dG9uXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNhbmNlbEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5Eb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLndhcm5Eb20pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIFdhcm5PcGVyYXRpb24gKHJvdywgbG9jYWwpIHtcclxuICAgICAgICAvLyBUYWJsZSByb3dcclxuICAgICAgICB0aGlzLnJvdyA9IHJvdztcclxuICAgICAgICAvLyBUYWJsZSByb3cgY3JlYXRlIGJvdW5kaW5nIGNsaWVudCByZWN0YW5nbGVcclxuICAgICAgICB0aGlzLnJlY3QgPSB0aGlzLnJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAvLyBJbml0aWFsaXplIHdhcm4gZG9tXHJcbiAgICAgICAgcmV0dXJuIE1EYXRhVGFibGUuQ3JlYXRlV2FybkRvbSh0aGlzLnJlY3QudG9wLCB0aGlzLnJlY3QubGVmdCwgdGhpcy5yb3cuY2xpZW50V2lkdGgsIHRoaXMucm93LmNsaWVudEhlaWdodCwgbG9jYWwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgQ3JlYXRlV2FybkRvbSAodG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0LCBsb2NhbCkge1xyXG4gICAgICAgIC8vIERpc3RhbmNlcyAmIEhlaWdodFxyXG4gICAgICAgIHRoaXMudG9wRGlzdGFuY2UgPSB0b3A7XHJcbiAgICAgICAgdGhpcy5sZWZ0RGlzdGFuY2UgPSBsZWZ0O1xyXG4gICAgICAgIHRoaXMucm93V2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ20tdGFibGUtd2FybicpLmxlbmd0aCAhPT0gMCApIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDcmVhdGluZyB3YXJuIGRvbVxyXG4gICAgICAgIGNvbnN0IHdhcm5Eb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB3YXJuRG9tLmNsYXNzTGlzdC5hZGQoJ20tdGFibGUtd2FybicsICdkZWxldGUtb3BlcmF0aW9uJyk7XHJcbiAgICAgICAgd2FybkRvbS5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5sZWZ0RGlzdGFuY2UgKyAodGhpcy5yb3dXaWR0aCAvIDMuNSl9cHhgO1xyXG4gICAgICAgIHdhcm5Eb20uc3R5bGUudG9wID0gYCR7dGhpcy50b3BEaXN0YW5jZSArIHRoaXMucm93SGVpZ2h0fXB4YDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDcmVhdGluZyB3YXJuIGRvbSBoZWFkZXJcclxuICAgICAgICBjb25zdCB3YXJuRG9tSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgd2FybkRvbUhlYWRlci5jbGFzc0xpc3QuYWRkKCdtLXRhYmxlLXdhcm4taGVhZGVyJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRpbmcgaGVhZGVyIGNvbnRlbnRcclxuICAgICAgICBjb25zdCB3YXJuRG9tSGVhZGVyQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g1Jyk7XHJcbiAgICAgICAgd2FybkRvbUhlYWRlckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbS10YWJsZS13YXJuLWhlYWRlci1jb250ZW50Jyk7XHJcbiAgICAgICAgd2FybkRvbUhlYWRlckNvbnRlbnQuaW5uZXJUZXh0ID0gdGhpcy5sb2NhbC5kZWxldGVXYXJuLnRpdGxlID8gdGhpcy5sb2NhbC5kZWxldGVXYXJuLnRpdGxlIDogJ1NpbG1layBpc3RlZGnEn2luZSBlbWluIG1pc2luID8nO1xyXG4gICAgICAgIHdhcm5Eb21IZWFkZXIuYXBwZW5kQ2hpbGQod2FybkRvbUhlYWRlckNvbnRlbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdhcm5Eb20uYXBwZW5kQ2hpbGQod2FybkRvbUhlYWRlcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRpbmcgQWN0aW9uIEJ1dHRvbnNcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBidXR0b25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnbS10YWJsZS1idXR0b24tY29udGFpbmVyJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgYXBwcm92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFwcHJvdmVCdXR0b24uaW5uZXJUZXh0ID0gdGhpcy5sb2NhbC5kZWxldGVXYXJuLmFwcHJvdmVCdG4gPyB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uYXBwcm92ZUJ0biA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/Jzs7XHJcbiAgICAgICAgY2FuY2VsQnV0dG9uLmlubmVyVGV4dCA9IHRoaXMubG9jYWwuZGVsZXRlV2Fybi5jYW5jZWxCdG4gPyB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uY2FuY2VsQnRuIDogJ1NpbG1layBpc3RlZGnEn2luZSBlbWluIG1pc2luID8nOztcclxuICAgICAgICBcclxuICAgICAgICBhcHByb3ZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FwcHJvdmUtYnV0dG9uJyk7XHJcbiAgICAgICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1jYW5jZWwnKTtcclxuICAgICAgICBcclxuICAgICAgICB3YXJuRG9tLmFwcGVuZENoaWxkKGJ1dHRvbkNvbnRhaW5lcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFwcHJvdmVCdXR0b24pO1xyXG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdXR0b24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFwcGVuZCBEb21cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh3YXJuRG9tKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gW2FwcHJvdmVCdXR0b24sIGNhbmNlbEJ1dHRvbiwgd2FybkRvbV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGVkaXRFdmVudCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMub2JqLm11bHRpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJsZS5sZW5ndGg7IGkgKz0gMSApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnRhYmxlW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyIHRkJykubGVuZ3RoOyBqICs9IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0ciB0ZCcpW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4uZ2V0QXR0cmlidXRlKCdkYXRhLXRhYmxlLWVkaXRhYmxlJykgIT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4uYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmRiQ2xpY2tFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGNvbHVtbiwgZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub2JqLmVsKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGQnKTtcclxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY29sdW1uc1tpXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJsZS1lZGl0YWJsZScpICE9PSBcImZhbHNlXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuZGJDbGlja0V2ZW50TWFuaXB1bGF0aW9uLmJpbmQodGhpcywgaXRlbSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZGJDbGlja0V2ZW50TWFuaXB1bGF0aW9uIChjb2x1bW4sIHR5cGUpIHtcclxuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIC8vIFNhdmUgbGFzdCBjb2x1bW5cclxuICAgICAgICB0aGlzLnN0YXRlcy5sYXN0Q29sdW1uVmFsdWUgPSB0aGlzLmNvbHVtbi5pbm5lclRleHQ7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgaW5wdXQgYXJlYVxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBjcmVhdGVJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIGNyZWF0ZUlucHV0LmNsYXNzTGlzdC5hZGQoJ2VkaXQtY29sdW1uJyk7XHJcbiAgICAgICAgY3JlYXRlSW5wdXQudmFsdWUgPSB0aGlzLmNvbHVtbi5pbm5lclRleHQ7XHJcbiAgICAgICAgdGhpcy5jb2x1bW4uaW5uZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5jb2x1bW4uYXBwZW5kKGNyZWF0ZUlucHV0KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCBjaGFuZ2UgYnV0dG9uXHJcbiAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY3JlYXRlQnV0dG9uLmlubmVyVGV4dCA9IHRoaXMubG9jYWwuY2hhbmdlQnV0dG9uVmFsdWUgPyB0aGlzLmxvY2FsLmNoYW5nZUJ1dHRvblZhbHVlIDogJ0NoYW5nZSc7XHJcbiAgICAgICAgdGhpcy5jb2x1bW4uYXBwZW5kKGNyZWF0ZUJ1dHRvbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgY2FuY2VsIGJ1dHRvblxyXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5pbm5lclRleHQgPSB0aGlzLmxvY2FsLmNhbmNlbEJ1dHRvblZhbHVlID8gdGhpcy5sb2NhbC5jYW5jZWxCdXR0b25WYWx1ZSA6ICdDYW5jZWwnO1xyXG4gICAgICAgIHRoaXMuY29sdW1uLmFwcGVuZChjYW5jZWxCdXR0b24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENsaWNrIEV2ZW50c1xyXG4gICAgICAgIGNyZWF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY3JlYXRlQnV0dG9uQ2xpY2tFdmVudEhhbmRsZXIuYmluZCh0aGlzLCB0aGlzLmNvbHVtbiwgY3JlYXRlSW5wdXQpKVxyXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2hhbmdlSW5wdXRDYW5jZWxFdmVudEhhbmRsZXIuYmluZCh0aGlzLCB0aGlzLmNvbHVtbikpO1xyXG4gICAgICAgIC8vIEtleWJvYXJkIEV2ZW50c1xyXG4gICAgICAgIGNyZWF0ZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHsgdGhpcy5jaGFuZ2VJbnB1dEtleUV2ZW50SGFuZGxlcihlLCB0aGlzLmNvbHVtbiwgY3JlYXRlSW5wdXQpIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVCdXR0b25DbGlja0V2ZW50SGFuZGxlciAoY29sdW1uLCBpbnB1dCkge1xyXG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmNvbHVtbi5pbm5lckhUTUwgPSB0aGlzLmlucHV0LnZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjaGFuZ2VJbnB1dENhbmNlbEV2ZW50SGFuZGxlciAoY29sdW1uKSB7XHJcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XHJcbiAgICAgICAgdGhpcy5jb2x1bW4uaW5uZXJIVE1MID0gdGhpcy5zdGF0ZXMubGFzdENvbHVtblZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjaGFuZ2VJbnB1dEtleUV2ZW50SGFuZGxlciAoZXZlbnQsIGNvbHVtbiwgaW5wdXQpIHtcclxuICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEVudGVyIEtleWNvZGVcclxuICAgICAgICBpZiAoIHRoaXMuZXZlbnQua2V5Q29kZSA9PT0gMTMgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uQ2xpY2tFdmVudEhhbmRsZXIodGhpcy5jb2x1bW4sIHRoaXMuaW5wdXQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHRoaXMuZXZlbnQua2V5Q29kZSA9PT0gMjcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW5wdXRDYW5jZWxFdmVudEhhbmRsZXIodGhpcy5jb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2FsY0NvdW50SW5kZXggKCkgeyAvLyBDYWxjIEluZGV4XHJcbiAgICAgICAgaWYgKCB0aGlzLm9iai5tdWx0aSApIHtcclxuICAgICAgICAgICAgLy8gTXVsdGlwbGUgVGFibGVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYmxlLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy50YWJsZVtpXS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0aCcpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaW5kZXgubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5pbmRleFtqXTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLmlubmVyVGV4dCA9IGogKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2luZ2xlIHRhYmxlXHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLnRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRoJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmluZGV4Lmxlbmd0aDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuaW5kZXhbaV07XHJcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVyVGV4dCA9IGkgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnRzLm1vZHVsZSA9IE1EYXRhVGFibGU7XHJcbndpbmRvdy5NRGF0YVRhYmxlID0gTURhdGFUYWJsZTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MganNvblRvSFRNTCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoanNvbiwgY2FsbGJhY2spIHtcclxuICAgICAgICAvLyBKc29uIE9iamVjdFxyXG4gICAgICAgIHRoaXMuanNvbiA9IGpzb247XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENvbnZlcnRcclxuICAgICAgICB0aGlzLmNvbnZlcnRKc29uVG9IVE1MKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnZlcnRKc29uVG9IVE1MICgpIHtcclxuICAgICAgICAvLyBDcmVhdGUgVGFibGUgRWxlbWVudFxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZVRhYmxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG4gICAgICAgIC8vIFRhYmxlIENsYXNzTGlzdChzKSBBZGRcclxuICAgICAgICBpZiAoIHRoaXMuanNvbi5kYXRhVGFibGVQYXJlbnRDbGFzcyApIHtcclxuICAgICAgICAgICAgY29uc3QgYWxsQ2xhc3NMaXN0cyA9IHRoaXMuanNvbi5kYXRhVGFibGVQYXJlbnRDbGFzcztcclxuICAgICAgICAgICAgY29uc3QgY2xhc3NMaXN0c0xlbmd0aCA9IGFsbENsYXNzTGlzdHMuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgY2xhc3NMaXN0c0xlbmd0aC5sZW5ndGg7IGkgKz0gMSApIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRhYmxlRWwuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3RzTGVuZ3RoW2ldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcy5qc29uLnRoZWFkICkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgVGhlYWQgRWxlbWVudFxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVUaGVhZEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcclxuICAgICAgICAgICAgY3JlYXRlVGFibGVFbC5hcHBlbmQoY3JlYXRlVGhlYWRFbCk7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBUaGVhZCAtPiBUciBFbGVtZW50XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVRoZWFkUm93RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG4gICAgICAgICAgICBjcmVhdGVUaGVhZEVsLmFwcGVuZChjcmVhdGVUaGVhZFJvd0VsKTtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIFRoZWFkIC0+IFRyIC0+IFRkIEVsZW1lbnQocylcclxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5qc29uLnRoZWFkLmxlbmd0aDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuanNvbi50aGVhZFtpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVRoZWFkQ29sRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlVGhlYWRDb2xFbC5pbm5lckhUTUwgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlVGhlYWRSb3dFbC5hcHBlbmQoY3JlYXRlVGhlYWRDb2xFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCB0aGlzLmpzb24udGFibGVFdmVudHNEZWxldGUgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgRWRpdCBUaGVhZCBSb3dcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVRoZWFkRWRpdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUaGVhZEVkaXRSb3cuaW5uZXJUZXh0ID0gdGhpcy5qc29uLnRhYmxlRXZlbnRzSGVhZGVyVGV4dCA/IHRoaXMuanNvbi50YWJsZUV2ZW50c0hlYWRlclRleHQgOiAnSGFuZGxlJztcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRoZWFkUm93RWwuYXBwZW5kKGNyZWF0ZVRoZWFkRWRpdFJvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ3JlYXRlIFRib2R5IEVsZW1lbnRcclxuICAgICAgICBjb25zdCBjcmVhdGVUYm9keUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcclxuICAgICAgICBjcmVhdGVUYWJsZUVsLmFwcGVuZChjcmVhdGVUYm9keUVsKTtcclxuICAgICAgICAvLyBDcmVhdGUgVGJvZHkgLT4gVHIgRWxlbWVudChzKVxyXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuanNvbi5jb2x1bW5zLmxlbmd0aDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5qc29uLmNvbHVtbnNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVRib2R5Um93RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG4gICAgICAgICAgICBjcmVhdGVUYm9keUVsLmFwcGVuZChjcmVhdGVUYm9keVJvd0VsKTtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIFRib2R5IC0+IFRyIC0+IFRkIEVsZW1lbnQocylcclxuICAgICAgICAgICAgY29uc3QgaXRlbU9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcclxuICAgICAgICAgICAgZm9yICggbGV0IGogPSAwOyBqIDwgaXRlbU9iamVjdEtleXMubGVuZ3RoOyBqICs9IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5zSXRlbSA9IGl0ZW1bal07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjcmVhdGVUYm9keUNvbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBEZWxldGUgQ29sdW1uIGFuZCBJbm5lciBFbGVtZW50KHMpXHJcbiAgICAgICAgICAgICAgICBpZiAoIGNvbHVtbnNJdGVtWzBdICYmIGNvbHVtbnNJdGVtWzBdID09PSAnJEYzdi52NS1ybXYjIycgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGJvZHlDb2xFbC5jbGFzc0xpc3QuYWRkKCdkZWxldGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUYm9keUNvbEVsLmlubmVySFRNTCA9IGNvbHVtbnNJdGVtWzFdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUYm9keUNvbEVsLmlubmVySFRNTCA9IGNvbHVtbnNJdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3JlYXRlVGJvZHlSb3dFbC5hcHBlbmQoY3JlYXRlVGJvZHlDb2xFbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhjcmVhdGVUYWJsZUVsKTtcclxuICAgIH1cclxufSJdfQ==
