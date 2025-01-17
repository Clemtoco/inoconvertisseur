# Roadmap

Ce document liste les potentielles futures évolutions et fonctionnalités à apporter à inoconvertisseur. Ces idées visent à enrichir l'expérience utilisateur, à améliorer les performances et à assurer la maintenabilité de l'application.

## Fonctionnalités à implémenter

### 1. **Personnalisation et configuration avancée**
- Ajouter un sélecteur de devises pour convertir entre plusieurs devises (par exemple : EUR / GBP, USD / JPY).
- Permettre à l'utilisateur de configurer la fréquence de mise à jour du taux de change (par défaut 3 secondes).

### 2. **Amélioration de l’interface utilisateur (UX/UI)**
- Intégrer un graphique en temps réel montrant les évolutions récentes du taux de change.
- Ajouter des animations pour rendre les transitions (comme la mise à jour des taux ou le switch EUR/USD) plus fluides.
- Proposer un thème sombre pour améliorer le confort visuel des utilisateurs.

### 3. **Accessibilité**
- Ajouter un support complet pour les lecteurs d’écran (ARIA attributes).
- Permettre la navigation clavier dans tous les éléments interactifs.
- Ajouter des options pour régler la taille de la police et contrôler les animations.
- Ajouter un support multilingue pour cibler une audience internationale.

### 4. **Mécanismes de validation et prévention d’erreurs**
- Valider dynamiquement les entrées utilisateur pour prévenir les erreurs (ex : saisies non numériques).
- Afficher des messages d’erreur clairs et contextualisés en cas d’échec (ex : échec de la mise à jour du taux).

### 6. **Gestion avancée de l’historique**
- Ajouter une fonctionnalité pour exporter l’historique des transfére au format CSV ou PDF.

### 7. **Intégrations tierces**
- Connecter l’application à des API externes fiables pour les taux de change en temps réel.
- Intégrer des notifications push pour alerter sur des fluctuations importantes du taux.
- Mettre en place une validation côté serveur des taux saisis par l’utilisateur.

### 8. **Test et qualité**
- Implémenter des tests unitaires et E2E couvrant les fonctionnalités.
- Mettre en place une CI/CD pour garantir une livraison de code de qualité.


