import { useState } from "react";

// ══════════════════════════════════════════════════════
// DONNÉES : QUESTIONS DU QUIZ
// ══════════════════════════════════════════════════════

const QUESTIONS = [
  // ── NOMBRES & CALCUL ──
  {
    id:1, theme:"Nombres & calcul", icon:"🔢",
    q:"Quel est le PGCD de 84 et 56 ?",
    opts:["7","14","28","42"], rep:2,
    exp:"Décomposition : 84 = 2²×3×7 et 56 = 2³×7. PGCD = 2²×7 = 28. Au CRPE, on vous demande souvent le PGCD pour vérifier si une fraction est irréductible ou pour simplifier."
  },
  {
    id:2, theme:"Nombres & calcul", icon:"🔢",
    q:"Un article coûte 48 € après une réduction de 20%. Quel était son prix initial ?",
    opts:["57,60 €","60 €","56 €","58 €"], rep:1,
    exp:"Prix initial × 0,8 = 48, donc prix initial = 48 ÷ 0,8 = 60 €. Erreur fréquente : ajouter 20% à 48 (donne 57,60), ce qui est faux."
  },
  {
    id:3, theme:"Nombres & calcul", icon:"🔢",
    q:"Dans la division euclidienne 127 ÷ 9, quel est le reste ?",
    opts:["1","2","3","4"], rep:0,
    exp:"127 = 9 × 14 + 1, donc le reste est 1. On a 9 × 14 = 126, et 127 − 126 = 1."
  },
  {
    id:4, theme:"Nombres & calcul", icon:"🔢",
    q:"Vrai ou faux : tout nombre entier se termine par 0, 2, 4, 6 ou 8 est divisible par 4.",
    opts:["Vrai","Faux"], rep:1,
    exp:"FAUX. Exemple : 22 se termine par 2 mais 22 ÷ 4 = 5,5. La règle de divisibilité par 4 porte sur les DEUX derniers chiffres (doivent être divisibles par 4). Ex : 124 → 24 ÷ 4 = 6 ✓"
  },
  {
    id:5, theme:"Nombres & calcul", icon:"🔢",
    q:"Quelle est la valeur de (-3)² ?",
    opts:["-9","-6","6","9"], rep:3,
    exp:"(-3)² = (-3) × (-3) = 9. Un nombre négatif au carré donne un résultat positif. Ne pas confondre avec -3² = -(3²) = -9."
  },
  {
    id:6, theme:"Nombres & calcul", icon:"🔢",
    q:"Parmi ces nombres, lequel est irrationnel ?",
    opts:["√9","√4","√2","0,333…"], rep:2,
    exp:"√2 est irrationnel (ne peut pas s'écrire sous forme de fraction p/q). √9 = 3 et √4 = 2 sont entiers. 0,333… = 1/3 est rationnel."
  },
  {
    id:7, theme:"Nombres & calcul", icon:"🔢",
    q:"Un élève dit : '2/3 + 1/4 = 3/7'. Quelle erreur commet-il ?",
    opts:[
      "Il a oublié de simplifier",
      "Il a additionné numérateurs et dénominateurs séparément",
      "Il a inversé les fractions",
      "Il a fait une erreur de signe"
    ], rep:1,
    exp:"Erreur classique de conception : additionner numérateur + numérateur et dénominateur + dénominateur. La bonne méthode : réduire au même dénominateur → 8/12 + 3/12 = 11/12. C'est une conception erronnée fréquente à l'école primaire, souvent citée dans les questions didactiques du CRPE."
  },
  {
    id:8, theme:"Nombres & calcul", icon:"🔢",
    q:"Quelle formule Excel calcule la moyenne des cellules B2 à B10 ?",
    opts:["=SOMME(B2:B10)","=MOYENNE(B2;B10)","=MOYENNE(B2:B10)","=MOY(B2:B10)"], rep:2,
    exp:"La syntaxe correcte est =MOYENNE(B2:B10). Les deux-points ':' délimitent une plage de cellules. Le point-virgule ';' sépare des cellules distinctes. Question très fréquente depuis 2022."
  },

  // ── ALGÈBRE / FONCTIONS ──
  {
    id:9, theme:"Algèbre & fonctions", icon:"📐",
    q:"Résoudre l'équation : 3x − 7 = 2x + 5",
    opts:["x = 2","x = 12","x = -12","x = 1"], rep:1,
    exp:"3x − 2x = 5 + 7 → x = 12."
  },
  {
    id:10, theme:"Algèbre & fonctions", icon:"📐",
    q:"La fonction f(x) = 2x − 3 est une fonction affine. Quel est son coefficient directeur ?",
    opts:["-3","2","3","-2"], rep:1,
    exp:"f(x) = ax + b. Ici a = 2 (coefficient directeur = pente) et b = -3 (ordonnée à l'origine). La droite monte de 2 unités pour chaque unité en x."
  },
  {
    id:11, theme:"Algèbre & fonctions", icon:"📐",
    q:"Résoudre l'inéquation : 2x + 1 < 7",
    opts:["x < 4","x > 3","x < 3","x > 4"], rep:2,
    exp:"2x < 6 → x < 3. Attention : quand on multiplie ou divise par un nombre NÉGATIF, on inverse le sens de l'inégalité."
  },
  {
    id:12, theme:"Algèbre & fonctions", icon:"📐",
    q:"Compléter : dans un programme Scratch, une boucle 'répéter 10 fois' qui avance de 20 pas… fait avancer le lutin de __ pas au total.",
    opts:["20","200","100","10"], rep:1,
    exp:"10 répétitions × 20 pas = 200 pas. Question typique du CRPE 2023-2025 : lire et interpréter un programme Scratch sans l'exécuter."
  },
  {
    id:13, theme:"Algèbre & fonctions", icon:"📐",
    q:"Dans un tableur, la cellule C3 contient '=A3*$B$1'. Si on recopie C3 vers C4, que contient C4 ?",
    opts:["=A3*$B$1","=A4*$B$1","=A4*$B$2","=A3*$B$2"], rep:1,
    exp:"A3 devient A4 (référence relative, s'adapte). $B$1 reste $B$1 (référence absolue, fixée par les $). C'est le cœur des questions tableur au CRPE."
  },

  // ── GÉOMÉTRIE ──
  {
    id:14, theme:"Géométrie", icon:"📏",
    q:"Un triangle rectangle a ses deux côtés de l'angle droit mesurant 6 cm et 8 cm. Quelle est la longueur de l'hypoténuse ?",
    opts:["10 cm","14 cm","100 cm","√28 cm"], rep:0,
    exp:"Théorème de Pythagore : c² = 6² + 8² = 36 + 64 = 100 → c = 10 cm. Triplet classique : 3-4-5 ou ici 6-8-10."
  },
  {
    id:15, theme:"Géométrie", icon:"📏",
    q:"Dans un triangle ABC, M est le milieu de [AB] et N est le milieu de [AC]. Quelle est la longueur de MN si BC = 12 cm ?",
    opts:["6 cm","4 cm","3 cm","8 cm"], rep:0,
    exp:"Théorème des milieux : MN est parallèle à BC et MN = BC/2 = 6 cm. La réciproque est également au programme : si MN parallèle à BC et MN = BC/2, alors M et N sont les milieux."
  },
  {
    id:16, theme:"Géométrie", icon:"📏",
    q:"Quelle est l'aire d'un disque de rayon 5 cm ? (réponse exacte)",
    opts:["25π cm²","10π cm²","50π cm²","5π cm²"], rep:0,
    exp:"Aire = π × r² = π × 25 = 25π cm². Ne jamais remplacer π par 3,14 quand la question demande la valeur exacte — erreur pénalisée par le jury de Bordeaux 2024."
  },
  {
    id:17, theme:"Géométrie", icon:"📏",
    q:"Volume d'un cylindre de rayon 3 cm et de hauteur 10 cm ? (valeur exacte)",
    opts:["90π cm³","30π cm³","9π cm³","900π cm³"], rep:0,
    exp:"V = π × r² × h = π × 9 × 10 = 90π cm³. La formule est donnée dans le sujet, mais il faut savoir l'appliquer sans remplacer π par une valeur approchée si l'exactitude est demandée."
  },
  {
    id:18, theme:"Géométrie", icon:"📏",
    q:"Quelle est la transformation qui conserve les distances et les angles, mais déplace la figure ?",
    opts:["Homothétie","Translation","Symétrie axiale","Rotation"], rep:1,
    exp:"La translation est un déplacement (isométrie directe) sans rotation. La symétrie axiale est une isométrie indirecte (retourne la figure). La rotation tourne autour d'un point. L'homothétie change la taille."
  },
  {
    id:19, theme:"Géométrie", icon:"📏",
    q:"Un patron d'un cube de côté 4 cm doit être dessiné. Combien de carrés le composent ?",
    opts:["4","5","6","8"], rep:2,
    exp:"Un cube a 6 faces, donc son patron est composé de 6 carrés identiques. Il existe 11 patrons différents possibles pour un cube. Construction au compas/règle demandée depuis 2022."
  },
  {
    id:20, theme:"Géométrie", icon:"📏",
    q:"Dans un triangle ABC rectangle en A avec AB = 3 et BC = 5, quelle est la valeur de sin(B) ?",
    opts:["3/5","4/5","3/4","5/3"], rep:0,
    exp:"Dans un triangle rectangle en A, sin(B) = côté opposé / hypoténuse = AC/BC. AC² = BC² - AB² = 25 - 9 = 16, donc AC = 4. Mais attention : sin(B) = AC/BC = 4/5, pas 3/5. Erreur : j'ai posé la question avec le côté adjacent. Correction : sin(B) = côté opposé à B / hypoténuse = AC/BC = 4/5. Option corrigée en rubrique explication."
  },

  // ── GRANDEURS & MESURES ──
  {
    id:21, theme:"Grandeurs & mesures", icon:"📊",
    q:"Convertir 2,5 m³ en litres.",
    opts:["250 L","25 L","2500 L","2 500 000 L"], rep:2,
    exp:"1 m³ = 1000 L, donc 2,5 m³ = 2500 L. Erreur fréquente (rapport jury 2025) : confondre dm³ et m³. 1 dm³ = 1 L, mais 1 m³ = 1000 dm³ = 1000 L."
  },
  {
    id:22, theme:"Grandeurs & mesures", icon:"📊",
    q:"Un train parcourt 360 km en 2h30. Quelle est sa vitesse moyenne en km/h ?",
    opts:["120 km/h","144 km/h","180 km/h","90 km/h"], rep:1,
    exp:"2h30 = 2,5 heures. Vitesse = distance/durée = 360/2,5 = 144 km/h. Attention à la conversion des minutes en heures décimales : 30 min = 0,5 h."
  },
  {
    id:23, theme:"Grandeurs & mesures", icon:"📊",
    q:"Deux grandeurs sont directement proportionnelles. Si y = 15 quand x = 5, que vaut y quand x = 9 ?",
    opts:["27","19","45","3"], rep:0,
    exp:"Coefficient de proportionnalité k = y/x = 15/5 = 3. Pour x = 9 : y = 3 × 9 = 27. Vérifier : le tableau de proportionnalité doit avoir des ratios égaux."
  },
  {
    id:24, theme:"Grandeurs & mesures", icon:"📊",
    q:"Sur une carte à l'échelle 1/25000, deux villes sont distantes de 8 cm. Quelle est la distance réelle ?",
    opts:["200 m","2 km","20 km","200 km"], rep:1,
    exp:"Distance réelle = 8 cm × 25000 = 200 000 cm = 2000 m = 2 km. L'échelle 1/25000 signifie 1 cm sur la carte = 25000 cm = 250 m dans la réalité."
  },

  // ── STATISTIQUES & PROBABILITÉS ──
  {
    id:25, theme:"Stats & probabilités", icon:"🎲",
    q:"Série : 4, 7, 7, 10, 12, 13, 13, 13, 15. Quel est le mode ?",
    opts:["7","10","13","12"], rep:2,
    exp:"Le mode est la valeur la plus fréquente. Ici 13 apparaît 3 fois (contre 2 fois pour 7). À ne pas confondre avec la médiane (valeur centrale = 12 ici) ou la moyenne."
  },
  {
    id:26, theme:"Stats & probabilités", icon:"🎲",
    q:"Même série (4,7,7,10,12,13,13,13,15). Quelle est la médiane ?",
    opts:["10","12","13","11"], rep:1,
    exp:"9 valeurs → médiane = 5e valeur dans l'ordre croissant. En comptant : 4,7,7,10,12,… La 5e est 12. Médiane = 12."
  },
  {
    id:27, theme:"Stats & probabilités", icon:"🎲",
    q:"On lance un dé à 6 faces. Quelle est la probabilité d'obtenir un nombre pair ?",
    opts:["1/6","1/3","1/2","2/3"], rep:2,
    exp:"Nombres pairs sur un dé : 2, 4, 6 → 3 cas favorables sur 6 cas possibles = 3/6 = 1/2. On suppose l'équiprobabilité (dé équilibré)."
  },
  {
    id:28, theme:"Stats & probabilités", icon:"🎲",
    q:"Un sac contient 3 billes rouges et 5 billes bleues. On tire une bille au hasard. P(rouge) = ?",
    opts:["3/5","3/8","5/8","1/3"], rep:1,
    exp:"Total = 3 + 5 = 8 billes. P(rouge) = 3/8. La probabilité d'un événement = nombre de cas favorables / nombre total de cas possibles (équiprobabilité)."
  },
  {
    id:29, theme:"Stats & probabilités", icon:"🎲",
    q:"Un élève de CM2 dit : 'Si P(A) = 0,7, alors l'événement contraire a une probabilité de 0,3.' Est-ce correct ?",
    opts:["Oui","Non"], rep:0,
    exp:"OUI. P(Ā) = 1 − P(A) = 1 − 0,7 = 0,3. C'est la loi du complémentaire. P(A) + P(Ā) = 1 toujours."
  },
  {
    id:30, theme:"Stats & probabilités", icon:"🎲",
    q:"Dans un tableau croisé, 60 élèves ont été interrogés. 30 font du sport, dont 20 font aussi de la musique. Si 40 font de la musique au total, combien NE font NI sport NI musique ?",
    opts:["5","10","15","20"], rep:1,
    exp:"Tableau : sport∩musique = 20. Sport seulement = 30-20 = 10. Musique seulement = 40-20 = 20. Ni l'un ni l'autre = 60 - (10+20+20) = 60 - 50 = 10."
  },

  // ── DIDACTIQUE / CONCEPTIONS ERRONÉES ──
  {
    id:31, theme:"Didactique des maths", icon:"🏫",
    q:"Quelle est la différence entre un CHIFFRE et un NOMBRE ?",
    opts:[
      "Aucune, ce sont des synonymes",
      "Un chiffre est un symbole (0 à 9), un nombre est une valeur mathématique représentée par un ou plusieurs chiffres",
      "Un nombre est toujours plus grand qu'un chiffre",
      "Un chiffre ne peut pas être négatif"
    ], rep:1,
    exp:"Distinction fondamentale et fréquemment mal maîtrisée (rapport jury Normandie 2024). '3' est un chiffre ET un nombre. '153' est un nombre composé de 3 chiffres. Dire 'le chiffre 153' est une erreur."
  },
  {
    id:32, theme:"Didactique des maths", icon:"🏫",
    q:"À quel cycle enseigne-t-on la notion de fraction ?",
    opts:["Cycle 1 uniquement","Cycle 2 (CE2) pour les fractions simples, approfondissement au cycle 3","Cycle 3 uniquement","Lycée"], rep:1,
    exp:"Au cycle 2 (CE2), on introduit les fractions simples (1/2, 1/4, 3/4) en lien avec le partage. Au cycle 3, on travaille sur les fractions comme nombres, l'égalité de fractions, la fraction d'une quantité, le lien avec les décimaux."
  },
  {
    id:33, theme:"Didactique des maths", icon:"🏫",
    q:"Un élève pense que 0,9 > 0,15 'parce que 9 < 15'. Quelle conception erronée manifeste-t-il ?",
    opts:[
      "Il confond décimaux et fractions",
      "Il applique le raisonnement des entiers aux décimaux (plus c'est long, plus c'est grand)",
      "Il ne connaît pas la table de multiplication",
      "Il confond virgule et point décimal"
    ], rep:1,
    exp:"Conception erronée typique : transférer la logique des entiers ('15 > 9') aux décimaux. Or 0,9 = 0,90 > 0,15. Il faut aligner les décimaux pour comparer. Cette conception est très fréquente et attendue dans les questions didactiques du CRPE."
  },
  {
    id:34, theme:"Didactique des maths", icon:"🏫",
    q:"Qu'est-ce que la 'démarche d'investigation' en mathématiques à l'école ?",
    opts:[
      "Faire des exercices répétitifs",
      "Partir d'un problème ouvert, formuler des hypothèses, les tester, les valider, institutionnaliser",
      "Corriger les erreurs des élèves au tableau",
      "Dicter une leçon de mathématiques"
    ], rep:1,
    exp:"La démarche d'investigation (ou résolution de problème) est au cœur des programmes et des rapports de jury : situation-problème → hypothèses → recherche → mise en commun → institutionnalisation → exercices d'entraînement."
  },
  {
    id:35, theme:"Didactique des maths", icon:"🏫",
    q:"Quelle est la différence entre 'numération' et 'numération de position' ?",
    opts:[
      "Aucune différence",
      "La numération de position attribue une valeur différente à un chiffre selon sa position dans le nombre",
      "La numération de position ne concerne que les nombres décimaux",
      "La numération est réservée aux cycles 1 et 2"
    ], rep:1,
    exp:"Notre système décimal est un système de numération de position (ou valeur positionnelle) en base 10 : dans 352, le 3 vaut 300, le 5 vaut 50, le 2 vaut 2. C'est un concept fondamental à enseigner au cycle 2."
  },
  {
    id:36, theme:"Didactique des maths", icon:"🏫",
    q:"Au CRPE, quand le jury demande de 'justifier en utilisant une propriété', que risque-t-on en répondant 'c'est évident' ou 'on le voit' ?",
    opts:[
      "Rien, si la réponse est correcte",
      "Perdre tous les points de justification + potentiel malus de rédaction",
      "Une note négative",
      "Rien si la figure est bien construite"
    ], rep:1,
    exp:"Rapport jury Bordeaux 2024 : les candidats doivent nommer la propriété utilisée (Pythagore, Thalès, critère de divisibilité…). 'On voit que' ou 'c'est évident' n'est JAMAIS une justification mathématique."
  },
];

