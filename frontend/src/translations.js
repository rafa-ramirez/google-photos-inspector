
export const translations = {
  en: {
    title: "Google Photos Inspector",
    tagline: "Analyze your local Google Takeout metadata. Ensure your photos are properly organized and tagged with location data.",
    goToAnalyzer: "Go to Analyzer",
    keyFeatures: "Key Features:",
    feature1: "✅ Validate photo filename formats",
    feature2: "🔗 Direct Google Photos links for easy access",
    feature3: "📊 Analyze EXIF metadata for location data",
    feature4: "📥 Support for Google Takeout exports",

    analyzerTitle: "📝 Local EXIF Metadata and Filename Analyzer",
    uploadTitle: "Choose Google Takeout Folder",
    uploadDescription: "Select your Google Takeout export folder. The tool will instantly analyze all media filenames for formatting issues and check their JSON metadata for missing location data.",
    privacyNote: "Privacy & Security:",
    privacyText: "This tool is 100% serverless. When your browser asks to \"Upload files\", it simply means granting this app permission to read them locally. No data is ever sent to GitHub, any server, or the internet. All analysis happens entirely in your browser's memory.",
    chooseFolder: "Choose Folder",
    analyzing: "Analyzing...",
    processedFiles: "Processed {total} media item(s) from {selected} selected files.",
    foundIssues: "Found {count} items with issues",
    metadataIssues: "Metadata issues:",
    taken: "Taken:",
    viewInGooglePhotos: "View in Google Photos",
    successMessage: "Successfully processed {total} media item(s). All items have valid filenames and EXIF location data!",
    selectFilesError: "Please select files to analyze",
    analysisFailed: "Analysis failed",
    allIssues: "All Issues",

    issues: {
      has_parentheses: "has parentheses",
      has_numeric_suffix: "has numeric suffix",
      has_edited_suffix: "has edited suffix",
      has_copy_suffix: "has copy suffix",
      wrong_format: "wrong format",
      missing_exif_location_data: "missing EXIF location data",
      missing_metadata_file: "missing JSON metadata file"
    }
  },
  es: {
    title: "Google Fotos Inspector",
    tagline: "Analiza los metadatos de tu Google Takeout local. Asegúrate de que tus fotos estén bien organizadas y tengan datos de ubicación.",
    goToAnalyzer: "Ir al Analizador",
    keyFeatures: "Características principales:",
    feature1: "✅ Validar formatos de nombre de archivo",
    feature2: "🔗 Enlaces directos a Google Fotos",
    feature3: "📊 Analizar metadatos EXIF de ubicación",
    feature4: "📥 Soporte para exportaciones de Google Takeout",

    analyzerTitle: "📝 Analizador Local de Metadatos EXIF y Nombres de Archivo",
    uploadTitle: "Elegir Carpeta de Google Takeout",
    uploadDescription: "Selecciona tu carpeta de exportación de Google Takeout. La herramienta analizará al instante los nombres de archivo y los metadatos JSON en busca de errores.",
    privacyNote: "Privacidad y Seguridad:",
    privacyText: "Esta herramienta es 100% sin servidor. Cuando tu navegador pide \"Subir archivos\", solo significa conceder permiso para leerlos localmente. No se envía ningún dato a GitHub ni a internet. Todo el análisis ocurre en la memoria de tu navegador.",
    chooseFolder: "Elegir Carpeta",
    analyzing: "Analizando...",
    processedFiles: "Procesados {total} elementos de {selected} archivos seleccionados.",
    foundIssues: "Encontrados {count} elementos con problemas",
    metadataIssues: "Problemas de metadatos:",
    taken: "Fecha:",
    viewInGooglePhotos: "Ver en Google Fotos",
    successMessage: "¡Procesados con éxito {total} elementos! Todos tienen nombres válidos y datos de ubicación EXIF.",
    selectFilesError: "Por favor, selecciona archivos para analizar",
    analysisFailed: "Error en el análisis",
    allIssues: "Todos los problemas",

    issues: {
      has_parentheses: "tiene paréntesis",
      has_numeric_suffix: "tiene sufijo numérico",
      has_edited_suffix: "tiene sufijo 'edited'",
      has_copy_suffix: "tiene sufijo 'copy'",
      wrong_format: "formato incorrecto",
      missing_exif_location_data: "faltan datos de ubicación EXIF",
      missing_metadata_file: "falta el archivo JSON de metadatos"
    }
  }
};
