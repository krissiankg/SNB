import React, { createContext, useState, useEffect } from 'react';
import { 
  getSupabaseConfig, saveSupabaseConfig, 
  fetchCloudMessages, saveCloudMessage, 
  deleteCloudMessage, markCloudMessageAsRead,
  fetchCloudAdhesions, saveCloudAdhesion,
  deleteCloudAdhesion, updateAdhesionStatus,
  fetchCloudAuditLogs, saveCloudAuditLog,
  deleteOldCloudAuditLogs
} from '../services/dbService';

export const AppContext = createContext();

// Pre-seeded initial data using actual downloaded assets
const defaultAnnouncements = [
  {
    id: 1,
    title: "Journée Mondiale de l'Alimentation 2023",
    theme: "L'eau c'est la vie, l'eau nous nourrit. Ne laisser personne de côté.",
    text: "Célébration de la Journée Mondiale de l'Alimentation 2023. Le concours d'art culinaire « Cordon Bleu Universel » s'est tenu à cette occasion, mettant en valeur des recettes locales à base d'ingrédients sains pour promouvoir un bon état nutritionnel.",
    fullText: `1. Contexte et justification
Plus de 150 pays célèbrent la Journée Mondiale de l'Alimentation sur la planète le 16 octobre chaque année. Elle constitue une occasion pour les gouvernements, les entreprises, les médias, les organisations de la société civile, les autorités de tous ordres de prendre part à des séries d'activités.

Les thématiques qui alimentent ces évènements sont aussi variables que les approches de communication empruntées pour les aborder : plaidoyer pour une meilleure gestion des aliments, pour un meilleur financement du secteur agro pastoral, sensibiliser en faveur d'une diète équilibrée ou d'une réduction du gaspillage, plaidoyer pour une politique de recherche scientifique à visage humain, etc.

Cette année 2023, le thème de la JMA porte sur l'importance de l'eau pour la vie humaine et surtout l'alimentation et l'inclusion : « L'eau c'est la vie, l'eau nous nourrit. Ne laisser personne de côté. » Bien que des progrès aient été accomplis ces dernières années pour améliorer l'accès à l'eau potable, de nombreux défis entravent encore la couverture universelle de cette denrée vitale. L'accès limité à l'eau potable a des conséquences d'ordre social, économique, sanitaire, etc. Le non accès à une eau potable limite une utilisation optimale des aliments par l'organisme humain et de surcroit compromet son état de santé. Les changements climatiques, les graves sécheresses, la croissance démographique, l'augmentation de la demande et la mauvaise gestion de l'eau au cours des dernières décennies ont accentué la pression sur les rares ressources en eau douce dans le monde et ont entraîné de graves pénuries d'eau dans de nombreuses régions. Il est urgent de mettre en œuvre des stratégies d'atténuation des risques de contamination de l'eau distribuée aux communautés.

A l'horizon 2030, l'Objectif du Développement Durable 6 (ODD) mobilise pour « l'eau propre et l'assainissement » tandis que l'ODD 2 demande de lutter contre la faim. C'est dans cette logique que s'inscrivent VHaN et SNB en célébrant cette année la JMA 2023 à travers trois activités. D'abord, une table ronde en visio-conférence permettra à un panel d'experts de débattre des diverses articulations du thème mondial. Ensuite, un concours d'art culinaire mettra en compétition divers types de prestataires. Le sujet portera sur des ressources alimentaires à forte valeur nutritive peu consommées au Bénin. Enfin, une compétition de rédaction scientifique va mobiliser toutes les écoles d'enseignement supérieur sur le thème mondial de la JMA 2023.

2. Objectif Général
Contribuer au partage des connaissances scientifiques et empiriques en rapport avec la dialectique eau-alimentation.

3. Objectifs spécifiques
- Animer un débat public sur le rôle central de l'eau dans l'alimentation ;
- Valoriser les ressources alimentaires à forte valeur nutritive à la portée du public ;
- Promouvoir les travaux de recherches réalisés sur l'eau et l'alimentation.

4. Résultats attendus
- La visio-conférence éclaire le public sur l'importance de l'eau dans l'alimentation ;
- Plusieurs corps de métiers valorisent le patrimoine culinaire national ;
- Les résultats des recherches réalisées sur l'eau et l'alimentation sont valorisés.

5. Démarche méthodologique et activités
Un répertoire des institutions et des personnes ressources intéressées sera établi à la suite d'une correspondance qui leur sera adressée pour solliciter une manifestation d'intérêt. Une communication sur les médias sociaux sera développée. Des concertations en bilatéral puis par comité et centre d'intérêt permettront d'harmoniser les perceptions et les points de vue.

5.1. Activité 1 : Table Ronde virtuelle (Zoom)
Elle permettra aux panélistes de se prononcer sous différents angles du thème annuel de la JMA. Les panels seront :
- Panel 1 : Juridique (Arsenal juridique international sur le droit d'accès à l'eau potable et à l'alimentation)
- Panel 2 : Académique (Cadres et Filières de formation, valorisation de la recherche scientifique)
- Panel 3 : Socio-économique (Chaîne de valeurs de l'eau, lien Eau-Sécurité Alimentaire-Nutrition)

5.2. Activité 2 : Concours de rédaction scientifique « Académie César Universitaire »
La compétition est ouverte à toutes les entités universitaires intéressées par les questions de l'eau et de l'alimentation. Chaque équipe de recherche is composée de 3 membres au maximum et propose un sujet de son choix portant sur « L'Eau et/ou l'Alimentation ».

5.3. Activité 3 : Concours d'art culinaire « Cordon Bleu Universel 2023 »
Le concours est ouvert aux écoles d'hôtellerie, restaurants, cantines, cafétérias et individus passionnés.

6. Dates
- Lundi 16 octobre 2023 : Table Ronde virtuelle
- Mercredi 18 octobre 2023 : Concours de rédaction scientifique
- Vendredi 20 octobre 2023 : Concours d'art culinaire

7. Lieux
Maison de la Société Civile du Bénin (Cotonou).

8. Partenaires
Vie en Harmonie avec la Nature, Société de Nutrition du Bénin, Maison de la Société Civile du Bénin, The Hunger Project Bénin, Eau minérale FIFA, NutriLife, Saveurs du Bénin, ADK Consulting.`,
    date: "16 Octobre 2023",
    image: "/media/2023-Nutrition-Call-for-Abstracts.jpg"
  },
  {
    id: 2,
    title: "Concours d'art culinaire « Cordon Bleu Universel »",
    theme: "L'eau c'est la vie, l'eau nous nourrit. Ne laisser personne de côté.",
    text: "Le Concours d'art culinaire « Cordon Bleu Universel » a invité tous les professionnels et passionnés du domaine de la nutrition au Bénin à concevoir des plats nutritionnels équilibrés à base d'aliments locaux.",
    fullText: `1. Contexte et justification
Plus de 150 pays célèbrent la Journée Mondiale de l'Alimentation sur la planète le 16 octobre chaque année. Elle constitue une occasion pour les gouvernements, les entreprises, les médias, les organisations de la société civile, les autorités de tous ordres de prendre part à des séries d'activités.

Cette année 2023, le thème de la JMA porte sur l'importance de l'eau pour la vie humaine et surtout l'alimentation et l'inclusion : « L'eau c'est la vie, l'eau nous nourrit. Ne laisser personne de côté. » Bien que des progrès aient été accomplis ces dernières années pour améliorer l'accès à l'eau potable, de nombreux défis entravent encore la couverture universelle de cette denrée vitale. L'accès limité à l'eau potable a des conséquences d'ordre social, économique, sanitaire, etc.

C'est dans cette logique que s'inscrivent VHaN et SNB en célébrant cette année la JMA 2023. Dans ce cadre, le concours d'art culinaire « Cordon Bleu Universel » mettra en compétition divers types de prestataires sur des ressources alimentaires à forte valeur nutritive peu consommées au Bénin.

2. Objectif Général
Contribuer au partage des connaissances scientifiques et empiriques en rapport avec la dialectique eau-alimentation.

3. Objectifs spécifiques
- Valoriser les ressources alimentaires à forte valeur nutritive à la portée du public.

4. Résultats attendus
- Plusieurs corps de métiers/personnes valorisent le patrimoine culinaire national.

5. Critères de participation
Le concours est ouvert à toutes les entités/personnes volontaires d'y participer : écoles d'hôtellerie, restaurants, cantines, cafétérias et individus passionnés par la cuisine.

6. Déroulement
Deux phases marqueront le concours d'art culinaire :
- Phase 1 : Les candidats feront parvenir au jury via WhatsApp ou Email une vidéo de présentation décrivant une recette de leur choix. Le jury sélectionnera les meilleurs candidats de chaque catégorie pour la phase finale.
- Phase 2 (Finale) : Les finalistes proposeront individuellement une recette culinaire traditionnelle à forte valeur nutritive peu consommée (partie théorique). Lors de la finale en présentiel, ils disposeront d'un temps raisonnable pour confectionner le menu proposé devant un jury d'experts (partie pratique).
Après évaluation, les trois meilleurs candidats seront récompensés.

7. Lieu de la phase finale
La phase finale se déroulera en présentiel le vendredi 20 octobre 2023 dès 07h00 à la Maison de la Société Civile à Cotonou, Sikekondji.

8. Dépôt des dossiers de candidature
Les dossiers électroniques sont à envoyer à contact@vhanong.org et snbbenin@gmail.com au plus tard le 15 septembre 2023.

9. Autres informations
Pour toutes informations complémentaires, veuillez nous contacter à l'adresse contact@vhanong.org ou aux téléphones : +229 97 81 99 80 / +229 97 14 52 14.`,
    date: "20 Octobre 2023",
    image: "/media/Affiche-1-ACU-JMA-2022.jpeg"
  }
];

