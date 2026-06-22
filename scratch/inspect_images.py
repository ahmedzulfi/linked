from bs4 import BeautifulSoup

template_path = r"c:\Users\GIGABYTE\Downloads\fusion-starter-529\public\templates\daniel-cross.html"

with open(template_path, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
imgs = soup.find_all('img')

print(f"Total <img> tags in template: {len(imgs)}")

# Let's inspect images 1 to 22
for idx in range(min(22, len(imgs))):
    img = imgs[idx]
    src = img.get('src', '')
    parent_divs = []
    curr = img.parent
    while curr and curr.name != 'body':
        parent_divs.append(f"{curr.name}.{'.'.join(curr.get('class', [])) or ''} (name: {curr.get('data-framer-name')})")
        curr = curr.parent
    
    print(f"\nImage {idx+1}:")
    print(f"  Src: {src}")
    print(f"  Width: {img.get('width')}, Height: {img.get('height')}")
    print(f"  Parent lineage:")
    for p in parent_divs[:4]:  # Show top 4 levels
        print(f"    <- {p}")
    print("-" * 50)
