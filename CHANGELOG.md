# Changelog

Alle nennenswerten Änderungen an diesem Plugin werden in dieser Datei dokumentiert.

Format: [Keep a Changelog](https://keepachangelog.com/de/1.0.0/)
Versionierung: [Semantic Versioning](https://semver.org/lang/de/)

---

## [Unreleased]

---

## [2.0.0] - 2026-03-17

### Shopware 6.7 Kompatibilität

- Shopware-Anforderung auf `~6.7.0` angehoben
- Pre-built Admin-JS im Vite-Format (`assets/` + `.vite/entrypoints.json`) — Shopware 6.7 lädt Plugin-Assets über `ViteFileAccessorDecorator` statt festem Pfad
- Kein manuelles Kopieren der gebauten JS-Dateien mehr nötig (6.7-spezifisch)
- Alle bestehenden Funktionen unverändert — Admin-Architektur, Config-UI, Storefront, PHP

### Hinweise zum Update von 1.x

- CMS-Block-Inhalte bleiben beim Update erhalten (liegen in der Datenbank)
- Uninstall-Migration läuft nur bei echter Deinstallation, nicht beim Code-Update
- Shopware 6.6 Nutzer bleiben auf Version 1.x (`main`-Branch)

---

## [1.0.0] - 2026-03-11

### Hinzugefügt

- **blr-two-col-flex**: Zwei-Spalten-Block mit konfigurierbarer Spaltenbreite (50/50, 33/66, 66/33, 25/75, 75/25) und CSS-Klassen pro Spalte
- **blr-three-col-flex**: Drei-Spalten-Block mit konfigurierbarer Spaltenbreite (33/33/33, 25/50/25, 50/25/25, 25/25/50) und CSS-Klassen pro Spalte
- Konfiguration über Sidebar im CMS-Backend (block.customFields)
- Responsive Layout (col-12 col-md-* via Bootstrap) mit konfigurierbarem Breakpoint (MD/LG/XL)
- Uninstall-Migration: Blöcke werden bei Deinstallation auf kompatible Core-Typen zurückgeführt (blr-two-col-flex → image-text, blr-three-col-flex → text-three-column)
- Reinstall-Migration: Original-Blocktypen werden bei Neuinstallation wiederhergestellt
- Snippets DE + EN für alle Blöcke und Konfigurationsfelder (de-DE.json, en-GB.json)
- Admin-Komponenten mit Composition API (Vue 3 kompatibel)
- Meteor UI Komponenten (mt-card, mt-select, mt-text-field)
- Pre-built Admin-JS/CSS für Installation ohne manuellen Build-Schritt
- PHPStan Level 8 + PHP CS Fixer Konfiguration
- GitHub Actions CI (composer validate + Extension Verifier)