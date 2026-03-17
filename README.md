> **Shopware 6.6?** See branch [`main`](https://github.com/blueroger/BluerogerCmsExtensions/tree/main) for the Shopware 6.6 version.

# BluerogerCmsExtensions

Shopware 6 Plugin mit erweiterten CMS-Blöcken für flexible Spaltenlayouts.

---

## Funktionen

- **blr-two-col-flex** — Zwei-Spalten-Block mit wählbarer Spaltenbreite (50/50, 33/66, 66/33, 25/75, 75/25) und CSS-Klassen pro Spalte
- **blr-three-col-flex** — Drei-Spalten-Block mit wählbarer Spaltenbreite (33/33/33, 25/50/25, 50/25/25, 25/25/50) und CSS-Klassen pro Spalte

Alle Blöcke sind:
- Konfigurierbar über das Shopware CMS-Backend
- Mit einstellbaren Bootstrap-Breakpoints — ab welcher Bildschirmbreite Spalten nebeneinander erscheinen
- Mit Deinstallations-Schutz — Inhalte bleiben auch nach Plugin-Entfernung erhalten (siehe unten)

![Block-Picker](screenshots/block-picker.png)

---

## Voraussetzungen

| Anforderung | Version |
|---|---|
| Shopware | 6.7.x |
| PHP | ^8.2 |

---

## Installation

**Über das Backend (empfohlen):**
ZIP-Datei aus dem [GitHub-Release](https://github.com/blueroger/BluerogerCmsExtensions/releases) herunterladen,
dann im Shopware-Backend unter *Einstellungen → System → Plugins → Plugin hochladen* installieren und aktivieren.

**Über die Konsole:**
```bash
bin/console plugin:refresh
bin/console plugin:install --activate BluerogerCmsExtensions
bin/console cache:clear
```

---

## Blöcke

### blr-two-col-flex — Zwei Spalten (flexibel)

![blr-two-col-flex Konfiguration](screenshots/two-col-flex.png)

Zwei-Spalten-Block mit konfigurierbarer Spaltenbreite.

**Konfiguration:**
- Spaltenbreite: 50/50, 33/66, 66/33, 25/75, 75/25
- Responsive Breakpoint: ab welcher Bildschirmbreite Spalten nebeneinander erscheinen
  (MD ab 768px / LG ab 992px / XL ab 1200px) — Standard: MD
- CSS-Klasse links — beliebige Bootstrap- oder eigene CSS-Klassen direkt am Spalten-Div
- CSS-Klasse rechts — beliebige Bootstrap- oder eigene CSS-Klassen direkt am Spalten-Div

**Slot-Kompatibilität:** `image-text` (Shopware Core) — siehe Abschnitt "Deinstallations-Schutz"

---

### blr-three-col-flex — Drei Spalten (flexibel)

![blr-three-col-flex Konfiguration](screenshots/three-col-flex.png)

Drei-Spalten-Block mit konfigurierbarer Spaltenbreite.

**Konfiguration:**
- Spaltenbreite: 33/33/33, 25/50/25, 50/25/25, 25/25/50
- Responsive Breakpoint: ab welcher Bildschirmbreite Spalten nebeneinander erscheinen
  (MD ab 768px / LG ab 992px / XL ab 1200px) — Standard: MD
- CSS-Klasse links, mitte, rechts — beliebige Bootstrap- oder eigene CSS-Klassen direkt am Spalten-Div

**Slot-Kompatibilität:** `text-three-column` (Shopware Core) — siehe Abschnitt "Deinstallations-Schutz"

---

## Deinstallations-Schutz

Shopware-Plugins, die eigene CMS-Block-Typen einführen, haben ein grundsätzliches Problem:
Wenn das Plugin deinstalliert wird, kennt Shopware die Block-Typen nicht mehr. CMS-Seiten die
diese Blöcke enthalten werden unbrauchbar — Layouts brechen, Inhalte sind nicht mehr erreichbar.

Dieses Plugin löst das Problem mit einer automatischen Migration:

**Bei der Deinstallation** sucht das Plugin alle CMS-Blöcke im System die es selbst erstellt hat
und schreibt den Block-Typ auf einen kompatiblen Standard-Shopware-Block um:

| Plugin-Block | Fallback-Block (Shopware Core) |
|---|---|
| `blr-two-col-flex` | `image-text` |
| `blr-three-col-flex` | `text-three-column` |

Die Slot-Namen der Plugin-Blöcke wurden bewusst identisch zu den Core-Blöcken gewählt
(`left`, `right` bzw. `left`, `center`, `right`). Das bedeutet: alle Inhalte der Slots bleiben
erhalten und werden nach der Deinstallation weiterhin korrekt gerendert.

**Bei einer Neuinstallation** erkennt das Plugin die migrierten Blöcke anhand eines internen
Markers und stellt die Original-Block-Typen wieder her — inklusive der gespeicherten Konfiguration
(Spaltenbreite, CSS-Klassen). Inhalte bleiben vollständig erhalten.

**Wichtig:** Diese Migration läuft nur bei einer echten Deinstallation, nicht bei Plugin-Updates.
Beim Deaktivieren des Plugins ohne Deinstallation bleibt alles unverändert.

---

## Entwicklung

### Lokales Setup

```bash
composer install
```

### Qualitätssicherung

```bash
# Automatische Formatierung (PSR-12)
composer cs-fix

# Statische Analyse (PHPStan Level 8) + CS-Check
composer qa
```

### Nach Änderungen im Plugin

```bash
# Nach JavaScript/Admin-Änderungen (Shopware 6.7 — Vite-Format, kein manuelles Kopieren nötig)
ssh shopware67
cd /var/www/html
rm -rf custom/plugins/BluerogerCmsExtensions/src/Resources/public/administration/assets
rm -rf custom/plugins/BluerogerCmsExtensions/src/Resources/public/administration/.vite
shopware-cli extension build custom/plugins/BluerogerCmsExtensions
bin/console cache:clear

# Nach PHP/Twig-Änderungen
bin/console cache:clear
```

### CI/CD

GitHub Actions prüft bei jedem Push:
- `composer validate`
- PHPStan Level 8 (via Extension Verifier)
- PHP CS Fixer (via Extension Verifier)
- ESLint für Administration-JavaScript (via Extension Verifier)

---

## Update von Version 1.x (Shopware 6.6) auf Version 2.x (Shopware 6.7)

CMS-Block-Inhalte bleiben beim Update erhalten — sie liegen in der Datenbank, nicht im Plugin-Code.

**Über Composer:**
```bash
# composer.json des Shops anpassen:
"blueroger/cms-extensions": "^2.0"

composer update blueroger/cms-extensions
bin/console plugin:refresh
```

**Über das Backend:**
ZIP aus dem [GitHub-Release](https://github.com/blueroger/BluerogerCmsExtensions/releases) herunterladen
und als Plugin-Update hochladen.

---

## Entwickelt mit KI

Dieses Plugin wurde vollständig mit KI-Unterstützung entwickelt — von der Architektur bis zur fertigen Codebasis.

**Blueroger:** Konzept, Anforderungen, Scope-Entscheidungen, manuelle Tests, Build-Workflow und finale Freigaben
**Claude AI:** Architektur, technische Entscheidungen, Dokumentation und Qualitätssicherung
**Cursor:** Implementierung — Code-Generierung auf Basis der Architektur-Vorgaben

---

## Lizenz

[MIT](LICENSE)