import os
from html.parser import HTMLParser

class ContentExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.output = []
        self.current_tag_stack = []
        # Tags that ignore their content content (though void tags don't have content, style/script do)
        self.ignore_tags = {'script', 'style', 'head', 'svg', 'noscript', 'title', 'template'} 
        # Void tags that don't have an end tag
        self.void_tags = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
        
        self.header_tags = {'h1': '#', 'h2': '##', 'h3': '###', 'h4': '####', 'h5': '#####', 'h6': '######'}
        
    def handle_starttag(self, tag, attrs):
        if tag not in self.void_tags:
            self.current_tag_stack.append(tag)
        
        if tag in self.header_tags:
            self.output.append("\n" + self.header_tags[tag] + " ")
        elif tag == 'li':
            self.output.append("\n- ")
        elif tag == 'p':
            self.output.append("\n\n")
        elif tag == 'br':
            self.output.append("\n")
            
    def handle_endtag(self, tag):
        if tag not in self.void_tags:
            if self.current_tag_stack:
                # Try to pop matching tag, or pop until match (basic error handling)
                if self.current_tag_stack[-1] == tag:
                    self.current_tag_stack.pop()
                else:
                    # If mismatch, scanning backwards might be risky in stream. 
                    # For simplicity, just pop if it exists in stack (naive) or ignore mismatch.
                    # Standard HTMLParser issues separate events.
                    pass
                    # Let's trust structure for now or just pop if match.
                    # If we missed a pop earlier, this logic is flawed.
                    # Let's simplisticly pop if match at top, otherwise assumes well-formed.
                    # Actually, for this task, 'link' caused previous issue. managing void tags fixes 99%.
                    if tag in self.current_tag_stack:
                         while self.current_tag_stack and self.current_tag_stack[-1] != tag:
                             self.current_tag_stack.pop()
                         if self.current_tag_stack:
                             self.current_tag_stack.pop()

        if tag in self.header_tags or tag == 'p':
            self.output.append("\n")

    def handle_data(self, data):
        # Check if we are inside an ignore tag
        for tag in self.current_tag_stack:
            if tag in self.ignore_tags:
                return
        
        text = data.strip()
        if text:
            self.output.append(text + " ")

    def get_content(self):
        return "".join(self.output)

files = [
    'index.html',
    'story.html',
    'contact.html',
    'shop.html',
    'shop-honey.html',
    'shop-spices.html',
    'product-cinnamon.html',
    'product-cloves.html',
    'product-honey.html'
]

full_content = "# Earthy Munchy Website Content Export\n\n## Table of Contents\n"

file_contents = {}
for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            parser = ContentExtractor()
            parser.feed(file.read())
            file_contents[f] = parser.get_content()

# Generate TOC
for f in files:
    if f in file_contents:
        link_name = f.replace('.', '-')
        full_content += f"- [{f}](#{link_name})\n"

full_content += "\n---\n"

# Append content
for f in files:
    if f in file_contents:
        full_content += f"\n# {f}\n\n"
        full_content += file_contents[f]
        full_content += "\n\n---\n"

with open('site_content_export.md', 'w', encoding='utf-8') as out:
    out.write(full_content)

print("Export complete: site_content_export.md")
