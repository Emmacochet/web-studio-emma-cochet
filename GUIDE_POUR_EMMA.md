# Guide : mettre à jour le site studioemmacochet.com

Ce guide explique comment ajouter un nouveau projet, un nouveau meuble, ou changer
une photo, **directement depuis le site github.com, dans un navigateur**. Pas besoin
d'installer quoi que ce soit sur ton ordinateur.

## L'idée générale

Le site est composé de "fichiers" et "dossiers", comme sur ton ordinateur, mais
stockés sur github.com dans ton "repository" (le nom technique pour "le projet").

Quand tu modifies ou ajoutes un fichier sur github.com et que tu cliques sur
**"Commit changes"** (= "Enregistrer les changements"), le site se reconstruit
automatiquement et se met à jour tout seul en 2 à 3 minutes. Tu n'as rien d'autre
à faire.

Chaque projet ou meuble a besoin de **deux choses, dans deux endroits différents,
avec exactement le même nom de dossier** :

1. Un dossier dans `src/projects/` (ou `src/furniture/`) contenant un fichier
   `data.json` avec le titre, la description, etc.
2. Un dossier dans `public/projects/` (ou `public/furniture/`) contenant les
   photos elles-mêmes.

---

## 1. Ajouter un nouveau projet

**Étape 1 — Choisir un nom de dossier ("slug")**

Choisis un nom court, sans espaces, sans accents, sans majuscules — par exemple
pour un projet "Nouvelle Cuisine", utilise : `nouvelle-cuisine`

**Étape 2 — Créer le fichier `data.json`**

Sur github.com, va dans le dossier `src/projects/`, clique sur **"Add file" →
"Create new file"**. Dans le champ du nom, tape :

```
nouvelle-cuisine/data.json
```

(Écrire `nouvelle-cuisine/` avant le nom du fichier crée automatiquement le dossier.)

