import { useState } from "react";

const QUESTIONS = [
  // ══ VIVANT ══
  {
    id:1, theme:"Le vivant", icon:"🌿",
    q:"Quelle est la différence entre une cellule procaryote et une cellule eucaryote ?",
    opts:["La procaryote a un noyau, l'eucaryote non","La procaryote n'a pas de noyau membraneux, l'eucaryote en a un","La procaryote est plus grande","Il n'y a pas de différence"],
    rep:1, exp:"Les bactéries sont procaryotes (sans noyau). Les cellules animales et végétales sont eucaryotes (noyau délimité par une membrane). Notion attendue au cycle 3."
  },
  {
    id:2, theme:"Le vivant", icon:"🌿",
    q:"Qu'est-ce que la photosynthèse ? Quelle est son équation simplifiée ?",
    opts:[
      "La respiration des plantes la nuit : CO₂ + O₂ → glucose",
      "La fabrication de matière organique par les plantes : CO₂ + H₂O + lumière → glucose + O₂",
      "La transformation du glucose en énergie",
      "L'absorption d'eau par les racines"
    ],
    rep:1, exp:"Photosynthèse : 6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂. Les plantes fabriquent du glucose grâce à la lumière (chlorophylle). Elles rejettent de l'O₂. Notion fondamentale cycle 3."
  },
  {
    id:3, theme:"Le vivant", icon:"🌿",
    q:"Un élève dit 'les plantes respirent le CO₂ et ne respirent pas d'O₂'. Est-ce une conception erronée ?",
    opts:["Non, c'est exact","Oui : les plantes respirent aussi l'O₂ comme les animaux, mais elles réalisent EN PLUS la photosynthèse","Oui, les plantes ne respirent pas du tout","Non, les plantes n'ont pas de respiration cellulaire"],
    rep:1, exp:"Conception erronée classique et très fréquente au CRPE. Les plantes respirent (consomment O₂, rejettent CO₂) comme tous les êtres vivants, ET font la photosynthèse (consomment CO₂, rejettent O₂). De jour, la photosynthèse domine."
  },
  {
    id:4, theme:"Le vivant", icon:"🌿",
    q:"Qu'est-ce qu'un écosystème ?",
    opts:[
      "Un ensemble d'animaux dans une forêt",
      "L'ensemble des êtres vivants d'un milieu",
      "L'ensemble formé par une communauté d'êtres vivants (biocénose) et leur milieu physique (biotope) en interaction",
      "Un milieu naturel sans intervention humaine"
    ],
    rep:2, exp:"Écosystème = biocénose (êtres vivants) + biotope (milieu physique : sol, eau, air, lumière). Les deux sont en interaction permanente. Ex : une mare, une forêt, une prairie."
  },
  {
    id:5, theme:"Le vivant", icon:"🌿",
    q:"Dans une chaîne alimentaire : herbe → lapin → renard → décomposeurs. Que se passe-t-il si la population de renards s'effondre ?",
    opts:[
      "La population de lapins diminue",
      "La population de lapins augmente, puis l'herbe diminue",
      "Rien ne change",
      "Les décomposeurs disparaissent"
    ],
    rep:1, exp:"Sans prédateur, les lapins se reproduisent sans régulation → surpopulation → surconsommation d'herbe → diminution de l'herbe. C'est la régulation par la prédation. Type de question 'analyse de document' très courant."
  },
  {
    id:6, theme:"Le vivant", icon:"🌿",
    q:"Quelle est la différence entre les besoins nutritifs d'un animal et d'un végétal ?",
    opts:[
      "Aucune différence",
      "L'animal est hétérotrophe (se nourrit de matière organique), le végétal est autotrophe (fabrique sa matière organique)",
      "Le végétal mange des animaux",
      "L'animal peut faire la photosynthèse"
    ],
    rep:1, exp:"Autotrophe = fabrique sa propre matière organique (plantes via photosynthèse). Hétérotrophe = dépend d'autres organismes pour se nourrir (animaux, champignons). Vocabulaire attendu cycle 3."
  },
  {
    id:7, theme:"Le vivant", icon:"🌿",
    q:"Qu'appelle-t-on la 'classification phylogénétique' ?",
    opts:[
      "Classer les êtres vivants par taille",
      "Classer les êtres vivants selon leurs caractères partagés issus d'un ancêtre commun",
      "Classer les êtres vivants par habitat",
      "Classer les êtres vivants par utilité pour l'humain"
    ],
    rep:1, exp:"La classification phylogénétique (ou évolutive) regroupe les êtres vivants selon leurs liens de parenté évolutifs (caractères hérités d'un ancêtre commun). Elle a remplacé la classification morphologique au cycle 3."
  },

  // ══ CORPS HUMAIN & SANTÉ ══
  {
    id:8, theme:"Corps humain & santé", icon:"🫀",
    q:"Dans quel ordre le sang circule-t-il dans la grande circulation ?",
    opts:[
      "Cœur gauche → poumons → cœur droit → organes",
      "Cœur gauche → aorte → organes → veines → cœur droit",
      "Cœur droit → aorte → organes → cœur gauche",
      "Poumons → cœur gauche → poumons"
    ],
    rep:1, exp:"Grande circulation : ventricule gauche → aorte → artères → organes (échanges O₂/CO₂) → veines → veine cave → oreillette droite. Petite circulation : cœur droit → poumons → cœur gauche. Erreur fréquente : confondre les deux circuits."
  },
  {
    id:9, theme:"Corps humain & santé", icon:"🫀",
    q:"Quelle est la fonction principale du système digestif ?",
    opts:[
      "Transporter l'oxygène",
      "Transformer les aliments en nutriments assimilables par l'organisme",
      "Filtrer le sang",
      "Produire des hormones"
    ],
    rep:1, exp:"Le système digestif transforme (digestion mécanique + chimique) les aliments en nutriments (glucose, acides aminés, acides gras) qui passent dans le sang par absorption intestinale. L'intestin grêle est le lieu principal d'absorption."
  },
  {
    id:10, theme:"Corps humain & santé", icon:"🫀",
    q:"Un élève pense que 'respirer c'est juste faire entrer de l'air dans les poumons'. Quelle conception erronée cela révèle-t-il ?",
    opts:[
      "Aucune, c'est correct",
      "Il confond ventilation pulmonaire et respiration cellulaire. La respiration inclut aussi les échanges gazeux dans les cellules",
      "Il confond respiration et digestion",
      "Il confond poumons et bronches"
    ],
    rep:1, exp:"Conception erronée classique CRPE. Ventilation = mouvements mécaniques (inspiration/expiration). Respiration cellulaire = utilisation de l'O₂ par les cellules pour produire de l'énergie, avec rejet de CO₂. Les deux sont complémentaires mais distincts."
  },

  // ══ MATIÈRE & ÉNERGIE ══
  {
    id:11, theme:"Matière & énergie", icon:"⚡",
    q:"Quels sont les trois états de la matière et comment les distingue-t-on ?",
    opts:[
      "Liquide, gazeux, plasma — selon la température uniquement",
      "Solide (forme et volume propres), liquide (volume propre, forme du récipient), gaz (ni forme ni volume propres)",
      "Dur, mou, invisible",
      "Lourd, léger, léger comme l'air"
    ],
    rep:1, exp:"Solide : forme et volume propres. Liquide : volume propre, prend la forme du récipient. Gaz : ni forme ni volume propres, occupe tout l'espace disponible. Les changements d'état dépendent de la température et de la pression."
  },
  {
    id:12, theme:"Matière & énergie", icon:"⚡",
    q:"Quelle est la différence entre chaleur et température ?",
    opts:[
      "Ce sont des synonymes",
      "La chaleur est une énergie transférée, la température est une mesure de l'agitation thermique des particules",
      "La chaleur est toujours plus grande que la température",
      "La température se mesure en joules"
    ],
    rep:1, exp:"Chaleur (Q) = énergie transférée, en Joules. Température (T) = mesure de l'agitation moléculaire, en °C ou Kelvin. Confusion fréquente en classe et au CRPE. Un objet peut avoir une grande chaleur spécifique mais une faible température."
  },
  {
    id:13, theme:"Matière & énergie", icon:"⚡",
    q:"Qu'est-ce que le principe de conservation de l'énergie ?",
    opts:[
      "L'énergie se crée à partir de rien",
      "L'énergie ne se crée ni ne se détruit, elle se transforme d'une forme à une autre",
      "L'énergie diminue toujours avec le temps",
      "L'énergie électrique est la seule forme d'énergie"
    ],
    rep:1, exp:"1er principe de la thermodynamique : l'énergie totale d'un système isolé est constante. Elle se transforme : électrique → lumineuse → thermique, etc. Attendu au cycle 3. Les 'pertes' sont des transformations en chaleur."
  },
  {
    id:14, theme:"Matière & énergie", icon:"⚡",
    q:"Qu'est-ce que la flottabilité (poussée d'Archimède) ?",
    opts:[
      "Un objet flotte si sa densité est supérieure à celle du liquide",
      "Tout corps immergé dans un fluide subit une poussée verticale vers le haut égale au poids du fluide déplacé",
      "La flottabilité dépend uniquement du poids de l'objet",
      "Un objet flotte toujours si on le pousse vers le bas"
    ],
    rep:1, exp:"Poussée d'Archimède : F = ρ×V×g (densité du fluide × volume immergé × g). Un objet flotte si sa densité moyenne < densité du fluide. Thème tombé en 2025 G1 (Polar POD). Un bateau en acier flotte car sa densité moyenne est < 1 (cavités d'air)."
  },
  {
    id:15, theme:"Matière & énergie", icon:"⚡",
    q:"Quelles sont les formes d'énergie renouvelable ? (choix le plus complet)",
    opts:[
      "Pétrole, gaz, charbon",
      "Solaire, éolienne, hydraulique, géothermique, biomasse",
      "Nucléaire, solaire",
      "Électrique, thermique"
    ],
    rep:1, exp:"Énergies renouvelables : solaire (photovoltaïque et thermique), éolienne, hydraulique, géothermique, biomasse/biogaz. L'énergie nucléaire n'est pas renouvelable (uranium limité). L'énergie électrique est une forme transportée, pas une source primaire."
  },

  // ══ TECHNOLOGIE & OBJETS TECHNIQUES ══
  {
    id:16, theme:"Technologie & objets", icon:"⚙️",
    q:"Dans un circuit électrique en SÉRIE, que se passe-t-il si une ampoule grille ?",
    opts:[
      "Les autres ampoules brillent plus fort",
      "Rien ne change",
      "Toutes les ampoules s'éteignent car le circuit est interrompu",
      "Seule l'ampoule suivante s'éteint"
    ],
    rep:2, exp:"En série : les composants sont sur un seul chemin. Si un composant est défaillant, le circuit est ouvert et tout s'arrête. En parallèle : chaque composant a son propre chemin → les autres continuent de fonctionner. Confusion série/parallèle = erreur fréquente (rapport jury 2024)."
  },
  {
    id:17, theme:"Technologie & objets", icon:"⚙️",
    q:"Qu'est-ce que la 'chaîne d'information' d'un objet technique ?",
    opts:[
      "Le câble électrique de l'objet",
      "La séquence : acquérir l'information → traiter → communiquer/agir",
      "Le mode d'emploi de l'objet",
      "La liste des composants"
    ],
    rep:1, exp:"Chaîne d'information : capteur (acquérir) → processeur/automate (traiter) → actionneur (communiquer/agir). Ex : thermostat : sonde thermique → régulateur → radiateur. Notion clé cycle 3 technologie, souvent mal connue (rapport jury 2024)."
  },
  {
    id:18, theme:"Technologie & objets", icon:"⚙️",
    q:"Un interrupteur ouvert dans un circuit électrique…",
    opts:[
      "Laisse passer le courant",
      "Interrompt le circuit : le courant ne passe plus",
      "Augmente la tension",
      "Diminue la résistance"
    ],
    rep:1, exp:"Interrupteur ouvert = circuit ouvert = pas de courant. Interrupteur fermé = circuit fermé = courant circule. Symbole normalisé à connaître. Erreur fréquente : croire qu'un interrupteur ouvert laisse passer le courant."
  },
  {
    id:19, theme:"Technologie & objets", icon:"⚙️",
    q:"Quelle est la différence entre un matériau conducteur et un matériau isolant ?",
    opts:[
      "Un conducteur laisse passer l'eau, un isolant non",
      "Un conducteur laisse passer le courant électrique, un isolant s'y oppose",
      "Un conducteur est toujours métallique",
      "Il n'y a pas de différence en pratique"
    ],
    rep:1, exp:"Conducteurs : métaux (cuivre, aluminium, fer), eau salée, graphite. Isolants : plastique, caoutchouc, verre, bois sec, air. L'eau pure est isolante mais l'eau du robinet (minéraux) est conductrice — distinction importante à l'école."
  },

  // ══ DÉMARCHE D'INVESTIGATION ══
  {
    id:20, theme:"Démarche d'investigation", icon:"🔬",
    q:"Quelles sont les étapes de la démarche d'investigation scientifique à l'école ?",
    opts:[
      "Observer → copier la leçon → apprendre par cœur",
      "Situation déclenchante → questionnement → hypothèses → expérimentation → analyse → conclusion → institutionnalisation",
      "Lire le manuel → répondre aux questions → corriger",
      "Regarder une vidéo → en discuter → évaluer"
    ],
    rep:1, exp:"La démarche d'investigation (inspirée de La main à la pâte) : 1. Situation-problème 2. Formulation de questions 3. Hypothèses 4. Protocole expérimental 5. Expérimentation 6. Analyse des résultats 7. Conclusion 8. Institutionnalisation. Cœur de l'enseignement des sciences à l'école."
  },
  {
    id:21, theme:"Démarche d'investigation", icon:"🔬",
    q:"Quelle est la différence entre une HYPOTHÈSE et une CONCLUSION ?",
    opts:[
      "Aucune, c'est la même chose",
      "L'hypothèse est une supposition à vérifier avant l'expérience. La conclusion est validée ou infirmée après analyse des résultats",
      "L'hypothèse vient après l'expérience",
      "La conclusion est toujours une question"
    ],
    rep:1, exp:"Erreur fréquente des candidats : écrire la conclusion AVANT l'expérience. L'hypothèse est ce qu'on suppose. L'expérience teste l'hypothèse. La conclusion confirme ou infirme. Une hypothèse peut être fausse : c'est normal scientifiquement."
  },
  {
    id:22, theme:"Démarche d'investigation", icon:"🔬",
    q:"Qu'est-ce qu'une 'expérience témoin' (ou contrôle) ?",
    opts:[
      "Une expérience réalisée par le professeur",
      "Une expérience identique à l'expérience principale, sauf le paramètre testé — pour isoler la variable étudiée",
      "Une expérience qui a déjà été publiée",
      "Une expérience plus simple pour les élèves en difficulté"
    ],
    rep:1, exp:"L'expérience témoin est INDISPENSABLE pour valider un résultat. On ne change qu'UN seul paramètre à la fois. Ex : plante avec lumière vs plante sans lumière (tout le reste identique). Sans témoin, on ne peut pas conclure scientifiquement."
  },
  {
    id:23, theme:"Démarche d'investigation", icon:"🔬",
    q:"Qu'appelle-t-on une 'conception initiale' (ou représentation initiale) des élèves ?",
    opts:[
      "Le premier dessin que font les élèves",
      "Ce que les élèves croient savoir avant l'enseignement — souvent erroné ou partiel — qu'il faut identifier pour adapter l'enseignement",
      "Le niveau scolaire de l'élève",
      "Le contenu du programme"
    ],
    rep:1, exp:"Les conceptions initiales (ou représentations) sont les idées préconçues des élèves, souvent ancrées et résistantes. Les identifier est la 1ère étape de l'enseignement scientifique. Ex : 'les plantes ne respirent pas', 'le Soleil tourne autour de la Terre'. Concept central de la didactique des sciences."
  },
  {
    id:24, theme:"Démarche d'investigation", icon:"🔬",
    q:"Comment rédiger un objectif de séance en sciences ? Quelle formulation est attendue ?",
    opts:[
      "'Les élèves étudieront la photosynthèse'",
      "'L'élève sera capable de [verbe d'action observable] + [contenu] + [conditions]'",
      "'Faire comprendre aux élèves la photosynthèse'",
      "'Aborder le thème de la photosynthèse'"
    ],
    rep:1, exp:"Un objectif pédagogique est formulé du point de vue de l'ÉLÈVE avec un verbe d'action observable et mesurable (identifier, expliquer, classer, mesurer...). Ex : 'L'élève sera capable d'expliquer le rôle de la lumière dans la photosynthèse à partir des résultats de l'expérience.' Rapport jury 2024 : les objectifs vagues sont sanctionnés."
  },
  {
    id:25, theme:"Démarche d'investigation", icon:"🔬",
    q:"Qu'est-ce que la 'transposition didactique' en sciences ?",
    opts:[
      "Traduire un cours en langue étrangère",
      "L'ensemble des transformations que subit un savoir savant pour devenir un savoir enseignable adapté aux élèves",
      "Passer d'une discipline à une autre",
      "Faire faire des expériences aux élèves"
    ],
    rep:1, exp:"La transposition didactique (Chevallard) : savoir savant (chercheurs) → savoir à enseigner (programmes) → savoir enseigné (classe) → savoir appris (élève). En sciences, il faut simplifier sans dénaturer. Concept attendu dans les questions de didactique."
  },
  {
    id:26, theme:"Démarche d'investigation", icon:"🔬",
    q:"Comment construire une SÉQUENCE d'enseignement en sciences (et non une séance) ?",
    opts:[
      "Une séquence = une séance très longue",
      "Une séquence est un ensemble de séances progressives visant un même objectif : situation déclenchante → recherche → structuration → évaluation",
      "Une séquence = le programme de l'année",
      "Une séquence est facultative en cycle 1"
    ],
    rep:1, exp:"Séquence = ensemble cohérent de séances. Structure attendue : 1. Séance d'entrée (situation-problème, recueil des conceptions) 2. Séances de recherche/expérimentation 3. Séance de structuration/institutionnalisation 4. Séance d'évaluation. Chaque séance a son propre objectif qui contribue à l'objectif général."
  },

  // ══ MATIÈRE / MÉLANGES ══
  {
    id:27, theme:"Matière & énergie", icon:"⚡",
    q:"Qu'est-ce qu'un mélange homogène ? Donner un exemple.",
    opts:[
      "Un mélange où on voit deux phases distinctes — ex : huile + eau",
      "Un mélange où on ne distingue pas les constituants à l'œil nu — ex : eau salée",
      "Un mélange de deux gaz uniquement",
      "Un mélange dont on ne peut pas séparer les composants"
    ],
    rep:1, exp:"Mélange homogène : une seule phase visible (eau salée, air). Mélange hétérogène : plusieurs phases distinctes (huile+eau, eau+sable). La séparation des mélanges (filtration, décantation, distillation) est au programme cycle 3."
  },
  {
    id:28, theme:"Matière & énergie", icon:"⚡",
    q:"Quelle est la solubilité ? Un élève dit 'le sucre disparaît dans l'eau'. Quelle est la bonne formulation scientifique ?",
    opts:[
      "Le sucre disparaît — c'est correct",
      "Le sucre se dissout dans l'eau : il se répartit en molécules invisibles mais reste présent dans la solution",
      "Le sucre est détruit par l'eau",
      "Le sucre devient de l'eau"
    ],
    rep:1, exp:"'Disparaître' est une conception erronée : la matière n'est pas détruite. Le sucre se DISSOUT : il se fragmente en molécules réparties dans l'eau. La masse totale est conservée (dissolution ≠ disparition). Conservation de la masse = loi de Lavoisier, accessible dès le cycle 3."
  },

  // ══ VIVANT — CYCLE 1 ══
  {
    id:29, theme:"Le vivant", icon:"🌿",
    q:"En cycle 1, comment aborder la notion de 'vivant/non-vivant' avec les élèves ?",
    opts:[
      "Donner la définition scientifique complète aux élèves",
      "Partir d'observations concrètes : trier des objets, observer des êtres vivants, identifier des critères (se nourrit, se reproduit, grandit, meurt)",
      "Regarder un documentaire",
      "Faire mémoriser une liste d'êtres vivants"
    ],
    rep:1, exp:"En cycle 1, la démarche est inductive et sensorielle. On part du vécu (animaux de classe, jardin, sortie nature). Les critères du vivant (naître, se nourrir, grandir, se reproduire, mourir) sont construits progressivement par l'observation, pas mémorisés."
  },
  {
    id:30, theme:"Le vivant", icon:"🌿",
    q:"Qu'est-ce qu'un 'être vivant' selon les critères scientifiques retenus à l'école primaire ?",
    opts:[
      "Tout ce qui bouge",
      "Un être qui naît, se nourrit, grandit, se reproduit et meurt",
      "Un être qui respire uniquement",
      "Un être qui a un cerveau"
    ],
    rep:1, exp:"Les 5 critères du vivant à l'école : naissance, nutrition, croissance, reproduction, mort. Le feu bouge et 'se nourrit' mais ne se reproduit pas biologiquement → non-vivant. Les virus posent question : conception adaptée selon le cycle."
  },

  // ══ GÉOLOGIE ══
  {
    id:31, theme:"Matière & énergie", icon:"⚡",
    q:"Qu'est-ce qu'un sol ? Comment se forme-t-il ?",
    opts:[
      "De la terre achetée en jardinerie",
      "La couche superficielle de l'écorce terrestre, résultant de l'altération de la roche mère et de l'accumulation de matière organique (humus)",
      "Un mélange de sable et d'eau",
      "La croûte terrestre profonde"
    ],
    rep:1, exp:"Le sol se forme lentement (des milliers d'années) par : altération physique et chimique de la roche mère + décomposition de matière organique par des organismes décomposeurs → humus. Le sol est un écosystème à part entière (vers de terre, bactéries, champignons)."
  },

  // ══ DIDACTIQUE — SÉANCE TYPE ══
  {
    id:32, theme:"Démarche d'investigation", icon:"🔬",
    q:"Un candidat propose comme 'objectif' de séance : 'Faire découvrir aux élèves la germination'. Pourquoi le jury pénalise-t-il cette formulation ?",
    opts:[
      "Le sujet est trop difficile",
      "L'objectif est formulé du point de vue de l'enseignant, pas de l'élève, et le verbe n'est pas observable. Il faut écrire : 'L'élève sera capable d'identifier les conditions nécessaires à la germination'",
      "La germination n'est pas au programme",
      "Il n'y a pas de problème"
    ],
    rep:1, exp:"Rapport jury 2024 : les objectifs formulés avec 'faire découvrir', 'aborder', 'sensibiliser' sont systématiquement pénalisés. L'objectif pédagogique doit être : observable (verbe d'action), centré sur l'élève, évaluable. Les verbes attendus : identifier, classer, expliquer, mesurer, comparer, formuler..."
  },
  {
    id:33, theme:"Démarche d'investigation", icon:"🔬",
    q:"Quelle est la différence entre 'évaluation diagnostique', 'formative' et 'sommative' en sciences ?",
    opts:[
      "Ce sont des synonymes",
      "Diagnostique : avant (identifier les acquis/conceptions). Formative : pendant (réguler les apprentissages). Sommative : après (certifier les acquis)",
      "Formative : avant. Diagnostique : pendant. Sommative : pendant aussi",
      "Seule l'évaluation sommative est utilisée à l'école primaire"
    ],
    rep:1, exp:"Les 3 types d'évaluation : diagnostique (avant la séquence, recueil des conceptions initiales), formative (pendant, aide à la progression, pas de note), sommative (à la fin, bilan des acquis). En sciences, l'évaluation diagnostique est essentielle pour la démarche d'investigation."
  },
  {
    id:34, theme:"Technologie & objets", icon:"⚙️",
    q:"À quel cycle travaille-t-on la notion d'objet technique et sa fonction ?",
    opts:[
      "Uniquement au cycle 3",
      "Cycle 1 : objets du quotidien et usage. Cycle 2 : fabrication simple, matériaux. Cycle 3 : fonctionnement, chaîne d'information/énergie",
      "Uniquement en 6e",
      "Cela ne fait pas partie des programmes de l'école primaire"
    ],
    rep:1, exp:"Progression par cycles : C1 (objets familiers, usage, sécurité), C2 (fabriquer, matériaux, propriétés), C3 (analyser un objet technique : fonctions, chaîne d'énergie, chaîne d'information, représentations). La technologie est souvent sous-estimée par les candidats (rapport jury 2024)."
  },
  {
    id:35, theme:"Corps humain & santé", icon:"🫀",
    q:"Quelle est la différence entre un muscle squelettique et un muscle lisse ?",
    opts:[
      "Le muscle squelettique est involontaire, le muscle lisse est volontaire",
      "Le muscle squelettique est volontaire (bras, jambes), le muscle lisse est involontaire (intestins, vaisseaux). Le muscle cardiaque est strié mais involontaire",
      "Il n'y a pas de différence",
      "Le muscle lisse est plus fort"
    ],
    rep:1, exp:"3 types de muscles : squelettique (strié, volontaire : mouvement), lisse (involontaire : organes internes, vaisseaux), cardiaque (strié, involontaire). Notion cycle 3. Le cœur est un muscle creux qui fonctionne sans qu'on y pense."
  },
  {
    id:36, theme:"Démarche d'investigation", icon:"🔬",
    q:"Le sujet donne une production d'élève avec un dessin d'une plante dont les racines pointent vers le haut. Que dit-on en didactique et que proposez-vous comme suite pédagogique ?",
    opts:[
      "L'élève a tort, on le corrige immédiatement",
      "C'est une conception erronée (géotropisme mal compris). On part de cette représentation initiale pour construire une situation-problème : 'Dans quel sens poussent vraiment les racines ? Comment peut-on le vérifier ?'",
      "On ignore le dessin et on continue le cours",
      "On donne la bonne réponse directement"
    ],
    rep:1, exp:"Type de question très fréquent au CRPE : analyse de production d'élève. La bonne posture : 1) Nommer la conception erronée, 2) L'utiliser comme point de départ (situation-problème), 3) Proposer une expérience de vérification (graines germant dans des bocaux orientés différemment), 4) Laisser les élèves observer et conclure."
  },
];

