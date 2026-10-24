export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Dark Fantasy' | 'Mecha & Cyber' | 'Samurai & Edo' | 'Vintage Akuma';
  tagline: string;
  priceMAD: number;
  image: string;
  color: string;
  colorHex: string;
  weightGsm: number;
  stockLeft: number;
  totalRun: number;
  rating: number;
  reviewsCount: number;
  description: string;
  printTechnique: string;
  fit: string;
  details: string[];
  careInstructions: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'kura-shinigami-01',
    name: 'Hoodie Shinigami Kage',
    subtitle: 'Édition Faucheuse Sombre · Série N°01',
    category: 'Dark Fantasy',
    tagline: 'Faucheuse spectrale stylisée et design haute densité',
    priceMAD: 390,
    image: '/src/assets/images/hoodie_shinigami_black_1792873279757.jpg',
    color: 'Noir Minéral Profond',
    colorHex: '#121214',
    weightGsm: 450,
    stockLeft: 34,
    totalRun: 200,
    rating: 4.95,
    reviewsCount: 142,
    description: 'Inspiré des légendes des guerriers de l\'ombre, le hoodie Shinigami Kage présente une fresque monumentale au dos imprimée en sérigraphie 6 passes avec encres haute résistance au lavage.',
    printTechnique: 'Sérigraphie artisanale 6 couches + broderie rouge au col',
    fit: 'Coupe Oversize Boxy moderne avec épaules tombantes prononcées',
    details: [
      '100% Coton peigné brossé ultra-lourd 450 g/m²',
      'Capuche double épaisseur sans cordon pour une tenue rigide parfaite',
      'Poche kangourou renforcée aux points de tension',
      'Pré-rétréci industriellement pour zéro rétrécissement en machine',
      'Étiquette tissée numérotée édition collector dans l\'ourlet'
    ],
    careInstructions: [
      'Lavage en machine à l\'envers à 30°C cycle délicat',
      'Ne pas passer au sèche-linge pour préserver le relief de la sérigraphie',
      'Repassage sur l\'envers à température moyenne sans toucher le motif'
    ]
  },
  {
    id: 'kura-cyber-02',
    name: 'Hoodie Cyber Tokyo 2099',
    subtitle: 'Édition Mecha Futuriste · Série N°02',
    category: 'Mecha & Cyber',
    tagline: 'Armure robotique futuriste et néons cyberpunk cyan & pourpre',
    priceMAD: 420,
    image: '/src/assets/images/hoodie_cyber_mecha_1792873280037.jpg',
    color: 'Anthracite Minéral Washed',
    colorHex: '#25262B',
    weightGsm: 450,
    stockLeft: 18,
    totalRun: 150,
    rating: 4.98,
    reviewsCount: 98,
    description: 'Hommage vibrant à l\'animation cyberpunk et aux pilotes d\'armures colossales. Une illustration mécanique complexe aux teintes cyan néon et magenta sur toile délavée à l\'acide de quartz.',
    printTechnique: 'Impression numérique HD directe sur textile (DTG) + vernis mat protecteur',
    fit: 'Oversize Streetwear décontracté, manches amples à côtes serrées',
    details: [
      'Coton brossé French Terry épais 450 g/m² au toucher peau de pêche',
      'Traitement vintage stone-wash artisanal (chaque pièce est unique)',
      'Finitions surpiquées double aiguille sur toute la structure',
      'Bords-côtes 2x2 ultra-élastiques qui ne se détendent jamais',
      'Patch cybernétique réfléchissant discret sur le poignet gauche'
    ],
    careInstructions: [
      'Lavage doux à l\'envers à froid (20°C ou 30°C)',
      'Séchage à l\'air libre sur cintre large',
      'Repasser à vapeur douce sur l\'envers'
    ]
  },
  {
    id: 'kura-ryu-03',
    name: 'Hoodie Ryū Ronin Sand',
    subtitle: 'Édition Dragon & Samouraï · Série N°03',
    category: 'Samurai & Edo',
    tagline: 'Dragon impérial au lavis d\'encre de chine et sabre de guerrier',
    priceMAD: 390,
    image: '/src/assets/images/hoodie_ryu_sand_1792873280797.jpg',
    color: 'Sable Écru Naturel',
    colorHex: '#E7DFD5',
    weightGsm: 460,
    stockLeft: 42,
    totalRun: 250,
    rating: 4.92,
    reviewsCount: 116,
    description: 'La rencontre entre l\'art du dessin traditionnel et l\'énergie brute de l\'animation d\'action. Le dragon d\'encre noire enveloppe le guerrier errant avec des finitions soignées.',
    printTechnique: 'Encres pigmentaires à l\'eau écologiques effet lavis d\'encre noire',
    fit: 'Drop-shoulder architectural, tombé lourd naturel sans froissage',
    details: [
      'Coton organique non blanchi écru certifié GOTS 460 g/m²',
      'Teinte naturelle sans agents de blanchiment agressifs',
      'Sceau rouge brodé avec fil satiné sur le flanc inférieur',
      'Œillets métalliques mats gravés du logo KURA',
      'Col montant ergonomique offrant un maintien thermique supérieur'
    ],
    careInstructions: [
      'Laver avec des couleurs similaires à 30°C maximum',
      'Utiliser une lessive liquide douce sans agents blanchissants',
      'Séchage à plat conseillé'
    ]
  },
  {
    id: 'kura-akuma-04',
    name: 'Hoodie Akuma Demon Eyes',
    subtitle: 'Édition Regard Rouge · Série N°04',
    category: 'Vintage Akuma',
    tagline: 'Regard rougeoyant intense et broderie texturée au torse',
    priceMAD: 450,
    image: '/src/assets/images/hoodie_akuma_wash_1792873280494.jpg',
    color: 'Black Acid Wash Vintage',
    colorHex: '#1F2023',
    weightGsm: 450,
    stockLeft: 12,
    totalRun: 120,
    rating: 4.97,
    reviewsCount: 84,
    description: 'Une pièce culte immédiatement reconnaissable. Deux yeux rouge vif perçants surgissent de la pénombre du textile délavé avec une broderie 3D haute précision sur la poitrine.',
    printTechnique: 'Broderie en relief 3D haute précision + sérigraphie fluorescente',
    fit: 'Coupe ample trapézoïdale typique du streetwear moderne',
    details: [
      'Coton lourd 450 g/m² avec délavage minéral en bain de sel',
      'Broderie en relief 12 000 points avec fil résistant aux frottements',
      'Capuche enveloppante taillée pour accueillir un bonnet ou casque audio',
      'Doublure intérieure grattée ultra-douce isolante',
      'Livré avec certificat d\'authenticité KURA numéroté à la main'
    ],
    careInstructions: [
      'Lavage en cycle court à l\'envers à 30°C',
      'Ne jamais repasser directement sur le relief de la broderie',
      'Pas de nettoyage à sec'
    ]
  }
];