const defaultTeam = [
  {
    id: 1,
    name: "Dr Ir Evariste Mitchikpè",
    role: "Président",
    image: "/media/president.jpg"
  },
  {
    id: 2,
    name: "Victoire Agueh",
    role: "Vice-Présidente",
    image: "/media/vice-president.jpg"
  },
  {
    id: 3,
    name: "Dr Colette Azandjème",
    role: "Secrétaire Générale",
    image: "/media/team-Dr-Colette-Azandjeme.jpg"
  },
  {
    id: 4,
    name: "Florence Alihonou",
    role: "Trésorière",
    image: "/media/Alihono.jpg"
  },
  {
    id: 5,
    name: "Malikath Bankolé",
    role: "Trésorière Adjointe",
    image: "/media/team-malika.jpg"
  },
  {
    id: 6,
    name: "Edjrokinto Ortiz Seyve",
    role: "Organisateur",
    image: "/media/team-hommes.jpg"
  },
  {
    id: 7,
    name: "Eve Houenassi",
    role: "Organisatrice",
    image: "/media/team-Houenassi-Eve.jpg"
  },
  {
    id: 8,
    name: "Myriam Guedegbe",
    role: "Organisatrice",
    image: "/media/team-miriam.jpg"
  }
];

const defaultActivities = [
  {
    id: 1,
    title: "Rencontres nationales et internationales",
    description: "Participation active à des rencontres nationales et internationales sur la nutrition et la sécurité alimentaire pour partager notre expertise.",
    image: "/media/photo-de-famille-1.jpg"
  },
  {
    id: 2,
    title: "Dissémination de recherche",
    description: "Organisation d'événements nationaux pour la dissémination des résultats de recherche en nutrition et en sécurité alimentaire au Bénin.",
    image: "/media/photo-de-famille-2.jpg"
  },
  {
    id: 3,
    title: "Renforcement de capacités",
    description: "Renforcement de capacité des membres de la SNB et des acteurs intervenant en nutrition et sécurité alimentaire au Bénin.",
    image: "/media/photo-de-famille-3.jpg"
  },
  {
    id: 4,
    title: "Capitalisation des innovations",
    description: "Capitalisation des innovations au niveau communautaire et national afin de documenter les succès béninois en nutrition.",
    image: "/media/photo-de-famille-4.jpg"
  },
  {
    id: 5,
    title: "Approches novatrices comportementales",
    description: "Diffusion d'approches novatrices permettant d'adresser et de lever les barrières socioculturelles qui entravent les bons comportements nutritionnels.",
    image: "/media/photo-de-famille-5.jpg"
  },
  {
    id: 6,
    title: "Représentation internationale",
    description: "Participation aux élections de nouveaux membres des organes exécutifs de la FANUS (Fédération Africaine) et de l'IUNS (Union Internationale).",
    image: "/media/photo-de-famille-6.jpg"
  }
];