const FICHES = [
  {
    id:"vivant", icon:"🌿", titre:"Le vivant", couleur:"#38c98a", fond:"#0a2018",
    items:[
      {titre:"Critères du vivant",contenu:"Naître · Se nourrir · Grandir · Se reproduire · Mourir\n⚠ Le feu n'est pas vivant. Les virus : débat scientifique."},
      {titre:"Photosynthèse",contenu:"6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂\nLieu : feuilles (chlorophylle). Plantes autotrophes.\n⚠ Conception erronée : 'les plantes ne respirent que du CO₂' → FAUX. Elles respirent aussi l'O₂."},
      {titre:"Chaîne alimentaire",contenu:"Producteur → Consommateur 1 → Consommateur 2 → Décomposeurs\nRègulation : si prédateur disparaît → surpopulation proie → raréfaction végétaux"},
      {titre:"Écosystème",contenu:"Biocénose (êtres vivants) + Biotope (milieu physique) en interaction\nEx : forêt, mare, prairie"},
      {titre:"Classification phylogénétique",contenu:"Basée sur les caractères hérités d'un ancêtre commun\nRemplace la classification morphologique"},
      {titre:"Autotrophe / Hétérotrophe",contenu:"Autotrophe = fabrique sa matière organique (plantes)\nHétérotrophe = se nourrit d'autres organismes (animaux, champignons)"},
    ]
  },
  {
    id:"corps", icon:"🫀", titre:"Corps humain & santé", couleur:"#f87171", fond:"#200a0a",
    items:[
      {titre:"Double circulation sanguine",contenu:"Petite : cœur droit → poumons → cœur gauche (oxygénation)\nGrande : cœur gauche → aorte → organes → cœur droit (distribution O₂)\n⚠ Ne pas confondre artère (part du cœur) et veine (arrive au cœur)"},
      {titre:"Respiration ≠ Ventilation",contenu:"Ventilation = mouvements mécaniques (inspiration/expiration)\nRespiration cellulaire = O₂ consommé par les cellules, CO₂ rejeté\n⚠ Conception erronée fréquente"},
      {titre:"Digestion",contenu:"Bouche (dents + salive) → œsophage → estomac (acides) → intestin grêle (absorption) → gros intestin (eau)"},
      {titre:"Muscles",contenu:"Squelettique : volontaire (membres)\nLisse : involontaire (organes)\nCardiaque : strié + involontaire (cœur)"},
    ]
  },
  {
    id:"matiere", icon:"⚡", titre:"Matière & énergie", couleur:"#f4a642", fond:"#2a1500",
    items:[
      {titre:"États de la matière",contenu:"Solide : forme + volume propres\nLiquide : volume propre, forme du récipient\nGaz : ni forme ni volume propres\nChangements d'état : fusion, solidification, vaporisation, condensation, sublimation"},
      {titre:"Énergie — conservation",contenu:"L'énergie ne se crée ni ne se détruit → elle se transforme\nFormes : cinétique, potentielle, thermique, électrique, chimique, lumineuse\nÉnergies renouvelables : solaire, éolienne, hydraulique, géothermique, biomasse"},
      {titre:"Poussée d'Archimède",contenu:"F = ρ_fluide × V_immergé × g\nObjet flotte si densité moyenne < densité fluide\nEx : bateau acier flotte car cavités d'air → densité moyenne < 1"},
      {titre:"Mélanges",contenu:"Homogène : 1 seule phase (eau salée, air)\nHétérogène : phases distinctes (huile+eau)\nSéparation : filtration, décantation, distillation, évaporation"},
      {titre:"Dissolution ≠ Disparition ⚠",contenu:"Le sucre se DISSOUT → molécules invisibles mais présentes\nMasse conservée (Lavoisier)\nConception erronée : 'le sucre disparaît'"},
    ]
  },
  {
    id:"techno", icon:"⚙️", titre:"Technologie & objets", couleur:"#818cf8", fond:"#0f0f30",
    items:[
      {titre:"Circuit électrique — série vs parallèle",contenu:"Série : 1 seul chemin → si 1 composant défaillant, tout s'arrête\nParallèle : chemins indépendants → les autres continuent\n⚠ Confusion série/parallèle = erreur très fréquente (rapport jury 2024)"},
      {titre:"Conducteur / Isolant",contenu:"Conducteurs : métaux (cuivre, fer, alu), eau salée, graphite\nIsolants : plastique, caoutchouc, verre, bois sec, air\n⚠ Eau pure = isolante MAIS eau du robinet = conductrice"},
      {titre:"Chaîne d'information ⚠",contenu:"Acquérir (capteur) → Traiter (processeur) → Communiquer/Agir (actionneur)\nEx : thermostat = sonde → régulateur → radiateur\nMal connu des candidats (rapport jury 2024)"},
      {titre:"Objets techniques par cycle",contenu:"C1 : usage, sécurité\nC2 : matériaux, fabrication simple\nC3 : fonctions, chaîne énergie/information, représentation (schéma, patron)"},
    ]
  },
  {
    id:"demarch", icon:"🔬", titre:"Démarche d'investigation & didactique", couleur:"#4f9cf9", fond:"#0d2240",
    items:[
      {titre:"Étapes de la démarche",contenu:"1. Situation-problème (questionnement)\n2. Recueil des conceptions initiales\n3. Formulation d'hypothèses\n4. Protocole expérimental\n5. Expérimentation (+ témoin !!)\n6. Analyse des résultats\n7. Conclusion\n8. Institutionnalisation"},
      {titre:"Séquence vs séance",contenu:"Séquence : ensemble cohérent de séances → 1 objectif général\nSéance : 1 objectif précis, observable, centré élève\n⚠ 'Faire découvrir' = INTERDIT dans un objectif"},
      {titre:"Objectif pédagogique ⚠",contenu:"Formule attendue : 'L'élève sera capable de [verbe d'action] + [contenu]'\nVerbes : identifier, classer, expliquer, mesurer, formuler, comparer\n❌ 'aborder', 'sensibiliser', 'faire comprendre' → pénalisés"},
      {titre:"Évaluation",contenu:"Diagnostique : AVANT (conceptions initiales)\nFormative : PENDANT (régulation, pas de note)\nSommative : APRÈS (certification des acquis)"},
      {titre:"Conceptions initiales ⚠",contenu:"Ce que les élèves croient AVANT l'enseignement\nRésistantes et ancrées\nÀ IDENTIFIER avant toute séquence → point de départ pédagogique\nEx : 'les plantes ne respirent pas', 'le Soleil tourne'"},
      {titre:"Expérience témoin",contenu:"Expérience identique SAUF le paramètre testé\nIndispensable pour valider un résultat\nOn ne fait varier qu'UN seul paramètre à la fois"},
      {titre:"Transposition didactique",contenu:"Savoir savant → savoir à enseigner (programmes) → savoir enseigné (classe)\nSimplifier SANS dénaturer le savoir scientifique"},
    ]
  },
];

