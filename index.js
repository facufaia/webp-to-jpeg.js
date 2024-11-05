const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Directorio de entrada y salida
const inputDir = "./webp"; // Cambia esto al nombre de tu carpeta con archivos .webp
const outputDir = "./jpeg";

// Crea la carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Lee todos los archivos en la carpeta de entrada
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error al leer la carpeta de entrada:", err);
    return;
  }

  // Filtra solo los archivos con extensión .webp
  const webpFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".webp"
  );

  if (webpFiles.length === 0) {
    console.log("No se encontraron archivos .webp en la carpeta de entrada.");
    return;
  }

  // Procesa cada archivo .webp
  webpFiles.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputFileName = path.basename(file, ".webp") + ".jpeg";
    const outputPath = path.join(outputDir, outputFileName);

    // Convierte el archivo .webp a .jpeg usando sharp
    sharp(inputPath)
      .jpeg() // Establece el formato de salida a JPEG
      .toFile(outputPath)
      .then(() => {
        console.log(`Convertido: ${file} -> ${outputFileName}`);
      })
      .catch((err) => {
        console.error(`Error al convertir ${file}:`, err);
      });
  });
});