export interface Review {
  id: string;
  author: string;
  location: string;
  verified: boolean;
  rating: number;
  date: string;
  productName: string;
  sizeBought: string;
  fitFeedback: 'Taille parfaitement' | 'Légèrement grand (bon oversize)';
  comment: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Yassine B.',
    location: 'Casablanca, Maroc',
    verified: true,
    rating: 5,
    date: 'Il y a 2 jours',
    productName: 'Hoodie Shinigami Kage',
    sizeBought: 'L (1m82, 76kg)',
    fitFeedback: 'Taille parfaitement',
    comment: 'Franchement qualité incroyable ! Le coton 450g est ultra lourd, le tombé est parfait et la capuche tient debout toute seule. Livraison rapide à Casa en 24h et paiement à la livraison sans aucun souci.'
  },
  {
    id: 'rev-2',
    author: 'Salma T.',
    location: 'Rabat, Maroc',
    verified: true,
    rating: 5,
    date: 'Il y a 5 jours',
    productName: 'Hoodie Cyber Tokyo 2099',
    sizeBought: 'M (1m68, 58kg)',
    fitFeedback: 'Légèrement grand (bon oversize)',
    comment: 'L\'effet délavé et les couleurs cyan néon sont magnifiques. Rien à voir avec les hoodies fins qu\'on trouve d\'habitude. L\'emballage avec les stickers et la carte numérotée donne une vraie touche luxe.'
  },
  {
    id: 'rev-3',
    author: 'Mehdi K.',
    location: 'Marrakech, Maroc',
    verified: true,
    rating: 5,
    date: 'Il y a 1 semaine',
    productName: 'Hoodie Ryū Ronin Sand',
    sizeBought: 'XL (1m88, 85kg)',
    fitFeedback: 'Taille parfaitement',
    comment: 'La couleur sable naturel avec le dragon noir a un style incroyable. Le tissu est épais et doux à l\'intérieur. Vraiment satisfait du rapport qualité/prix à 390 DH pour du 450 GSM.'
  },
  {
    id: 'rev-4',
    author: 'Amine R.',
    location: 'Tanger, Maroc',
    verified: true,
    rating: 5,
    date: 'Il y a 2 semaines',
    productName: 'Hoodie Akuma Demon Eyes',
    sizeBought: 'L (1m80, 74kg)',
    fitFeedback: 'Taille parfaitement',
    comment: 'La broderie en relief sur le torse et les yeux rouges ont un rendu exceptionnel. Reçu à Tanger en 48h par livreur. Je recommande à tous les fans d\'anime au Maroc !'
  }
];
