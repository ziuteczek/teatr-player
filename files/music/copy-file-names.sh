#!/bin/bash

# Ścieżka do folderu, którego zawartość chcemy wyświetlić
folder="C:\Users\Stasiu\Desktop\teatr-player\files\music"

# Zmienna do przechowywania nazw plików
file_names=""

# Użyj pętli for do przeglądania plików w folderze i wypisywania ich nazw
for file in "$folder"/*; do
    # Sprawdź, czy element jest plikiem (a nie katalogiem)
    if [ -f "$file" ]; then
        # Dodaj nazwę pliku do zmiennej w cudzysłowie, oddzielając ją przecinkiem
        file_names+="\"$(basename "$file")\","
    fi
done

# Usuń ostatni przecinek, jeśli istnieje
file_names="${file_names%,}"

# Wypisz nazwy plików po przecinku
echo "$file_names"

# Dodaj pauzę na końcu
read -p "Naciśnij Enter, aby zakończyć..."
