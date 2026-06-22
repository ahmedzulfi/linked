import re

template_path = r"c:\Users\GIGABYTE\Downloads\fusion-starter-529\public\templates\daniel-cross.html"

with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's search for styles for framer-1jacnvb, framer-c10xhm, framer-1m8xtt5
classes_to_check = ["framer-1jacnvb", "framer-c10xhm", "framer-1m8xtt5", "framer-159kq9", "framer-wv37wg"]

for cls in classes_to_check:
    print(f"Searching for CSS rules of class: {cls}")
    # Regex to find .class { ... }
    matches = re.finditer(r"\." + cls + r"\b\s*\{([^}]*)\}", content)
    found = False
    for match in matches:
        print(f"  Match: {match.group(0)}")
        found = True
    if not found:
        print(f"  No exact class rules found.")
    print("-" * 50)
