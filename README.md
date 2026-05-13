# JobLink — Frontend Angular

Application web SPA Angular 21 pour JobLink.

## Stack Technique
- Angular 21
- Tailwind CSS 4
- TypeScript

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/LovelineCHEUTI/JobLink-Frontend.git
cd JobLink-Frontend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
ng serve
```

L'application sera disponible sur `http://localhost:4200`

## Modules

| Module | Interfaces | Description |
|--------|-----------|-------------|
| Auth | 3 | Splash, Login, Register |
| Client | 6 | Accueil, Recherche, Profil prestataire, Demande, Mes demandes, Avis |
| Prestataire | 5 | Dashboard, Demandes, Services, Profil, Abonnement |
| Admin | 5 | Dashboard, Utilisateurs, Prestataires, Catégories, Abonnements |
| Notifications | 1 | Centre de notifications |
| Profil Partagé | 1 | Édition profil |

## Structure du projet
src/app/
├── core/
│   ├── services/
│   ├── guards/
│   └── interceptors/
├── features/
│   ├── auth/
│   ├── client/
│   ├── provider/
│   ├── admin/
│   └── shared-pages/
└── app.routes.ts
## Build de production
```bash
ng build --configuration=production
```