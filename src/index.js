 // Quill.js Plugin - Markdown Shortcuts

 // Quill.js Plugin - Markdown Shortcuts
 // This is a module for the Quill.js WYSIWYG editor (https://quilljs.com/)
 // which converts text entered as markdown to rich text.
 //
 // v0.0.5
 //
 // Author: Patrick Lee (me@patricklee.nyc)
 //
 // (c) Copyright 2017 Patrick Lee (me@patricklee.nyc).
 // Permission is hereby granted, free of charge, to any person obtaining a copy
 // of this software and associated documentation files (the "Software"), to deal
 // in the Software without restriction, including without limitation the rights
 // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 // copies of the Software, and to permit persons to whom the Software is
 // furnished to do so, subject to the following conditions:
 //
 // The above copyright notice and this permission notice shall be included in
 // all copies or substantial portions of the Software.
 //
 // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 // THE SOFTWARE.
 //
 class MarkdownShortcuts {
  constructor (quill, options) {
    this.quill = quill
    this.options = options
    this.ignoreTags = ['PRE']
    this.shortMatches = [
      {
        name: 'short_bold',
        pattern: /(?:\*){1}(.+?)(?:\*){1}/gu,
        action: (text, selection, pattern, lineStart, emojisLength = 0) => {
          let match = pattern.exec(text)
          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index - (emojisLength * 3)
          // console.log('short_bold::', `text: ${text}, annotatedText: ${annotatedText}, matchedText: ${matchedText}, startIndex: ${startIndex}, matchIndex: ${match.index}, emojisLength: ${emojisLength}`)
          if (text.match(/^([*_ \n]+)$/gu)) return
          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {bold: true})
            this.quill.format('bold', false)
          }, 0)
        }
      },
      {
        name: 'short_italic',
        pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/gu,
        action: (text, selection, pattern, lineStart, emojisLength = 0) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index - (emojisLength * 3)

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {italic: true})
            this.quill.format('italic', false)
          }, 0)
        }
      },
      {
        name: 'short_strikethrough',
        pattern:/(?:\~){1}(.+?)(?:\~){1}/gu,
        action: (text, selection, pattern, lineStart, emojisLength = 0) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index - (emojisLength * 3)

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {strike: true})
            this.quill.format('strike', false)
          }, 0)
        }
      },
    ]

    this.moreMatches = this.options.withShortMatches ? [...this.shortMatches] : []

    this.matches = [
      ...this.moreMatches,
      {
        name: 'bold',
        pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
        action: (text, selection, pattern, lineStart,  emojisLength = 0) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index - (emojisLength * 3)

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {bold: true})
            this.quill.format('bold', false)
          }, 0)
        }
      },
      {
        name: 'italic',
        pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
        action: (text, selection, pattern, lineStart,  emojisLength = 0) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index - (emojisLength * 3)

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {italic: true})
            this.quill.format('italic', false)
          }, 0)
        }
      },
      {
        name: 'strikethrough',
        pattern: /(?:\~){2}(.+?)(?:\~){2}/g,
        action: (text, selection, pattern, lineStart,  emojisLength = 0) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index - (emojisLength * 3)

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {strike: true})
            this.quill.format('strike', false)
          }, 0)
        }
      },
      {
        name: 'code-block',
        pattern: /^`{3}(?:\s|\n)/g,
        action: (text, selection) => {
          // Need to defer this action https://github.com/quilljs/quill/issues/1134
          setTimeout(() => {
            this.quill.formatLine(selection.index, 1, 'code-block', true)
            this.quill.deleteText(selection.index - 4, 4)
          }, 0)
        }
      },
      {
        name: 'code',
        pattern: /(?:`)(.+?)(?:`)/g,
        action: (text, selection, pattern, lineStart,  emojisLength = 0) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index - (emojisLength * 3)

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {code: true})
            this.quill.format('code', false)
            this.quill.insertText(this.quill.getSelection(), ' ')
          }, 0)
        }
      },
      {
        name: 'plus-ul',
        // Quill 1.3.5 already treat * as another trigger for bullet lists
        pattern: /^\+\s$/g,
        action: (text, selection, pattern) => {
          setTimeout(() => {
            this.quill.formatLine(selection.index, 1, 'list', 'unordered')
            this.quill.deleteText(selection.index - 2, 2)
          }, 0)
        }
      },
      {
        name: 'link',
        pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
        action: (text, selection, pattern) => {
          const startIndex = text.search(pattern)
          const matchedText = text.match(pattern)[0]
          const hrefText = text.match(/(?:\[(.*?)\])/g)[0]
          const hrefLink = text.match(/(?:\((.*?)\))/g)[0]
          const start = selection.index - matchedText.length - 1
          if (startIndex !== -1) {
            setTimeout(() => {
              this.quill.deleteText(start, matchedText.length)
              this.quill.insertText(start, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1))
            }, 0)
          }
        }
      }
    ]

    // Handler that looks for insert deltas that match specific characters
    this.quill.on('text-change', (delta, oldContents, source) => {
      for (let i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty('insert')) {
          if ([' ', '*', '~', '_'].includes(delta.ops[i].insert)) {
            this.onTriggers()
          } else if (delta.ops[i].insert === '\n') {
            this.onEnter()
          } else if (delta.ops[i].hasOwnProperty('delete') && source === 'user') {
            this.onDelete()
          }
        }
      }
    })
  }

  isValid (text, tagName) {
    return (
      typeof text !== 'undefined' &&
      text &&
      this.ignoreTags.indexOf(tagName) === -1
    )
  }

  onTriggers () {
    const selection = this.quill.getSelection()
    if (!selection) return
    const [line, offset] = this.quill.getLine(selection.index)
    const text = line.domNode.textContent
    const lineStart = selection.index - offset
    if (this.isValid(text, line.domNode.tagName)) {
      for (let match of this.matches) {
        const matchedText = text.match(match.pattern)
        if (matchedText) {
          const emojisFound = text.match(this.emojisRegex()) || [];
          // console.log({emojisFound})
          // We need to replace only matched text not the whole line
          match.action(text, selection, match.pattern, lineStart, emojisFound.length);
          return
        }
      }
    }
  }

  onEnter () {
    let selection = this.quill.getSelection()
    if (!selection) return
    const [line, offset] = this.quill.getLine(selection.index)
    const text = line.domNode.textContent + ' '
    const lineStart = selection.index - offset
    selection.length = selection.index++
    if (this.isValid(text, line.domNode.tagName)) {
      for (let match of this.matches) {
        const matchedText = text.match(match.pattern)
        if (matchedText) {
          // const emojisFound = text.match(this.emojisRegex()) || [];
          const emojisFound = [];
          
          match.action(text, selection, match.pattern, lineStart, emojisFound.length);
          return
        }
      }
    }
  }

  onDelete () {
    const range = this.quill.getSelection();
    
    if (!range) {
      return
    }

    const format = this.quill.getFormat(range)

    if (format.blockquote || format.code || format['code-block']) {
      if (this.isLastBrElement(range) || this.isEmptyLine(range)) {
        this.quill.removeFormat(range.index, range.length);
      }
    }
  }

  isLastBrElement (range) {
    const [block] = this.quill.scroll.descendant(Block, range.index)
    const isBrElement = block != null && block.domNode.firstChild instanceof HTMLBRElement
    return isBrElement 
  }

  isEmptyLine (range) {
    const [line] = this.quill.getLine(range.index)
    const isEmpty = line.children.head.text.trim() === ""
    return isEmpty
  }

  emojisRegex () {
    return /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
  }
}

if (window.Quill) {
  window.Quill.register('modules/markdownShortcuts', MarkdownShortcuts)
}

module.exports = MarkdownShortcuts
