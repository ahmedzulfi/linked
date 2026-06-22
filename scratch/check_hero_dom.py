import os
from bs4 import BeautifulSoup

template_path = r"c:\Users\GIGABYTE\Downloads\fusion-starter-529\public\templates\daniel-cross.html"

with open(template_path, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Find the div with class framer-1m8xtt5
hero_imgs = soup.find_all(class_=lambda x: x and 'framer-1m8xtt5' in x)
print(f"Found {len(hero_imgs)} element(s) with class framer-1m8xtt5")

for idx, img_div in enumerate(hero_imgs):
    print(f"\n--- Element {idx+1} ---")
    print(img_div.prettify()[:1000])
    
    # Check parent
    parent = img_div.parent
    print(f"Parent tag: {parent.name}, classes: {parent.get('class')}, name: {parent.get('data-framer-name')}")
    
    # Sibling check (is there any sibling overlay covering it?)
    siblings = list(parent.children)
    print(f"Total siblings: {len(siblings)}")
    for sib in siblings:
        if sib.name:
            print(f"  Sibling tag: {sib.name}, classes: {sib.get('class')}, name: {sib.get('data-framer-name')}, style: {sib.get('style')}")
