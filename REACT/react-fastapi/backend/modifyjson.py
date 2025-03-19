import json
import os
filenames = os.listdir("configs")

for file in filenames:
    with open(f'.\\configs\\{file}', 'r+') as f:
        data = json.load(f)
        breakpoint()
        data['iteretion'] += 1 # <--- add `id` value.
        f.seek(0)        # <--- should reset file position to the beginning.
        json.dump(data, f, indent=4)
        f.truncate()  