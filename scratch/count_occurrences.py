template_path = r"c:\Users\GIGABYTE\Downloads\fusion-starter-529\public\templates\daniel-cross.html"

with open(template_path, 'r', encoding='utf-8') as f:
    html = f.read()

classes = ["framer-1u0qqnx", "framer-1i9qvch", "framer-nswwcw", "framer-1m8xtt5"]

for cls in classes:
    count = html.count(cls)
    print(f"Class '{cls}' occurs {count} time(s) in HTML")
