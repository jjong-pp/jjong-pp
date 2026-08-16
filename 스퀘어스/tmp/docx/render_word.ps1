$ErrorActionPreference = 'Stop'

$workspaceDir = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$docxItem = Get-ChildItem -LiteralPath (Join-Path $workspaceDir 'output\docx') -Filter '*.docx' | Select-Object -First 1
$docxPath = $docxItem.FullName
$renderDir = Join-Path $PSScriptRoot 'v2_render6'
$pdfPath = Join-Path $renderDir ($docxItem.BaseName + '.pdf')

New-Item -ItemType Directory -Path $renderDir -Force | Out-Null
$wordApp = New-Object -ComObject Word.Application
$wordApp.Visible = $false
$wordApp.DisplayAlerts = 0
$wordApp.AutomationSecurity = 3

try {
    $wordDoc = $wordApp.Documents.Open($docxPath, $false, $true, $false)
    $wordDoc.ExportAsFixedFormat($pdfPath, 17)
    $wordDoc.Close($false)
}
finally {
    $wordApp.Quit()
}

Write-Output $pdfPath
