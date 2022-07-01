# Reproduction of [graphql-yoga#1331](https://github.com/dotansimha/graphql-yoga/issues/1331)

1. Run `yarn dev`

2. Run the following bash script
  ```bash
  curl 127.0.0.1:3000/api/graphql \
  -F operations='{ "query": "mutation ($file: File!) { saveFile(file: $file) }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@'public/favicon.ico'
  ```
3. Run
  ```bash
  md5 \
    '.next/server/pages/api/favicon.ico' \
    'public/favicon.ico'
  ```
4. See that the file hash is different.
