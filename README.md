# Ziel  
• Im Browser Mozilla Firefox ein fixes Icon in der Symbolleiste  
• Beim Klick auf das Icon öffnet sich ein Popup  
• Das Popup zeigt anklickbare Links zur Root-URL des aktiven Tabs  

# Anleitung  
## 1) Ordner anlegen  
Erstelle einen neuen Ordner, z.B. contao-linker, mit folgender Struktur:  
```
contao-linker/
├─ manifest.json
├─ popup.html
├─ popup.js
└─ icon/
   ├─ contao.png
└─ icons/
   ├─ icon-16.png
   ├─ icon-32.png
   ├─ icon-48.png
   ├─ icon-128.png
   ├─ copy.svg
   └─ box-arrow-up-right.svg
```
Icons kannst du natürlich beliebig wählen.  

## 2) `manifest.json` (Manifest V3)  
## 3) `popup.html`  
## 4) `popup.js`  
## 5) Testweise in Firefox laden  
1.) Firefox öffnen und `about:debugging#/runtime/this-firefox` aufrufen.  
2.) **„Temporäres Add-on laden“** klicken, deinen Ordner wählen und `manifest.json` auswählen.  
3.) Das Add-on bleibt bis zum Neustart installiert.  
## 6) Icon in die Symbolleiste „fixieren“  
• Klicke auf das **Puzzle-Symbol (Erweiterungen)** → bei deinem Add-on **„An Symbolleiste anheften“** wählen (bzw. über das Kontextmenü verwalten)  
## 7) Nutzung  
• Beliebige Webseite, die mit Contao installiert ist  
• Auf das Toolbar-Icon klicken → Popup öffnet sich und zeigt wählbare Verlinkungen an  
## 8) Informationen  
○ Das Icon der Verlinkung `Frontend` wird über das Skript direkt aus der angezeigten Webseite gezogen  
○ Die Verlinkungen öffnen im selben Tab  
○ Icon `externes Öffnen`: Link öffnet in neuem Tab  
○ Icon `kopieren`: Link wird in Zwischenspeicher übernommen  
## 9) Beispiel  
<img width="417" height="437" alt="screenshot3" src="https://github.com/user-attachments/assets/4afcac8c-535d-44ee-a46c-305d18eeab09" />
