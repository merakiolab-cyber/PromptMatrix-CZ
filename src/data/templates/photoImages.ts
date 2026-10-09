import { PromptTemplate } from '../../types';

export const PHOTO_IMAGES_TEMPLATES: PromptTemplate[] = [
  {
    id: 'mj-cinematic-editorial-portrait',
    title: 'Midjourney v6.1: Kinematografický Redakční Portrét (Hasselblad)',
    description: 'Fotorealistický portrét s měkkým difuzním světlem, přirozenou texturou pleti a 85mm optikou.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Midjourney', 'Portrét', 'Hasselblad', 'Fotografie'],
    authorFeedTip: 'Zákaz slov jako "photorealistic" a "hyperrealistic". Místo toho specifikujte optiku a filmový proces.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mj-subject',
        key: 'portrait_subject',
        label: 'Popis subjektu & atmosféra',
        type: 'text',
        value: 'Švédský architekt sedící v minimalistickém betonovém ateliéru s ranním mlžným světlem z velkého okna',
        required: true
      },
      {
        id: 'mj-camera',
        key: 'camera_and_film',
        label: 'Fotoaparát, objektiv a světlo',
        type: 'text',
        value: 'Hasselblad H6D-100c, 85mm f/1.4 lens, soft natural north-facing window light, Kodak Portra 400 color science',
        required: true
      }
    ],
    templateString: `Editorial portrait photograph of {{portrait_subject}}, shot on {{camera_and_film}}, authentic skin texture with subtle pores and imperfections, shallow depth of field, architectural minimalist concrete background, muted neutral color grading --ar 16:9 --style raw --v 6.1 --s 150`
  },

  {
    id: 'mj-architectural-interior-minimal',
    title: 'Midjourney v6.1: Minimalistický Architektonický Interiér (Leica)',
    description: 'Monochromatická architektura s čistými liniemi, hmatatelným dřevem a stíny ve stylu Tadao Ando.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Architektura', 'Interiér', 'Minimalismus', 'Midjourney'],
    authorFeedTip: 'Využijte poměr stran --ar 21:9 pro širokoúhlý filmový pohled.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'arch-space',
        key: 'interior_space',
        label: 'Prostor a materiály',
        type: 'text',
        value: 'Moderní japonský pavilon s černým vypalovaným dřevem Shou Sugi Ban a hladkou betonovou podlahou',
        required: true
      }
    ],
    templateString: `Architectural interior photograph of {{interior_space}}, soft dramatic zenith daylight pouring through glass skylight, long sharp shadows, wabi-sabi aesthetics, shot on Leica SL2 with 24mm prime lens, ultra-clean spatial composition --ar 21:9 --style raw --v 6.1 --s 200`
  },

  {
    id: 'mj-street-leica-film-grain',
    title: 'Midjourney v6.1: Pouliční Fotografie ve Stylu Henri Cartier-Bresson',
    description: 'Černobílá pouliční momentka s jemným zrnem filmu Ilford HP5, vysokým mikrokontrastem a rozhodujícím okamžikem.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Street Photography', 'Leica M6', 'Černobílá', 'Film Grain'],
    authorFeedTip: 'Použijte --style raw pro zachování přirozeného zrna filmu bez digitálního vyhlazení.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'st-scene',
        key: 'street_scene',
        label: 'Scéna v ulicích',
        type: 'text',
        value: 'Deštivý večer v Tokiu, silueta chodce s průhledným deštníkem pod neonovým nápisem odrážejícím se v louži',
        required: true
      }
    ],
    templateString: `Black and white candid street photograph of {{street_scene}}, shot on Leica M6 with 35mm Summicron lens, Ilford HP5 Plus 400 film grain, authentic street photography aesthetics, decisive moment, high dynamic range with deep blacks --ar 3:2 --style raw --v 6.1`
  },

  {
    id: 'mj-product-macro-tactile',
    title: 'Midjourney v6.1: Makro Produktová Fotografie s Hmatatelnou Texturou',
    description: 'Extrémní detail struktury materiálu (matný kov, kůže, tkanina) s přesným studiovým svícením.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Makro', 'Produkt', 'Textura', 'Midjourney'],
    authorFeedTip: 'Definujte 100mm f/2.8 Macro objektiv pro chirurgické zaostření na klíčový detail.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'mac-prod',
        key: 'macro_detail',
        label: 'Předmět a materiál',
        type: 'text',
        value: 'Detail otočného voliče luxusních mechanických hodinek z titanové slitiny s jemným vroubkováním',
        required: true
      }
    ],
    templateString: `Extreme macro commercial product photograph of {{macro_detail}}, shot on Canon EOS R5 with 100mm f/2.8L Macro lens, dual softbox studio lighting with precise edge highlights, razor-sharp focus on texture --ar 1:1 --style raw --v 6.1`
  },

  {
    id: 'nano-banana-hero-abstract-render',
    title: 'Nano Banana: Rychlý 3D Abstraktní Hero Vizuál pro Web',
    description: 'Bleskový koncept moderního geometrického vizuálu pro technologický web s plynulými gradienty.',
    modelId: 'nano-banana',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Nano Banana', '3D Abstract', 'Hero Visual', 'Web'],
    authorFeedTip: 'Nano Banana vyniká v rychlé tvorbě gradientních skleněných těles a technologických tvarů.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'nb-concept',
        key: 'abstract_shape',
        label: 'Tvar a barevnost',
        type: 'text',
        value: 'Plovoucí skleněný prstenec (torus) s duhovým lomem světla a černým matným podstavcem',
        required: true
      }
    ],
    templateString: `Clean 3D render of {{abstract_shape}}, minimal dark background #09090b, chromatic dispersion, soft ambient occlusion, modern tech branding aesthetics --ar 16:9`
  },

  // -------------------------------------------------------------------------
  // 10 ORIGINAL ADVERTISING VISUAL TEMPLATES
  // -------------------------------------------------------------------------
  {
    id: 'mj-ad-splash-high-speed-dynamics',
    title: 'Midjourney v6.1: Reklamní Vizuál - High-Speed Splash & Dynamika Kapaliny',
    description: 'Zmrazení pohybu kapalin při 1/8000s, levitující krychličky ledu a mikrokapky v dynamické skleněné explozi.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Splash', 'High-Speed', 'Commercial', 'Midjourney'],
    authorFeedTip: 'Specifikujte 1/8000s shutter speed a dual softbox lighting pro zářivé obrysové kapky.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-prod-splash',
        key: 'product_subject',
        label: 'Produktový subjekt',
        type: 'text',
        value: 'Skleněná lahev prémiového energetického nápoje v barvě Electric Emerald s kondenzací vody na povrchu',
        required: true
      },
      {
        id: 'ad-liquid-elem',
        key: 'liquid_elements',
        label: 'Prvky kapaliny a ledu',
        type: 'text',
        value: 'Exploze krystalicky čisté minerální vody s plátky čerstvé limety a levitujícími průhlednými kostkami ledu',
        required: true
      }
    ],
    templateString: `High-speed commercial advertising photograph of {{product_subject}}, surrounded by dynamic {{liquid_elements}}, frozen water splash captured at 1/8000s shutter speed, crystal clear droplets floating in mid-air, shot on Hasselblad H6D-100c with 100mm f/2.8 Macro lens, dual rim lighting, studio dark background, commercial print quality --ar 16:9 --style raw --v 6.1 --s 250`
  },

  {
    id: 'mj-ad-surreal-levitation-launch',
    title: 'Midjourney v6.1: Reklamní Vizuál - Surrealistická Levitace & Kamenný Obelisk',
    description: 'Luxusní tichá architektura: flakon parfému nebo produkt levitující nad rozpolceným kamenným obeliskem.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Levitace', 'Surrealismus', 'Luxus', 'Parfém'],
    authorFeedTip: 'Kombinujte drsný matný travertin s hladkým kovem nebo sklem pro maximální hmatatelný kontrast.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-lux-item',
        key: 'luxury_item',
        label: 'Luxusní předmět',
        type: 'text',
        value: 'Matný černý flakon parfému s leštěným zlatým uzávěrem',
        required: true
      },
      {
        id: 'ad-ped-env',
        key: 'pedestal_environment',
        label: 'Podstavec a prostředí',
        type: 'text',
        value: 'Rozpolcený přírodní travertinový obelisk, jemná zemitá ranní mlha, dramatičtí boční světelný kužel',
        required: true
      }
    ],
    templateString: `Surreal luxury commercial campaign photography featuring {{luxury_item}} floating weightlessly above {{pedestal_environment}}, wabi-sabi architectural aesthetics, dramatic chiaroscuro side lighting, shot on Leica SL2 with 50mm f/1.2 lens, ultra-clean spatial composition, Vogue editorial advertising quality --ar 4:5 --style raw --v 6.1 --s 300`
  },

  {
    id: 'mj-ad-monochromatic-pedestal',
    title: 'Midjourney v6.1: Reklamní Vizuál - Monochromatický Studiový Podstavec',
    description: 'Elegantní tón v tónu produktová kompozice s kontrastem matných a lesklých povrchů na podstavci.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Monochrome', 'Podstavec', 'Produkt', 'Minimalismus'],
    authorFeedTip: 'Použijte tón v tónu (jediný odstín barvy pro produkt i pozadí) pro nadčasový minimalistický vizuál.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-feat-prod',
        key: 'featured_product',
        label: 'Zvýrazněný produkt',
        type: 'text',
        value: 'Bezdrátová hliníková sluchátka v eloxovaném tmavě uhlíkovém odstínu',
        required: true
      },
      {
        id: 'ad-mono-shade',
        key: 'monochrome_shade',
        label: 'Barevný odstín a pozadí',
        type: 'text',
        value: 'Uhlíkově černý matný podstavec (#09090b) s ostrými geometrickými stíny',
        required: true
      }
    ],
    templateString: `Minimalist tone-on-tone commercial product advertisement of {{featured_product}}, set on {{monochrome_shade}}, subtle material contrast between matte anodized aluminum and soft velvet backdrop, precision studio spotlighting, shot on Canon EOS R5 with 85mm f/1.4 lens --ar 1:1 --style raw --v 6.1`
  },

  {
    id: 'mj-ad-athletic-motion-blur',
    title: 'Midjourney v6.1: Reklamní Vizuál - Sportovní Pohyb & Panning Rim-Light',
    description: 'Dramatický sportovní vizuál s panning rozostřením pozadí a fialovo-oranžovým obrysovým rim-lightem.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Sport', 'Motion Blur', 'Nike Style', 'Rim Light'],
    authorFeedTip: 'Panning shot vytváří plynulý pocit obrovské rychlosti s ostrým zaostřením na samotný atletický subjekt.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-ath-act',
        key: 'athlete_action',
        label: 'Atlet a akce',
        type: 'text',
        value: 'Sprinter v technickém dresu dynamicky vyrážející ze startovních bloků na mokrém oválu',
        required: true
      },
      {
        id: 'ad-light-gels',
        key: 'lighting_gels',
        label: 'Barevné svícení a detaily',
        type: 'text',
        value: 'Fialové Teal a zářivě oranžové Amber obrysové rim-light svícení, jemné mikrokapky potu a deště',
        required: true
      }
    ],
    templateString: `Dynamic Nike-style commercial sports advertisement of {{athlete_action}}, fast motion blur background panning shot with razor-sharp focus on the subject, dramatic {{lighting_gels}}, atmospheric stadium lights in background haze, shot on Sony A1 with 70-200mm f/2.8 GM lens, cinematic color grading --ar 16:9 --style raw --v 6.1 --s 200`
  },

  {
    id: 'mj-ad-floating-botanical-exploded',
    title: 'Midjourney v6.1: Reklamní Vizuál - Levitující Botanické Ingredience (Exploded View)',
    description: 'Přírodní kosmetika nebo nápoj obklopený levitujícími čerstvými ingrediencemi v 100mm makro optice.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Botanical', 'Kosmetika', 'Macro', 'Exploded View'],
    authorFeedTip: 'Perfektní pro organické značky – vizuálně dokazuje čistotu a přírodní původ složek.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-cos-prod',
        key: 'cosmetic_product',
        label: 'Produkt kosmetiky',
        type: 'text',
        value: 'Přírodní pleťové sérum v čiré skleněné lahvičce s bambusovým uzávěrem a dropperem',
        required: true
      },
      {
        id: 'ad-bot-ing',
        key: 'botanical_ingredients',
        label: 'Levitující ingredience',
        type: 'text',
        value: 'Rozpůlené plátky růžového grepofruitu, lístky máty a průhledné levitující kapičky esenciálního oleje',
        required: true
      }
    ],
    templateString: `Commercial botanical product campaign photography for {{cosmetic_product}}, floating in mid-air surrounded by weightless {{botanical_ingredients}}, soft natural morning window light, shallow depth of field with creamy bokeh, shot on 100mm f/2.8 Macro lens, organic luxury brand aesthetics --ar 4:5 --style raw --v 6.1`
  },

  {
    id: 'mj-ad-automotive-concrete-showroom',
    title: 'Midjourney v6.1: Reklamní Vizuál - Automobil v Betonovém Pavilonu (Tadao Ando)',
    description: 'Prémiový automobil v brutální betonové architektuře se světelným kuželem ze stropního kruhového oculus okna.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Automotive', 'Auto', 'Architektura', 'Showroom'],
    authorFeedTip: 'Použijte širokoúhlý poměr --ar 21:9 pro zachycení celkové monumentálnosti prostoru.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-car-model',
        key: 'car_model',
        label: 'Model automobilu',
        type: 'text',
        value: 'Matně stříbrný elektrický koncept sportovního sedanu s LED světelnou lištou',
        required: true
      },
      {
        id: 'ad-show-arch',
        key: 'showroom_architecture',
        label: 'Architektura showroomu',
        type: 'text',
        value: 'Minimalistický surový betonový pavilon se zrcadlící leštěnou černou podlahou a kruhovým stropním oculus okénkem',
        required: true
      }
    ],
    templateString: `Commercial automotive campaign photograph of {{car_model}}, positioned inside {{showroom_architecture}}, dramatic zenith beam of natural daylight illuminating the metallic paint reflections, shot on Hasselblad medium format camera with 24mm prime lens, Porsche/Audi billboard print quality --ar 21:9 --style raw --v 6.1 --s 250`
  },

  {
    id: 'mj-ad-fashion-rain-reflections',
    title: 'Midjourney v6.1: Reklamní Vizuál - High-Fashion Boty v Deštivém Neonu',
    description: 'Nízký pohled (low-angle 24mm anamorphic) na kampaňovou obuv v kalužích s odrazem neonů.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Fashion', 'Footwear', 'Móda', 'Anamorphic'],
    authorFeedTip: '24mm Anamorphic optika zaručuje charakteristické horizontální světelné odlesky na mokrém asfaltu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-footwear',
        key: 'footwear_model',
        label: 'Obuv / Módní doplněk',
        type: 'text',
        value: 'Limitovaná edice bílo-stříbrných futuristických tenisek s reflexními prvky',
        required: true
      },
      {
        id: 'ad-night-city',
        key: 'night_city',
        label: 'Noční prostředí',
        type: 'text',
        value: 'Mokrá noční ulice v kazašském Almaty s odrazem azurových a fialových neonových nápisů v kalužích',
        required: true
      }
    ],
    templateString: `High-fashion footwear commercial advertisement featuring {{footwear_model}}, low-angle ground shot on wet rain-slicked asphalt in {{night_city}}, vibrant neon reflections in water puddles, 24mm anamorphic lens, lens flares, Balenciaga editorial campaign style --ar 16:9 --style raw --v 6.1 --s 200`
  },

  {
    id: 'mj-ad-tactile-papercraft-scene',
    title: 'Midjourney v6.1: Reklamní Vizuál - Hmatatelná 3D Papírová Origami Scéna',
    description: 'Produkt v ručně vyřezávané vrstvené papírové scéně s přírodní texturou recyklovaného kraftového papíru.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Papercraft', 'Origami', 'Hmatatelnost', 'Ekologie'],
    authorFeedTip: 'Ideální pro udržitelné a ekologické produkty – zdůrazňuje řemeslnou zručnost a přírodní materiály.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-eco-prod',
        key: 'eco_product',
        label: 'Ekologický produkt',
        type: 'text',
        value: 'Ručně vyráběné přírodní mýdlo balené v recyklované kartonové krabičce',
        required: true
      },
      {
        id: 'ad-pap-elem',
        key: 'paper_elements',
        label: 'Papírové prvky prostředí',
        type: 'text',
        value: 'Vrstvené papírové stromy, hory a botanické lístky vyřezané z recyklovaného papíru s viditelnou vláknitou texturou',
        required: true
      }
    ],
    templateString: `Tactile 3D papercraft commercial advertisement featuring {{eco_product}}, placed within a handcrafted dioramas of {{paper_elements}}, intricate layered paper art with deep directional shadows, soft warm lighting, shot on Leica M11 with 50mm prime lens, Hermes paper art style --ar 1:1 --style raw --v 6.1`
  },

  {
    id: 'mj-ad-cinematic-b2b-executive-portrait',
    title: 'Midjourney v6.1: Reklamní Vizuál - B2B Executive Portrét s Dvojitým Gelem',
    description: 'Výrazný portrét lídra nebo zakladatele pro Forbes/Bloomberg s charakterovým svícením a sebevědomím.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Executive', 'B2B', 'Forbes', 'Portrét'],
    authorFeedTip: 'Odpovídá autentické osobnosti zkušeného seniorního lídra – klidné sebevědomí a nulová pretence.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-exec-prof',
        key: 'executive_profile',
        label: 'Profil zakladatele / lídra',
        type: 'text',
        value: 'Český 44letý zakladatel technologické firmy v tmavém roláku s klidným, charismatickým a věcným pohledem',
        required: true
      },
      {
        id: 'ad-gel-light',
        key: 'gel_lighting',
        label: 'Svícení a pozadí',
        type: 'text',
        value: 'Jemné jantarové Amber a chladně azurové rim-light svícení na tmavém architektonickém pozadí z ohýbaného skla',
        required: true
      }
    ],
    templateString: `Forbes executive portrait advertisement featuring {{executive_profile}}, shot with {{gel_lighting}}, authentic skin texture, calm confident gaze, shot on Hasselblad H6D with 85mm f/1.4 lens, shallow depth of field, Bloomberg Markets cover aesthetic --ar 16:9 --style raw --v 6.1`
  },

  {
    id: 'mj-ad-frosted-ice-glacier',
    title: 'Midjourney v6.1: Reklamní Vizuál - Zamrzlý Ledovec & Krystalický Led',
    description: 'Osvěžující nápoj nebo kryo-kosmetika částečně zamrzlá v kostce krystalického ledu s jinatkou.',
    modelId: 'midjourney',
    categoryId: 'photo-images',
    defaultWorkflow: 'midjourney-generator',
    defaultPhase: 'greenfield',
    tags: ['Reklama', 'Ice', 'Led', 'Osvěžení', 'Commercial'],
    authorFeedTip: 'Podsvícení skrz krystalický led vytváří zářivý průsvitný efekt produktu.',
    createdAt: '2026-10-06',
    variables: [
      {
        id: 'ad-froz-prod',
        key: 'frozen_product',
        label: 'Zamrzlý produkt',
        type: 'text',
        value: 'Sada chladivého pleťového krému v krystalické průhledné nádobce',
        required: true
      },
      {
        id: 'ad-ice-atmo',
        key: 'ice_atmosphere',
        label: 'Ledové prostředí',
        type: 'text',
        value: 'Obří krystalická ledová kostka s mikroskopickými bublinkami a jinatkou na povrchu v ledovcové jeskyni',
        required: true
      }
    ],
    templateString: `Ultra-refreshing commercial campaign photograph of {{frozen_product}}, partially frozen inside {{ice_atmosphere}}, glowing backlight passing through transparent ice crystals, frosty cold blue atmosphere, shot on Canon EOS R5 with 100mm f/2.8 Macro lens, luxury skincare advertisement quality --ar 1:1 --style raw --v 6.1 --s 250`
  }
];
