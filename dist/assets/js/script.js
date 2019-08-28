(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @type {el: string}
* @type {local: string}
* @type {multi: boolean}
* @type {editable: boolean}
* @type {countIndex: boolean}
*/

var MDataTable = function () {
    function MDataTable(obj) {
        _classCallCheck(this, MDataTable);

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
            lastColumnValue: null

            // initialize Event Listener
        };this.deleteEvent();

        if (this.editable) {
            this.editEvent();
        }
    }

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
            var _this = this;

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
                _this.warnDom.parentNode.removeChild(_this.warnDom);

                // Delete row
                _this.row.classList.add('delete-operation-start');

                setTimeout(function () {
                    _this.row.parentNode.removeChild(_this.row);

                    // Change count Index
                    _this.calcCountIndex();
                }, 501); // animation ended is remove row
            };

            /*
            * Cancel Button
            */
            this.cancelBtn.onclick = function () {
                _this.warnDom.parentNode.removeChild(_this.warnDom);
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
            var _this2 = this;

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
                _this2.changeInputKeyEventHandler(e, _this2.column, createInput);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvTURhdGFUYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7OztJQVFxQixVO0FBQ2pCLHdCQUFjLEdBQWQsRUFBb0I7QUFBQTs7QUFDaEI7Ozs7QUFJQSxhQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxHQUFMLENBQVMsS0FBVCxHQUFpQixTQUFTLGdCQUFULENBQTBCLEtBQUssR0FBTCxDQUFTLEVBQW5DLENBQWpCLEdBQTBELFNBQVMsYUFBVCxDQUF1QixLQUFLLEdBQUwsQ0FBUyxFQUFoQyxDQUF2RTtBQUNBLGFBQUssUUFBTCxHQUFnQixLQUFLLEdBQUwsQ0FBUyxRQUF6QjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxDQUFTLEtBQXRCOztBQUVBO0FBQ0EsYUFBSyxNQUFMLEdBQWM7QUFDViw2QkFBaUI7O0FBR3JCO0FBSmMsU0FBZCxDQUtBLEtBQUssV0FBTDs7QUFFQSxZQUFLLEtBQUssUUFBVixFQUFxQjtBQUNqQixpQkFBSyxTQUFMO0FBQ0g7QUFDSjs7OztzQ0FFYztBQUNYLGdCQUFLLEtBQUssR0FBTCxDQUFTLEtBQWQsRUFBc0I7QUFDbEIscUJBQU0sSUFBSSxJQUFJLENBQWQsRUFBaUIsSUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFoQyxFQUF3QyxLQUFLLENBQTdDLEVBQWlEO0FBQzdDLHlCQUFLLFNBQUwsR0FBaUIsS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLGdCQUFkLENBQStCLHFCQUEvQixDQUFqQjtBQUNBO0FBQ0EseUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFNBQUwsQ0FBZSxNQUFuQyxFQUEyQyxLQUFLLENBQWhELEVBQW1EO0FBQy9DO0FBQ0EsNEJBQU0sT0FBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQWI7QUFDQTtBQUNB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O0FBRUEsZ0JBQU0sZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUF0QjtBQUNBLGdCQUFNLGVBQWUsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQXJCOztBQUVBLDBCQUFjLFNBQWQsR0FBMEIsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixVQUF0QixHQUFtQyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFVBQXpELEdBQXNFLGdDQUFoRyxDQUFpSTtBQUNqSSx5QkFBYSxTQUFiLEdBQXlCLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsU0FBdEIsR0FBa0MsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixTQUF4RCxHQUFvRSxnQ0FBN0YsQ0FBOEg7O0FBRTlILDBCQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsZ0JBQTVCO0FBQ0EseUJBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixZQUEzQjs7QUFFQSxvQkFBUSxXQUFSLENBQW9CLGVBQXBCOztBQUVBLDRCQUFnQixXQUFoQixDQUE0QixhQUE1QjtBQUNBLDRCQUFnQixXQUFoQixDQUE0QixZQUE1Qjs7QUFFQTtBQUNBLHFCQUFTLElBQVQsQ0FBYyxNQUFkLENBQXFCLE9BQXJCOztBQUVBLG1CQUFPLENBQUMsYUFBRCxFQUFnQixZQUFoQixFQUE4QixPQUE5QixDQUFQO0FBQ0g7Ozs7OztrQkFqSmdCLFU7OztBQTBQckIsUUFBUSxNQUFSLEdBQWlCLFVBQWpCO0FBQ0EsT0FBTyxVQUFQLEdBQW9CLFVBQXBCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4qIEB0eXBlIHtlbDogc3RyaW5nfVxuKiBAdHlwZSB7bG9jYWw6IHN0cmluZ31cbiogQHR5cGUge211bHRpOiBib29sZWFufVxuKiBAdHlwZSB7ZWRpdGFibGU6IGJvb2xlYW59XG4qIEB0eXBlIHtjb3VudEluZGV4OiBib29sZWFufVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURhdGFUYWJsZSB7XG4gICAgY29uc3RydWN0b3IgKCBvYmogKSB7XG4gICAgICAgIC8qXG4gICAgICAgICogbXVsdGlwbGUgPSBxdWVyeVNlbGVjdG9yQWxsXG4gICAgICAgICogc2luZ2xlID0gcXVlcnlTZWxlY3RvclxuICAgICAgICAqL1xuICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRoaXMub2JqLm11bHRpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9iai5lbCkgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub2JqLmVsKTtcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IHRoaXMub2JqLmVkaXRhYmxlO1xuICAgICAgICB0aGlzLmxvY2FsID0gdGhpcy5vYmoubG9jYWw7XG4gICAgICAgIFxuICAgICAgICAvLyBTdGF0ZXNcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB7XG4gICAgICAgICAgICBsYXN0Q29sdW1uVmFsdWU6IG51bGwsXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGluaXRpYWxpemUgRXZlbnQgTGlzdGVuZXJcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCB0aGlzLmVkaXRhYmxlICkge1xuICAgICAgICAgICAgdGhpcy5lZGl0RXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBkZWxldGVFdmVudCAoKSB7XG4gICAgICAgIGlmICggdGhpcy5vYmoubXVsdGkgKSB7XG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYmxlLmxlbmd0aDsgaSArPSAxICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlQWN0ID0gdGhpcy50YWJsZVtpXS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0ciB0ZCAuZGVsZXRlJyk7XG4gICAgICAgICAgICAgICAgLy8gQWxsIHJlbW92ZSBidXR0b25zIGxvb3BcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZGVsZXRlQWN0Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGVsZXRlQWN0W2pdO1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYnV0dG9uIGluaXQgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGVsZXRlRXZlbnRNYW5pcHVsYXRpb24uYmluZCh0aGlzLCBpdGVtKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUFjdCA9IHRoaXMudGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHIgdGQgLmRlbGV0ZScpO1xuICAgICAgICAgICAgLy8gQWxsIHJlbW92ZSBidXR0b25zIGxvb3BcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kZWxldGVBY3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYnV0dG9uXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGVsZXRlQWN0W2ldO1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBidXR0b24gaW5pdCBldmVudFxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRlbGV0ZUV2ZW50TWFuaXB1bGF0aW9uLmJpbmQodGhpcywgaXRlbSkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUV2ZW50TWFuaXB1bGF0aW9uIChpdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XG4gICAgICAgIHRoaXMucm93ID0gdGhpcy5pdGVtLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgXG4gICAgICAgIC8vIEluaXRpYWxpemUgd2FybiBvcGVyYXRpb25zXG4gICAgICAgIFsgdGhpcy5hcHByb3ZlQnRuLCB0aGlzLmNhbmNlbEJ0biwgdGhpcy53YXJuRG9tIF0gPSBNRGF0YVRhYmxlLldhcm5PcGVyYXRpb24odGhpcy5yb3csIHRoaXMubG9jYWwpO1xuICAgICAgICBcbiAgICAgICAgLy8gRGVsZXRlIG9wZXJhdGlvbiBidXR0b24gZXZlbnRzXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAqIEFwcHJvdmUgQnV0dG9uXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuYXBwcm92ZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gRGVsZXRlIHdhcm4gZG9tXG4gICAgICAgICAgICB0aGlzLndhcm5Eb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLndhcm5Eb20pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBEZWxldGUgcm93XG4gICAgICAgICAgICB0aGlzLnJvdy5jbGFzc0xpc3QuYWRkKCdkZWxldGUtb3BlcmF0aW9uLXN0YXJ0Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5yb3cpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSBjb3VudCBJbmRleFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsY0NvdW50SW5kZXgoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIDUwMSk7IC8vIGFuaW1hdGlvbiBlbmRlZCBpcyByZW1vdmUgcm93XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICogQ2FuY2VsIEJ1dHRvblxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhbmNlbEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53YXJuRG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy53YXJuRG9tKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgV2Fybk9wZXJhdGlvbiAocm93LCBsb2NhbCkge1xuICAgICAgICAvLyBUYWJsZSByb3dcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIC8vIFRhYmxlIHJvdyBjcmVhdGUgYm91bmRpbmcgY2xpZW50IHJlY3RhbmdsZVxuICAgICAgICB0aGlzLnJlY3QgPSB0aGlzLnJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB3YXJuIGRvbVxuICAgICAgICByZXR1cm4gTURhdGFUYWJsZS5DcmVhdGVXYXJuRG9tKHRoaXMucmVjdC50b3AsIHRoaXMucmVjdC5sZWZ0LCB0aGlzLnJvdy5jbGllbnRXaWR0aCwgdGhpcy5yb3cuY2xpZW50SGVpZ2h0LCBsb2NhbCk7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBDcmVhdGVXYXJuRG9tICh0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQsIGxvY2FsKSB7XG4gICAgICAgIC8vIERpc3RhbmNlcyAmIEhlaWdodFxuICAgICAgICB0aGlzLnRvcERpc3RhbmNlID0gdG9wO1xuICAgICAgICB0aGlzLmxlZnREaXN0YW5jZSA9IGxlZnQ7XG4gICAgICAgIHRoaXMucm93V2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMubG9jYWwgPSBsb2NhbDtcbiAgICAgICAgXG4gICAgICAgIGlmICggZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtLXRhYmxlLXdhcm4nKS5sZW5ndGggIT09IDAgKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGluZyB3YXJuIGRvbVxuICAgICAgICBjb25zdCB3YXJuRG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHdhcm5Eb20uY2xhc3NMaXN0LmFkZCgnbS10YWJsZS13YXJuJywgJ2RlbGV0ZS1vcGVyYXRpb24nKTtcbiAgICAgICAgd2FybkRvbS5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5sZWZ0RGlzdGFuY2UgKyAodGhpcy5yb3dXaWR0aCAvIDMuNSl9cHhgO1xuICAgICAgICB3YXJuRG9tLnN0eWxlLnRvcCA9IGAke3RoaXMudG9wRGlzdGFuY2UgKyB0aGlzLnJvd0hlaWdodH1weGA7XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGluZyB3YXJuIGRvbSBoZWFkZXJcbiAgICAgICAgY29uc3Qgd2FybkRvbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB3YXJuRG9tSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ20tdGFibGUtd2Fybi1oZWFkZXInKTtcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0aW5nIGhlYWRlciBjb250ZW50XG4gICAgICAgIGNvbnN0IHdhcm5Eb21IZWFkZXJDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgd2FybkRvbUhlYWRlckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbS10YWJsZS13YXJuLWhlYWRlci1jb250ZW50Jyk7XG4gICAgICAgIHdhcm5Eb21IZWFkZXJDb250ZW50LmlubmVyVGV4dCA9IHRoaXMubG9jYWwuZGVsZXRlV2Fybi50aXRsZSA/IHRoaXMubG9jYWwuZGVsZXRlV2Fybi50aXRsZSA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/JztcbiAgICAgICAgd2FybkRvbUhlYWRlci5hcHBlbmRDaGlsZCh3YXJuRG9tSGVhZGVyQ29udGVudCk7XG4gICAgICAgIFxuICAgICAgICB3YXJuRG9tLmFwcGVuZENoaWxkKHdhcm5Eb21IZWFkZXIpO1xuICAgICAgICBcbiAgICAgICAgLy8gQ3JlYXRpbmcgQWN0aW9uIEJ1dHRvbnNcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBidXR0b25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnbS10YWJsZS1idXR0b24tY29udGFpbmVyJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBhcHByb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBcbiAgICAgICAgYXBwcm92ZUJ1dHRvbi5pbm5lclRleHQgPSB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uYXBwcm92ZUJ0biA/IHRoaXMubG9jYWwuZGVsZXRlV2Fybi5hcHByb3ZlQnRuIDogJ1NpbG1layBpc3RlZGnEn2luZSBlbWluIG1pc2luID8nOztcbiAgICAgICAgY2FuY2VsQnV0dG9uLmlubmVyVGV4dCA9IHRoaXMubG9jYWwuZGVsZXRlV2Fybi5jYW5jZWxCdG4gPyB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uY2FuY2VsQnRuIDogJ1NpbG1layBpc3RlZGnEn2luZSBlbWluIG1pc2luID8nOztcbiAgICAgICAgXG4gICAgICAgIGFwcHJvdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnYXBwcm92ZS1idXR0b24nKTtcbiAgICAgICAgY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1jYW5jZWwnKTtcbiAgICAgICAgXG4gICAgICAgIHdhcm5Eb20uYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHByb3ZlQnV0dG9uKTtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG4gICAgICAgIFxuICAgICAgICAvLyBBcHBlbmQgRG9tXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHdhcm5Eb20pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFthcHByb3ZlQnV0dG9uLCBjYW5jZWxCdXR0b24sIHdhcm5Eb21dO1xuICAgIH1cbiAgICBcbiAgICBlZGl0RXZlbnQgKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMub2JqLm11bHRpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFibGUubGVuZ3RoOyBpICs9IDEgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMudGFibGVbaV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyIHRkJykubGVuZ3RoOyBqICs9IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHIgdGQnKVtqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFibGUtZWRpdGFibGUnKSAhPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4uYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmRiQ2xpY2tFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGNvbHVtbiwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vYmouZWwpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZCcpO1xuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSArPSAxICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNvbHVtbnNbaV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJsZS1lZGl0YWJsZScpICE9PSBcImZhbHNlXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmRiQ2xpY2tFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGl0ZW0sIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBkYkNsaWNrRXZlbnRNYW5pcHVsYXRpb24gKGNvbHVtbiwgdHlwZSkge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgLy8gU2F2ZSBsYXN0IGNvbHVtblxuICAgICAgICB0aGlzLnN0YXRlcy5sYXN0Q29sdW1uVmFsdWUgPSB0aGlzLmNvbHVtbi5pbm5lclRleHQ7XG4gICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIGlucHV0IGFyZWFcbiAgICAgICAgY29uc3QgY3JlYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjcmVhdGVJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICBjcmVhdGVJbnB1dC5jbGFzc0xpc3QuYWRkKCdlZGl0LWNvbHVtbicpO1xuICAgICAgICBjcmVhdGVJbnB1dC52YWx1ZSA9IHRoaXMuY29sdW1uLmlubmVyVGV4dDtcbiAgICAgICAgdGhpcy5jb2x1bW4uaW5uZXJUZXh0ID0gJyc7XG4gICAgICAgIHRoaXMuY29sdW1uLmFwcGVuZChjcmVhdGVJbnB1dCk7XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCBjaGFuZ2UgYnV0dG9uXG4gICAgICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjcmVhdGVCdXR0b24uaW5uZXJUZXh0ID0gdGhpcy5sb2NhbC5jaGFuZ2VCdXR0b25WYWx1ZSA/IHRoaXMubG9jYWwuY2hhbmdlQnV0dG9uVmFsdWUgOiAnQ2hhbmdlJztcbiAgICAgICAgdGhpcy5jb2x1bW4uYXBwZW5kKGNyZWF0ZUJ1dHRvbik7XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCBjYW5jZWwgYnV0dG9uXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdXR0b24uaW5uZXJUZXh0ID0gdGhpcy5sb2NhbC5jYW5jZWxCdXR0b25WYWx1ZSA/IHRoaXMubG9jYWwuY2FuY2VsQnV0dG9uVmFsdWUgOiAnQ2FuY2VsJztcbiAgICAgICAgdGhpcy5jb2x1bW4uYXBwZW5kKGNhbmNlbEJ1dHRvbik7XG4gICAgICAgIFxuICAgICAgICAvLyBDbGljayBFdmVudHNcbiAgICAgICAgY3JlYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jcmVhdGVCdXR0b25DbGlja0V2ZW50SGFuZGxlci5iaW5kKHRoaXMsIHRoaXMuY29sdW1uLCBjcmVhdGVJbnB1dCkpXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2hhbmdlSW5wdXRDYW5jZWxFdmVudEhhbmRsZXIuYmluZCh0aGlzLCB0aGlzLmNvbHVtbikpO1xuICAgICAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAgICAgY3JlYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4geyB0aGlzLmNoYW5nZUlucHV0S2V5RXZlbnRIYW5kbGVyKGUsIHRoaXMuY29sdW1uLCBjcmVhdGVJbnB1dCkgfSk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUJ1dHRvbkNsaWNrRXZlbnRIYW5kbGVyIChjb2x1bW4sIGlucHV0KSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuY29sdW1uLmlubmVySFRNTCA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgfVxuICAgIFxuICAgIGNoYW5nZUlucHV0Q2FuY2VsRXZlbnRIYW5kbGVyIChjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbHVtbi5pbm5lckhUTUwgPSB0aGlzLnN0YXRlcy5sYXN0Q29sdW1uVmFsdWU7XG4gICAgfVxuICAgIFxuICAgIGNoYW5nZUlucHV0S2V5RXZlbnRIYW5kbGVyIChldmVudCwgY29sdW1uLCBpbnB1dCkge1xuICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgIFxuICAgICAgICAvLyBFbnRlciBLZXljb2RlXG4gICAgICAgIGlmICggdGhpcy5ldmVudC5rZXlDb2RlID09PSAxMyApIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQnV0dG9uQ2xpY2tFdmVudEhhbmRsZXIodGhpcy5jb2x1bW4sIHRoaXMuaW5wdXQpO1xuICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLmV2ZW50LmtleUNvZGUgPT09IDI3ICkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dENhbmNlbEV2ZW50SGFuZGxlcih0aGlzLmNvbHVtbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY2FsY0NvdW50SW5kZXggKCkgeyAvLyBDYWxjIEluZGV4XG4gICAgICAgIGlmICggdGhpcy5vYmoubXVsdGkgKSB7XG4gICAgICAgICAgICAvLyBNdWx0aXBsZSBUYWJsZVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYmxlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMudGFibGVbaV0ucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdGgnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaW5kZXgubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuaW5kZXhbal07XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJUZXh0ID0gaiArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU2luZ2xlIHRhYmxlXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0aCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmluZGV4Lmxlbmd0aDsgaSArPSAxICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmluZGV4W2ldO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJUZXh0ID0gaSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydHMubW9kdWxlID0gTURhdGFUYWJsZTtcbndpbmRvdy5NRGF0YVRhYmxlID0gTURhdGFUYWJsZTtcbiJdfQ==
