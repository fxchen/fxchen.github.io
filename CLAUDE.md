# Blog Post Formatting

Jekyll site using Kramdown (GFM) + Rouge syntax highlighting. Bootstrap 3 for layout.

## ASCII Art in Code Blocks

ASCII art and box-drawing characters (┌─┘│╔═╚) are part of the blog's voice. Keep them tight:

- No leading indentation inside code blocks (the code block already indents)
- No empty padding lines right after opening borders or before closing borders
- Keep one blank line between meaningful sections inside a box (e.g. header vs data)
- Code blocks only for actual code, terminal output, or ASCII art — not for plain text that should be prose

## Other Formatting

- **Markdown tables** for comparisons, structured data, properties, timelines
- **Blockquotes** for callouts, epigraphs, key takeaways
- **Ordered lists** for sequential steps
- **Bold text** in blockquotes for structure: `> **Label:** content`

## Available Kramdown Classes

Add `{: .box-note}` on the line after a block element:

- `.box-note` — blue left border, gray background
- `.box-warning` — yellow left border, yellow background
- `.box-error` — red left border, red background
