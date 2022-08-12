import Quill from "quill";

import * as Emoji from "quill-emoji";
import MarkdownShortcuts from "../../dist/markdownShortcuts";

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
Quill.register("modules/emoji", Emoji);

// const Embed = Quill.import('blots/embed');

// class EmojiBlot extends Embed {
  
// }

// Quill.register({
//   'formats/emoji': EmojiBlot
// });

const toolbarOptions = {
  container: [['bold', 'italic', 'strike', { 'list': 'ordered'}, { 'list': 'bullet' }],['link', 'code-block'], ['emoji']]
};
new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Type in your message',
  modules: {
    toolbar: toolbarOptions,
    "emoji-toolbar": true,
    // "emoji-textarea": true,
    "emoji-shortname": true,
    markdownShortcuts: {
      withShortMatches: true
    }
  }
});