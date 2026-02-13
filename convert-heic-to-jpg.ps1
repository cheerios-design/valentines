# Convert HEIC to JPG
$sourceFolder = "h:\valentines\public\game-photos"
$heicFiles = Get-ChildItem -Path $sourceFolder -Filter "*.HEIC"

Write-Host "Found $($heicFiles.Count) HEIC files"
Add-Type -AssemblyName System.Drawing

foreach ($file in $heicFiles) {
    try {
        $inputPath = $file.FullName
        $outputPath = Join-Path $sourceFolder ($file.BaseName + ".jpg")
        Write-Host "Converting $($file.Name)..."
        $image = [System.Drawing.Image]::FromFile($inputPath)
        $image.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $image.Dispose()
        Write-Host "Success: $($file.BaseName).jpg"
    } catch {
        Write-Host "Failed: $($file.Name) - $($_.Exception.Message)"
    }
}

Write-Host "Done!"
