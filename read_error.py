with open('error.html', 'r', encoding='utf-8') as f:
    content = f.read()
    if "Exception Value:" in content:
        start = content.find("Exception Value:")
        end = content.find("</th>", start)
        print(content[start:end])
    if "no such table" in content:
        print("FOUND: no such table error")
        idx = content.find("no such table")
        print(content[idx:idx+100])
