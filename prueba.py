import os

# Define el límite de caracteres
LIMIT = 128

# Ruta del proyecto (modificar para apuntar a la raíz de tu proyecto)
project_root = r'C:\Users\Dani\Documents\myPersonalAppWeb\myPersonalAppWeb\apps'

def check_file_names(root_dir):
    """Verifica la longitud de los nombres de archivos y muestra los que exceden el límite."""
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.nx']]

        for file in files:
            full_path = os.path.join(root, file)
            if len(full_path) > LIMIT:
                print(f"Archivo supera {LIMIT} caracteres: {full_path} ({len(full_path)} caracteres)")

# Ejecutar la función solo en la carpeta "apps"
check_file_names(project_root)
