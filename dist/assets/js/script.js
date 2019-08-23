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

        // initialize Event Listener
        this.deleteEvent();

        if (this.editable) {
            this.editEvent();
        }
    }

    _createClass(MDataTable, [{
        key: 'deleteEvent',
        value: function deleteEvent() {
            this.deleteAct = this.table.querySelectorAll('tbody tr td .delete');
            // All remove buttons loop
            for (var i = 0; i < this.deleteAct.length; i += 1) {
                // Remove button
                var item = this.deleteAct[i];
                // Remove button init event
                item.addEventListener('click', this.deleteEventManipulation.bind(this, item));
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
                for (var i = 0; i < document.querySelectorAll(this.obj.el).length; i += 1) {
                    var item = document.querySelectorAll(this.obj.el)[i];
                    item.addEventListener('dbclick', this.dbClickEventManipulation.bind(this, item, true));
                }
            } else {
                this.columns = document.querySelector(this.obj.el).getElementsByTagName('td');
                for (var _i = 0; _i < this.columns.length; _i += 1) {
                    var _item = this.columns[_i];

                    if (_item.getAttribute('data-table-editable') !== "false") {
                        _item.addEventListener('dblclick', this.dbClickEventManipulation.bind(this, _item, false));
                    }
                }
            }
        }
    }, {
        key: 'dbClickEventManipulation',
        value: function dbClickEventManipulation(column, type) {
            this.column = column;
            this.type = type;

            console.log(this.column);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvTURhdGFUYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztJQ0FxQixVO0FBQ2pCLHdCQUFjLEdBQWQsRUFBb0I7QUFBQTs7QUFDaEI7Ozs7QUFJQSxhQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxHQUFMLENBQVMsS0FBVCxHQUFpQixTQUFTLGdCQUFULENBQTBCLEtBQUssR0FBTCxDQUFTLEVBQW5DLENBQWpCLEdBQTBELFNBQVMsYUFBVCxDQUF1QixLQUFLLEdBQUwsQ0FBUyxFQUFoQyxDQUF2RTtBQUNBLGFBQUssUUFBTCxHQUFnQixLQUFLLEdBQUwsQ0FBUyxRQUF6QjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxDQUFTLEtBQXRCOztBQUVBO0FBQ0EsYUFBSyxXQUFMOztBQUVBLFlBQUssS0FBSyxRQUFWLEVBQXFCO0FBQ2pCLGlCQUFLLFNBQUw7QUFDSDtBQUNKOzs7O3NDQUVjO0FBQ1gsaUJBQUssU0FBTCxHQUFpQixLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixxQkFBNUIsQ0FBakI7QUFDQTtBQUNBLGlCQUFNLElBQUksSUFBSSxDQUFkLEVBQWlCLElBQUksS0FBSyxTQUFMLENBQWUsTUFBcEMsRUFBNEMsS0FBSyxDQUFqRCxFQUFxRDtBQUNqRDtBQUNBLG9CQUFNLE9BQU8sS0FBSyxTQUFMLENBQWUsQ0FBZixDQUFiO0FBQ0E7QUFDQSxxQkFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLHVCQUFMLENBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQS9CO0FBQ0g7QUFDSjs7O2dEQUV3QixJLEVBQU07QUFBQTs7QUFDM0IsaUJBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxpQkFBSyxHQUFMLEdBQVcsS0FBSyxJQUFMLENBQVUsVUFBVixDQUFxQixVQUFoQzs7QUFFQTs7QUFHQTs7QUFFQTs7O0FBVDJCLHdDQUt5QixXQUFXLGFBQVgsQ0FBeUIsS0FBSyxHQUE5QixFQUFtQyxLQUFLLEtBQXhDLENBTHpCOztBQUFBOztBQUt6QixpQkFBSyxVQUxvQjtBQUtSLGlCQUFLLFNBTEc7QUFLUSxpQkFBSyxPQUxiO0FBWTNCLGlCQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FBMEIsWUFBTTtBQUM1QjtBQUNBLHNCQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFdBQXhCLENBQW9DLE1BQUssT0FBekM7O0FBRUE7QUFDQSxzQkFBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1Qix3QkFBdkI7O0FBRUEsMkJBQVcsWUFBTTtBQUNiLDBCQUFLLEdBQUwsQ0FBUyxVQUFULENBQW9CLFdBQXBCLENBQWdDLE1BQUssR0FBckM7QUFDSCxpQkFGRCxFQUVHLEdBRkgsRUFQNEIsQ0FTbkI7QUFDWixhQVZEOztBQVlBOzs7QUFHQSxpQkFBSyxTQUFMLENBQWUsT0FBZixHQUF5QixZQUFNO0FBQzNCLHNCQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFdBQXhCLENBQW9DLE1BQUssT0FBekM7QUFDSCxhQUZEO0FBR0g7OztvQ0E4RFk7O0FBRVQsZ0JBQUksS0FBSyxHQUFMLENBQVMsS0FBYixFQUFvQjtBQUNoQixxQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsZ0JBQVQsQ0FBMEIsS0FBSyxHQUFMLENBQVMsRUFBbkMsRUFBdUMsTUFBM0QsRUFBbUUsS0FBSyxDQUF4RSxFQUE0RTtBQUN4RSx3QkFBTSxPQUFPLFNBQVMsZ0JBQVQsQ0FBMEIsS0FBSyxHQUFMLENBQVMsRUFBbkMsRUFBdUMsQ0FBdkMsQ0FBYjtBQUNBLHlCQUFLLGdCQUFMLENBQXNCLFNBQXRCLEVBQWlDLEtBQUssd0JBQUwsQ0FBOEIsSUFBOUIsQ0FBbUMsSUFBbkMsRUFBeUMsSUFBekMsRUFBK0MsSUFBL0MsQ0FBakM7QUFDSDtBQUNKLGFBTEQsTUFLTztBQUNILHFCQUFLLE9BQUwsR0FBZSxTQUFTLGFBQVQsQ0FBdUIsS0FBSyxHQUFMLENBQVMsRUFBaEMsRUFBb0Msb0JBQXBDLENBQXlELElBQXpELENBQWY7QUFDQSxxQkFBTSxJQUFJLEtBQUksQ0FBZCxFQUFpQixLQUFJLEtBQUssT0FBTCxDQUFhLE1BQWxDLEVBQTBDLE1BQUssQ0FBL0MsRUFBbUQ7QUFDL0Msd0JBQU0sUUFBTyxLQUFLLE9BQUwsQ0FBYSxFQUFiLENBQWI7O0FBRUEsd0JBQUssTUFBSyxZQUFMLENBQWtCLHFCQUFsQixNQUE2QyxPQUFsRCxFQUE0RDtBQUN4RCw4QkFBSyxnQkFBTCxDQUFzQixVQUF0QixFQUFrQyxLQUFLLHdCQUFMLENBQThCLElBQTlCLENBQW1DLElBQW5DLEVBQXlDLEtBQXpDLEVBQStDLEtBQS9DLENBQWxDO0FBQ0g7QUFDSjtBQUNKO0FBRUo7OztpREFFeUIsTSxFQUFRLEksRUFBTTtBQUNwQyxpQkFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGlCQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBLG9CQUFRLEdBQVIsQ0FBWSxLQUFLLE1BQWpCO0FBRUg7OztzQ0F0RnFCLEcsRUFBSyxLLEVBQU87QUFDOUI7QUFDQSxpQkFBSyxHQUFMLEdBQVcsR0FBWDtBQUNBO0FBQ0EsaUJBQUssSUFBTCxHQUFZLEtBQUssR0FBTCxDQUFTLHFCQUFULEVBQVo7QUFDQTtBQUNBLG1CQUFPLFdBQVcsYUFBWCxDQUF5QixLQUFLLElBQUwsQ0FBVSxHQUFuQyxFQUF3QyxLQUFLLElBQUwsQ0FBVSxJQUFsRCxFQUF3RCxLQUFLLEdBQUwsQ0FBUyxXQUFqRSxFQUE4RSxLQUFLLEdBQUwsQ0FBUyxZQUF2RixFQUFxRyxLQUFyRyxDQUFQO0FBQ0g7OztzQ0FFcUIsRyxFQUFLLEksRUFBTSxLLEVBQU8sTSxFQUFRLEssRUFBTztBQUNuRDtBQUNBLGlCQUFLLFdBQUwsR0FBbUIsR0FBbkI7QUFDQSxpQkFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsaUJBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNBLGlCQUFLLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQTtBQUNBLGdCQUFNLFVBQVUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0Esb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixjQUF0QixFQUFzQyxrQkFBdEM7QUFDQSxvQkFBUSxLQUFSLENBQWMsSUFBZCxHQUF3QixLQUFLLFlBQUwsR0FBcUIsS0FBSyxRQUFMLEdBQWdCLEdBQTdEO0FBQ0Esb0JBQVEsS0FBUixDQUFjLEdBQWQsR0FBdUIsS0FBSyxXQUFMLEdBQW1CLEtBQUssU0FBL0M7O0FBRUE7QUFDQSxnQkFBTSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXRCO0FBQ0EsMEJBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixxQkFBNUI7O0FBRUE7QUFDQSxnQkFBTSx1QkFBdUIsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQTdCO0FBQ0EsaUNBQXFCLFNBQXJCLENBQStCLEdBQS9CLENBQW1DLDZCQUFuQztBQUNBLGlDQUFxQixTQUFyQixHQUFpQyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXRCLEdBQThCLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBcEQsR0FBNEQsZ0NBQTdGO0FBQ0EsMEJBQWMsV0FBZCxDQUEwQixvQkFBMUI7O0FBRUEsb0JBQVEsV0FBUixDQUFvQixhQUFwQjs7QUFFQTs7QUFFQSxnQkFBTSxrQkFBa0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXhCO0FBQ0EsNEJBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLDBCQUE5Qjs7QUFFQSxnQkFBTSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQXRCO0FBQ0EsZ0JBQU0sZUFBZSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBckI7O0FBRUEsMEJBQWMsU0FBZCxHQUEwQixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFVBQXRCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsVUFBekQsR0FBc0UsZ0NBQWhHLENBQWlJO0FBQ2pJLHlCQUFhLFNBQWIsR0FBeUIsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixTQUF0QixHQUFrQyxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFNBQXhELEdBQW9FLGdDQUE3RixDQUE4SDs7QUFFOUgsMEJBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixnQkFBNUI7QUFDQSx5QkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLFlBQTNCOztBQUVBLG9CQUFRLFdBQVIsQ0FBb0IsZUFBcEI7O0FBRUEsNEJBQWdCLFdBQWhCLENBQTRCLGFBQTVCO0FBQ0EsNEJBQWdCLFdBQWhCLENBQTRCLFlBQTVCOztBQUVBO0FBQ0EscUJBQVMsSUFBVCxDQUFjLE1BQWQsQ0FBcUIsT0FBckI7O0FBRUEsbUJBQU8sQ0FBQyxhQUFELEVBQWdCLFlBQWhCLEVBQThCLE9BQTlCLENBQVA7QUFDSDs7Ozs7O2tCQXhIZ0IsVTs7O0FBdUpyQixRQUFRLE1BQVIsR0FBaUIsVUFBakI7QUFDQSxPQUFPLFVBQVAsR0FBb0IsVUFBcEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNRGF0YVRhYmxlIHtcbiAgICBjb25zdHJ1Y3RvciAoIG9iaiApIHtcbiAgICAgICAgLypcbiAgICAgICAgKiBtdWx0aXBsZSA9IHF1ZXJ5U2VsZWN0b3JBbGxcbiAgICAgICAgKiBzaW5nbGUgPSBxdWVyeVNlbGVjdG9yXG4gICAgICAgICovXG4gICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgICAgICB0aGlzLnRhYmxlID0gdGhpcy5vYmoubXVsdGkgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub2JqLmVsKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vYmouZWwpO1xuICAgICAgICB0aGlzLmVkaXRhYmxlID0gdGhpcy5vYmouZWRpdGFibGU7XG4gICAgICAgIHRoaXMubG9jYWwgPSB0aGlzLm9iai5sb2NhbDtcbiAgICAgICAgXG4gICAgICAgIC8vIGluaXRpYWxpemUgRXZlbnQgTGlzdGVuZXJcbiAgICAgICAgdGhpcy5kZWxldGVFdmVudCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCB0aGlzLmVkaXRhYmxlICkge1xuICAgICAgICAgICAgdGhpcy5lZGl0RXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBkZWxldGVFdmVudCAoKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlQWN0ID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0ciB0ZCAuZGVsZXRlJyk7XG4gICAgICAgIC8vIEFsbCByZW1vdmUgYnV0dG9ucyBsb29wXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuZGVsZXRlQWN0Lmxlbmd0aDsgaSArPSAxICkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvblxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGVsZXRlQWN0W2ldO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvbiBpbml0IGV2ZW50XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWxldGVFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGl0ZW0pKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUV2ZW50TWFuaXB1bGF0aW9uIChpdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XG4gICAgICAgIHRoaXMucm93ID0gdGhpcy5pdGVtLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHdhcm4gb3BlcmF0aW9uc1xuICAgICAgICBbIHRoaXMuYXBwcm92ZUJ0biwgdGhpcy5jYW5jZWxCdG4sIHRoaXMud2FybkRvbSBdID0gTURhdGFUYWJsZS5XYXJuT3BlcmF0aW9uKHRoaXMucm93LCB0aGlzLmxvY2FsKTtcblxuICAgICAgICAvLyBEZWxldGUgb3BlcmF0aW9uIGJ1dHRvbiBldmVudHNcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICogQXBwcm92ZSBCdXR0b25cbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hcHByb3ZlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBEZWxldGUgd2FybiBkb21cbiAgICAgICAgICAgIHRoaXMud2FybkRvbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMud2FybkRvbSk7XG5cbiAgICAgICAgICAgIC8vIERlbGV0ZSByb3dcbiAgICAgICAgICAgIHRoaXMucm93LmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1vcGVyYXRpb24tc3RhcnQnKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3cucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnJvdyk7XG4gICAgICAgICAgICB9LCA1MDEpOyAvLyBhbmltYXRpb24gZW5kZWQgaXMgcmVtb3ZlIHJvd1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgKiBDYW5jZWwgQnV0dG9uXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuY2FuY2VsQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndhcm5Eb20ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLndhcm5Eb20pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIFdhcm5PcGVyYXRpb24gKHJvdywgbG9jYWwpIHtcbiAgICAgICAgLy8gVGFibGUgcm93XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICAvLyBUYWJsZSByb3cgY3JlYXRlIGJvdW5kaW5nIGNsaWVudCByZWN0YW5nbGVcbiAgICAgICAgdGhpcy5yZWN0ID0gdGhpcy5yb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIEluaXRpYWxpemUgd2FybiBkb21cbiAgICAgICAgcmV0dXJuIE1EYXRhVGFibGUuQ3JlYXRlV2FybkRvbSh0aGlzLnJlY3QudG9wLCB0aGlzLnJlY3QubGVmdCwgdGhpcy5yb3cuY2xpZW50V2lkdGgsIHRoaXMucm93LmNsaWVudEhlaWdodCwgbG9jYWwpO1xuICAgIH1cblxuICAgIHN0YXRpYyBDcmVhdGVXYXJuRG9tICh0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQsIGxvY2FsKSB7XG4gICAgICAgIC8vIERpc3RhbmNlcyAmIEhlaWdodFxuICAgICAgICB0aGlzLnRvcERpc3RhbmNlID0gdG9wO1xuICAgICAgICB0aGlzLmxlZnREaXN0YW5jZSA9IGxlZnQ7XG4gICAgICAgIHRoaXMucm93V2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMubG9jYWwgPSBsb2NhbDtcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0aW5nIHdhcm4gZG9tXG4gICAgICAgIGNvbnN0IHdhcm5Eb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd2FybkRvbS5jbGFzc0xpc3QuYWRkKCdtLXRhYmxlLXdhcm4nLCAnZGVsZXRlLW9wZXJhdGlvbicpO1xuICAgICAgICB3YXJuRG9tLnN0eWxlLmxlZnQgPSBgJHt0aGlzLmxlZnREaXN0YW5jZSArICh0aGlzLnJvd1dpZHRoIC8gMy41KX1weGA7XG4gICAgICAgIHdhcm5Eb20uc3R5bGUudG9wID0gYCR7dGhpcy50b3BEaXN0YW5jZSArIHRoaXMucm93SGVpZ2h0fXB4YDtcblxuICAgICAgICAvLyBDcmVhdGluZyB3YXJuIGRvbSBoZWFkZXJcbiAgICAgICAgY29uc3Qgd2FybkRvbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB3YXJuRG9tSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ20tdGFibGUtd2Fybi1oZWFkZXInKTtcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0aW5nIGhlYWRlciBjb250ZW50XG4gICAgICAgIGNvbnN0IHdhcm5Eb21IZWFkZXJDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgd2FybkRvbUhlYWRlckNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbS10YWJsZS13YXJuLWhlYWRlci1jb250ZW50Jyk7XG4gICAgICAgIHdhcm5Eb21IZWFkZXJDb250ZW50LmlubmVyVGV4dCA9IHRoaXMubG9jYWwuZGVsZXRlV2Fybi50aXRsZSA/IHRoaXMubG9jYWwuZGVsZXRlV2Fybi50aXRsZSA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/JztcbiAgICAgICAgd2FybkRvbUhlYWRlci5hcHBlbmRDaGlsZCh3YXJuRG9tSGVhZGVyQ29udGVudCk7XG5cbiAgICAgICAgd2FybkRvbS5hcHBlbmRDaGlsZCh3YXJuRG9tSGVhZGVyKTtcblxuICAgICAgICAvLyBDcmVhdGluZyBBY3Rpb24gQnV0dG9uc1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtLXRhYmxlLWJ1dHRvbi1jb250YWluZXInKTtcbiAgICAgICAgIFxuICAgICAgICBjb25zdCBhcHByb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgICAgIGFwcHJvdmVCdXR0b24uaW5uZXJUZXh0ID0gdGhpcy5sb2NhbC5kZWxldGVXYXJuLmFwcHJvdmVCdG4gPyB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uYXBwcm92ZUJ0biA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/Jzs7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5pbm5lclRleHQgPSB0aGlzLmxvY2FsLmRlbGV0ZVdhcm4uY2FuY2VsQnRuID8gdGhpcy5sb2NhbC5kZWxldGVXYXJuLmNhbmNlbEJ0biA6ICdTaWxtZWsgaXN0ZWRpxJ9pbmUgZW1pbiBtaXNpbiA/Jzs7XG4gICAgICAgIFxuICAgICAgICBhcHByb3ZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FwcHJvdmUtYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tY2FuY2VsJyk7XG5cbiAgICAgICAgd2FybkRvbS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xuICAgICAgICBcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFwcHJvdmVCdXR0b24pO1xuICAgICAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFwcGVuZCBEb21cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQod2FybkRvbSk7XG5cbiAgICAgICAgcmV0dXJuIFthcHByb3ZlQnV0dG9uLCBjYW5jZWxCdXR0b24sIHdhcm5Eb21dO1xuICAgIH1cblxuICAgIGVkaXRFdmVudCAoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5vYmoubXVsdGkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9iai5lbCkubGVuZ3RoOyBpICs9IDEgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vYmouZWwpW2ldO1xuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignZGJjbGljaycsIHRoaXMuZGJDbGlja0V2ZW50TWFuaXB1bGF0aW9uLmJpbmQodGhpcywgaXRlbSwgdHJ1ZSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vYmouZWwpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZCcpO1xuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSArPSAxICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNvbHVtbnNbaV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJsZS1lZGl0YWJsZScpICE9PSBcImZhbHNlXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCB0aGlzLmRiQ2xpY2tFdmVudE1hbmlwdWxhdGlvbi5iaW5kKHRoaXMsIGl0ZW0sIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGRiQ2xpY2tFdmVudE1hbmlwdWxhdGlvbiAoY29sdW1uLCB0eXBlKSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29sdW1uKTtcbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnRzLm1vZHVsZSA9IE1EYXRhVGFibGU7XG53aW5kb3cuTURhdGFUYWJsZSA9IE1EYXRhVGFibGU7XG4iXX0=
