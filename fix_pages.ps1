$pages = @(
  'src\app\why-space-funding\page.tsx',
  'src\app\merger-acquisition\page.tsx',
  'src\app\sports\page.tsx',
  'src\app\our-tech\page.tsx',
  'src\app\faq\page.tsx',
  'src\app\blog\page.tsx'
)

foreach ($p in $pages) {
  $c = Get-Content -LiteralPath $p -Raw
  $c = $c -replace 'bg-black(?![/])', 'bg-white'
  $c = $c -replace 'bg-\[#111111\]', 'bg-gray-50'
  $c = $c -replace 'bg-\[#0d0d0d\]', 'bg-gray-50'
  $c = $c -replace 'bg-\[#1a1a1a\]', 'bg-gray-100'
  $c = $c -replace 'bg-\[#2a2a2a\]', 'bg-gray-200'
  $c = $c -replace 'text-white/80', 'text-gray-700'
  $c = $c -replace 'text-white/70', 'text-gray-600'
  $c = $c -replace 'text-white/60', 'text-gray-500'
  $c = $c -replace 'text-white/50', 'text-gray-500'
  $c = $c -replace 'text-white/40', 'text-gray-400'
  $c = $c -replace 'text-white/30', 'text-gray-400'
  $c = $c -replace 'text-white/20', 'text-gray-300'
  $c = $c -replace '(?<!\w)text-white(?![/\w])', 'text-[#2B2B2B]'
  $c = $c -replace 'bg-white/10', 'bg-gray-100'
  $c = $c -replace 'bg-white/5', 'bg-gray-50'
  $c = $c -replace 'bg-white/20', 'bg-gray-100'
  $c = $c -replace 'border-white/10', 'border-gray-200'
  $c = $c -replace 'border-white/20', 'border-gray-300'
  $c = $c -replace 'hover:bg-\[#2a2a2a\]', 'hover:bg-gray-200'
  $c = $c -replace 'hover:bg-\[#1a1a1a\]', 'hover:bg-gray-100'
  $c = $c -replace 'hover:bg-white/5', 'hover:bg-gray-50'
  $c = $c -replace 'from-\[#111111\] to-transparent', 'from-gray-50 to-transparent'
  Set-Content -LiteralPath $p -Value $c -NoNewline
  Write-Host "Replaced dark->light: $p"
}

# Now revert hero sections back to dark for pages that have video heroes
$heroPages = @(
  'src\app\why-space-funding\page.tsx',
  'src\app\merger-acquisition\page.tsx',
  'src\app\sports\page.tsx',
  'src\app\our-tech\page.tsx',
  'src\app\blog\page.tsx'
)
foreach ($p in $heroPages) {
  $c = Get-Content -LiteralPath $p -Raw
  # Revert the main hero section (with overflow-hidden - it's the video hero)
  $c = $c -replace 'bg-white text-\[#2B2B2B\] overflow-hidden', 'bg-black text-white overflow-hidden'
  # Also handle if hero has min-h pattern
  $c = $c -replace 'bg-white text-\[#2B2B2B\] min-h-', 'bg-black text-white min-h-'
  Set-Content -LiteralPath $p -Value $c -NoNewline
  Write-Host "Reverted hero: $p"
}

Write-Host "All done!"
