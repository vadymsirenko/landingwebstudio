# AGENTS.md

## 🎨 Color Palette Usage
- All color styles in the project must be taken from the `reset.css` file.  
- When creating a new component, always use variables or classes already defined in `reset.css`.  
- Do not hardcode HEX / RGB values directly in components. If a new color is needed, add it first to `reset.css` and document it.  

## 🌐 Localization
- The project supports three languages: **Polish (pl)**, **Ukrainian (uk)**, **English (en)**.  
- All text resources must be stored in separate JSON files (`/locales/en.json`, `/locales/uk.json`, `/locales/pl.json`).  
- When adding a new UI element, always add the translation key in **all locale files at the same time**.  
- Use dynamic loading of translations via an i18n library.  
- Always verify that text in any localization **does not overflow the parent container**. If there is a risk, apply responsive styles (`word-wrap`, `flex`, `overflow`, etc.).  

## 🔤 Encoding
- All project files must use **UTF-8 (without BOM)** encoding.  
- Make sure there are no broken characters when switching between locales.  
- Tests must include validation of proper encoding and rendering of text for all supported languages.  

## 🖥️ Responsive Design (Computer First)
- The layout must follow the **computer-first** approach.  
- Use the following breakpoints:
  - **320px** (extra small)  
  - **360px** (small phones)  
  - **768px** (tablets)  
  - **1024px** (small laptops)  
  - **1400px** (large laptops / desktops)  
  - **1920px** (full HD monitors)  
- Base layout should be designed for **desktop first**, then adapted for smaller screens using `@media`.  
- All components must remain readable and preserve layout integrity across all supported languages.  

## ✅ Testing
- After making changes, always verify:
  - color consistency with the definitions in `reset.css`;  
  - proper loading of translations in all three languages;  
  - correct text rendering in browsers without encoding issues;  
  - responsiveness of the interface at **all breakpoints (320, 360, 768, 1024, 1400, 1920)**;  
  - text does not overflow parent containers when switching languages.  
