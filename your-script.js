document.addEventListener('DOMContentLoaded', function () {
    // Fetch your Markdown content (you can load it from a file or provide it directly)
    const markdownContent = "# Your Markdown Content\n\nThis is **bold** text.";
  
    // Render the Markdown content using marked.js
    document.getElementById('markdown-content').innerHTML = marked(markdownContent);
  });