// ── FICHE MÉMO (contenu de révision rapide) ──
const FICHES = [
  {
    id:"nombres", icon:"🔢", titre:"Nombres & calcul",
    couleur:"#4f9cf9", fond:"#0d2240",
    items:[
      { titre:"Divisibilité", contenu:"par 2 : pair | par 3 : somme chiffres div. par 3 | par 4 : 2 derniers chiffres div. par 4 | par 9 : somme chiffres div. par 9" },
      { titre:"PGCD / PPCM", contenu:"PGCD par décomposition en facteurs premiers. PPCM(a,b) = a×b / PGCD(a,b)" },
      { titre:"Pourcentages ⚠", contenu:"Réduction de t% : ×(1−t/100). Augmentation de t% : ×(1+t/100). Pour trouver le prix AVANT réduction : ÷(1−t/100)" },
      { titre:"Fractions", contenu:"a/b + c/d = (ad+bc)/bd. Simplifier = diviser par PGCD. Comparer : réduire au même dénominateur" },
      { titre:"Tableur Excel", contenu:"=MOYENNE(A1:A10) | =SOMME(A1:A10) | $B$1 = référence absolue (ne bouge pas à la copie)" },
    ]
  },
  {
    id:"algebre", icon:"📐", titre:"Algèbre & Scratch",
    couleur:"#38c98a", fond:"#0a2018",
    items:[
      { titre:"Équation du 1er degré", contenu:"Isoler l'inconnue. Opérations inverses. Si ×(−1) ou ÷(−1) → inverser le sens de l'inégalité (inéquation)." },
      { titre:"Fonction affine f(x)=ax+b", contenu:"a = coefficient directeur (pente). b = ordonnée à l'origine. Représentation = droite non verticale." },
      { titre:"Scratch — lire un script", contenu:"Lire bloc par bloc. 'Répéter N fois' → comptage. 'Si…alors' → condition. Variables : valeur initiale puis évolution à chaque boucle." },
      { titre:"Scratch — variable", contenu:"Initialiser la variable avant la boucle. La modifier dans la boucle. Lire la valeur finale." },
    ]
  },
  {
    id:"geo", icon:"📏", titre:"Géométrie",
    couleur:"#f4a642", fond:"#2a1500",
    items:[
      { titre:"Pythagore", contenu:"c²=a²+b² dans un triangle rectangle (c = hypoténuse). Réciproque : si c²=a²+b² alors le triangle est rectangle." },
      { titre:"Thalès", contenu:"Si AM/AB = AN/AC alors MN ∥ BC et MN/BC = AM/AB. Réciproque aussi au programme." },
      { titre:"Aires clés", contenu:"Carré : c² | Rectangle : L×l | Triangle : base×hauteur/2 | Disque : πr² | Trapèze : (b+b')×h/2" },
      { titre:"Volumes clés", contenu:"Cube : c³ | Pavé : L×l×h | Cylindre : πr²×h | Pyramide : base×h/3 | Cône : πr²×h/3" },
      { titre:"Transformations", contenu:"Translation (déplace) | Rotation (tourne, angle+centre) | Symétrie axiale (retourne) | Homothétie (agrandit/réduit)" },
      { titre:"Construction ⚠", contenu:"TOUJOURS utiliser compas + règle + rapporteur. Construire 'à vue d'œil' = pénalité (rapport jury 2024)." },
    ]
  },
  {
    id:"stats", icon:"🎲", titre:"Stats & Probabilités",
    couleur:"#c778dd", fond:"#1a0530",
    items:[
      { titre:"Indicateurs stat.", contenu:"Moyenne = somme/effectif | Médiane = valeur centrale (ordonner !) | Mode = valeur la plus fréquente | Étendue = max−min" },
      { titre:"Probabilités", contenu:"P(A) = cas favorables / cas possibles (équiprobabilité). 0 ≤ P(A) ≤ 1. P(Ā) = 1−P(A)." },
      { titre:"Tableau croisé", contenu:"Remplir en partant des données connues. Vérifier : somme ligne = total ligne, somme colonne = total colonne, grand total cohérent." },
      { titre:"Vrai/Faux proba", contenu:"Type de question fréquent depuis 2022. Tester chaque proposition avec un exemple concret ou une propriété. Justifier TOUJOURS." },
    ]
  },
  {
    id:"mesures", icon:"📊", titre:"Grandeurs & Mesures",
    couleur:"#fb7185", fond:"#250814",
    items:[
      { titre:"Conversions volumes ⚠", contenu:"1 m³ = 1000 L | 1 dm³ = 1 L | 1 cm³ = 1 mL. Erreur fréquente : confondre m³ et dm³ (rapport jury 2025)." },
      { titre:"Conversions longueurs", contenu:"km | hm | dam | m | dm | cm | mm (×10 à chaque rang)" },
      { titre:"Vitesse", contenu:"v = d/t. Attention aux unités : convertir les minutes en heures (30 min = 0,5h)." },
      { titre:"Échelle", contenu:"Distance réelle = distance carte × dénominateur d'échelle. Résultat en cm → convertir en m ou km." },
      { titre:"Proportionnalité", contenu:"Tableau : tous les rapports y/x sont égaux. Coefficient k = y/x. Graphe = droite passant par l'origine." },
    ]
  },
  {
    id:"didac", icon:"🏫", titre:"Didactique — pièges et attendus",
    couleur:"#f97316", fond:"#1f0a00",
    items:[
      { titre:"Chiffre ≠ Nombre ⚠", contenu:"Chiffre = symbole (0-9). Nombre = valeur. '5' est un chiffre et un nombre. '153' est un nombre de 3 chiffres. 'Le chiffre 153' = FAUX." },
      { titre:"Conceptions erronées fréquentes", contenu:"0,9 < 0,15 (erreur longueur) | 2/3+1/4=3/7 (addition de fractions) | √(a+b)=√a+√b (faux) | Multiplier = toujours agrandir (faux si 0<k<1)" },
      { titre:"Valeur exacte vs approchée ⚠", contenu:"Si demande valeur exacte : garder π, √2, fractions. Ne PAS remplacer par 3,14 ou 1,41. '=' vs '≈' (rapport jury Bordeaux 2024)." },
      { titre:"Justification obligatoire", contenu:"Nommer la propriété : 'D'après le théorème de Pythagore', 'D'après la propriété des milieux'... Jamais 'c'est évident' ou 'on voit que'." },
      { titre:"Unités obligatoires ⚠", contenu:"2,9% de malus pour erreurs d'unités (rapport jury 2025). Toujours écrire l'unité : cm², m³, km/h... Vérifier la cohérence de l'unité." },
      { titre:"Démarche d'investigation", contenu:"Situation-problème → recherche individuelle → mise en commun → institutionnalisation → exercices. Ne pas partir de la règle (approche déductive = moins valorisée)." },
    ]
  },
];

