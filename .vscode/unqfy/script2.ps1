Set-Location 'C:\Users\Nikco\Documents\Unqui\Cloud\Cloud_2021'
Remove-Item 'C:\Users\Nikco\Documents\Unqui\Cloud\Cloud_2021\data.json'

node main.js addArtist 'Muse' 'Unintended' #id 1

node main.js addAlbum 1 'Showbiz' '1999' # id 2

node main.js addTrack 2 'Unintended' 204 'Rock' # id 3
node main.js addTrack 2 'Sunburn' 204 'Rock' # id 4

node main.js createPlaylist PopRockSongs Pop Rock 900 # id 5
