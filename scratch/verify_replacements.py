template_path = r"c:\Users\GIGABYTE\Downloads\fusion-starter-529\public\templates\daniel-cross.html"

with open(template_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = [
    # Sidebar Profile Image
    ('<div class="framer-pnceva" data-framer-name="Profile image"', '<div class="framer-pnceva" data-framer-name="Profile image" data-editable-field="avatarUrl" data-editable-type="image"'),
    # Small inline header fan
    ('<div class="framer-1m8xtt5" data-framer-appear-id="1m8xtt5" data-framer-name="Image 01"', '<div class="framer-1m8xtt5" data-framer-appear-id="1m8xtt5" data-framer-name="Image 01" data-editable-field="bannerUrl" data-editable-type="image"'),
    ('<div class="framer-19db7zm" data-framer-appear-id="19db7zm" data-framer-name="Image 02"', '<div class="framer-19db7zm" data-framer-appear-id="19db7zm" data-framer-name="Image 02" data-editable-field="avatarUrl" data-editable-type="image"'),
    ('<div class="framer-yfhmy0" data-framer-appear-id="yfhmy0" data-framer-name="Image 03"', '<div class="framer-yfhmy0" data-framer-appear-id="yfhmy0" data-framer-name="Image 03" data-editable-field="bannerUrl" data-editable-type="image"'),
    # Large hero Grid 3x fan
    ('<div class="framer-1u0qqnx" data-framer-name="Image 01"', '<div class="framer-1u0qqnx" data-framer-name="Image 01" data-editable-field="bannerUrl" data-editable-type="image"'),
    ('<div class="framer-1i9qvch" data-framer-name="Image 02"', '<div class="framer-1i9qvch" data-framer-name="Image 02" data-editable-field="avatarUrl" data-editable-type="image"'),
    ('<div class="framer-nswwcw" data-framer-name="Image 03"', '<div class="framer-nswwcw" data-framer-name="Image 03" data-editable-field="bannerUrl" data-editable-type="image"')
]

for target, replacement in replacements:
    count = html.count(target)
    print(f"Target '{target}' found: {count} time(s)")
