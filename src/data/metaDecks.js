export const metaDecks = [
  {
    id: "decidueye-sniper",
    name: "Decidueye ex : Sniper Meta Surprise",
    description: "Ce deck exploite la précision chirurgicale de Decidueye ex combinée à la pression constante de Greninja pour dominer le terrain adverse.",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/724.png",
    type: "Grass",
    pokemon: [
      { name: "Decidueye ex", display: "Decidueye ex", qty: 2, role: "Attaquant principal, capable de sniper le banc adverse" },
      { name: "Dartrix", display: "Dartrix", qty: 2, role: "Étape intermédiaire d'évolution" },
      { name: "Rowlet", display: "Rowlet", qty: 2, role: "Base pour Decidueye" },
      { name: "Greninja", display: "Greninja", qty: 2, role: "Support offensif avec Water Shuriken" },
      { name: "Frogadier", display: "Frogadier", qty: 2, role: "Étape intermédiaire pour Greninja" },
      { name: "Froakie", display: "Froakie", qty: 2, role: "Base pour Greninja" }
    ],
    trainers: [
      { name: "Professor's Research", display: "Professor's Research", qty: 2, role: "Moteur de pioche indispensable" },
      { name: "Rare Candy", display: "Rare Candy", qty: 2, role: "Accélère l'évolution vers le Stade 2" },
      { name: "Sabrina's Suggestion", display: "Sabrina", qty: 1, role: "Force l'adversaire à changer son Pokémon Actif" },
      { name: "Giovanni's Scheme", display: "Giovanni", qty: 1, role: "Bonus de dégâts (+10) pour finir un K.O." },
      { name: "Leaf Cape", display: "Leaf Cape", qty: 1, role: "Augmente les PV des Pokémon Plante" },
      { name: "X Speed", display: "X Speed", qty: 1, role: "Mobilité pour pivoter entre les attaquants" }
    ],
    combos: [
      {
        title: 'Le Combo "Double Snipe"',
        steps: [
          "Utilisez la capacité Water Shuriken de Greninja pour infliger 20 dégâts à un Pokémon clé sur le banc adverse.",
          "Utilisez l'attaque de Decidueye ex pour achever cette cible ou affaiblir une autre menace."
        ],
        result: "Vous pouvez prendre des points de récompense sans même attaquer le Pokémon Actif adverse, brisant sa stratégie."
      },
      {
        title: 'Accélération via Rare Candy',
        steps: [
          "Posez vos bases (Rowlet/Froakie) au tour 1.",
          "Utilisez Rare Candy au tour 2 ou 3 pour passer directement au Stade 2."
        ],
        result: "Une pression immédiate avec des Pokémon à hauts PV et fortes capacités avant que l'adversaire ne soit prêt."
      },
      {
        title: 'Contrôle de Terrain avec Sabrina',
        steps: [
          "Utilisez Sabrina pour forcer un Pokémon vulnérable du banc adverse en position active.",
          "Utilisez vos capacités de snipe pour punir le nouveau banc ou achever le Pokémon forcé."
        ]
      }
    ]
  },
  {
    id: "glaivodo-chien-pao",
    name: "Glaivodo & Chien-Pao ex (Water Rush)",
    description: "Conçu pour dominer le format avec une accélération d'énergie sans précédent grâce au talent de Glaivodo, permettant à Chien-Pao ex d'infliger des dégâts massifs.",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1002.png",
    type: "Water",
    pokemon: [
      { name: "Chien-Pao ex", display: "Chien-Pao ex", qty: 2, role: "Attaquant principal, inflige des dégâts basés sur l'énergie défaussée" },
      { name: "Frigibax", display: "Frigibax", qty: 2, role: "Base nécessaire pour l'évolution vers Glaivodo" },
      { name: "Arctibax", display: "Arctibax", qty: 1, role: "Évolution intermédiaire" },
      { name: "Baxcalibur", display: "Glaivodo", qty: 2, role: "Moteur du deck : permet d'attacher autant d'énergies Eau que souhaité" },
      { name: "Suicune ex", display: "Suicune ex", qty: 1, role: "Attaquant secondaire rapide et piocheur de cartes" }
    ],
    trainers: [
      { name: "Poké Ball", display: "Poké Ball", qty: 2, role: "Recherche de Pokémon de base" },
      { name: "Rare Candy", display: "Super Bonbon", qty: 2, role: "Accélère l'évolution de Frigibax en Glaivodo" },
      { name: "Energy Retrieval", display: "Récupération d'Énergie", qty: 2, role: "Récupère les énergies défaussées par Chien-Pao ex" },
      { name: "Professor's Research", display: "Recherches Professorales", qty: 2, role: "Moteur de pioche principal" },
      { name: "Sabrina's Suggestion", display: "Morgane", qty: 1, role: "Contrôle du banc adverse" },
      { name: "Irida", display: "Nacchara", qty: 2, role: "Recherche un Pokémon Eau et un Objet" },
      { name: "Capacious Bucket", display: "Seau de Lavage", qty: 1, role: "Recherche d'énergies Eau dans le deck" }
    ],
    combos: [
      {
        title: 'L\'Accélération "Baxcalibur Engine"',
        steps: [
          "Posez Frigibax rapidement sur le banc et utilisez Super Bonbon pour le faire évoluer en Glaivodo.",
          "Utilisez le talent de Glaivodo pour attacher toutes les énergies Eau de votre main à votre Chien-Pao ex actif."
        ],
        result: "Vous pouvez charger un attaquant de 0 à 100% en un seul tour, prêt à infliger un K.O. immédiat."
      },
      {
        title: 'Le One-Shot "Diving Icicles"',
        steps: [
          "Accumulez un maximum d'énergies Eau sur le terrain grâce à Glaivodo.",
          "Utilisez l'attaque de Chien-Pao ex qui multiplie les dégâts par le nombre d'énergies défaussées."
        ],
        result: "Vous pouvez mettre K.O. n'importe quel Pokémon ex adverse, même les plus résistants."
      },
      {
        title: 'La Pioche Tactique avec Suicune ex',
        steps: [
          "Placez Suicune ex en poste actif si vous avez besoin de stabiliser votre main.",
          "Utilisez son talent pour piocher une carte supplémentaire par tour."
        ],
        result: "Cela vous permet de trouver vos pièces de combo plus rapidement tout en mettant une pression constante."
      }
    ]
  },
  {
    id: "mega-absol-hydreigon",
    name: "Mega Absol ex & Hydreigon (Dark Disruption)",
    description: "Une force dominante utilisant la puissance de Mega Absol ex pour perturber la main de l'adversaire tout en infligeant des dégâts constants.",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/359.png",
    type: "Dark",
    pokemon: [
      { name: "M Absol-EX", display: "Mega Absol ex", qty: 2, role: "Attaquant principal, défausse des cartes de la main adverse" },
      { name: "Deino", display: "Deino", qty: 2, role: "Base nécessaire pour l'évolution vers Hydreigon" },
      { name: "Zweilous", display: "Zweilous", qty: 1, role: "Évolution intermédiaire" },
      { name: "Hydreigon", display: "Hydreigon (Trioxhydre)", qty: 2, role: "Moteur du deck : permet de déplacer les énergies Obscurité" },
      { name: "Darkrai ex", display: "Darkrai ex", qty: 1, role: "Attaquant secondaire et support pour le sommeil" }
    ],
    trainers: [
      { name: "Poké Ball", display: "Poké Ball", qty: 2, role: "Recherche de Pokémon de base" },
      { name: "Rare Candy", display: "Super Bonbon", qty: 2, role: "Accélère l'évolution vers Hydreigon" },
      { name: "Switch", display: "Échange", qty: 2, role: "Permet de gérer le placement des Pokémon actifs/banc" },
      { name: "Professor's Research", display: "Recherches Professorales", qty: 2, role: "Moteur de pioche principal" },
      { name: "Sabrina's Suggestion", display: "Morgane", qty: 1, role: "Contrôle du banc adverse" },
      { name: "Giovanni's Scheme", display: "Giovanni", qty: 1, role: "Augmente les dégâts pour atteindre des K.O. clés" },
      { name: "Dark Patch", display: "Badge Obscurité", qty: 2, role: "Accélération d'énergie depuis la pile de défausse" }
    ],
    combos: [
      {
        title: 'La Perturbation "Darkness Claw"',
        steps: [
          "Évoluez rapidement vers Mega Absol ex.",
          "Utilisez son attaque pour infliger des dégâts tout en forçant l'adversaire à révéler sa main et à défausser un Supporter."
        ],
        result: "Vous cassez la stratégie adverse tout en mettant une pression constante sur ses points de vie."
      },
      {
        title: 'Le Moteur "Roar in Unison"',
        steps: [
          "Mettez en place Hydreigon sur le banc.",
          "Utilisez son talent pour déplacer vos énergies Obscurité vers le Pokémon qui en a le plus besoin pour attaquer."
        ],
        result: "Une flexibilité totale qui permet de charger un nouvel attaquant instantanément après un K.O."
      },
      {
        title: 'Le Combo de Finition Giovanni',
        steps: [
          "Préparez une attaque avec Mega Absol ex ou Darkrai ex.",
          "Jouez Giovanni pour ajouter les 10 dégâts manquants sur un Pokémon ex adverse."
        ],
        result: "Vous sécurisez des K.O. qui semblaient impossibles, prenant l'avantage définitif dans la partie."
      }
    ]
  },
  {
    id: "mega-altaria-darkrai",
    name: "Mega Altaria ex & Darkrai (Sleep Control)",
    description: "Conçu pour exploiter la mécanique du Sommeil, en combinant la puissance offensive de Mega Altaria ex avec les capacités de contrôle de Darkrai et Igglybuff.",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/334.png",
    type: "Dragon",
    pokemon: [
      { name: "M Altaria-EX", display: "Mega Altaria ex", qty: 2, role: "Attaquant principal, inflige de lourds dégâts" },
      { name: "Swablu", display: "Swablu", qty: 2, role: "Base pour l'évolution en Altaria" },
      { name: "Darkrai", display: "Darkrai", qty: 2, role: "Capacité Bad Dreams pour punir le sommeil" },
      { name: "Igglybuff", display: "Igglybuff", qty: 2, role: "Endort le Pokémon adverse" }
    ],
    trainers: [
      { name: "Rocky Helmet", display: "Rocky Helmet", qty: 1, role: "Dégâts de contre-attaque" },
      { name: "Cyrus", display: "Cyrus", qty: 1, role: "Contrôle du banc adverse" },
      { name: "Mars", display: "Mars", qty: 2, role: "Défausse de cartes de la main adverse" },
      { name: "Leaf", display: "Leaf", qty: 1, role: "Support de soin ou accélération" },
      { name: "Copycat", display: "Copycat", qty: 1, role: "Renouvellement de main" },
      { name: "Lisia", display: "Lisia", qty: 1, role: "Recherche de Pokémon spécifiques" },
      { name: "Training Court", display: "Training Area", qty: 1, role: "Stade pour booster les dégâts ou réduire les coûts" },
      { name: "Poké Ball", display: "Poké Ball", qty: 2, role: "Recherche de Pokémon de base" },
      { name: "Professor's Research", display: "Professor's Research", qty: 2, role: "Pioche de 3 cartes" }
    ],
    combos: [
      {
        title: 'Le Combo "Nightmare Sleep"',
        steps: [
          "Utilisez Igglybuff avec son attaque Sleepy Lullaby pour endormir le Pokémon Actif de votre adversaire.",
          "Avec Darkrai sur votre Banc, sa capacité passive Bad Dreams inflige des dégâts supplémentaires à chaque tour tant que l'adversaire dort."
        ],
        result: "Vous accumulez des dégâts 'gratuits' pendant que l'adversaire est incapable d'attaquer."
      },
      {
        title: 'La Finition avec Mega Altaria ex',
        steps: [
          "Préparez votre Mega Altaria ex sur le banc pendant que Darkrai et Igglybuff contrôlent le terrain.",
          "Une fois chargé en énergie, échangez Mega Altaria ex en position active et mettez K.O. le Pokémon adverse."
        ]
      },
      {
        title: 'Contrôle de Main avec Mars & Cyrus',
        steps: [
          "Utilisez Mars pour réduire les options de l'adversaire en lui faisant défausser des cartes.",
          "Utilisez Cyrus pour forcer un Pokémon affaibli du banc à devenir actif."
        ]
      }
    ]
  },
  {
    id: "mega-charizard-xy",
    name: "Méga Charizard Plus ex (Hybrid X & Y)",
    description: "Exploite la puissance brute et la polyvalence des évolutions de Dracaufeu en combinant l'accélération d'Entei ex et la résilience de Méga-Dracaufeu X.",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    type: "Fire",
    pokemon: [
      { name: "Entei ex", display: "Entei ex", qty: 2, role: "Accélérateur de pioche et attaquant de début de partie" },
      { name: "Charmander", display: "Salamèche", qty: 2, role: "Base essentielle pour l'évolution vers Dracaufeu" },
      { name: "Charmeleon", display: "Reptincel", qty: 2, role: "Évolution intermédiaire" },
      { name: "M Charizard-EX", display: "Méga-Dracaufeu X ex", qty: 1, role: "Tank redoutable : plus il subit de dégâts, plus il frappe fort" },
      { name: "M Charizard-EX", display: "Méga-Dracaufeu Y ex", qty: 1, role: "Finisseur ultime avec une puissance de frappe brute" }
    ],
    trainers: [
      { name: "Poké Ball", display: "Poké Ball", qty: 2, role: "Recherche de Pokémon de base" },
      { name: "Welder", display: "Fortifiant Flamboyant", qty: 2, role: "Accélération d'énergie" },
      { name: "Rocky Helmet", display: "Casque Brut", qty: 2, role: "Dégâts de contre-attaque" },
      { name: "Professor's Research", display: "Recherches Professorales", qty: 2, role: "Moteur de pioche" },
      { name: "Sabrina's Suggestion", display: "Morgane", qty: 1, role: "Contrôle du banc adverse" },
      { name: "Pokémon Center Lady", display: "Dame du Centre Pokémon", qty: 1, role: "Soin indispensable contre le sommeil" },
      { name: "Flora", display: "Flora", qty: 1, role: "Gestion de la main" },
      { name: "Copycat", display: "Copieuse", qty: 1, role: "Renouvellement de main basé sur celle de l'adversaire" }
    ],
    combos: [
      {
        title: 'L\'Agression Rapide "T2 Rush"',
        steps: [
          "Commencez avec Entei ex en poste actif pour piocher et préparez Salamèche sur le banc.",
          "Au tour 2, faites évoluer Salamèche en Reptincel. Attachez l'énergie du tour et utilisez une accélération."
        ],
        result: "Vous infligez 60 dégâts dès le deuxième tour, permettant de mettre K.O. la plupart des bases adverses."
      },
      {
        title: 'Le Contre-Attaquant "Mega Tank X"',
        steps: [
          "Envoyez Méga-Dracaufeu X ex en combat lorsque l'adversaire commence à accumuler de la puissance.",
          "Équipez-le du Casque Brut pour punir chaque attaque reçue."
        ],
        result: "Il devient un mur infranchissable qui punit sévèrement l'adversaire."
      },
      {
        title: 'La Finition "Mega Burn Y"',
        steps: [
          "Chargez votre Méga-Dracaufeu Y ex sur le banc à l'aide des Fortifiants Flamboyants.",
          "Utilisez Morgane pour ramener un Pokémon clé adverse en poste actif, puis attaquez."
        ]
      }
    ]
  },
  {
    id: "mega-manectric-lightning",
    name: "Mega Manectric ex : Lightning Accelerator",
    description: "Ce deck exploite la vitesse fulgurante de Mega Manectric ex pour mettre une pression immédiate sur l'adversaire grâce à une accélération d'énergie optimale.",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/310.png",
    type: "Lightning",
    pokemon: [
      { name: "M Manectric-EX", display: "Mega Manectric ex", qty: 2, role: "Attaquant principal, coût de retraite gratuit, dégâts évolutifs" },
      { name: "Manectric", display: "Manectric", qty: 2, role: "Base d'évolution" },
      { name: "Electrike", display: "Electrike", qty: 2, role: "Base pour Manectric" },
      { name: "Pichu", display: "Pichu", qty: 2, role: "Accélération d'énergie précoce" },
      { name: "Oricorio", display: "Oricorio (Pom-Pom)", qty: 1, role: "Support de banc et pivot" },
      { name: "Boltund", display: "Boltund", qty: 1, role: "Attaquant secondaire agressif" }
    ],
    trainers: [
      { name: "Professor's Research", display: "Professor's Research", qty: 2, role: "Pioche de 3 cartes" },
      { name: "Electric Generator", display: "Electric Generator", qty: 2, role: "Accélération d'énergie Électrique" },
      { name: "Poké Ball", display: "Poké Ball", qty: 2, role: "Recherche de Pokémon de base" },
      { name: "Giovanni's Scheme", display: "Giovanni", qty: 1, role: "Boost de dégâts (+10)" },
      { name: "Sabrina's Suggestion", display: "Sabrina", qty: 1, role: "Contrôle du Pokémon Actif adverse" },
      { name: "X Speed", display: "X Speed", qty: 1, role: "Mobilité supplémentaire" },
      { name: "Training Court", display: "Training Area", qty: 1, role: "Stade pour optimiser les ressources" }
    ],
    combos: [
      {
        title: 'Le Combo "Turbo Start"',
        steps: [
          "Commencez avec Pichu en position active.",
          "Utilisez sa capacité pour attacher des énergies Électrique de votre deck à vos Electrike sur le banc.",
          "Utilisez Electric Generator pour accélérer encore plus le chargement."
        ],
        result: "Un Mega Manectric ex prêt à attaquer dès le tour 2 ou 3."
      },
      {
        title: 'Le "Lightning Scaling"',
        steps: [
          "Utilisez l'attaque Lightning Accelerator.",
          "Les dégâts de base sont de 80, mais augmentent de +30 pour chaque point de récompense déjà pris."
        ],
        result: "En fin de partie, Manectric peut infliger jusqu'à 140 dégâts pour seulement 2 énergies."
      },
      {
        title: 'Pivot et Pression constante',
        steps: [
          "Attaquez avec Mega Manectric ex, puis battez en retraite gratuitement pour envoyer un autre attaquant ou un Pokémon de soutien comme Oricorio."
        ]
      }
    ]
  },
  {
    id: "mega-scizor-loop",
    name: "Mega Scizor ex : Metal Loop Control",
    description: "Ce deck exploite la puissance offensive de Mega Scizor ex en utilisant des mécaniques de rotation pour maximiser les dégâts de son attaque Bullet Slugger.",
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/212.png",
    type: "Metal",
    pokemon: [
      { name: "M Scizor-EX", display: "Mega Scizor ex", qty: 2, role: "Attaquant principal, inflige 150 dégâts après rotation" },
      { name: "Scyther", display: "Scyther", qty: 2, role: "Base pour l'évolution en Scizor" },
      { name: "Revavroom", display: "Revavroom", qty: 2, role: "Capacité Metal Transport pour échanger le Pokémon actif" },
      { name: "Varoom", display: "Varoom", qty: 2, role: "Base pour l'évolution en Revavroom" },
      { name: "Orthworm", display: "Orthworm", qty: 2, role: "Accélération d'énergie avec Iron Supply" },
      { name: "Skarmory", display: "Skarmory", qty: 1, role: "Attaquant de début de partie et pivot de retraite" }
    ],
    trainers: [
      { name: "Professor's Research", display: "Professor's Research", qty: 2, role: "Pioche de 3 cartes" },
      { name: "Poké Ball", display: "Poké Ball", qty: 2, role: "Recherche de Pokémon de base" },
      { name: "Copycat", display: "Copycat", qty: 1, role: "Renouvellement de main" },
      { name: "Cyrus", display: "Cyrus", qty: 1, role: "Contrôle du banc adverse" },
      { name: "Red", display: "Red", qty: 1, role: "Recherche de n'importe quelle carte" },
      { name: "Metal Core Barrier", display: "Metal Core Barrier", qty: 1, role: "Protection défensive pour les Pokémon Acier" },
      { name: "Training Court", display: "Training Area", qty: 1, role: "Stade pour booster les dégâts ou réduire les coûts" }
    ],
    combos: [
      {
        title: 'Le Combo "Bullet Slugger Loop"',
        steps: [
          "Assurez-vous d'avoir Revavroom sur votre Banc.",
          "Utilisez la capacité Metal Transport de Revavroom pour échanger votre Pokémon Actif avec un Pokémon du Banc.",
          "Retirez le nouveau Pokémon Actif pour remettre Mega Scizor ex en position Active."
        ],
        result: "L'attaque Bullet Slugger passe de 100 à 150 dégâts, permettant de mettre K.O. la plupart des Pokémon en deux coups."
      },
      {
        title: 'Accélération d\'Énergie avec Orthworm',
        steps: [
          "Utilisez Orthworm en début de partie avec son attaque Iron Supply.",
          "Attachez des énergies Acier directement de votre pile de défausse à votre Scyther ou Scizor sur le banc."
        ],
        result: "Vous préparez votre attaquant principal beaucoup plus rapidement que par l'attachement manuel classique."
      },
      {
        title: 'Contrôle et Pression',
        steps: [
          "Utilisez Cyrus pour forcer un Pokémon de soutien adverse en position active.",
          "Terminez-le avec le combo de rotation de Scizor pour prendre une avance décisive."
        ]
      }
    ]
  }
];