function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

export default function App(){
  const [mode,setMode]=useState("accueil");
  const [questions,setQuestions]=useState([]);
  const [idx,setIdx]=useState(0);
  const [selected,setSelected]=useState(null);
  const [revealed,setRevealed]=useState(false);
  const [score,setScore]=useState(0);
  const [histo,setHisto]=useState([]);
  const [ficheActive,setFicheActive]=useState(null);
  const [themeFilter,setThemeFilter]=useState("Tout");

  const themes=["Tout",...Array.from(new Set(QUESTIONS.map(q=>q.theme)))];

  function start(f){
    const pool=f==="Tout"?QUESTIONS:QUESTIONS.filter(q=>q.theme===f);
    setQuestions(shuffle(pool));
    setIdx(0);setSelected(null);setRevealed(false);setScore(0);setHisto([]);
    setMode("quiz");
  }

  function valider(){
    if(selected===null)return;
    setRevealed(true);
    const ok=selected===questions[idx].rep;
    if(ok)setScore(s=>s+1);
    setHisto(h=>[...h,{q:questions[idx],sel:selected,ok}]);
  }

  function next(){
    if(idx+1>=questions.length)setMode("resultats");
    else{setIdx(i=>i+1);setSelected(null);setRevealed(false);}
  }

  const pct=questions.length>0?Math.round((score/questions.length)*100):0;
  const q=questions[idx];
  const ficheColor=(theme)=>FICHES.find(f=>f.titre===theme)?.couleur||"#4f9cf9";

  const css={
    app:{minHeight:"100vh",background:"#080c18",color:"#e8eaf0",fontFamily:"'Segoe UI',system-ui,sans-serif",fontSize:14},
    hdr:{background:"#0f1528",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"},
    logo:{fontSize:17,fontWeight:800},
    pill:(a)=>({padding:"5px 13px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",border:"none",background:a?"#4f9cf9":"rgba(255,255,255,0.06)",color:a?"#fff":"#7880a0"}),
    card:(c)=>({background:`${c}12`,border:`1px solid ${c}35`,borderRadius:12,padding:"14px 16px",cursor:"pointer"}),
    qbox:{background:"#12162a",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"18px",marginBottom:12},
    opt:(s)=>{
      let bg="rgba(255,255,255,0.04)",bd="1px solid rgba(255,255,255,0.09)",co="#c0c8e0";
      if(s==="sel"){bg="rgba(79,156,249,0.2)";bd="1px solid #4f9cf9";co="#fff";}
      if(s==="ok"){bg="rgba(56,201,138,0.18)";bd="1px solid #38c98a";co="#6ee7b7";}
      if(s==="ko"){bg="rgba(248,113,113,0.18)";bd="1px solid #f87171";co="#fca5a5";}
      return{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:10,border:bd,background:bg,color:co,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,lineHeight:1.5,marginBottom:7};
    },
    btn:(a)=>({flex:1,padding:"12px",borderRadius:10,border:"none",cursor:a?"pointer":"not-allowed",fontWeight:700,fontSize:13,background:a?"linear-gradient(90deg,#4f9cf9,#7c3aed)":"rgba(255,255,255,0.04)",color:a?"#fff":"#555"}),
    wrap:{maxWidth:680,margin:"0 auto",padding:"18px 16px"},
    prog:{height:4,background:"rgba(255,255,255,0.08)",borderRadius:999,marginBottom:14,overflow:"hidden"},
  };

  // ACCUEIL
  if(mode==="accueil")return(
    <div style={css.app}>
      <div style={css.hdr}>
        <div style={css.logo}>CRPE 2026 · <span style={{color:"#38c98a"}}>Sciences & Technologie</span></div>
        <div style={{display:"flex",gap:8}}>
          <button style={css.pill(false)} onClick={()=>setMode("fiche")}>📋 Fiches</button>
        </div>
      </div>
      <div style={css.wrap}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:38,marginBottom:6}}>🔬</div>
          <h1 style={{fontSize:20,fontWeight:800,margin:"0 0 4px"}}>Quiz Sciences & Technologie</h1>
          <p style={{color:"#7880a0",fontSize:12}}>{QUESTIONS.length} questions · Annales + rapports jury 2022–2025 · Didactique incluse</p>
        </div>
        <div style={{marginBottom:12,display:"flex",flexWrap:"wrap",gap:7}}>
          {themes.map(t=>(
            <button key={t} onClick={()=>setThemeFilter(t)} style={css.pill(themeFilter===t)}>
              {t}{t!=="Tout"&&<span style={{opacity:.6,fontSize:10}}> ({QUESTIONS.filter(q=>q.theme===t).length})</span>}
            </button>
          ))}
        </div>
        <button onClick={()=>start(themeFilter)} style={{width:"100%",padding:"15px",background:"linear-gradient(90deg,#38c98a,#059669)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",marginBottom:12}}>
          Démarrer → {themeFilter==="Tout"?QUESTIONS.length:QUESTIONS.filter(q=>q.theme===themeFilter).length} questions
        </button>
        <div style={{background:"rgba(248,113,113,0.07)",border:"1px solid rgba(248,113,113,0.25)",borderRadius:10,padding:"12px 14px",fontSize:12,color:"#fca5a5"}}>
          <strong style={{color:"#f87171"}}>⚠ Ce qui tombe TOUJOURS :</strong> Démarche d'investigation · Conceptions erronées des élèves · Objectifs pédagogiques (formulation) · Séquence vs séance · Chaîne d'information · Vivant/photosynthèse · Énergie · Circuits électriques
        </div>
        <button onClick={()=>setMode("fiche")} style={{width:"100%",marginTop:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:"#a5b4fc",padding:"10px",cursor:"pointer",fontSize:12,fontWeight:600}}>
          📋 Voir les fiches de révision
        </button>
      </div>
    </div>
  );

  // FICHES
  if(mode==="fiche")return(
    <div style={css.app}>
      <div style={css.hdr}>
        <div style={css.logo}>Sciences & Techno · <span style={{color:"#38c98a"}}>Fiches</span></div>
        <button style={css.pill(false)} onClick={()=>setMode("accueil")}>← Quiz</button>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"18px 16px"}}>
        {ficheActive===null?(
          <>
            <h2 style={{fontSize:16,fontWeight:800,marginBottom:14}}>📋 Fiches de révision express</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:10}}>
              {FICHES.map(f=>(
                <div key={f.id} onClick={()=>setFicheActive(f.id)} style={{...css.card(f.couleur),borderLeft:`4px solid ${f.couleur}`}}>
                  <div style={{fontSize:22,marginBottom:5}}>{f.icon}</div>
                  <div style={{fontWeight:700,color:f.couleur,fontSize:13,marginBottom:3}}>{f.titre}</div>
                  <div style={{fontSize:11,color:"#7880a0"}}>{f.items.length} notions · Cliquer pour ouvrir</div>
                </div>
              ))}
            </div>
          </>
        ):(()=>{
          const f=FICHES.find(x=>x.id===ficheActive);
          return(
            <div>
              <button onClick={()=>setFicheActive(null)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#a5b4fc",padding:"5px 12px",cursor:"pointer",fontSize:12,marginBottom:14}}>← Retour</button>
              <div style={{background:`${f.couleur}0e`,border:`1px solid ${f.couleur}30`,borderRadius:12,padding:"18px"}}>
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}>
                  <span style={{fontSize:26}}>{f.icon}</span>
                  <h3 style={{fontWeight:800,fontSize:16,color:f.couleur}}>{f.titre}</h3>
                </div>
                {f.items.map((item,i)=>(
                  <div key={i} style={{background:"rgba(0,0,0,0.3)",border:`1px solid ${f.couleur}18`,borderRadius:9,padding:"11px 13px",marginBottom:9}}>
                    <div style={{fontWeight:700,color:f.couleur,fontSize:12,marginBottom:5}}>{item.titre}</div>
                    <div style={{color:"#cbd5e1",fontSize:12,lineHeight:1.7,whiteSpace:"pre-line",fontFamily:"'Courier New',monospace"}}>{item.contenu}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );

  // RÉSULTATS
  if(mode==="resultats")return(
    <div style={css.app}>
      <div style={css.hdr}><div style={css.logo}>Sciences & Techno · <span style={{color:"#38c98a"}}>Résultats</span></div></div>
      <div style={css.wrap}>
        <div style={{textAlign:"center",background:"#12162a",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"24px",marginBottom:18}}>
          <div style={{fontSize:44}}>{pct>=80?"🎯":pct>=60?"💪":"📖"}</div>
          <div style={{fontSize:40,fontWeight:900,color:pct>=80?"#38c98a":pct>=60?"#f4a642":"#f87171",margin:"6px 0"}}>{score}/{questions.length}</div>
          <div style={{color:"#7880a0"}}>{pct}%</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
            <button onClick={()=>start(themeFilter)} style={{...css.btn(true),flex:"none",padding:"9px 18px"}}>🔄 Recommencer</button>
            <button onClick={()=>setMode("accueil")} style={{...css.btn(true),flex:"none",padding:"9px 18px",background:"rgba(255,255,255,0.07)"}}>← Menu</button>
          </div>
        </div>
        {histo.map((h,i)=>(
          <div key={i} style={{background:h.ok?"rgba(56,201,138,0.06)":"rgba(248,113,113,0.06)",border:`1px solid ${h.ok?"#38c98a":"#f87171"}`,borderRadius:10,padding:"11px 13px",marginBottom:9}}>
            <div style={{display:"flex",gap:7,marginBottom:4,fontSize:12.5}}><span>{h.ok?"✅":"❌"}</span><span style={{fontWeight:600}}>{h.q.q}</span></div>
            {!h.ok&&<div style={{fontSize:12,color:"#fca5a5",marginBottom:3}}>Ta réponse : {h.q.opts[h.sel]}</div>}
            <div style={{fontSize:12,color:"#6ee7b7",marginBottom:4}}>✓ {h.q.opts[h.q.rep]}</div>
            <div style={{fontSize:11.5,color:"#7880a0",borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:5}}>{h.q.exp}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // QUIZ
  return(
    <div style={css.app}>
      <div style={css.hdr}>
        <div style={css.logo}>Sciences & Techno</div>
        <div style={{fontSize:12,color:"#7880a0"}}>{idx+1}/{questions.length} · ✓{score}</div>
      </div>
      <div style={css.wrap}>
        <div style={css.prog}><div style={{height:"100%",width:`${((idx+1)/questions.length)*100}%`,background:"linear-gradient(90deg,#38c98a,#059669)",borderRadius:999,transition:"width .4s"}}></div></div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${ficheColor(q.theme)}18`,border:`1px solid ${ficheColor(q.theme)}40`,borderRadius:20,padding:"3px 11px",fontSize:11,fontWeight:700,color:ficheColor(q.theme),marginBottom:10}}>
          {q.icon} {q.theme}
        </div>
        <div style={css.qbox}>
          <p style={{fontSize:15,fontWeight:600,lineHeight:1.6,margin:0}}>{q.q}</p>
        </div>
        <div style={{marginBottom:12}}>
          {q.opts.map((opt,i)=>{
            let s="norm";
            if(!revealed&&selected===i)s="sel";
            if(revealed&&i===q.rep)s="ok";
            if(revealed&&selected===i&&i!==q.rep)s="ko";
            return(
              <button key={i} onClick={()=>!revealed&&setSelected(i)} style={css.opt(s)}>
                <span style={{width:24,height:24,borderRadius:"50%",border:"1.5px solid currentColor",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{String.fromCharCode(65+i)}</span>
                {opt}
                {revealed&&i===q.rep&&<span style={{marginLeft:"auto"}}>✅</span>}
                {revealed&&selected===i&&i!==q.rep&&<span style={{marginLeft:"auto"}}>❌</span>}
              </button>
            );
          })}
        </div>
        {revealed&&(
          <div style={{background:"rgba(56,201,138,0.07)",border:"1px solid rgba(56,201,138,0.3)",borderRadius:10,padding:"12px 14px",marginBottom:12}}>
            <div style={{fontSize:10,color:"#38c98a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontWeight:700}}>💡 Explication</div>
            <p style={{margin:0,fontSize:13,lineHeight:1.65,color:"#e0e7ff"}}>{q.exp}</p>
          </div>
        )}
        <div style={{display:"flex",gap:8}}>
          {!revealed
            ?<button onClick={valider} disabled={selected===null} style={css.btn(selected!==null)}>Valider</button>
            :<button onClick={next} style={css.btn(true)}>{idx+1>=questions.length?"Voir mes résultats 🏁":"Suivant →"}</button>
          }
        </div>
      </div>
    </div>
  );
}