const defaultGallery = [
  { id: 1, url: "/media/HD8.jpg", caption: "Préparation de recettes nutritives locales" },
  { id: 2, url: "/media/HD10.jpg", caption: "Mesure de la taille d'un enfant (évaluation anthropométrique en communauté)" },
  { id: 3, url: "/media/HD15.jpg", caption: "Mesure du périmètre brachial (MUAC) pour le dépistage de la malnutrition" },
  { id: 4, url: "/media/HD14.jpg", caption: "Sélection d'ingrédients locaux sains pour l'équilibre nutritionnel" },
  { id: 5, url: "/media/HD3.jpg", caption: "Analyses microbiologiques et biochimiques en laboratoire (biosafety cabinet, préparation de mélanges)" },
  { id: 6, url: "/media/HD6.jpg", caption: "Recherche de précision et contrôle de la qualité nutritionnelle (tubes à essai, dosage, balance de précision)" },
  { id: 7, url: "/media/JL-1-scaled.jpg", caption: "Travaux pratiques en laboratoire de nutrition" },
  { id: 8, url: "/media/JL-7-scaled.jpg", caption: "Atelier d'évaluation et de diagnostic nutritionnel" },
  { id: 9, url: "/media/JL-10-scaled.jpg", caption: "Séance d'apprentissage communautaire et démonstration culinaire" },
  { id: 10, url: "/media/JL-16-scaled.jpg", caption: "Consultations cliniques et suivi diététique" },
  { id: 11, url: "/media/JL-21-scaled.jpg", caption: "Sensibilisation scolaire sur les bonnes pratiques alimentaires" },
  { id: 12, url: "/media/JL-37-scaled.jpg", caption: "Réunion des chercheurs et membres de la SNB" },
  { id: 13, url: "/media/africans-at-supermarket-KL48F6D-scaled.jpg", caption: "Sélection de produits et choix alimentaires sains" },
  { id: 14, url: "/media/cheerful-african-american-nutrition-adviser-planni-JDW88SR-scaled.jpg", caption: "Conseil nutritionnel individualisé et planification de régimes" },
  { id: 15, url: "/media/an-african-american-worker-works-in-a-laboratory-c-RJ8XJJL-scaled.jpg", caption: "Recherche scientifique et analyses biochimiques des aliments" },
  { id: 16, url: "/media/african-college-student-AWYR4F3-scaled.jpg", caption: "Éducation nutritionnelle en milieu universitaire" },
  { id: 17, url: "/media/septembre_01_Soja.jpg", caption: "Valorisation des cultures locales : Focus sur le Soja au Bénin" },
  { id: 18, url: "/media/apple-with-tape-measure-healthy-lifestyle-concept-1-1.jpg", caption: "Évaluation anthropométrique et promotion des modes de vie sains" },
  { id: 19, url: "/media/WhatsApp-Image-2023-09-06-a-15.48.50.jpg", caption: "Atelier de concertation nationale sur la sécurité nutritionnelle" },
  { id: 20, url: "/media/WhatsApp-Image-2023-08-18-at-19.14.00.jpeg", caption: "Session de travail du comité technique de la SNB" },
  { id: 21, url: "/media/WhatsApp-Image-2021-10-27-at-18.34.15.jpeg", caption: "Séminaire de renforcement des capacités en nutrition infantile" }
];

