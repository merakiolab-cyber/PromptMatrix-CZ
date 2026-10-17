import { PromptTemplate } from '../../types';

export const WIN11_REFACTOR_TEMPLATES: PromptTemplate[] = [
  {
    id: 'win11-vibecode-refactor',
    title: 'Windows 11 Vibe Coding: Post-Audit, Security & Performance Refactor',
    description: 'Komplexní audit, refaktoring, optimalizace výkonu a security hardening pro Windows 11 aplikace vzniklé vibecodingem. Použij před releasem nebo nasazením do produkce.',
    modelId: 'cursor',
    categoryId: 'vibecoding',
    defaultWorkflow: 'repo-filesystem',
    defaultPhase: 'polish',
    tags: ['Windows 11', 'Security', 'Refactor', 'Vibe Coding', 'Post-Audit', 'Hardening'],
    authorFeedTip: 'Tento skill eliminuje technický dluh, uzavírá bezpečnostní díry a zajišťuje plynulý běh na Windows 11.',
    createdAt: '2026-10-17',
    variables: [
      {
        id: 'win11-stack',
        key: 'tech_stack',
        label: 'Technologický stack aplikace',
        type: 'text',
        value: 'Tauri + React + TypeScript / Windows 11',
        required: true
      },
      {
        id: 'win11-scope',
        key: 'audit_focus',
        label: 'Hlavní zaměření auditu',
        type: 'text',
        value: 'Security Hardening, IPC izolace, Hardcoded secrets a odstranění vibecoding odpadu',
        required: true
      }
    ],
    templateString: `---
name: win11-vibecode-refactor
description: Komplexní audit, refaktoring, optimalizace výkonu a security hardening pro Windows 11 aplikace vzniklé vibecodingem. Použij před releasem nebo nasazením do produkce.
---

# Windows 11 Vibecoding Post-Audit & Refactor Skill

Tento skill slouží jako striktní průvodce pro audit a refaktoring aplikací vygenerovaných rychlým prototypováním (vibecoding) pro stack: {{tech_stack}}.
Hlavní zaměření: {{audit_focus}}. Cílem je eliminovat technický dluh, uzavřít bezpečnostní díry, zrychlit odezvu UI a zajistit soulad se standardy Windows 11.

---

## Fáze 1: Bezpečnostní audit (Security First)

AI aplikace vzniklé rychlým vibecodingem mívají nejkritičtější mezery v bezpečnosti. Zkontroluj a oprav:

1. **Hardcoded Secrets a API klíče**
   - Najdi a odstraň všechny natvrdo zapsané tokeny, privátní klíče nebo hesla.
   - Převeď citlivá data do Windows Credential Manageru (\`PasswordVault\`), chráněných environment variables nebo zabezpečeného lokálního šifrovaného úložiště (DPAPI).
2. **IPC a WebView izolace (pokud jde o Tauri / Electron / WebView2)**
   - Ověř, že \`contextIsolation: true\` a \`nodeIntegration: false\`.
   - Zajisti validaci všech IPC zpráv (whitelist povolených kanálů a schémat).
   - Aktivuj striktní Content Security Policy (CSP).
3. **Validace vstupů a bezpečné spouštění procesů**
   - Zakaž přímé volání shellu (\`exec\`, \`system\`, \`cmd /c\`, PowerShell) s dynamickými parametry od uživatele. Nahraď je parametrizovaným voláním procesů bez shell interpretu.
   - Sanitizuj všechny souborové cesty proti Path Traversal (\`..\\..\\\`).
4. **Oprávnění aplikace (App Capabilities)**
   - V manifestu aplikace (např. \`Package.appxmanifest\`) odstraň všechna zbytečná oprávnění (webcam, location, broadFileSystemAccess), pokud je aplikace nutně nevyžaduje.

---

## Fáze 2: Optimalizace výkonu a Windows 11 integrace

1. **Reakce UI a renderování**
   - Žádná blokující I/O nebo CPU-intenzivní operace nesmí běžet na hlavním UI threadu. Přesuň je do Workerů / \`Task.Run\` / background threadů.
   - Optimalizuj re-rendery (memoizace komponent, virtualizace dlouhých seznamů a scroll views).
2. **Paměť a úniky prostředků (Resource Leaks)**
   - Zkontroluj nedořešené event listenery, streamy, souborové handly a nezavřené databázové/IPC spoje.
   - Otestuj lifecycle aplikace při uspání/probuzení a minimalizaci do systémové lišty (system tray).
3. **Start-up time (Studený start)**
   - Implementuj lazy loading pro moduly/knihovny, které nejsou nutné při startu.
   - Zmenši velikost bundlu/binárky (tree-shaking, odstranění nepoužitých dev dependencí).

---

## Fáze 3: Čistý kód a architektura

1. **Eliminace vibecoding odpadu**
   - Smaž mrtvý kód, zakomentované bloky, zapomenuté \`console.log\` / provizorní debug printy a nepoužívané soubory.
   - Sjednoť typování (nahraď zástupné typy typu \`any\` za konkrétní interface/typy).
2. **Struktura a modularita**
   - Rozbij přerostlé monolitické soubory (typicky 500+ řádků komponenty) na malé jednoúčelové moduly (Separation of Concerns).
   - Sjednoť formátování a pojmenování (kebab-case soubory, PascalCase komponenty/třídy).
3. **Robustní Error Handling**
   - Nahraď prázdné \`catch (e) {}\` smysluplným logováním a uživatelski přívětivými chybovými hláškami.
   - Zaveď globální zachytávání neošetřených výjimek (Unhandled Exception Handler), aby aplikace potichu nespadla bez stopy v logu.

---

## Pracovní postup agenta při refaktoringu

Při zahájení práce postupuj v těchto krocích:

1. **Inventura projektu:** Identifikuj tech stack a strukturu složek.
2. **Statická analýza:** Vypiš seznam kritických zranitelností a výkonnostních úzkých hrdel.
3. **Prioritizovaný plán změn:** Představ uživateli seznam změn seřazený od kritické security po kosmetické úpravy.
4. **Inkrementální refaktoring:** Nikdy nepřepisuj celou aplikaci najednou. Prováděj změny modul po modulu s ověřením funkčnosti.`
  }
];