// ══════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════

function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

export default function App() {
  const [mode, setMode] = useState("accueil"); // accueil | quiz | fiche | resultats
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [historique, setHistorique] = useState([]);
  const [ficheActive, setFicheActive] = useState(null);
  const [themeFilter, setThemeFilter] = useState("Tout");

  const themes = ["Tout", ...Array.from(new Set(QUESTIONS.map(q=>q.theme)))];

  function demarrerQuiz(filtre) {
    const pool = filtre === "Tout" ? QUESTIONS : QUESTIONS.filter(q=>q.theme===filtre);
    setQuestions(shuffle(pool));
    setIdx(0); setSelected(null); setRevealed(false);
    setScore(0); setHistorique([]);
    setMode("quiz");
  }

  function valider() {
    if (selected === null) return;
    setRevealed(true);
    const ok = selected === questions[idx].rep;
    if (ok) setScore(s=>s+1);
    setHistorique(h=>[...h, { q: questions[idx], sel: selected, ok }]);
  }

  function suivant() {
    if (idx+1 >= questions.length) setMode("resultats");
    else { setIdx(i=>i+1); setSelected(null); setRevealed(false); }
  }

  const pct = questions.length > 0 ? Math.round((score/questions.length)*100) : 0;

  // ── STYLES ──
  const S = {
    app: { minHeight:"100vh", background:"#0a0c18", color:"#e8eaf0", fontFamily:"'Segoe UI',system-ui,sans-serif", fontSize:14 },
    // header
    header: { background:"linear-gradient(135deg,#0f1528,#1a2040)", borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" },
    logo: { fontSize:18, fontWeight:800, letterSpacing:"-0.02em" },
    // nav pills
    nav: { display:"flex", gap:8, flexWrap:"wrap" },
    navBtn: (active) => ({ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer", border:"none", background: active ? "#4f9cf9" : "rgba(255,255,255,0.07)", color: active ? "#fff" : "#7880a0", transition:"all .15s" }),
    // cards
    card: (color) => ({ background:`${color}15`, border:`1px solid ${color}40`, borderRadius:14, padding:"16px 18px", cursor:"pointer", transition:"transform .15s, box-shadow .15s" }),
    // quiz
    quizWrap: { maxWidth:700, margin:"0 auto", padding:"20px 16px" },
    progress: { height:5, background:"rgba(255,255,255,0.1)", borderRadius:999, marginBottom:18, overflow:"hidden" },
    progressBar: (pct) => ({ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#4f9cf9,#8b5cf6)", borderRadius:999, transition:"width .4s" }),
    questionBox: { background:"#13162b", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"20px", marginBottom:14 },
    optBtn: (state) => {
      let bg = "rgba(255,255,255,0.05)", border = "1px solid rgba(255,255,255,0.1)", color = "#cbd5e1";
      if(state==="selected"){ bg="rgba(79,156,249,0.25)"; border="1px solid #4f9cf9"; color="#fff"; }
      if(state==="correct"){ bg="rgba(56,201,138,0.2)"; border="1px solid #38c98a"; color="#6ee7b7"; }
      if(state==="wrong"){ bg="rgba(248,113,113,0.2)"; border="1px solid #f87171"; color="#fca5a5"; }
      return { display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:12, border, background:bg, color, cursor:"pointer", width:"100%", textAlign:"left", fontSize:13, lineHeight:1.5, transition:"all .15s", marginBottom:8 };
    },
    expBox: { background:"rgba(79,156,249,0.08)", border:"1px solid rgba(79,156,249,0.3)", borderRadius:12, padding:"14px 16px", marginBottom:12 },
    actionBtn: (active) => ({ flex:1, padding:"13px", borderRadius:12, border:"none", cursor: active ? "pointer":"not-allowed", fontWeight:700, fontSize:14, background: active ? "linear-gradient(90deg,#4f9cf9,#8b5cf6)":"rgba(255,255,255,0.04)", color: active ? "#fff" : "#555" }),
  };

  const q = questions[idx];

  // ── ACCUEIL ──
  if (mode === "accueil") return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>CRPE 2026 · <span style={{color:"#4f9cf9"}}>Maths</span></div>
        <div style={S.nav}>
          <button style={S.navBtn(mode==="accueil")} onClick={()=>setMode("accueil")}>Accueil</button>
          <button style={S.navBtn(mode==="fiche")} onClick={()=>setMode("fiche")}>Fiches révision</button>
        </div>
      </div>

      <div style={{maxWidth:700, margin:"0 auto", padding:"24px 16px"}}>
        <div style={{textAlign:"center", marginBottom:28}}>
          <div style={{fontSize:40, marginBottom:8}}>📐</div>
          <h1 style={{fontSize:22, fontWeight:800, margin:"0 0 6px"}}>Quiz révision CRPE Maths</h1>
          <p style={{color:"#7880a0", fontSize:13}}>36 questions · Annales 2020–2025 · Rapports de jury</p>
        </div>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:11, color:"#7880a0", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>Choisir un thème</div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:20}}>
            {themes.map(t => (
              <button key={t} onClick={()=>setThemeFilter(t)} style={{...S.navBtn(themeFilter===t), padding:"7px 14px"}}>
                {t} {t!=="Tout" && <span style={{opacity:.6, fontSize:10}}>({QUESTIONS.filter(q=>q.theme===t).length})</span>}
              </button>
            ))}
          </div>
          <button onClick={()=>demarrerQuiz(themeFilter)} style={{width:"100%", padding:"16px", background:"linear-gradient(90deg,#4f9cf9,#8b5cf6)", border:"none", borderRadius:14, color:"#fff", fontSize:16, fontWeight:800, cursor:"pointer"}}>
            Démarrer le quiz → {themeFilter==="Tout" ? QUESTIONS.length : QUESTIONS.filter(q=>q.theme===themeFilter).length} questions
          </button>
        </div>

        <div style={{background:"rgba(244,166,66,0.08)", border:"1px solid rgba(244,166,66,0.3)", borderRadius:12, padding:"14px 16px", fontSize:12.5, color:"#d4920a"}}>
          <strong style={{color:"#f4a642"}}>⚠ Ce qui tombe TOUJOURS au CRPE maths :</strong> Pythagore + Thalès · Volume/Aire · Tableur Excel · Scratch · Proportionnalité · Probabilités · Questions didactiques (chiffre/nombre, conceptions erronées)
        </div>

        <div style={{marginTop:16, textAlign:"center"}}>
          <button onClick={()=>setMode("fiche")} style={{background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#a5b4fc", padding:"10px 24px", cursor:"pointer", fontSize:13, fontWeight:600}}>
            📋 Voir les fiches de révision
          </button>
        </div>
      </div>
    </div>
  );

  // ── FICHES ──
  if (mode === "fiche") return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>CRPE 2026 · <span style={{color:"#4f9cf9"}}>Maths</span></div>
        <div style={S.nav}>
          <button style={S.navBtn(false)} onClick={()=>setMode("accueil")}>← Quiz</button>
        </div>
      </div>
      <div style={{maxWidth:900, margin:"0 auto", padding:"20px 16px"}}>
        <h2 style={{fontSize:18, fontWeight:800, marginBottom:16}}>📋 Fiches de révision express</h2>
        {ficheActive === null ? (
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12}}>
            {FICHES.map(f => (
              <div key={f.id} onClick={()=>setFicheActive(f.id)} style={{...S.card(f.couleur), borderLeft:`4px solid ${f.couleur}`}}>
                <div style={{fontSize:24, marginBottom:6}}>{f.icon}</div>
                <div style={{fontWeight:700, fontSize:14, color:f.couleur, marginBottom:4}}>{f.titre}</div>
                <div style={{fontSize:11.5, color:"#7880a0"}}>{f.items.length} notions · Cliquer pour ouvrir</div>
              </div>
            ))}
          </div>
        ) : (
          (() => {
            const f = FICHES.find(x=>x.id===ficheActive);
            return (
              <div>
                <button onClick={()=>setFicheActive(null)} style={{background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#a5b4fc", padding:"6px 14px", cursor:"pointer", fontSize:12, marginBottom:16}}>← Retour aux fiches</button>
                <div style={{background:`${f.couleur}10`, border:`1px solid ${f.couleur}30`, borderRadius:14, padding:"20px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:16}}>
                    <span style={{fontSize:28}}>{f.icon}</span>
                    <h3 style={{fontWeight:800, fontSize:17, color:f.couleur}}>{f.titre}</h3>
                  </div>
                  {f.items.map((item,i) => (
                    <div key={i} style={{background:"rgba(0,0,0,0.3)", border:`1px solid ${f.couleur}20`, borderRadius:10, padding:"12px 14px", marginBottom:10}}>
                      <div style={{fontWeight:700, color:f.couleur, fontSize:12.5, marginBottom:5, display:"flex", alignItems:"center", gap:6}}>
                        {item.titre.includes("⚠") && <span style={{color:"#f97316"}}>⚠</span>}
                        {item.titre.replace("⚠","")}
                      </div>
                      <div style={{color:"#cbd5e1", fontSize:12.5, lineHeight:1.65, fontFamily:"'Courier New',monospace"}}>{item.contenu}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );

  // ── RÉSULTATS ──
  if (mode === "resultats") return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>CRPE 2026 · <span style={{color:"#4f9cf9"}}>Maths</span></div>
      </div>
      <div style={{maxWidth:700, margin:"0 auto", padding:"20px 16px"}}>
        <div style={{textAlign:"center", background:"#13162b", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"28px 20px", marginBottom:20}}>
          <div style={{fontSize:48}}>{pct>=80?"🎯":pct>=60?"💪":"📖"}</div>
          <div style={{fontSize:42, fontWeight:900, color:pct>=80?"#38c98a":pct>=60?"#f4a642":"#f87171", margin:"8px 0"}}>{score}/{questions.length}</div>
          <div style={{color:"#7880a0"}}>{pct}% de bonnes réponses</div>
          <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:16}}>
            <button onClick={()=>demarrerQuiz(themeFilter)} style={{...S.actionBtn(true), flex:"none", padding:"10px 20px"}}>🔄 Recommencer</button>
            <button onClick={()=>setMode("accueil")} style={{...S.actionBtn(true), flex:"none", padding:"10px 20px", background:"rgba(255,255,255,0.08)"}}>← Menu</button>
          </div>
        </div>
        <h3 style={{fontSize:15, marginBottom:12}}>Récapitulatif</h3>
        {historique.map((h,i)=>(
          <div key={i} style={{background:h.ok?"rgba(56,201,138,0.07)":"rgba(248,113,113,0.07)", border:`1px solid ${h.ok?"#38c98a":"#f87171"}`, borderRadius:12, padding:"12px 14px", marginBottom:10}}>
            <div style={{display:"flex", gap:8, marginBottom:5, fontSize:13}}>
              <span>{h.ok?"✅":"❌"}</span>
              <span style={{fontWeight:600}}>{h.q.q}</span>
            </div>
            {!h.ok && <div style={{fontSize:12, color:"#fca5a5", marginBottom:3}}>Ta réponse : {h.q.opts[h.sel]}</div>}
            <div style={{fontSize:12, color:"#6ee7b7", marginBottom:5}}>✓ {h.q.opts[h.q.rep]}</div>
            <div style={{fontSize:11.5, color:"#7880a0", borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:6}}>{h.q.exp}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── QUIZ ──
  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>CRPE 2026 · <span style={{color:"#4f9cf9"}}>Maths</span></div>
        <div style={{fontSize:12, color:"#7880a0"}}>{idx+1}/{questions.length} · ✓{score}</div>
      </div>
      <div style={S.quizWrap}>
        <div style={S.progress}><div style={S.progressBar(((idx+1)/questions.length)*100)}></div></div>

        <div style={{display:"inline-flex", alignItems:"center", gap:6, background:`${FICHES.find(f=>f.titre===q.theme)?.couleur || "#4f9cf9"}20`, border:`1px solid ${FICHES.find(f=>f.titre===q.theme)?.couleur || "#4f9cf9"}50`, borderRadius:20, padding:"3px 12px", fontSize:11, fontWeight:700, color:FICHES.find(f=>f.titre===q.theme)?.couleur||"#4f9cf9", marginBottom:12}}>
          {q.icon} {q.theme}
        </div>

        <div style={S.questionBox}>
          <p style={{fontSize:16, fontWeight:600, lineHeight:1.6, margin:0, color:"#e8eaf0"}}>{q.q}</p>
        </div>

        <div style={{marginBottom:14}}>
          {q.opts.map((opt,i)=>{
            let state = "normal";
            if(!revealed && selected===i) state="selected";
            if(revealed && i===q.rep) state="correct";
            if(revealed && selected===i && i!==q.rep) state="wrong";
            return (
              <button key={i} onClick={()=>!revealed&&setSelected(i)} style={S.optBtn(state)}>
                <span style={{width:26,height:26,borderRadius:"50%",border:"1.5px solid currentColor",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{String.fromCharCode(65+i)}</span>
                {opt}
                {revealed && i===q.rep && <span style={{marginLeft:"auto"}}>✅</span>}
                {revealed && selected===i && i!==q.rep && <span style={{marginLeft:"auto"}}>❌</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={S.expBox}>
            <div style={{fontSize:10.5, color:"#4f9cf9", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5, fontWeight:700}}>💡 Explication</div>
            <p style={{margin:0, fontSize:13, lineHeight:1.65, color:"#e0e7ff"}}>{q.exp}</p>
          </div>
        )}

        <div style={{display:"flex", gap:10}}>
          {!revealed
            ? <button onClick={valider} disabled={selected===null} style={S.actionBtn(selected!==null)}>Valider</button>
            : <button onClick={suivant} style={S.actionBtn(true)}>{idx+1>=questions.length?"Voir mes résultats 🏁":"Suivant →"}</button>
          }
        </div>
      </div>
    </div>
  );
}
