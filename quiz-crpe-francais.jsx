import { useState, useEffect } from "react";

const QUESTIONS = [
  // ═══════════════════════════════════════════════
  // PARTIE 1 — GRAMMAIRE / ÉTUDE DE LA LANGUE
  // ═══════════════════════════════════════════════

  // — Classes grammaticales —
  {
    id: 1, partie: 1, categorie: "Classes grammaticales",
    question: "Dans la terminologie grammaticale Eduscol (2020), combien de classes de mots variables distingue-t-on ?",
    options: ["4", "5", "6", "7"],
    reponse: 1,
    explication: "On distingue 5 classes variables : nom, déterminant, adjectif, pronom, verbe. Les invariables sont : adverbe, préposition, conjonction (de coordination et de subordination), interjection."
  },
  {
    id: 2, partie: 1, categorie: "Classes grammaticales",
    question: "Selon la terminologie Eduscol 2020, la phrase exclamative est-elle un TYPE ou une FORME de phrase ?",
    options: ["Un type de phrase", "Une forme de phrase", "Les deux sont admis", "Ni l'un ni l'autre"],
    reponse: 1,
    explication: "Selon la terminologie Eduscol 2020, la phrase exclamative est une FORME de phrase (comme la forme négative, emphatique…). Les types sont : déclaratif, interrogatif, injonctif."
  },
  {
    id: 3, partie: 1, categorie: "Classes grammaticales",
    question: "Quelle est la classe grammaticale du mot « que » dans : « Je pense que tu viendras » ?",
    options: ["Pronom relatif", "Conjonction de subordination", "Adverbe", "Pronom interrogatif"],
    reponse: 1,
    explication: "« Que » introduit une proposition subordonnée conjonctive complétive : c'est une conjonction de subordination (ou subordonnant). Il n'a pas de fonction propre dans la subordonnée."
  },
  {
    id: 4, partie: 1, categorie: "Classes grammaticales",
    question: "Dans « Il court vite », « vite » est un :",
    options: ["Adjectif", "Nom", "Adverbe", "Verbe"],
    reponse: 2,
    explication: "« Vite » modifie le verbe « court » : c'est un adverbe de manière. Il est invariable."
  },
  {
    id: 5, partie: 1, categorie: "Classes grammaticales",
    question: "Quelle est la nature du groupe souligné dans « La fille aux yeux bleus arrive » — « aux yeux bleus » ?",
    options: ["Groupe adjectival", "Groupe nominal prépositionnel", "Proposition relative", "Complément du nom"],
    reponse: 1,
    explication: "« aux yeux bleus » est un groupe nominal introduit par une préposition (groupe nominal prépositionnel), complément du nom « fille »."
  },

  // — Fonctions syntaxiques —
  {
    id: 6, partie: 1, categorie: "Fonctions syntaxiques",
    question: "Comment appelle-t-on le complément dans « Il semble fatigué » selon la terminologie Eduscol 2020 ?",
    options: ["Attribut du sujet", "Complément d'objet direct", "Épithète", "Apposition"],
    reponse: 0,
    explication: "Avec un verbe d'état (sembler, paraître, être, devenir…), l'adjectif ou le nom qui suit est attribut du sujet."
  },
  {
    id: 7, partie: 1, categorie: "Fonctions syntaxiques",
    question: "Le complément de phrase (anciennement CCL, CCT…) a une caractéristique syntaxique principale : laquelle ?",
    options: ["Il est obligatoire", "Il est déplaçable et supprimable", "Il suit toujours le verbe", "Il ne peut pas être pronominalisé"],
    reponse: 1,
    explication: "Le complément de phrase est déplaçable et supprimable (effaçable). C'est ce qui le distingue du complément du verbe (COD, COI), qui lui est non déplaçable et non supprimable."
  },
  {
    id: 8, partie: 1, categorie: "Fonctions syntaxiques",
    question: "Dans « Le livre que je lis est passionnant », quelle est la fonction de « que » ?",
    options: ["Sujet", "COD", "COI", "Complément de phrase"],
    reponse: 1,
    explication: "« que » est pronom relatif, représentant « le livre ». Dans la relative, il est COD du verbe « lis » (je lis quoi ? que = le livre)."
  },
  {
    id: 9, partie: 1, categorie: "Fonctions syntaxiques",
    question: "Quelle manipulation syntaxique permet d'identifier le COD ?",
    options: ["Le déplacement en tête de phrase", "La pronominalisation par le/la/les ou y/en", "L'effacement", "La substitution par un adverbe"],
    reponse: 1,
    explication: "On remplace le COD par le, la, les (ou l') : « Il mange la pomme → Il la mange ». Le COI se remplace par lui, leur, y, en."
  },
  {
    id: 10, partie: 1, categorie: "Fonctions syntaxiques",
    question: "Dans « On l'a jugée coupable », quelle est la fonction de « coupable » ?",
    options: ["Attribut du sujet", "Attribut du COD", "Épithète", "Apposition"],
    reponse: 1,
    explication: "Après un verbe de perception ou de jugement, l'adjectif qualifiant le COD est « attribut du COD ». Il s'accorde avec le COD (ici féminin)."
  },

  // — Propositions —
  {
    id: 11, partie: 1, categorie: "Propositions",
    question: "Quelle est la nature de la subordonnée dans « Il faut qu'il vienne » ?",
    options: ["Proposition subordonnée relative", "Proposition subordonnée conjonctive complétive", "Proposition subordonnée conjonctive circonstancielle", "Proposition indépendante"],
    reponse: 1,
    explication: "La subordonnée conjonctive complétive est introduite par « que » et joue le rôle de sujet ou COD. Ici elle est sujet réel de « il faut »."
  },
  {
    id: 12, partie: 1, categorie: "Propositions",
    question: "Quel mode utilise-t-on dans la subordonnée introduite par « bien que » ?",
    options: ["Indicatif", "Subjonctif", "Conditionnel", "Infinitif"],
    reponse: 1,
    explication: "Les conjonctions concessives (bien que, quoique, encore que…) se construisent avec le subjonctif : « Bien qu'il soit fatigué, il travaille »."
  },
  {
    id: 13, partie: 1, categorie: "Propositions",
    question: "Dans « La ville où je suis né est belle », la proposition subordonnée est :",
    options: ["Conjonctive complétive", "Conjonctive circonstancielle de lieu", "Relative déterminative", "Participiale"],
    reponse: 2,
    explication: "« où je suis né » est une proposition subordonnée relative introduite par le pronom relatif « où ». Elle est déterminative car elle restreint le sens de « ville »."
  },
  {
    id: 14, partie: 1, categorie: "Propositions",
    question: "Quelle différence entre une subordonnée relative DÉTERMINATIVE et une subordonnée relative APPOSITIVE ?",
    options: [
      "La déterminative peut être supprimée sans changer le sens ; l'appositive non",
      "La déterminative ne peut être supprimée sans changer le sens ; l'appositive (explicative) peut être supprimée",
      "Il n'y a pas de différence",
      "La déterminative est entre virgules"
    ],
    reponse: 1,
    explication: "La relative déterminative restreint le référent et ne peut être supprimée. L'appositive (ou explicative) apporte un complément d'information, souvent entre virgules, et peut être supprimée."
  },

  // — Conjugaison / Modes et temps —
  {
    id: 15, partie: 1, categorie: "Conjugaison — modes et temps",
    question: "Quelle valeur le présent de l'indicatif peut-il avoir dans le contexte littéraire 'Il ferme la porte et s'en va' (narration) ?",
    options: ["Présent de vérité générale", "Présent d'énonciation", "Présent de narration (historique)", "Présent d'habitude"],
    reponse: 2,
    explication: "Dans un récit au passé, le présent de narration (ou historique) est utilisé pour rendre les actions plus vivantes. C'est une erreur fréquente au CRPE de répondre systématiquement 'présent d'énonciation'."
  },
  {
    id: 16, partie: 1, categorie: "Conjugaison — modes et temps",
    question: "Quelle est la valeur du conditionnel dans « Si tu venais, je serais content » ?",
    options: ["Conditionnel d'hypothèse (irréel du présent)", "Conditionnel de politesse", "Conditionnel journalistique", "Futur dans le passé"],
    reponse: 0,
    explication: "La structure si + imparfait → conditionnel présent exprime une hypothèse à réalisation incertaine (irréel du présent ou potentiel)."
  },
  {
    id: 17, partie: 1, categorie: "Conjugaison — modes et temps",
    question: "Quelle est la différence aspectuelle entre l'imparfait et le passé simple dans un récit ?",
    options: [
      "L'imparfait exprime l'accompli, le passé simple l'inaccompli",
      "L'imparfait exprime la durée/habitude/arrière-plan ; le passé simple exprime des événements ponctuels au premier plan",
      "L'imparfait est plus formel que le passé simple",
      "Il n'y a pas de différence aspectuelle"
    ],
    reponse: 1,
    explication: "C'est la valeur aspectuelle essentielle : l'imparfait (aspect sécant/imperfectif) donne le cadre, la durée, la description ; le passé simple (aspect global/perfectif) fait avancer l'action."
  },
  {
    id: 18, partie: 1, categorie: "Conjugaison — modes et temps",
    question: "Quelle est la règle d'accord du participe passé avec l'auxiliaire AVOIR ?",
    options: [
      "Il s'accorde toujours avec le sujet",
      "Il s'accorde avec le COD si celui-ci est placé avant le verbe",
      "Il est toujours invariable",
      "Il s'accorde avec le sujet si le COD est féminin"
    ],
    reponse: 1,
    explication: "Le participe passé avec avoir s'accorde en genre et en nombre avec le COD uniquement si ce COD est placé AVANT le verbe (pronom, relative, etc.). Ex. : 'Les fleurs qu'il a cueillies.'"
  },
  {
    id: 19, partie: 1, categorie: "Conjugaison — modes et temps",
    question: "Le subjonctif est-il un mode du discours ou de la modalité ?",
    options: ["Du discours", "De la modalité (exprime doute, désir, nécessité…)", "Un temps du passé", "Un mode uniquement littéraire"],
    reponse: 1,
    explication: "Le subjonctif est le mode de la modalité : il exprime le souhait, le doute, la nécessité, la crainte... Il apparaît aussi dans certaines subordonnées régies par des verbes ou conjonctions précis."
  },
  {
    id: 20, partie: 1, categorie: "Conjugaison — modes et temps",
    question: "Conjuguez correctement : « Il faut que vous… » (partir — subjonctif présent)",
    options: ["partez", "partiez", "partez", "êtes partis"],
    reponse: 1,
    explication: "Subjonctif présent de « partir » à la 2e personne du pluriel : « que vous partiez »."
  },

  // — Orthographe grammaticale —
  {
    id: 21, partie: 1, categorie: "Orthographe grammaticale",
    question: "Comment accorde-t-on l'adjectif dans « des robes vert foncé » ?",
    options: ["verts foncés", "vert foncé (invariable)", "vertes foncées", "vert foncées"],
    reponse: 1,
    explication: "Les adjectifs de couleur composés (vert foncé) sont invariables. L'adjectif simple désignant une couleur obtenue par comparaison avec un objet (noisette, crème, marron) est aussi invariable."
  },
  {
    id: 22, partie: 1, categorie: "Orthographe grammaticale",
    question: "Accord de « tout » dans « Elles sont tout étonnées » ?",
    options: ["tout (invariable)", "toutes étonnées", "tout étonnées", "toutes étonnée"],
    reponse: 2,
    explication: "« Tout » adverbe s'accorde en genre (mais pas en nombre) devant un adjectif féminin commençant par une consonne ou un h aspiré : 'toutes étonnées'. Mais devant une voyelle : 'tout heureuses' (invariable)."
  },
  {
    id: 23, partie: 1, categorie: "Orthographe grammaticale",
    question: "Dans « Les enfants s'en vont », quel est l'accord du participe passé ?",
    options: ["Invariable car auxiliaire être", "Accordé avec le sujet : partis", "Accordé avec le COD", "Accordé avec le pronom réfléchi"],
    reponse: 1,
    explication: "Les verbes pronominaux se conjuguent avec être. Le participe passé s'accorde avec le sujet SAUF si le pronom réfléchi est COI. Ici 's'en aller' : accord avec 'les enfants' (masc. plur.) → 'partis'."
  },
  {
    id: 24, partie: 1, categorie: "Orthographe grammaticale",
    question: "Quelle est la bonne orthographe ? « Les cinq cents euros que j'ai dépensé(s) »",
    options: ["dépensé", "dépensés", "dépensée", "dépensées"],
    reponse: 1,
    explication: "Le COD 'que' (mis pour 'cinq cents euros', masculin pluriel) précède le verbe avoir → accord : 'dépensés'."
  },

  // — Syntaxe de la phrase —
  {
    id: 25, partie: 1, categorie: "Syntaxe",
    question: "Quelle opération syntaxique permet d'identifier un COMPLÉMENT DE PHRASE ?",
    options: ["La pronominalisation", "Le déplacement en tête de phrase ET l'effacement", "L'accord avec le sujet", "La nominalisation"],
    reponse: 1,
    explication: "Le complément de phrase (ou cadratif) est identifié par deux opérations : il est DÉPLAÇABLE (peut se mettre en tête) et EFFAÇABLE (peut être supprimé sans rendre la phrase agrammaticale)."
  },
  {
    id: 26, partie: 1, categorie: "Syntaxe",
    question: "Quelle est la structure d'une phrase passive ?",
    options: [
      "Sujet + verbe actif + COD",
      "Sujet + auxiliaire être + participe passé + (complément d'agent)",
      "Sujet + verbe pronominal",
      "Sujet + verbe + attribut"
    ],
    reponse: 1,
    explication: "La voix passive : être (conjugué) + participe passé. Le sujet est le patient, le complément d'agent (introduit par par ou de) est l'agent. Ex. : 'La lettre a été écrite par Paul.'"
  },
  {
    id: 27, partie: 1, categorie: "Syntaxe",
    question: "Dans la terminologie Eduscol, qu'est-ce qu'une phrase AVERBALE ?",
    options: [
      "Une phrase avec un verbe à l'infinitif",
      "Une phrase sans verbe conjugué",
      "Une phrase négative",
      "Une phrase avec un verbe impersonnel"
    ],
    reponse: 1,
    explication: "La phrase averbale (ou non verbale) ne comporte pas de verbe conjugué. Ex. : 'Quelle belle journée !', 'Interdit de fumer.', 'Au secours !'"
  },

  // — Figures de style & stylistique —
  {
    id: 28, partie: 1, categorie: "Stylistique",
    question: "Quelle figure de style est employée dans « Le temps qui passe est un voleur » ?",
    options: ["Comparaison", "Métaphore", "Personnification", "Métonymie"],
    reponse: 1,
    explication: "C'est une métaphore : une comparaison sans outil comparatif ('comme'). Le temps est assimilé à un voleur sans que l'on dise 'comme'."
  },
  {
    id: 29, partie: 1, categorie: "Stylistique",
    question: "L'anaphore est :",
    options: [
      "Une répétition d'un son en fin de vers",
      "Une répétition d'un mot ou groupe de mots en début de phrases ou propositions successives",
      "Une figure d'atténuation",
      "Un changement de registre"
    ],
    reponse: 1,
    explication: "L'anaphore est la répétition d'un terme ou d'un groupe en position initiale. Ex. : 'Je me souviens… Je me souviens… Je me souviens…' (Perec). À ne pas confondre avec l'épiphore (répétition en fin)."
  },
  {
    id: 30, partie: 1, categorie: "Stylistique",
    question: "L'euphémisme consiste à :",
    options: [
      "Exagérer pour frapper l'esprit",
      "Atténuer une réalité dure ou choquante par un terme plus doux",
      "Désigner une chose par une autre qui lui est associée",
      "Opposer deux termes pour créer un contraste"
    ],
    reponse: 1,
    explication: "L'euphémisme adoucit une réalité négative. Ex. : 'il nous a quittés' pour 'il est mort'. À distinguer de la litote (dire moins pour signifier plus) et de l'hyperbole (exagération)."
  },

  // ═══════════════════════════════════════════════
  // PARTIE 2 — LEXICOLOGIE
  // ═══════════════════════════════════════════════

  {
    id: 31, partie: 2, categorie: "Formation des mots",
    question: "Comment appelle-t-on le procédé de formation des mots par ajout d'un préfixe ou suffixe à un radical ?",
    options: ["Composition", "Dérivation", "Conversion", "Troncation"],
    reponse: 1,
    explication: "La dérivation (ou affixation) consiste à ajouter un affixe (préfixe ou suffixe) à une base. Ex. : re-faire (préfixe), chant-eur (suffixe). La composition assemble deux bases : porte-monnaie."
  },
  {
    id: 32, partie: 2, categorie: "Formation des mots",
    question: "Quelle est la famille de mots du radical « port- » (du latin portare) ?",
    options: [
      "portail, portrait, porte",
      "porter, porteur, transport, apport, report, exportation",
      "important, importer, importun",
      "portée, portillon, portique"
    ],
    reponse: 1,
    explication: "La famille étymologique de 'portare' (porter) : porter, porteur, transport, apport, report, exportation, déportation... 'Portrait' vient de 'portraire' (tracer), 'portique' du latin 'porticus'."
  },
  {
    id: 33, partie: 2, categorie: "Formation des mots",
    question: "Qu'est-ce qu'un mot POLYSÉMIQUE ?",
    options: [
      "Un mot qui appartient à plusieurs classes grammaticales",
      "Un mot qui a plusieurs sens",
      "Un mot formé de plusieurs morphèmes",
      "Un mot emprunté à une autre langue"
    ],
    reponse: 1,
    explication: "La polysémie : un même signe a plusieurs sens selon le contexte. Ex. : 'bouche' = organe, ouverture d'un souterrain, embouchure. À distinguer de l'homonymie (mots différents de même prononciation)."
  },
  {
    id: 34, partie: 2, categorie: "Relations sémantiques",
    question: "Quelle relation sémantique unit 'chien' et 'animal' ?",
    options: ["Synonymie", "Antonymie", "Hyponymie/hyperonymie", "Paronymie"],
    reponse: 2,
    explication: "'Chien' est un hyponyme d''animal' (terme plus général = hyperonyme). La relation est d'inclusion : tout chien est un animal, mais tout animal n'est pas un chien."
  },
  {
    id: 35, partie: 2, categorie: "Relations sémantiques",
    question: "Les mots 'verre' (récipient) et 'ver' (animal) sont des :",
    options: ["Synonymes", "Paronymes", "Homophones", "Antonymes"],
    reponse: 2,
    explication: "Ce sont des homophones (même prononciation, sens différents, orthographe différente). Les paronymes sont proches à l'oral mais pas identiques : 'conjoncture/conjecture'."
  },
  {
    id: 36, partie: 2, categorie: "Sens figuré / dénoté / connoté",
    question: "Quelle distinction fait-on entre sens DÉNOTÉ et sens CONNOTÉ ?",
    options: [
      "Le sens dénoté est subjectif, le sens connoté est objectif",
      "Le sens dénoté est le sens littéral/objectif ; le sens connoté regroupe les valeurs affectives, culturelles, symboliques associées au mot",
      "Le sens dénoté s'applique aux noms, le sens connoté aux verbes",
      "Il n'y a pas de différence"
    ],
    reponse: 1,
    explication: "La dénotation = le sens de dictionnaire, neutre. La connotation = les valeurs affectives, sociales, symboliques. 'Rose' (dénoté : fleur) peut connoter l'amour, la féminité, la douceur."
  },
  {
    id: 37, partie: 2, categorie: "Champs lexicaux",
    question: "Qu'est-ce qu'un CHAMP SÉMANTIQUE ?",
    options: [
      "Ensemble de mots ayant la même racine",
      "Ensemble des sens d'un seul mot polysémique",
      "Ensemble des mots qui appartiennent au même domaine de référence",
      "Ensemble des synonymes d'un mot"
    ],
    reponse: 1,
    explication: "Le champ sémantique (ou lexical) regroupe des mots renvoyant à un même thème. Ex. : champ sémantique de la mer : vague, marée, côte, marin, nager... Le champ lexical inclut aussi les expressions."
  },
  {
    id: 38, partie: 2, categorie: "Étymologie",
    question: "Le préfixe 'pré-' indique :",
    options: ["Postériorité", "Antériorité / avant", "Contraire", "Répétition"],
    reponse: 1,
    explication: "'Pré-' (du latin prae) signifie 'avant' : prévoir, prénatal, préhistoire. À distinguer de 'post-' (après), 'anti-' (contre), 're-' (de nouveau)."
  },
  {
    id: 39, partie: 2, categorie: "Étymologie",
    question: "Quel est le sens du suffixe « -tion » ?",
    options: ["Agent/celui qui fait", "Action ou résultat d'une action", "Qualité abstraite", "Diminutif"],
    reponse: 1,
    explication: "'-tion' forme des noms d'action ou de résultat : création (acte de créer), destruction, formation... '-eur/-eur' indique l'agent, '-ité' la qualité abstraite."
  },
  {
    id: 40, partie: 2, categorie: "Niveaux de langue",
    question: "Quels sont les trois niveaux de langue traditionnellement distingués ?",
    options: [
      "Familier, courant (ou standard), soutenu",
      "Oral, écrit, littéraire",
      "Argot, populaire, académique",
      "Régional, national, international"
    ],
    reponse: 0,
    explication: "On distingue : niveau familier (informal), courant (ou standard, usuel) et soutenu (ou littéraire, soigné). Au CRPE, on peut aussi parler de registres de langue."
  },

  // ═══════════════════════════════════════════════
  // PARTIE 3 — RÉFLEXION / DIDACTIQUE
  // ═══════════════════════════════════════════════

  // — Programmes & cycles —
  {
    id: 41, partie: 3, categorie: "Programmes & cycles",
    question: "Quels niveaux composent le CYCLE 2 (cycle des apprentissages fondamentaux) ?",
    options: ["CP, CE1, CE2", "GS, CP, CE1", "CE2, CM1, CM2", "CP, CE1"],
    reponse: 1,
    explication: "Le cycle 2 comprend : Grande Section (GS) de maternelle, CP et CE1. Le cycle 3 comprend CE2, CM1, CM2 et 6e. Le cycle 1 : PS, MS, GS (maternelle)."
  },
  {
    id: 42, partie: 3, categorie: "Programmes & cycles",
    question: "Quelle(s) compétence(s) le domaine 'Langage oral' développe-t-il en priorité au cycle 2 selon les programmes ?",
    options: [
      "Copier des textes",
      "Écouter pour comprendre, dire pour être entendu et compris, participer à des échanges",
      "Lire des textes littéraires complexes",
      "Maîtriser l'orthographe"
    ],
    reponse: 1,
    explication: "Le langage oral au cycle 2 vise : écouter et comprendre, s'exprimer clairement, pratiquer des échanges (débat, récit). C'est le socle de tous les apprentissages selon les programmes."
  },
  {
    id: 43, partie: 3, categorie: "Programmes & cycles",
    question: "Quelle est la place de l'étude de la langue dans les programmes du cycle 3 ?",
    options: [
      "Elle est séparée de la lecture et de l'écriture",
      "Elle est intégrée aux activités de lecture et d'écriture ET fait l'objet de séances spécifiques",
      "Elle n'est enseignée qu'en 6e",
      "Elle est optionnelle"
    ],
    reponse: 1,
    explication: "Depuis les programmes 2015/2018, l'étude de la langue est à la fois intégrée (dans la lecture, l'écriture) et fait l'objet de séances dédiées. L'objectif : comprendre le fonctionnement de la langue pour mieux lire et écrire."
  },
  {
    id: 44, partie: 3, categorie: "Programmes & cycles",
    question: "Qu'est-ce que la 'conscience phonologique' et à quel cycle est-elle travaillée en priorité ?",
    options: [
      "La capacité à écrire des mots — cycle 3",
      "La capacité à percevoir et manipuler les unités sonores de la langue (syllabes, phonèmes, rimes) — cycles 1 et 2",
      "La compréhension de textes — cycle 2",
      "La maîtrise de la grammaire — cycle 3"
    ],
    reponse: 1,
    explication: "La conscience phonologique est la capacité à identifier et manipuler les sons (phonèmes, syllabes, rimes). Elle est fondamentale au cycle 1 (maternelle) et au cycle 2 pour l'apprentissage du décodage et de la lecture."
  },
  {
    id: 45, partie: 3, categorie: "Programmes & cycles",
    question: "Le principe alphabétique désigne :",
    options: [
      "L'ordre des lettres dans l'alphabet",
      "La correspondance entre les sons (phonèmes) et les graphèmes (lettres ou groupes de lettres)",
      "La règle d'accord des adjectifs",
      "L'étude des majuscules"
    ],
    reponse: 1,
    explication: "Le principe alphabétique est la compréhension que les lettres (graphèmes) représentent des sons (phonèmes). C'est le fondement du décodage en lecture. Sa maîtrise est l'objectif prioritaire du CP."
  },

  // — Didactique de la lecture —
  {
    id: 46, partie: 3, categorie: "Didactique de la lecture",
    question: "Quelle méthode de lecture repose sur l'enseignement explicite des correspondances graphèmes-phonèmes (décodage) avant de lire des textes ?",
    options: ["Méthode globale", "Méthode syllabique (phonique)", "Méthode mixte", "Méthode naturelle"],
    reponse: 1,
    explication: "La méthode syllabique (ou phonique/décodage) enseigne les correspondances graphèmes-phonèmes de façon systématique et explicite, puis assemble les syllabes pour lire des mots. Elle est recommandée par les programmes et la recherche."
  },
  {
    id: 47, partie: 3, categorie: "Didactique de la lecture",
    question: "Quels sont les deux processus principaux de la lecture experte selon le modèle de Seymour (simplifié) ?",
    options: [
      "Décodage et compréhension",
      "Lecture à voix haute et lecture silencieuse",
      "Lecture littéraire et lecture documentaire",
      "Fluence et dictée"
    ],
    reponse: 0,
    explication: "La lecture experte combine deux processus : le décodage (identification des mots écrits, procédure phonologique et orthographique) et la compréhension (traitement du sens). Les deux doivent être automatisés."
  },
  {
    id: 48, partie: 3, categorie: "Didactique de la lecture",
    question: "Qu'est-ce que la FLUENCE en lecture ?",
    options: [
      "La capacité à comprendre un texte complexe",
      "La capacité à lire avec précision, rapidité et prosodie adaptée",
      "La maîtrise de l'orthographe",
      "La lecture silencieuse"
    ],
    reponse: 1,
    explication: "La fluence (ou fluidité) est la capacité à lire de façon précise, rapide et expressive (prosodie). Elle est un indicateur de la qualité du décodage et libère des ressources cognitives pour la compréhension."
  },
  {
    id: 49, partie: 3, categorie: "Didactique de la lecture",
    question: "Les évaluations REPÈRES (anciennement appelées 'évaluations nationales') ont lieu à quels moments ?",
    options: [
      "Fin de CP et fin de CE2",
      "Début de CP, début de CE1, début de CE2, début de CM1, début de CM2",
      "Uniquement au CP",
      "En CM2 uniquement"
    ],
    reponse: 1,
    explication: "Depuis 2023-2024 (et renforcé en 2025), les évaluations REPÈRES se font en début de CP, CE1, CE2, CM1 et CM2, en français et mathématiques. Elles permettent de diagnostiquer les acquis et besoins des élèves."
  },
  {
    id: 50, partie: 3, categorie: "Didactique de la lecture",
    question: "Qu'évalue l'EVAR (Évaluation de la lecture à voix haute) introduite récemment ?",
    options: [
      "La compréhension écrite",
      "La fluence, la précision et la prosodie de la lecture à voix haute",
      "L'orthographe",
      "La production d'écrit"
    ],
    reponse: 1,
    explication: "L'EVAR évalue la lecture à voix haute : décodage (précision), vitesse (fluidité) et prosodie (expressivité, respect de la ponctuation). Elle concerne le cycle 2. C'est un outil diagnostic pour cibler les élèves en difficulté."
  },

  // — Didactique de l'écriture —
  {
    id: 51, partie: 3, categorie: "Didactique de l'écriture",
    question: "Quelles sont les étapes d'une démarche de production d'écrit guidée ?",
    options: [
      "Correction, rédaction, révision",
      "Planification (intention, destinataire), mise en texte (brouillon), révision/réécriture, mise au propre",
      "Dictée, copie, rédaction",
      "Lecture du modèle, copie, mémorisation"
    ],
    reponse: 1,
    explication: "La démarche d'écriture comprend : planification (qui écrit ? pour qui ? quoi ?), mise en texte (brouillon), révision/réécriture (amélioration, correction), mise au propre. Ces étapes s'apprennent progressivement."
  },
  {
    id: 52, partie: 3, categorie: "Didactique de l'écriture",
    question: "Qu'est-ce que la 'dictée à l'adulte' et à quel cycle est-elle principalement pratiquée ?",
    options: [
      "L'enseignant dicte un texte aux élèves — cycle 3",
      "L'élève dicte un texte à l'enseignant qui le transcrit — cycle 1 et début cycle 2",
      "Les élèves se dictent mutuellement — cycle 2",
      "Une dictée de mots — cycle 2"
    ],
    reponse: 1,
    explication: "La dictée à l'adulte est une situation où l'enfant compose oralement un texte que l'adulte transcrit. Cela permet de dissocier la compétence linguistique de la compétence graphomotrice. Cycle 1 et début cycle 2."
  },
  {
    id: 53, partie: 3, categorie: "Didactique de l'écriture",
    question: "Qu'est-ce que la 'phrase du jour' comme dispositif d'enseignement de la grammaire ?",
    options: [
      "Une dictée quotidienne",
      "Un dispositif d'observation et manipulation d'une phrase-support pour faire découvrir une notion grammaticale",
      "Une phrase à mémoriser",
      "Un exercice de conjugaison"
    ],
    reponse: 1,
    explication: "La 'phrase du jour' est un dispositif d'investigation grammaticale : on part d'une phrase, on la manipule (substitutions, déplacements, transformations) pour construire des savoirs sur la langue. Recommandée par les guides Eduscol."
  },

  // — Enseignement de la grammaire —
  {
    id: 54, partie: 3, categorie: "Enseignement de la grammaire",
    question: "Qu'appelle-t-on 'manipulation syntaxique' en didactique de la grammaire ?",
    options: [
      "Faire manipuler des étiquettes de mots",
      "Opération sur la phrase (déplacement, effacement, substitution, addition) pour identifier les groupes et fonctions",
      "Analyser grammaticalement les mots en liste",
      "Mémoriser des règles"
    ],
    reponse: 1,
    explication: "Les manipulations syntaxiques (ou opérations linguistiques) sont des transformations de la phrase : déplacement, effacement, substitution/pronominalisation, addition. Elles permettent de comprendre le fonctionnement de la langue sans mémorisation passive."
  },
  {
    id: 55, partie: 3, categorie: "Enseignement de la grammaire",
    question: "Selon les guides Eduscol, quelle posture épistémologique est valorisée pour enseigner la grammaire ?",
    options: [
      "Transmettre des règles que les élèves mémorisent et appliquent",
      "Partir de l'observation de faits de langue pour construire des régularités par raisonnement",
      "Faire copier des leçons de grammaire",
      "Utiliser uniquement des manuels scolaires"
    ],
    reponse: 1,
    explication: "Les textes officiels valorisent une démarche inductive : observer des faits de langue, manipuler, raisonner, construire la règle. La grammaire doit être un outil pour mieux lire et écrire, pas une fin en soi."
  },
  {
    id: 56, partie: 3, categorie: "Enseignement de la grammaire",
    question: "Quelle est la différence entre ORTHOGRAPHE GRAMMATICALE et ORTHOGRAPHE LEXICALE ?",
    options: [
      "L'orthographe grammaticale concerne les accords et flexions ; l'orthographe lexicale concerne la forme des mots dans le dictionnaire",
      "L'orthographe grammaticale concerne les majuscules ; l'orthographe lexicale les minuscules",
      "Il n'y a pas de différence",
      "L'orthographe lexicale ne s'enseigne pas"
    ],
    reponse: 0,
    explication: "Orthographe grammaticale = accords (sujet-verbe, nom-adjectif, participe passé…). Orthographe lexicale = forme fixe des mots (ph dans 'phare', -tion, les mots invariables…). Les deux sont au programme du cycle 2 au cycle 3."
  },
  {
    id: 57, partie: 3, categorie: "Enseignement du vocabulaire",
    question: "Pourquoi l'enseignement du vocabulaire est-il essentiel à la compréhension en lecture ?",
    options: [
      "Pour améliorer l'orthographe uniquement",
      "Parce que l'étendue du vocabulaire est fortement corrélée à la compréhension de textes",
      "Pour permettre aux élèves de faire de belles rédactions",
      "Pour respecter les programmes"
    ],
    reponse: 1,
    explication: "La recherche (Beck, Nation, Biemiller) montre un lien fort entre capital lexical et compréhension. Les guides Eduscol recommandent un enseignement explicite et systématique du vocabulaire à tous les niveaux."
  },
  {
    id: 58, partie: 3, categorie: "Littérature de jeunesse",
    question: "Qu'est-ce qu'une 'liste de référence' des œuvres littéraires pour l'école ?",
    options: [
      "Une liste de manuels scolaires",
      "Une sélection d'œuvres recommandées par le ministère par cycle pour construire une culture littéraire commune",
      "Une liste d'auteurs imposés pour les évaluations",
      "Un programme de lecture obligatoire pour les enseignants"
    ],
    reponse: 1,
    explication: "Le ministère publie des listes de référence d'œuvres de littérature de jeunesse par cycle. Elles guident les choix des enseignants pour construire une culture littéraire commune et diversifiée."
  },
  {
    id: 59, partie: 3, categorie: "EVAR & évaluations",
    question: "L'EVAR est un outil d'évaluation destiné :",
    options: [
      "Aux élèves de CM2",
      "Aux enseignants, pour évaluer la lecture à voix haute des élèves de cycle 2 (CP-CE1-CE2)",
      "Aux inspecteurs pour évaluer les enseignants",
      "Aux candidats au CRPE"
    ],
    reponse: 1,
    explication: "L'EVAR est un protocole d'évaluation de la lecture à voix haute à destination des enseignants de cycle 2. Il mesure la fluence (rapidité, précision, prosodie) et permet d'identifier les élèves ayant besoin d'aide."
  },
  {
    id: 60, partie: 3, categorie: "EVAR & évaluations",
    question: "Quels indicateurs l'EVAR mesure-t-il principalement ?",
    options: [
      "La compréhension implicite et la culture littéraire",
      "Le nombre de mots lus correctement par minute, le taux d'erreurs, et la prosodie",
      "L'orthographe et la grammaire",
      "La production écrite"
    ],
    reponse: 1,
    explication: "L'EVAR mesure : la vitesse de lecture (mots/minute), la précision (% de mots lus correctement) et la prosodie (qualité de l'intonation, respect de la ponctuation). Ces indicateurs sont des marqueurs de la fluence."
  },
  {
    id: 61, partie: 3, categorie: "Différenciation & besoins éducatifs",
    question: "Qu'est-ce que la 'différenciation pédagogique' ?",
    options: [
      "Donner des exercices différents à chaque élève",
      "Adapter les contenus, démarches, productions ou structures pour permettre à chaque élève d'apprendre",
      "Séparer les élèves en groupes de niveau définitifs",
      "Enseigner la même chose à tous les élèves au même rythme"
    ],
    reponse: 1,
    explication: "La différenciation pédagogique adapte les modalités d'enseignement (contenus, processus, productions, environnement) aux besoins et profils des élèves, tout en visant les mêmes objectifs pour tous."
  },
  {
    id: 62, partie: 3, categorie: "Différenciation & besoins éducatifs",
    question: "Qu'est-ce que la dyslexie et quels aménagements peut-on proposer en classe ?",
    options: [
      "Un trouble de la vision — aménagements : lunettes",
      "Un trouble spécifique du langage écrit — aménagements : police adaptée, temps supplémentaire, textes à trous, lecture à voix haute réduite",
      "Un trouble du comportement — pas d'aménagements spécifiques",
      "Un retard scolaire global — redoublement"
    ],
    reponse: 1,
    explication: "La dyslexie est un trouble dys affectant la lecture (décodage). Aménagements : police spécifique (OpenDyslexic), texte aéré, surlignage, temps supplémentaire, lecture à voix haute à réduire, textes reformatés."
  },

  // — Sujets type annales —
  {
    id: 63, partie: 3, categorie: "Sujets type annales",
    question: "Un candidat au CRPE doit proposer une séance de grammaire sur le COD en CE2. Quelle démarche est valorisée par le jury ?",
    options: [
      "Donner la règle, faire apprendre par cœur, puis faire des exercices d'application",
      "Partir d'un corpus de phrases, faire observer et manipuler (pronominalisation, suppression), construire la notion avec les élèves, institutionnaliser, réinvestir",
      "Faire copier la leçon du manuel",
      "Proposer uniquement des exercices à trous"
    ],
    reponse: 1,
    explication: "Le jury valorise une approche inductive et active : observation → manipulation → conceptualisation → institutionnalisation → réinvestissement. Cette démarche est cohérente avec les guides Eduscol et les recommandations ministérielles."
  },
  {
    id: 64, partie: 3, categorie: "Sujets type annales",
    question: "La partie 3 de l'épreuve de français demande un 'développement rédigé et structuré'. Que cela implique-t-il ?",
    options: [
      "Une simple liste de points",
      "Un texte organisé en paragraphes avec introduction, développement argumenté, conclusion, en lien avec le texte support",
      "Une analyse grammaticale exhaustive",
      "Une présentation de séquence de classe"
    ],
    reponse: 1,
    explication: "La partie 3 est une réflexion à partir d'une question sur le texte. Elle attend : une introduction posant le problème, un développement en parties argumentées avec exemples tirés du texte, une conclusion. La qualité rédactionnelle est évaluée."
  },
  {
    id: 65, partie: 3, categorie: "Sujets type annales",
    question: "Dans les annales CRPE 2023, la partie grammaire portait souvent sur les valeurs des temps. Quelle est la valeur du PLUS-QUE-PARFAIT ?",
    options: [
      "Exprimer une action simultanée au passé",
      "Exprimer une action antérieure à une autre action passée (antériorité dans le passé)",
      "Exprimer une action future par rapport au présent",
      "Exprimer une habitude passée"
    ],
    reponse: 1,
    explication: "Le plus-que-parfait exprime une action accomplie AVANT une autre action passée. Ex. : 'Quand il arriva, elle était déjà partie.' L'antériorité par rapport au passé simple ou à l'imparfait est sa valeur principale."
  },
];

