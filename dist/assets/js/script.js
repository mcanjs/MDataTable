(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvTURhdGFUYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztJQ0FxQixVO0FBQ2pCLHdCQUFjLEdBQWQsRUFBb0I7QUFBQTs7QUFDaEI7Ozs7QUFJQSxhQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxHQUFMLENBQVMsS0FBVCxHQUFpQixTQUFTLGdCQUFULENBQTBCLEtBQUssR0FBTCxDQUFTLEVBQW5DLENBQWpCLEdBQTBELFNBQVMsYUFBVCxDQUF1QixLQUFLLEdBQUwsQ0FBUyxFQUFoQyxDQUF2RTtBQUNBLGFBQUssUUFBTCxHQUFnQixLQUFLLEdBQUwsQ0FBUyxRQUF6QjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxDQUFTLEtBQXRCOztBQUVBO0FBQ0EsYUFBSyxNQUFMLEdBQWM7QUFDViw2QkFBaUI7O0FBR3JCO0FBSmMsU0FBZCxDQUtBLEtBQUssV0FBTDs7QUFFQSxZQUFLLEtBQUssUUFBVixFQUFxQjtBQUNqQixpQkFBSyxTQUFMO0FBQ0g7QUFDSjs7OztzQ0FFYztBQUNYLGdCQUFLLEtBQUssR0FBTCxDQUFTLEtBQWQsRUFBc0I7QUFDbEIscUJBQU0sSUFBSSxJQUFJLENBQWQsRUFBaUIsSUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFoQyxFQUF3QyxLQUFLLENBQTdDLEVBQWlEO0FBQzdDLHlCQUFLLFNBQUwsR0FBaUIsS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLGdCQUFkLENBQStCLHFCQUEvQixDQUFqQjtBQUNBO0FBQ0EseUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFNBQUwsQ0FBZSxNQUFuQyxFQUEyQyxLQUFLLENBQWhELEVBQW1EO0FBQy9DO0FBQ0EsNEJBQU0sT0FBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQWI7QUFDQTtBQUNBLDZCQUFLLGdCQUFM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ImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EYXRhVGFibGUge1xuICAgIGNvbnN0cnVjdG9yICggb2JqICkge1xuICAgICAgICAvKlxuICAgICAgICAqIG11bHRpcGxlID0gcXVlcnlTZWxlY3RvckFsbFxuICAgICAgICAqIHNpbmdsZSA9IHF1ZXJ5U2VsZWN0b3JcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgICAgIHRoaXMudGFibGUgPSB0aGlzLm9iai5tdWx0aSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vYmouZWwpIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9iai5lbCk7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSB0aGlzLm9iai5lZGl0YWJsZTtcbiAgICAgICAgdGhpcy5sb2NhbCA9IHRoaXMub2JqLmxvY2FsO1xuICAgICAgICBcbiAgICAgICAgLy8gU3RhdGVzXG4gICAgICAgIHRoaXMuc3RhdGVzID0ge1xuICAgICAgICAgICAgbGFzdENvbHVtblZhbHVlOiBudWxsLFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBpbml0aWFsaXplIEV2ZW50IExpc3RlbmVyXG4gICAgICAgIHRoaXMuZGVsZXRlRXZlbnQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICggdGhpcy5lZGl0YWJsZSApIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdEV2ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRXZlbnQgKCkge1xuICAgICAgICBpZiAoIHRoaXMub2JqLm11bHRpICkge1xuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy50YWJsZS5sZW5ndGg7IGkgKz0gMSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUFjdCA9IHRoaXMudGFibGVbaV0ucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHIgdGQgLmRlbGV0ZScpO1xuICAgICAgICAgICAgICAgIC8vIEFsbCByZW1vdmUgYnV0dG9ucyBsb29wXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRlbGV0ZUFjdC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRlbGV0ZUFjdFtqXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvbiBpbml0IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRlbGV0ZUV2ZW50TWFuaXB1bGF0aW9uLmJpbmQodGhpcywgaXRlbSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVBY3QgPSB0aGlzLnRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyIHRkIC5kZWxldGUnKTtcbiAgICAgICAgICAgIC8vIEFsbCByZW1vdmUgYnV0dG9ucyBsb29wXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGVsZXRlQWN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvblxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRlbGV0ZUFjdFtpXTtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYnV0dG9uIGluaXQgZXZlbnRcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWxldGVFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGl0ZW0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBkZWxldGVFdmVudE1hbmlwdWxhdGlvbiAoaXRlbSkge1xuICAgICAgICB0aGlzLml0ZW0gPSBpdGVtO1xuICAgICAgICB0aGlzLnJvdyA9IHRoaXMuaXRlbS5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB3YXJuIG9wZXJhdGlvbnNcbiAgICAgICAgWyB0aGlzLmFwcHJvdmVCdG4sIHRoaXMuY2FuY2VsQnRuLCB0aGlzLndhcm5Eb20gXSA9IE1EYXRhVGFibGUuV2Fybk9wZXJhdGlvbih0aGlzLnJvdywgdGhpcy5sb2NhbCk7XG5cbiAgICAgICAgLy8gRGVsZXRlIG9wZXJhdGlvbiBidXR0b24gZXZlbnRzXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAqIEFwcHJvdmUgQnV0dG9uXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuYXBwcm92ZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gRGVsZXRlIHdhcm4gZG9tXG4gICAgICAgICAgICB0aGlzLndhcm5Eb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLndhcm5Eb20pO1xuXG4gICAgICAgICAgICAvLyBEZWxldGUgcm93XG4gICAgICAgICAgICB0aGlzLnJvdy5jbGFzc0xpc3QuYWRkKCdkZWxldGUtb3BlcmF0aW9uLXN0YXJ0Jyk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5yb3cpO1xuICAgICAgICAgICAgfSwgNTAxKTsgLy8gYW5pbWF0aW9uIGVuZGVkIGlzIHJlbW92ZSByb3dcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICogQ2FuY2VsIEJ1dHRvblxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmNhbmNlbEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53YXJuRG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy53YXJuRG9tKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBXYXJuT3BlcmF0aW9uIChyb3csIGxvY2FsKSB7XG4gICAgICAgIC8vIFRhYmxlIHJvd1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgLy8gVGFibGUgcm93IGNyZWF0ZSBib3VuZGluZyBjbGllbnQgcmVjdGFuZ2xlXG4gICAgICAgIHRoaXMucmVjdCA9IHRoaXMucm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAvLyBJbml0aWFsaXplIHdhcm4gZG9tXG4gICAgICAgIHJldHVybiBNRGF0YVRhYmxlLkNyZWF0ZVdhcm5Eb20odGhpcy5yZWN0LnRvcCwgdGhpcy5yZWN0LmxlZnQsIHRoaXMucm93LmNsaWVudFdpZHRoLCB0aGlzLnJvdy5jbGllbnRIZWlnaHQsIGxvY2FsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgQ3JlYXRlV2FybkRvbSAodG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0LCBsb2NhbCkge1xuICAgICAgICAvLyBEaXN0YW5jZXMgJiBIZWlnaHRcbiAgICAgICAgdGhpcy50b3BEaXN0YW5jZSA9IHRvcDtcbiAgICAgICAgdGhpcy5sZWZ0RGlzdGFuY2UgPSBsZWZ0O1xuICAgICAgICB0aGlzLnJvd1dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG5cbiAgICAgICAgaWYgKCBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ20tdGFibGUtd2FybicpLmxlbmd0aCAhPT0gMCApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0aW5nIHdhcm4gZG9tXG4gICAgICAgIGNvbnN0IHdhcm5Eb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd2FybkRvbS5jbGFzc0xpc3QuYWRkKCdtLXRhYmxlLXdhcm4nLCAnZGVsZXRlLW9wZXJhdGlvbicpO1xuICAgICAgICB3YXJuRG9tLnN0eWxlLmxlZnQgPSBgJHt0aGlzLmxlZnREaXN0YW5jZSArICh0aGlzLnJvd1dpZHRoIC8gMy41KX1weGA7XG4gICAgICAgIHdhcm5Eb20uc3R5bGUudG9wID0gYCR7dGhpcy50b3BEaXN0YW5jZSArIHRoaXMucm93SGVpZ2h0fXB4YDtcblxuICAgICAgICAvLyBDcmVhdGluZyB3YXJuIGRvbSBoZWFkZXJcbiAgICAgICAgY29uc3Qgd2FybkRvbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB3YXJuRG9tSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ20tdGFibGUtd2Fybi1oZWFkZXInKTtcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0aW5nIGhlYWRlciBjb250ZW50XG4gICAgICAgIGNvbnN0IHdhcm5Eb21IZWFkZXJDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgd2FybkRvbUhlYWRlckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbS10YWJsZS13YXJuLWhlYWRlci1jb250ZW50Jyk7XG4gICAgICAgIHdhcm5Eb21IZWFkZXJDb250ZW50LmlubmVyVGV4dCA9IHRoaXMubG9jYWwuZGVsZXRlV2Fybi50aXRsZSA/IHRoaXMubG9jYWwuZGVsZXRlV2Fybi50aXRsZSA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/JztcbiAgICAgICAgd2FybkRvbUhlYWRlci5hcHBlbmRDaGlsZCh3YXJuRG9tSGVhZGVyQ29udGVudCk7XG5cbiAgICAgICAgd2FybkRvbS5hcHBlbmRDaGlsZCh3YXJuRG9tSGVhZGVyKTtcblxuICAgICAgICAvLyBDcmVhdGluZyBBY3Rpb24gQnV0dG9uc1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtLXRhYmxlLWJ1dHRvbi1jb250YWluZXInKTtcbiAgICAgICAgIFxuICAgICAgICBjb25zdCBhcHByb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgICAgIGFwcHJvdmVCdXR0b24uaW5uZXJUZXh0ID0gdGhpcy5sb2NhbC5kZWxldGVXYXJuLmFwcHJvdmVCdG4gPyB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uYXBwcm92ZUJ0biA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/Jzs7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5pbm5lclRleHQgPSB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uY2FuY2VsQnRuID8gdGhpcy5sb2NhbC5kZWxldGVXYXJuLmNhbmNlbEJ0biA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/Jzs7XG4gICAgICAgIFxuICAgICAgICBhcHByb3ZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FwcHJvdmUtYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tY2FuY2VsJyk7XG5cbiAgICAgICAgd2FybkRvbS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xuICAgICAgICBcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFwcHJvdmVCdXR0b24pO1xuICAgICAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFwcGVuZCBEb21cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQod2FybkRvbSk7XG5cbiAgICAgICAgcmV0dXJuIFthcHByb3ZlQnV0dG9uLCBjYW5jZWxCdXR0b24sIHdhcm5Eb21dO1xuICAgIH1cblxuICAgIGVkaXRFdmVudCAoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5vYmoubXVsdGkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJsZS5sZW5ndGg7IGkgKz0gMSApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy50YWJsZVtpXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHIgdGQnKS5sZW5ndGg7IGogKz0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0ciB0ZCcpW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJsZS1lZGl0YWJsZScpICE9PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuZGJDbGlja0V2ZW50TWFuaXB1bGF0aW9uLmJpbmQodGhpcywgY29sdW1uLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9iai5lbCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyk7XG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpICs9IDEgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY29sdW1uc1tpXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhYmxlLWVkaXRhYmxlJykgIT09IFwiZmFsc2VcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIHRoaXMuZGJDbGlja0V2ZW50TWFuaXB1bGF0aW9uLmJpbmQodGhpcywgaXRlbSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGJDbGlja0V2ZW50TWFuaXB1bGF0aW9uIChjb2x1bW4sIHR5cGUpIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIC8vIFNhdmUgbGFzdCBjb2x1bW5cbiAgICAgICAgdGhpcy5zdGF0ZXMubGFzdENvbHVtblZhbHVlID0gdGhpcy5jb2x1bW4uaW5uZXJUZXh0O1xuICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCBpbnB1dCBhcmVhXG4gICAgICAgIGNvbnN0IGNyZWF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY3JlYXRlSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgY3JlYXRlSW5wdXQuY2xhc3NMaXN0LmFkZCgnZWRpdC1jb2x1bW4nKTtcbiAgICAgICAgY3JlYXRlSW5wdXQudmFsdWUgPSB0aGlzLmNvbHVtbi5pbm5lclRleHQ7XG4gICAgICAgIHRoaXMuY29sdW1uLmlubmVyVGV4dCA9ICcnO1xuICAgICAgICB0aGlzLmNvbHVtbi5hcHBlbmQoY3JlYXRlSW5wdXQpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIGNoYW5nZSBidXR0b25cbiAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNyZWF0ZUJ1dHRvbi5pbm5lclRleHQgPSB0aGlzLmxvY2FsLmNoYW5nZUJ1dHRvblZhbHVlID8gdGhpcy5sb2NhbC5jaGFuZ2VCdXR0b25WYWx1ZSA6ICdDaGFuZ2UnO1xuICAgICAgICB0aGlzLmNvbHVtbi5hcHBlbmQoY3JlYXRlQnV0dG9uKTtcblxuICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCBjYW5jZWwgYnV0dG9uXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdXR0b24uaW5uZXJUZXh0ID0gdGhpcy5sb2NhbC5jYW5jZWxCdXR0b25WYWx1ZSA/IHRoaXMubG9jYWwuY2FuY2VsQnV0dG9uVmFsdWUgOiAnQ2FuY2VsJztcbiAgICAgICAgdGhpcy5jb2x1bW4uYXBwZW5kKGNhbmNlbEJ1dHRvbik7XG4gICAgICAgIFxuICAgICAgICAvLyBDbGljayBFdmVudHNcbiAgICAgICAgY3JlYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jcmVhdGVCdXR0b25DbGlja0V2ZW50SGFuZGxlci5iaW5kKHRoaXMsIHRoaXMuY29sdW1uLCBjcmVhdGVJbnB1dCkpXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2hhbmdlSW5wdXRDYW5jZWxFdmVudEhhbmRsZXIuYmluZCh0aGlzLCB0aGlzLmNvbHVtbikpO1xuICAgICAgICAvLyBLZXlib2FyZCBFdmVudHNcbiAgICAgICAgY3JlYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4geyB0aGlzLmNoYW5nZUlucHV0S2V5RXZlbnRIYW5kbGVyKGUsIHRoaXMuY29sdW1uLCBjcmVhdGVJbnB1dCkgfSk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUJ1dHRvbkNsaWNrRXZlbnRIYW5kbGVyIChjb2x1bW4sIGlucHV0KSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuY29sdW1uLmlubmVySFRNTCA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgfVxuXG4gICAgY2hhbmdlSW5wdXRDYW5jZWxFdmVudEhhbmRsZXIgKGNvbHVtbikge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcblxuICAgICAgICB0aGlzLmNvbHVtbi5pbm5lckhUTUwgPSB0aGlzLnN0YXRlcy5sYXN0Q29sdW1uVmFsdWU7XG4gICAgfVxuXG4gICAgY2hhbmdlSW5wdXRLZXlFdmVudEhhbmRsZXIgKGV2ZW50LCBjb2x1bW4sIGlucHV0KSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgXG4gICAgICAgIC8vIEVudGVyIEtleWNvZGVcbiAgICAgICAgaWYgKCB0aGlzLmV2ZW50LmtleUNvZGUgPT09IDEzICkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25DbGlja0V2ZW50SGFuZGxlcih0aGlzLmNvbHVtbiwgdGhpcy5pbnB1dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHRoaXMuZXZlbnQua2V5Q29kZSA9PT0gMjcgKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0Q2FuY2VsRXZlbnRIYW5kbGVyKHRoaXMuY29sdW1uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0cy5tb2R1bGUgPSBNRGF0YVRhYmxlO1xud2luZG93Lk1EYXRhVGFibGUgPSBNRGF0YVRhYmxlO1xuIl19
