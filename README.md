# Catalog Tehnic SoftPrim

Acesta este un proiect de tip catalog de produse, structurat cu un backend în Node.js (Express) și un frontend simplu Vanilla JS + TailwindCSS, conectat la o bază de date MySQL.

## 1. Tehnologii folosite

*   **Backend:** Node.js, cu framework-ul [Express.js](https://expressjs.com/) (versiunea 5.2.1)
*   **Bază de date:** MySQL sau MariaDB (testat pe versiunile >= 8.0), conectat prin biblioteca `mysql2` (v3.22.3).
*   **Frontend:** HTML5, Vanilla JavaScript, [Tailwind CSS](https://tailwindcss.com/) integrat via CDN pentru stilizare rapidă.

## 2. Pași de instalare

### Baza de date
1. Asigurați-vă că aveți serverul MySQL pornit pe mașina locală.
2. Autentificați-vă și creați baza de date `softprim_test` folosind scriptul furnizat.
   Din terminal, în folderul rădăcină al proiectului:
   ```bash
   mysql -u root -p < setup.sql
   ```
   *(Scriptul va curăța vechile tabele, va crea schemele noi și va insera datele de test pentru categorii și produse).*
   Dacă baza de date `softprim_test` nu a fost creată încă, va trebui să o creați manual din consola mysql:
   ```sql
   CREATE DATABASE softprim_test;
   USE softprim_test;
   source setup.sql;
   ```

### Backend
1. Deschideți un terminal în folderul proiectului.
2. Instalați dependențele necesare rulând:
   ```bash
   npm install
   ```

### Frontend
Frontend-ul nu necesită procese de instalare complexe sau module (npm). Este format exclusiv din fișierul `index.html` care integrează funcționalitățile direct în browser.

## 3. Configurare

### Conectarea la MySQL (Backend)
Verificați și editați, dacă e nevoie, detaliile de conectare în fișierul `server.js` (liniile 10-15):
```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Modificați dacă user-ul dvs. MySQL este diferit (ex: admin)
    password: 'root',  // Modificați cu parola dvs. reală
    database: 'softprim_test'
});
```

### Configurare URL API (Frontend)
URL-ul către API este setat default în `index.html` (linia 51). Dacă porniți backend-ul pe un alt port, va trebui să ajustați această constantă:
```javascript
const API_BASE = 'http://localhost:3000/api';
```

## 4. Pornire aplicație

1. **Pornire Backend:**
   În terminalul deschis în folderul proiectului rulați:
   ```bash
   node server.js
   ```
   *Terminalul va afișa mesajul `Backend running on http://localhost:3000`, confirmând portul implicit.*

2. **Afișare Frontend:**
   Puteți deschide interfața în două moduri:
   - **Simplu:** Dați dublu-click direct pe fișierul `index.html` din File Explorer pentru a-l deschide în browser.
   - **Recomandat (Server Static):** Puteți folosi o extensie precum **Live Server** din VS Code sau să porniți un server static (ex. `npx serve .`), apoi accesați link-ul primit (ex. `http://localhost:5500`).

## 5. Exemple de apel API (cURL)

Puteți testa backend-ul cu aceste comenzi (într-un terminal Bash / PowerShell):

**A. Obținerea tuturor categoriilor:**
```bash
curl -X GET http://localhost:3000/api/categories
```

**B. Obținerea tuturor produselor (fără filtru):**
```bash
curl -X GET http://localhost:3000/api/products
```

**C. Filtrarea produselor după ID-ul unei categorii (exemplu: categoria cu id=1):**
```bash
curl -X GET "http://localhost:3000/api/products?category_id=1"
```

## 6. Capturi de ecran

*(Aici vor apărea imaginile cu aplicația finalizată)*

**Interfață Desktop (Produse și Filtru)**  
![Interfață Desktop](https://via.placeholder.com/800x450.png?text=Interfata+Desktop+Aici)

**Interfață Mobilă (Responsive)**  
![Interfață Mobilă](https://via.placeholder.com/400x600.png?text=Interfata+Mobila+Aici)

---

## 7. Decizii tehnice și Justificări

*   **Tailwind CSS via CDN:** A fost ales pentru a construi o interfață rapidă, robustă și modernă, fară a forța evaluatorul să ruleze scripturi de build complicate pentru frontend. Dat fiind rolul aplicației (test funcțional/catalog simplu), varianta CDN elimină complexitatea unui boilerplate sau setup cu Vite/Webpack.
*   **Vanilla JS în loc de un Framework React/Vue:** Pentru afișarea și filtrarea dinamică dintr-un singur ecran, funcțiile native DOM împreună cu `fetch()` și `async/await` furnizează tot necesarul de reactivitate, menținând codul ușor de urmărit și limitând supraîncărcarea proiectului.
*   **Structura Backend Simplificată (Express):** Endpoint-urile au fost integrate direct în `server.js` pentru claritate și rapiditate în depanare. În contextul mai larg al unei aplicații reale, rutele ar fi fost divizate în controllere și modele.
*   **CORS (Cross-Origin Resource Sharing):** Am utilizat middleware-ul `cors()` la modul general pentru a asigura că testarea frontend-ului dintr-un server de fișiere statice (Live Server) sau direct ca protocol `file:///` nu va fi împiedicată de restricții de securitate inutile în mediul local.