const defaultContact = {
  address: "Campus d'Abomey-Calavi, 03 BP 2819, Cotonou, Bénin",
  email: "secretariat@snb.bj",
  phone: "+229 21 36 01 22",
  facebook: "https://facebook.com/snb.bj",
  twitter: "https://twitter.com/snb_bj",
  instagram: "https://instagram.com/snb_bj",
  youtube: "https://youtube.com/@snb_bj",
  linkedin: "https://linkedin.com/company/snb-bj",
  customSocials: []
};

const defaultPartners = [
  { id: 1, name: "UAC", logo: "/media/uac.png" },
  { id: 2, name: "IUNS", logo: "/media/iu.png" },
  { id: 3, name: "IRSP", logo: "/media/irsp.png" },
  { id: 4, name: "UNICEF", logo: "/media/unicef.png" },
  { id: 5, name: "ASCINB", logo: "/media/ascinb.png" },
  { id: 6, name: "CARE", logo: "/media/care.png" },
  { id: 7, name: "FANUS", logo: "/media/fanus.png" }
];

const defaultEvents = [
  {
    id: 1,
    title: "Mobilisation de ressources et de partenariat",
    date: "04 Septembre 2020",
    description: "En dehors de l’ONG CARE International Bénin/Togo, la SNB s’attèle à mobiliser de nouveaux partenariats. Pour ce, plusieurs rencontres sont tenues entre elle et des structures partenaires.",
    fullText: "En dehors de l’ONG CARE International Bénin/Togo, la SNB s’attèle à mobiliser de nouveaux partenariats. Pour ce, plusieurs rencontres sont tenues entre elle et des structures potentielles partenaires.\n\nRencontre des membres de la Société de Nutrition du Bénin avec le Secrétariat Permanent du Conseil de l'Alimentation et de la Nutrition ce 04 Septembre 2020 : Les échanges ont conduit à proposer l'établissement d'un protocole d'accord entre les 2 structures pour pérenniser ces actions de plaidoyer conjointes.",
    image: "/media/photo-de-famille-5.jpg",
    subImages: [
      "/media/photo-de-famille-5.jpg"
    ]
  },
  {
    id: 2,
    title: "Participation de la SNB à la rencontre internationale annuelle des pays membres de la FANUS",
    date: "Août 2019",
    description: "La SNB étant membre de la Fédération Africaine des Sociétés de Nutrition (FANUS) a participé à cette rencontre sous la représentation de la Trésorière Générale Dr MIZEHOUN A. Carmelle.",
    fullText: "La SNB étant membre de la Fédération Africaine des Sociétés de Nutrition (FANUS) a participé à cette rencontre sous la représentation de la Trésorière Générale Dr MIZEHOUN A. Carmelle.\n\nOn en retient que les sociétés de nutrition des pays francophones sont faiblement ou pas du tout représentées aux rencontres de la FANUS. Ceci réduit nos chances de bénéficier d’opportunités de recherche.\n\nOn rappelle aussi que la SNB est membre de l’Union Internationale des Sociétés de Nutrition (IUNS).",
    image: "/media/photo-de-famille-10.jpg",
    downloads: [
      {
        title: "FANUS General meeting report Kigali Aug 2019",
        url: "/media/TDR_Ceremonie-Hommage-FAYOMI-1.pdf",
        fileName: "FANUS_General_meeting_report_Kigali_Aug_2019.pdf"
      }
    ],
    subImages: [
      "/media/photo-de-famille-10.jpg",
      "/media/photo-de-famille-9.jpg"
    ]
  },
  {
    id: 3,
    title: "Célébration de la Journée Mondiale de l'Alimentation : Les temps forts.",
    date: "29 Octobre 2022",
    description: "« Ne laisser personne de côté : Amélioration de la production, de la nutrition, de l'environnement et des conditions de vie ». C'est sous ce thème qu'a été célébrée la JMA 2022.",
    fullText: "« Ne laisser personne de côté : Amélioration de la production, de la nutrition, de l'environnement et des conditions de vie ». C'est sous ce thème qu'a été célébrée la JMA, Journée Mondiale de l'Alimentation, édition 2022.\n\nAinsi, l'ONG Vie en Harmonie avec la Nature (VHAN) et la Société de Nutrition du Bénin (SNB) à travers la promotion des connaissances scientifiques acquises dans les domaines de la sécurité alimentaire, de la nutrition, des sciences et technologies alimentaires ont organisé les 19 et 21 octobre 2022, respectivement, une Table Ronde et un Jeu concours.",
    image: "/media/IMG-20221022-WA0016.jpg",
    videoUrl: "/media/Sail-Away.mp4",
    activities: [
      {
        title: "Activité 1 : Table Ronde \"Vibration & Attraction Positive\"",
        date: "Mercredi 19 octobre 2022, Maison de la Société Civile, 12h30",
        description: "Un panel d'experts a partagé ses connaissances avec le grand public sur les questions d'actualité relatives à la sécurité alimentaire et à la nutrition au Bénin. Devant un public réceptif, des échanges fructueux ont permis de lever certaines barrières.",
        images: [
          "/media/IMG-20221022-WA0016.jpg",
          "/media/IMG-20221022-WA0020.jpg",
          "/media/IMG-20221022-WA0021.jpg",
          "/media/IMG-20221022-WA0022.jpg",
          "/media/IMG-20221022-WA0025.jpg",
          "/media/IMG-20221022-WA0026.jpg"
        ]
      },
      {
        title: "Activité 2 : Concours d'art culinaire \"Cordon Bleu Universel\"",
        date: "Vendredi 21 octobre 2022, Maison de la Société Civile, 11h30",
        description: "Les Écoles Supérieures d'Hôtellerie ont valorisé les ressources alimentaires à forte valeur nutritive les moins consommées au Bénin, récompensant des créations culinaires innovantes à forte valeur ajoutée nutritionnelle.",
        images: [
          "/media/Affiche-1-ACU-JMA-2022.jpeg",
          "/media/IMG-20221025-WA0013.jpg",
          "/media/IMG-20221025-WA0017.jpg",
          "/media/IMG-20221025-WA0019.jpg",
          "/media/2-1.jpg",
          "/media/3-1.jpg",
          "/media/4-1.jpg",
          "/media/11.jpg",
          "/media/13.jpg"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Photo de famille des participants à l'AGO de la SNB du 13 Juillet 2020 à la FSS/UAC",
    date: "13 Juillet 2020",
    description: "Assemblée Générale Ordinaire de la SNB du 13 Juillet 2020 tenue à la Faculté des Sciences de la Santé de l'Université d'Abomey-Calavi (FSS/UAC).",
    fullText: "Photo de famille des participants à l'AGO de la SNB du 13 Juillet 2020 à la FSS/UAC.\n\nCette rencontre d'envergure nationale a réuni l'ensemble des membres, enseignants-chercheurs et nutritionnistes du Bénin. Les échanges ont porté sur le bilan d'activité de l'association savante, les projets de recherche futurs, et le renforcement des alliances stratégiques pour promouvoir la nutrition sur le territoire béninois.",
    image: "/media/photo-de-famille-1.jpg",
    subImages: [
      "/media/photo-de-famille-1.jpg",
      "/media/photo-de-famille-2.jpg",
      "/media/photo-de-famille-3.jpg",
      "/media/photo-de-famille-4.jpg",
      "/media/photo-de-famille-6.jpg",
      "/media/photo-de-famille-7.jpg",
      "/media/photo-de-famille-8.jpg"
    ]
  }
];

export const AppProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('snb_announcements_v6');
    return saved ? JSON.parse(saved) : defaultAnnouncements;
  });

  const [tickerText, setTickerText] = useState(() => {
    const saved = localStorage.getItem('snb_ticker_v1');
    return saved !== null ? saved : "⚠️ Événement à venir : Séance de sensibilisation communautaire sur l'alimentation saine et la malnutrition infantile le 10 Juin 2026 à Calavi. | 📢 Adhésions : Les inscriptions pour devenir membre de la Société de Nutrition du Bénin (SNB) sont en cours. Envoyez votre dossier à secretariat@snb.bj !";
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('snb_team_v4');
    return saved ? JSON.parse(saved) : defaultTeam;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('snb_activities_v4');
    return saved ? JSON.parse(saved) : defaultActivities;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('snb_gallery_v6');
    return saved ? JSON.parse(saved) : defaultGallery;
  });

  const [contact, setContact] = useState(() => {
    const saved = localStorage.getItem('snb_contact_v5');
    return saved ? JSON.parse(saved) : defaultContact;
  });

  const [partners, setPartners] = useState(() => {
    const saved = localStorage.getItem('snb_partners_v4');
    return saved ? JSON.parse(saved) : defaultPartners;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('snb_events_v4');
    return saved ? JSON.parse(saved) : defaultEvents;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('snb_messages_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [adhesions, setAdhesions] = useState(() => {
    const saved = localStorage.getItem('snb_adhesions_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [cloudConfig, setCloudConfig] = useState(() => getSupabaseConfig());

  const [currentUser, setCurrentUser] = useState(() => {
    return sessionStorage.getItem('snb_current_user') || '';
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('snb_audit_logs_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [activePage, setActivePage] = useState('accueil');

  // Synchronize changes with localStorage
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('snb_current_user', currentUser);
    } else {
      sessionStorage.removeItem('snb_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('snb_audit_logs_v1', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Synchronize changes with localStorage
  useEffect(() => {
    localStorage.setItem('snb_announcements_v6', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('snb_ticker_v1', tickerText);
  }, [tickerText]);

  useEffect(() => {
    localStorage.setItem('snb_team_v4', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('snb_activities_v4', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('snb_gallery_v6', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('snb_contact_v5', JSON.stringify(contact));
  }, [contact]);

  useEffect(() => {
    localStorage.setItem('snb_partners_v4', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('snb_events_v4', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('snb_messages_v1', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('snb_adhesions_v1', JSON.stringify(adhesions));
  }, [adhesions]);

  // Synchroniser avec Supabase Cloud si activé
  useEffect(() => {
    const cleanLogs = async () => {
      const limitDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      
      // Nettoyage local
      setAuditLogs(prev => {
        const filtered = prev.filter(log => new Date(log.created_at) >= limitDate);
        return filtered.length !== prev.length ? filtered : prev;
      });

      if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey) {
        try {
          await deleteOldCloudAuditLogs(cloudConfig);
        } catch (e) {
          console.error("Erreur nettoyage logs Supabase", e);
        }
      }
    };

    cleanLogs();

    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey) {
      const loadMessages = async () => {
        try {
          const cloudMsgs = await fetchCloudMessages(cloudConfig);
          setMessages(cloudMsgs);
        } catch (e) {
          console.error("Échec du chargement des messages Supabase Cloud, repli LocalStorage", e);
        }
      };

      const loadAdhesions = async () => {
        try {
          const cloudAdhs = await fetchCloudAdhesions(cloudConfig);
          setAdhesions(cloudAdhs);
        } catch (e) {
          console.error("Échec du chargement des adhésions Supabase Cloud, repli LocalStorage", e);
        }
      };

      const loadAuditLogs = async () => {
        try {
          const cloudLogs = await fetchCloudAuditLogs(cloudConfig);
          setAuditLogs(cloudLogs);
        } catch (e) {
          console.error("Échec du chargement des logs d'audit Supabase Cloud, repli LocalStorage", e);
        }
      };

      loadMessages();
      loadAdhesions();
      loadAuditLogs();

      const interval = setInterval(() => {
        loadMessages();
        loadAdhesions();
        loadAuditLogs();
      }, 15000); // Polling toutes les 15 secondes

      return () => clearInterval(interval);
    }
  }, [cloudConfig.enabled, cloudConfig.supabaseUrl, cloudConfig.supabaseAnonKey]);

  // Logging function
  const logActivity = async (action, details) => {
    const formattedDate = new Date().toISOString();
    const newLog = {
      user_name: currentUser || 'Anonyme',
      action,
      details,
      created_at: formattedDate
    };

    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey) {
      try {
        const cloudId = await saveCloudAuditLog(cloudConfig, newLog);
        const updatedLogs = await fetchCloudAuditLogs(cloudConfig);
        setAuditLogs(updatedLogs);
      } catch (e) {
        console.error("Échec d'enregistrement du log Cloud, repli LocalStorage", e);
        const localLogs = [{ ...newLog, id: Date.now() }, ...auditLogs];
        setAuditLogs(localLogs);
      }
    } else {
      const localLogs = [{ ...newLog, id: Date.now() }, ...auditLogs];
      setAuditLogs(localLogs);
    }
  };

  // Content modifiers
  const updateContact = (updatedContact) => {
    setContact(updatedContact);
    logActivity("Mise à jour des coordonnées", "Coordonnées de contact ou réseaux sociaux modifiés.");
  };

  // Announcements
  const addAnnouncement = (item) => {
    const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
    setAnnouncements([...announcements, { ...item, id: newId }]);
    logActivity("Ajout d'actualité", `Article créé : "${item.title}"`);
  };

  const editAnnouncement = (item) => {
    setAnnouncements(announcements.map(a => a.id === item.id ? item : a));
    logActivity("Modification d'actualité", `Article mis à jour : "${item.title}"`);
  };

  const deleteAnnouncement = (id) => {
    const item = announcements.find(a => a.id === id);
    setAnnouncements(announcements.filter(a => a.id !== id));
    logActivity("Suppression d'actualité", `Article supprimé : "${item?.title || 'ID ' + id}"`);
  };

  // Team members
  const addTeamMember = (member) => {
    const newId = team.length > 0 ? Math.max(...team.map(t => t.id)) + 1 : 1;
    setTeam([...team, { ...member, id: newId }]);
    logActivity("Ajout de membre du CA", `Membre ajouté : "${member.name}" (${member.role})`);
  };

  const editTeamMember = (member) => {
    setTeam(team.map(t => t.id === member.id ? member : t));
    logActivity("Modification de membre du CA", `Membre mis à jour : "${member.name}"`);
  };

  const deleteTeamMember = (id) => {
    const member = team.find(t => t.id === id);
    setTeam(team.filter(t => t.id !== id));
    logActivity("Suppression de membre du CA", `Membre supprimé : "${member?.name || 'ID ' + id}"`);
  };

  // Activities
  const addActivity = (activity) => {
    const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    setActivities([...activities, { ...activity, id: newId }]);
    logActivity("Ajout d'axe d'activité", `Activité créée : "${activity.title}"`);
  };

  const editActivity = (activity) => {
    setActivities(activities.map(a => a.id === activity.id ? activity : a));
    logActivity("Modification d'axe d'activité", `Activité mise à jour : "${activity.title}"`);
  };

  const deleteActivity = (id) => {
    const act = activities.find(a => a.id === id);
    setActivities(activities.filter(a => a.id !== id));
    logActivity("Suppression d'axe d'activité", `Activité supprimée : "${act?.title || 'ID ' + id}"`);
  };

  // Gallery
  const addGalleryPhoto = (photo) => {
    const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
    setGallery([...gallery, { ...photo, id: newId }]);
    logActivity("Ajout de photo", `Photo ajoutée à la galerie : "${photo.caption || photo.url}"`);
  };

  const deleteGalleryPhoto = (id) => {
    const photo = gallery.find(g => g.id === id);
    setGallery(gallery.filter(g => g.id !== id));
    logActivity("Suppression de photo", `Photo retirée de la galerie : "${photo?.caption || 'ID ' + id}"`);
  };

  // Partners
  const addPartner = (partner) => {
    const newId = partners.length > 0 ? Math.max(...partners.map(p => p.id)) + 1 : 1;
    setPartners([...partners, { ...partner, id: newId }]);
    logActivity("Ajout de partenaire", `Partenaire ajouté : "${partner.name}"`);
  };

  const deletePartner = (id) => {
    const p = partners.find(part => part.id === id);
    setPartners(partners.filter(p => p.id !== id));
    logActivity("Suppression de partenaire", `Partenaire supprimé : "${p?.name || 'ID ' + id}"`);
  };

  // Events
  const addEvent = (event) => {
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...event, id: newId }]);
    logActivity("Ajout d'événement/rapport", `Événement créé : "${event.title}"`);
  };

  const editEvent = (event) => {
    setEvents(events.map(e => e.id === event.id ? event : e));
    logActivity("Modification d'événement/rapport", `Événement mis à jour : "${event.title}"`);
  };

  const deleteEvent = (id) => {
    const ev = events.find(e => e.id === id);
    setEvents(events.filter(e => e.id !== id));
    logActivity("Suppression d'événement/rapport", `Événement supprimé : "${ev?.title || 'ID ' + id}"`);
  };

  const updateTickerText = (text) => {
    setTickerText(text);
    logActivity("Mise à jour de la banderole", `Nouveau texte : "${text.substring(0, 50)}..."`);
  };

  const addMessage = async (msg) => {
    const formattedDate = new Date().toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const tempMsg = { ...msg, date: formattedDate, read: false };
    
    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey) {
      try {
        const cloudId = await saveCloudMessage(cloudConfig, tempMsg);
        setMessages([{ ...tempMsg, id: cloudId }, ...messages]);
      } catch (e) {
        console.error("Échec d'envoi Cloud, enregistrement local", e);
        const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
        setMessages([{ ...tempMsg, id: newId }, ...messages]);
      }
    } else {
      const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
      setMessages([{ ...tempMsg, id: newId }, ...messages]);
    }
  };

  const deleteMessage = async (id) => {
    const msg = messages.find(m => m.id === id);
    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey && id !== undefined && id !== null) {
      try {
        await deleteCloudMessage(cloudConfig, id);
      } catch (e) {
        console.error("Erreur de suppression Cloud :", e);
      }
    }
    setMessages(messages.filter(m => m.id !== id));
    logActivity("Suppression de message", `Message de "${msg?.name || 'Inconnu'}" supprimé.`);
  };

  const markMessageAsRead = async (id) => {
    const msg = messages.find(m => m.id === id);
    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey && id !== undefined && id !== null) {
      try {
        await markCloudMessageAsRead(cloudConfig, id);
      } catch (e) {
        console.error("Erreur de marquage comme lu Cloud :", e);
      }
    }
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
    logActivity("Lecture de message", `Message de "${msg?.name || 'Inconnu'}" marqué comme lu.`);
  };

  const updateCloudConfig = (newConfig) => {
    saveSupabaseConfig(newConfig);
    setCloudConfig(newConfig);
    logActivity("Modification config Cloud", `Supabase URL: "${newConfig.supabaseUrl}", Enabled: ${newConfig.enabled}`);
  };

  const addAdhesion = async (adh) => {
    const formattedDate = new Date().toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const tempAdh = { ...adh, date: formattedDate, status: 'En attente' };
    
    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey) {
      try {
        const cloudId = await saveCloudAdhesion(cloudConfig, tempAdh);
        setAdhesions([{ ...tempAdh, id: cloudId }, ...adhesions]);
      } catch (e) {
        console.error("Échec d'envoi de l'adhésion Cloud, enregistrement local", e);
        const newId = adhesions.length > 0 ? Math.max(...adhesions.map(a => a.id)) + 1 : 1;
        setAdhesions([{ ...tempAdh, id: newId }, ...adhesions]);
      }
    } else {
      const newId = adhesions.length > 0 ? Math.max(...adhesions.map(a => a.id)) + 1 : 1;
      setAdhesions([{ ...tempAdh, id: newId }, ...adhesions]);
    }
  };

  const deleteAdhesion = async (id) => {
    const adh = adhesions.find(a => a.id === id);
    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey && id !== undefined && id !== null) {
      try {
        await deleteCloudAdhesion(cloudConfig, id);
      } catch (e) {
        console.error("Erreur de suppression de l'adhésion Cloud :", e);
      }
    }
    setAdhesions(adhesions.filter(a => a.id !== id));
    logActivity("Suppression d'adhésion", `Dossier de candidature de "${adh?.first_name} ${adh?.last_name}" supprimé.`);
  };

  const changeAdhesionStatus = async (id, status) => {
    const adh = adhesions.find(a => a.id === id);
    if (cloudConfig.enabled && cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey && id !== undefined && id !== null) {
      try {
        await updateAdhesionStatus(cloudConfig, id, status);
      } catch (e) {
        console.error("Erreur de mise à jour du statut d'adhésion Cloud :", e);
      }
    }
    setAdhesions(adhesions.map(a => a.id === id ? { ...a, status: status } : a));
    logActivity("Mise à jour statut adhésion", `Candidature de "${adh?.first_name} ${adh?.last_name}" passée à "${status}".`);
  };

  return (
    <AppContext.Provider value={{
      announcements,
      team,
      activities,
      gallery,
      contact,
      partners,
      events,
      messages,
      adhesions,
      addAdhesion,
      deleteAdhesion,
      changeAdhesionStatus,
      addMessage,
      deleteMessage,
      markMessageAsRead,
      cloudConfig,
      updateCloudConfig,
      activePage,
      setActivePage,
      tickerText,
      updateTickerText,
      updateContact,
      addAnnouncement,
      editAnnouncement,
      deleteAnnouncement,
      addTeamMember,
      editTeamMember,
      deleteTeamMember,
      addActivity,
      editActivity,
      deleteActivity,
      addGalleryPhoto,
      deleteGalleryPhoto,
      addPartner,
      deletePartner,
      addEvent,
      editEvent,
      deleteEvent,
      currentUser,
      setCurrentUser,
      auditLogs,
      logActivity
    }}>
      {children}
    </AppContext.Provider>
  );
};