const PARTIES = [
  { id: 0, label: "Toutes les parties", color: "#4f46e5" },
  { id: 1, label: "Partie 1 — Grammaire", color: "#0ea5e9" },
  { id: 2, label: "Partie 2 — Lexicologie", color: "#10b981" },
  { id: 3, label: "Partie 3 — Didactique & réflexion", color: "#f59e0b" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [filtrePartie, setFiltrePartie] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [historique, setHistorique] = useState([]);
  const [fini, setFini] = useState(false);
  const [mode, setMode] = useState("menu"); // menu | quiz | resultats

  function demarrer(partie) {
    const pool = partie === 0 ? QUESTIONS : QUESTIONS.filter(q => q.partie === partie);
    setQuestions(shuffle(pool));
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setHistorique([]);
    setFini(false);
    setFiltrePartie(partie);
    setMode("quiz");
  }

  function choisir(i) {
    if (revealed) return;
    setSelected(i);
  }

  function valider() {
    if (selected === null) return;
    setRevealed(true);
    const q = questions[idx];
    const ok = selected === q.reponse;
    if (ok) setScore(s => s + 1);
    setHistorique(h => [...h, { q, selected, ok }]);
  }

  function suivant() {
    if (idx + 1 >= questions.length) {
      setFini(true);
      setMode("resultats");
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  const q = questions[idx];
  const p = PARTIES.find(p => p.id === filtrePartie) || PARTIES[0];
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const couleurPartie = q ? PARTIES.find(p => p.id === q.partie)?.color : "#4f46e5";

  // ── MENU ──
  if (mode === "menu") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e3a5f 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>📚</div>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Quiz CRPE 2026</h1>
        <p style={{ color: "#a5b4fc", fontSize: 14, marginBottom: 32 }}>Épreuve d'admissibilité de français — {QUESTIONS.length} questions</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PARTIES.map(p => (
            <button key={p.id} onClick={() => demarrer(p.id)} style={{
              background: p.id === 0 ? "linear-gradient(90deg,#4f46e5,#7c3aed)" : "rgba(255,255,255,0.08)",
              border: `2px solid ${p.color}`,
              borderRadius: 14,
              color: "#fff",
              padding: "16px 24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 15,
              fontWeight: 600,
              transition: "transform 0.1s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <span>{p.label}</span>
              <span style={{ background: p.color, borderRadius: 999, padding: "2px 10px", fontSize: 12 }}>
                {p.id === 0 ? QUESTIONS.length : QUESTIONS.filter(q => q.partie === p.id).length} questions
              </span>
            </button>
          ))}
        </div>
        <p style={{ color: "#6366f1", fontSize: 12, marginTop: 24 }}>Les questions sont mélangées aléatoirement à chaque session.</p>
      </div>
    </div>
  );

  // ── RÉSULTATS ──
  if (mode === "resultats") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1e1b4b,#312e81,#1e3a5f)", padding: "24px", overflowY: "auto" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 24px", textAlign: "center", marginBottom: 24, border: "1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ fontSize: 56 }}>{pct >= 80 ? "🎉" : pct >= 60 ? "💪" : "📖"}</div>
          <h2 style={{ color: "#fff", fontSize: 24, margin: "12px 0 4px" }}>Score final</h2>
          <div style={{ fontSize: 48, fontWeight: 900, color: pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171" }}>{score}/{questions.length}</div>
          <div style={{ color: "#a5b4fc", marginTop: 4 }}>{pct}% de bonnes réponses</div>
          <button onClick={() => setMode("menu")} style={{ marginTop: 20, background: "linear-gradient(90deg,#4f46e5,#7c3aed)", border: "none", borderRadius: 12, color: "#fff", padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            ← Retour au menu
          </button>
        </div>

        <h3 style={{ color: "#e0e7ff", fontSize: 16, marginBottom: 12 }}>Récapitulatif détaillé</h3>
        {historique.map((h, i) => (
          <div key={i} style={{ background: h.ok ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)", border: `1px solid ${h.ok ? "#34d399" : "#f87171"}`, borderRadius: 14, padding: "14px 18px", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>{h.ok ? "✅" : "❌"}</span>
              <span style={{ color: "#e0e7ff", fontWeight: 600, fontSize: 14 }}>{h.q.question}</span>
            </div>
            {!h.ok && <div style={{ color: "#fca5a5", fontSize: 13, marginBottom: 4 }}>Votre réponse : {h.q.options[h.selected]}</div>}
            <div style={{ color: "#6ee7b7", fontSize: 13, marginBottom: 4 }}>✓ Bonne réponse : {h.q.options[h.q.reponse]}</div>
            <div style={{ color: "#94a3b8", fontSize: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 6, marginTop: 6 }}>{h.q.explication}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── QUIZ ──
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1e1b4b,#312e81,#1e3a5f)", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ maxWidth: 680, width: "100%" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button onClick={() => setMode("menu")} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, color: "#a5b4fc", padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Menu</button>
          <div style={{ color: "#a5b4fc", fontSize: 13, fontWeight: 600 }}>
            {idx + 1} / {questions.length} · {score} ✓
          </div>
        </div>

        {/* Barre de progression */}
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 999, height: 6, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((idx + 1) / questions.length) * 100}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: 999, transition: "width 0.4s" }} />
        </div>

        {/* Badge partie */}
        <div style={{ display: "inline-block", background: `${couleurPartie}22`, border: `1px solid ${couleurPartie}`, borderRadius: 999, padding: "3px 12px", fontSize: 11, color: couleurPartie, marginBottom: 12, fontWeight: 700 }}>
          {q.categorie}
        </div>

        {/* Question */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 20px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.12)" }}>
          <p style={{ color: "#e0e7ff", fontSize: 17, lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{q.question}</p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {q.options.map((opt, i) => {
            let bg = "rgba(255,255,255,0.06)";
            let border = "1px solid rgba(255,255,255,0.12)";
            let color = "#cbd5e1";
            if (selected === i && !revealed) { bg = "rgba(99,102,241,0.3)"; border = "1px solid #6366f1"; color = "#fff"; }
            if (revealed) {
              if (i === q.reponse) { bg = "rgba(52,211,153,0.2)"; border = "1px solid #34d399"; color = "#6ee7b7"; }
              else if (selected === i) { bg = "rgba(248,113,113,0.2)"; border = "1px solid #f87171"; color = "#fca5a5"; }
            }
            return (
              <button key={i} onClick={() => choisir(i)} style={{
                background: bg, border, borderRadius: 12, color, padding: "14px 18px", cursor: revealed ? "default" : "pointer",
                textAlign: "left", fontSize: 14, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12
              }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
                {revealed && i === q.reponse && <span style={{ marginLeft: "auto", fontSize: 18 }}>✅</span>}
                {revealed && selected === i && i !== q.reponse && <span style={{ marginLeft: "auto", fontSize: 18 }}>❌</span>}
              </button>
            );
          })}
        </div>

        {/* Explication */}
        {revealed && (
          <div style={{ background: "rgba(99,102,241,0.12)", border: "1px solid #6366f1", borderRadius: 14, padding: "14px 18px", marginBottom: 16 }}>
            <div style={{ color: "#a5b4fc", fontSize: 12, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>💡 Explication</div>
            <p style={{ color: "#e0e7ff", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{q.explication}</p>
          </div>
        )}

        {/* Boutons action */}
        <div style={{ display: "flex", gap: 10 }}>
          {!revealed ? (
            <button onClick={valider} disabled={selected === null} style={{
              flex: 1, background: selected !== null ? "linear-gradient(90deg,#4f46e5,#7c3aed)" : "rgba(255,255,255,0.05)",
              border: "none", borderRadius: 12, color: selected !== null ? "#fff" : "#4b5563",
              padding: "14px", fontSize: 15, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed"
            }}>
              Valider ma réponse
            </button>
          ) : (
            <button onClick={suivant} style={{
              flex: 1, background: "linear-gradient(90deg,#4f46e5,#7c3aed)",
              border: "none", borderRadius: 12, color: "#fff", padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>
              {idx + 1 >= questions.length ? "Voir mes résultats 🏁" : "Question suivante →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