Colle ce modèle dans le contenu du fichier, et remplace les valeurs par les tiennes
(inspire-toi de l'exemple réel ci-dessous) :

```json
{
  "title": "Nouvelle Cuisine",
  "description": "Rénovation d'une cuisine familiale.",
  "images": ["photo1.jpg", "photo2.jpg"],
  "location": "Paris, France",
  "year": "2026"
}
```

Exemple réel actuellement sur le site (`src/projects/gaite/data.json`) :

```json
{
  "title": "Gaîté",
  "description": "Rénovation d'un appartement familial.",
  "images": ["IMG_3314.jpg"],
  "location": "Paris, France",
  "year": "2026"
}
```

Champs disponibles :
- `title` — le titre affiché (obligatoire)
- `description` — le texte de présentation (obligatoire)
- `images` — la liste des noms de photos, dans l'ordre d'affichage (obligatoire —
  **la première photo de la liste devient la photo de couverture**)
- `location` — la ville/lieu (optionnel)
- `year` — l'année (optionnel)

Clique sur **"Commit changes"** pour enregistrer.

**Étape 3 — Ajouter les photos**

Va dans le dossier `public/projects/`, clique sur **"Add file" → "Upload files"**,
puis dans le champ du chemin ajoute `nouvelle-cuisine/` avant d'envoyer tes photos
(ou crée d'abord le dossier comme à l'étape 2, puis fais un "Upload files" dedans).

⚠️ **Très important** : les noms de fichiers envoyés ici doivent être **exactement
identiques** (majuscules/minuscules comprises) à ceux écrits dans la liste `images`
du `data.json`. Formats acceptés : `.jpg`, `.jpeg`, `.png`.

Tu n'as pas besoin de redimensionner ou d'optimiser les photos toi-même — le site
s'en charge automatiquement à la publication.

**Étape 4 — (optionnel) Choisir où il apparaît dans la liste**

Ouvre `src/config/projects-order.ts` et ajoute `"nouvelle-cuisine"` dans la liste,
à l'endroit où tu veux qu'il apparaisse :

```ts
export const projectsOrder: string[] = ["nouvelle-cuisine", "gaite", "robespierre_montreuil", "algaetecture"];
```

Si tu ne fais pas cette étape, le projet apparaîtra quand même, à la fin, classé
par ordre alphabétique.

---

## 2. Ajouter un nouveau meuble

Exactement le même principe, mais dans `src/furniture/` et `public/furniture/`.

Exemple réel actuellement sur le site (`src/furniture/turning_the_tables/data.json`) :

```json
{
  "title": "Turning the Tables",
  "description": "Transformation d'une table victorienne en une pièce contemporaine, mêlant acajou, acier inoxydable et éléments réemployés.\n\nExpositions : Milan Design Week 2025 (BASE.Milano) - Meanwhile Space, Roca Gallery London",
  "images": ["IMG_0006.jpg", "Turning the Tables at MDW26 - Emma Cochet.jpg"],
  "produit": "Table basse",
  "year": "2024"
}
```

Champs disponibles :
- `title` — le titre affiché (obligatoire)
- `description` — le texte de présentation (obligatoire — utilise `\n\n` pour un
  saut de paragraphe, comme dans l'exemple)
- `images` — la liste des noms de photos (obligatoire — la première = photo de
  couverture)
- `produit` — le type d'objet, affiché comme étiquette (ex : "Table basse",
  "Chaise") (obligatoire)
- `year` — l'année (optionnel)

Photos à envoyer dans `public/furniture/<nom-du-meuble>/`, mêmes règles que pour
les projets (noms identiques, `.jpg`/`.jpeg`/`.png`).

Pour choisir l'ordre d'affichage, modifie `src/config/furniture-order.ts` de la
même façon que pour les projets.

---

## 3. Changer la photo de la page "À propos"

Remplace simplement le(s) fichier(s) dans `public/a-propos/` (garde le même nom
de fichier, ou mets à jour le code source si tu changes le nom — dans ce cas,
demande de l'aide).

---

## 4. Mettre une photo sur le diaporama de la page d'accueil (avancé)

Le diaporama de la page d'accueil est choisi à la main, il ne se met pas à jour
tout seul. Pour y ajouter une photo d'un projet ou d'un meuble déjà publié, ouvre
`src/config/homepage-slideshow.ts` et ajoute une ligne, par exemple :

```ts
{ kind: "project", project: "nouvelle-cuisine", image: "photo1.jpg", alt: "Description de la photo pour les lecteurs d'écran" },
```

- `project` (ou `item` pour un meuble) = le nom du dossier
- `image` = un nom de photo qui existe déjà dans ce dossier
- `alt` = une courte description en français de ce que montre la photo

---

## 5. Que se passe-t-il après avoir cliqué sur "Commit changes" ?

Le site se reconstruit automatiquement et se publie tout seul, généralement en
2 à 3 minutes. Pour vérifier :

- Va dans l'onglet **"Actions"** en haut du repository sur github.com : une coche
  verte ✅ signifie que la publication a réussi. Une croix rouge ❌ signifie qu'il
  y a une erreur (voir ci-dessous).
- Ou attends 2-3 minutes puis rafraîchis studioemmacochet.com.

---

## 6. Règles d'or / en cas de problème

- Le nom du dossier dans `src/projects/...` (ou `src/furniture/...`) et celui
  dans `public/projects/...` (ou `public/furniture/...`) doivent être
  **identiques, lettre pour lettre**.
- Les noms de fichiers photo écrits dans `images` du `data.json` doivent être
  **identiques, lettre pour lettre** (majuscules comprises) aux fichiers envoyés
  dans `public/`.
- Ne supprime jamais les fichiers `.nojekyll` et `CNAME` dans `public/` — ils
  sont nécessaires au bon fonctionnement du site.
- Si quelque chose ne s'affiche pas correctement, va d'abord dans l'onglet
  **Actions** sur github.com pour voir s'il y a une erreur, et regarde le message
  affiché — ou demande de l'aide en indiquant ce message.
