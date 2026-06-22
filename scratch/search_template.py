import os

template_path = r"c:\Users\GIGABYTE\Downloads\fusion-starter-529\public\templates\daniel-cross.html"

with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"File loaded. Length: {len(content)}")

# Look for framer-1m8xtt5 or similar
for search in ["1m8xtt5", "Image 01", "B3sqQm", "NZiJk1L"]:
    idx = content.find(search)
    if idx != -1:
        print(f"Found '{search}' at index {idx}. Surrounding:")
        print(content[max(0, idx - 100):min(len(content), idx + 200)])
        print("-" * 50)
    else:
        print(f"'{search}' NOT found.")
        print("-" * 50)
