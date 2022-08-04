import Quill from "quill";
import MarkdownShortcuts from "../../dist/markdownShortcuts";

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);

const toolbarOptions = [['bold', 'italic', 'strike'],['link'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['code-block']];
new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Type in your message',
  modules: {
    toolbar: toolbarOptions,
    markdownShortcuts: {
      withShortMatches: true
    }
  }
});