#!/bin/bash

folder="./"
file_names=""
for file in "$folder"/*; do
    if [ -f "$file" ]; then
        file_names+="\"$(basename "$file")\","
    fi
done

file_names="${file_names%,}"
echo "$file_names"
read -p "Naciśnij Enter, aby zakończyć..."