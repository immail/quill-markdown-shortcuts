(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MarkdownShortcuts"] = factory();
	else
		root["MarkdownShortcuts"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Quill.js Plugin - Markdown Shortcuts

var MarkdownShortcuts = function () {
  function MarkdownShortcuts(quill, options) {
    var _this = this;

    _classCallCheck(this, MarkdownShortcuts);

    this.quill = quill;
    this.options = options;

    this.ignoreTags = ['PRE'];
    this.shortMatches = [{
      name: 'short_bold',
      pattern: /(?:\*){1}(.+?)(?:\*){1}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;
        console.log('shortBold:', { annotatedText: annotatedText, matchedText: matchedText, startIndex: startIndex });
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { bold: true });
          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'short_italic',
      pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { italic: true });
          _this.quill.format('italic', false);
        }, 0);
      }
    }, {
      name: 'short_strikethrough',
      pattern: /(?:~)(.+?)(?:~)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { strike: true });
          _this.quill.format('strike', false);
        }, 0);
      }
    }];

    this.moreMatches = this.withShortMatches ? [].concat(_toConsumableArray(this.shortMatches)) : [];

    this.matches = [{
      name: 'bold',
      pattern: /(?:\*){2}(.+?)(?:\*){2}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { bold: true });
          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'italic',
      pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { italic: true });
          _this.quill.format('italic', false);
        }, 0);
      }
    }, {
      name: 'strikethrough',
      pattern: /(?:~~)(.+?)(?:~~)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { strike: true });
          _this.quill.format('strike', false);
        }, 0);
      }
    }, {
      name: 'code-block',
      pattern: /^`{3}(?:\s|\n)/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'code-block', true);
          _this.quill.deleteText(selection.index - 4, 4);
        }, 0);
      }
    }, {
      name: 'code',
      pattern: /(?:`)(.+?)(?:`)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { code: true });
          _this.quill.format('code', false);
          _this.quill.insertText(_this.quill.getSelection(), ' ');
        }, 0);
      }
    }, {
      name: 'plus-ul',
      // Quill 1.3.5 already treat * as another trigger for bullet lists
      pattern: /^\+\s$/g,
      action: function action(text, selection, pattern) {
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'list', 'unordered');
          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: 'link',
      pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        var hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;
        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);
            _this.quill.insertText(start, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }].concat(_toConsumableArray(this.shortMatches));

    // Handler that looks for insert deltas that match specific characters
    this.quill.on('text-change', function (delta, oldContents, source) {

      for (var i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty('insert')) {
          if ([' ', '*', '~', '_'].includes(delta.ops[i].insert)) {
            _this.onSpace();
          } else if (delta.ops[i].insert === '\n') {
            _this.onEnter();
          }
        }
      }
    });
  }

  _createClass(MarkdownShortcuts, [{
    key: 'isValid',
    value: function isValid(text, tagName) {
      return typeof text !== 'undefined' && text && this.ignoreTags.indexOf(tagName) === -1;
    }
  }, {
    key: 'onSpace',
    value: function onSpace() {
      var selection = this.quill.getSelection();
      if (!selection) return;

      var _quill$getLine = this.quill.getLine(selection.index),
          _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
          line = _quill$getLine2[0],
          offset = _quill$getLine2[1];

      var text = line.domNode.textContent;
      var lineStart = selection.index - offset;
      console.log({ selection: selection, line: line, lineStart: lineStart });
      if (this.isValid(text, line.domNode.tagName)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var match = _step.value;

            var matchedText = text.match(match.pattern);
            if (matchedText) {
              // We need to replace only matched text not the whole line
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      var selection = this.quill.getSelection();
      if (!selection) return;

      var _quill$getLine3 = this.quill.getLine(selection.index),
          _quill$getLine4 = _slicedToArray(_quill$getLine3, 2),
          line = _quill$getLine4[0],
          offset = _quill$getLine4[1];

      var text = line.domNode.textContent + ' ';
      var lineStart = selection.index - offset;
      selection.length = selection.index++;
      if (this.isValid(text, line.domNode.tagName)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.matches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var match = _step2.value;

            var matchedText = text.match(match.pattern);
            if (matchedText) {
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  return MarkdownShortcuts;
}();

if (window.Quill) {
  window.Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
}

module.exports = MarkdownShortcuts;

/***/ })
/******/ ]);
});
//# sourceMappingURL=markdownShortcuts.js.map