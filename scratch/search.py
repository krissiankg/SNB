import os
import sys

def search_files(directory, query):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if 'dist' in dirs:
            dirs.remove('dist')
        for file in files:
            if file.endswith(('.css', '.jsx', '.html', '.js')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        for i, line in enumerate(f, 1):
                            if query.lower() in line.lower():
                                print(f"{path}:{i}: {line.strip()}")
                except Exception as e:
                    pass

if __name__ == '__main__':
    if len(sys.argv) > 1:
        search_files('.', sys.argv[1])
    else:
        print("Usage: python search.py <query>")
