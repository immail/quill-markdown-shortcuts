 // Quill.js Plugin - Markdown Shortcuts

class MarkdownShortcuts {
  constructor (quill, options) {
    this.quill = quill
    this.options = options

    this.ignoreTags = ['PRE']
    this.shortMatches = [
      {
        name: 'short_bold',
        pattern: /(?:\*){1}(.+?)(?:\*){1}/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return
          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {bold: true})
            this.quill.format('bold', false)
          }, 0)
        }
      },
      {
        name: 'short_italic',
        pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

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
        pattern: /(?:~)(.+?)(?:~)/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {strike: true})
            this.quill.format('strike', false)
          }, 0)
        }
      },
    ]

    this.moreMatches = this.withShortMatches ? [...this.shortMatches] : []

    this.matches = [
      {
        name: 'bold',
        pattern: /(?:\*){2}(.+?)(?:\*){2}/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

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
        pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

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
        pattern: /(?:~~)(.+?)(?:~~)/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

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
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

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
      },
      ...this.shortMatches
    ]

    // Handler that looks for insert deltas that match specific characters
    this.quill.on('text-change', (delta, oldContents, source) => {
      for (let i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty('insert')) {
          if ([' ', '*', '~', '_'].includes(delta.ops[i].insert)) {
            this.onTriggers()
          } else if (delta.ops[i].insert === '\n') {
            this.onEnter()
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
          // We need to replace only matched text not the whole line
          match.action(text, selection, match.pattern, lineStart)
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
          match.action(text, selection, match.pattern, lineStart)
          return
        }
      }
    }
  }
}

if (window.Quill) {
  window.Quill.register('modules/markdownShortcuts', MarkdownShortcuts)
}

module.exports = MarkdownShortcuts
