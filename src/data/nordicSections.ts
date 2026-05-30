import saimaaImg from "@/assets/lakes/saimaa.jpg";
import type { Continent, Lake } from "@/data/lakes";

const nordicLakeImage = saimaaImg;

type LakeDetails = Pick<Lake, "waterQuality" | "fauna" | "flora" | "access">;

const createLake = (
  name: string,
  country: string,
  lat: number,
  lng: number,
  area: string,
  maxDepth: string,
  elevation: string,
  significance: string,
  wikipediaPath: string,
  details: LakeDetails,
): Lake => ({
  name,
  country,
  lat,
  lng,
  area,
  maxDepth,
  elevation,
  ...details,
  temperature: "Pinnavee temp. 0-22°C, talvel jääkate",
  significance,
  googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`,
  wikipediaUrl: `https://en.wikipedia.org/wiki/${wikipediaPath}`,
  imageUrl: nordicLakeImage,
  imageCredit: "Placeholder",
});

const finlandLakes: Lake[] = [
  createLake("Saimaa", "Soome", 61.25, 28.25, "4 400 km²", "82 m", "76 m", "Soome suurim järvesüsteem ja äärmiselt ohustatud Saimaa viigerhülge kodu.", "Saimaa", {
    waterQuality: "Suur ja enamasti hea kvaliteediga järvesüsteem, kuid seisund erineb lahtede kaupa; asustus, tööstusajalugu ja veetaseme reguleerimine mõjutavad tundlikke pesitsuspiirkondi.",
    fauna: "Saimaa viigerhüljes, järvelõhe, rääbis, siig, haug, ahven ja luts; linnustikus on saarestikele omased kajakad, kosklad ja kaurid.",
    flora: "Kaljusaared, männikud, saarestikumetsad, pilliroog madalates lahtedes ning kohati vesiroosid ja ujutaimestik.",
    access: "Kõige lihtsam on jõuda Lappeenranta, Mikkeli, Puumala või Savonlinna kaudu; paadiga liikudes tuleb arvestada hülgealade ja hooajaliste piirangutega.",
  }),
  createLake("Päijänne", "Soome", 61.5, 25.5, "1 080 km²", "95 m", "78 m", "Soome suuruselt teine järv ja Helsingi piirkonna oluline joogiveeallikas Päijänne tunneli kaudu.", "P%C3%A4ij%C3%A4nne", {
    waterQuality: "Põhiosades selge ja sügav magevesi, mis on joogiveeallikana rangelt jälgitud; lõunapoolsetes lahtedes võib toitainete mõju olla tugevam.",
    fauna: "Rääbis, koha, haug, ahven, siig ja järvitaimen; saared ja madalad kaldad toetavad kalakajakaid, kosklaid ja teisi veelinde.",
    flora: "Järsud kaljusaared, männi- ja kuusemetsad, lahesoppide roostikud ning Päijänne rahvuspargi saarestikutaimestik.",
    access: "Head lähtepunktid on Lahti, Jyväskylä, Padasjoki ja Asikkala; rahvuspargi saartele pääseb paadi, veetakso või kruiisiga.",
  }),
  createLake("Inari järv", "Soome", 69.0, 27.75, "1 040 km²", "92 m", "119 m", "Lapimaa suurim järv, saamide kultuurmaastik ja suurte saartega arktiline järvemaailm.", "Lake_Inari", {
    waterQuality: "Külm, selge ja vähetoiteline arktiline järv, mille veetase ja jääolud sõltuvad pikast talvest ning Paatsjoki vesikonna reguleerimisest.",
    fauna: "Arktika paalia, harjus, siig, järvitaimen, haug, ahven ja luts; ümbruses kohtab kaure, merikotkast ja põhjapõtru.",
    flora: "Hõredad männikud, tundrased saared, kivised rannad, samblad, samblikud ja madal arktiline kaldataimestik.",
    access: "Inari alevikust pääseb sadamatesse ja järvekruiisidele; talvel kasutatakse jääteid ja mootorsaaniradu ainult kohalike olude järgi.",
  }),
  createLake("Pielinen", "Soome", 63.25, 29.4, "894 km²", "60 m", "94 m", "Koli rahvusmaastiku järv, mille vaated kuuluvad Soome tuntumate loodusikoonide hulka.", "Pielinen", {
    waterQuality: "Pikk ja avar järv on üldiselt hea seisundiga, kuid tumedama tooniga jõgede sissevool ja rannaasustus teevad kvaliteedi piirkonniti erinevaks.",
    fauna: "Koha, rääbis, haug, ahven, siig ja luts; Kolilt järvele laskuvatel nõlvadel pesitsevad röövlinnud ja metsaliigid.",
    flora: "Koli vaarade kuuse- ja männimetsad, liivased rannad, kaljused saared ning madalates lahtedes roostikud.",
    access: "Lieksa, Nurmes ja Koli annavad head ligipääsu; parimad vaated saab Koli rahvuspargi radadelt, järvele paadi või praamiga.",
  }),
  createLake("Oulujärvi", "Soome", 64.3, 27.25, "928 km²", "38 m", "123 m", "Kainuu suur avar järv, mida kutsutakse liivarandade ja tuulisuse tõttu sageli Kainuu mereks.", "Ouluj%C3%A4rvi", {
    waterQuality: "Madal ja tuuline suurjärv on humiinsema veega; veekvaliteeti mõjutavad Kainuu jõed, turbamaad ja rannaalade kasutus.",
    fauna: "Koha, haug, ahven, rääbis, siig ja luts; laiad seljad ja saarestik on olulised ränd- ja pesitsuslindudele.",
    flora: "Liivarannad, madalad roostikud, männikutega saared ja soised tagalahed, eriti Manamansalo ümbruses.",
    access: "Kajaani, Vaala ja Paltamo kaudu on ligipääs hea; Manamansalo saar sobib telkimiseks, ujumiseks ja paadimatkadeks.",
  }),
  createLake("Puruvesi", "Soome", 61.8, 29.3, "416 km²", "60 m", "76 m", "Erakordselt selgeveelise Saimaa osa, tuntud läbipaistvuse ja rääbisepüügi poolest.", "Puruvesi", {
    waterQuality: "Üks Soome selgemaid suuri järvi, väga vähetoiteline ja liivase põhjaga; läbipaistvus võib rahuliku ilmaga olla erakordselt suur.",
    fauna: "Rääbis on järve tunnusliik, lisaks siig, haug, ahven ja luts; Saimaa viigerhüljes on piirkonda taas laienenud.",
    flora: "Liivased madalikud, hõredad roostikud, männimetsased saared ja selgeveelistele järvedele omased põhjataimed.",
    access: "Kerimäki, Punkaharju ja Kesälahti annavad hea ligipääsu; järv sobib eriti paadisõiduks, aerutamiseks ja kalastuseks.",
  }),
  createLake("Näsijärvi", "Soome", 61.75, 23.75, "257 km²", "63 m", "95 m", "Tampere põhjapoolne suurjärv, mille veeteed ja kaljud kujundavad linna ümbruse maastikku.", "N%C3%A4sij%C3%A4rvi", {
    waterQuality: "Tampere lähedal tugevalt kasutatud, kuid puhastunud järv; põhjaosa on looduslikum, linnalahtedes on suurem koormus.",
    fauna: "Koha, haug, ahven, latikas, siig ja luts; linnalähedased rannad meelitavad kajakaid, parte ja kosklaid.",
    flora: "Kaljused rannad, linnapargid, segametsad, saared ning madalamates lahtedes roostik ja vesitaimestik.",
    access: "Tampere kesklinnast pääseb järvele sadamate, randade ja Näsinneula ümbruse kaudu; aurikuliiklus viib Virrat suunas.",
  }),
  createLake("Pyhäjärvi (Tampere)", "Soome", 61.35, 23.65, "122 km²", "46 m", "77 m", "Tampere lõunapoolne järv ja üks Soome tuntumaid linnalähedasi järvemaastikke.", "Pyh%C3%A4j%C3%A4rvi_(Tampere_region)", {
    waterQuality: "Linnade ja põllumajanduse mõjuga, kuid rekreatiivselt hästi kasutatav järv; kitsad väinad ja lahed soojenevad kiiresti.",
    fauna: "Koha, haug, ahven, latikas ja särg; linnalähedased roostikud on olulised veelindudele.",
    flora: "Roostikud ja veetaimestik lahtedes, pargirannad, segametsad ning Pyynikki ja Viikinsaari ümbruse kaldapuistud.",
    access: "Tampere, Nokia ja Pirkkala ümbrusest väga lihtne; järvel toimivad rannad, paadisadamad ja suvine saareliiklus.",
  }),
  createLake("Kallavesi", "Soome", 62.9, 27.8, "473 km²", "75 m", "82 m", "Kuopio ümbruse saarterohke järv ja keskne osa Põhja-Savo järveteedest.", "Kallavesi", {
    waterQuality: "Suurte selgade vesi on enamasti hea, kuid Kuopio ümbruses mõjutavad seisundit linnaline äravool ja madalad lahed.",
    fauna: "Koha, haug, ahven, rääbis ja latikas; saarestikus pesitsevad kajakad, tiirud ja kosklad.",
    flora: "Saarterohked männi- ja segametsad, kaljused kaldad, roostikud ning Kuopio linnalähedased pargirannad.",
    access: "Kuopio sadamast on järv kohe kättesaadav; Puijo, Väinölänniemi ja saareretked annavad lihtsa linnalähedase ligipääsu.",
  }),
  createLake("Keitele", "Soome", 62.8, 25.8, "493 km²", "64 m", "99 m", "Kesk-Soome pikk ja liigestunud järv, kuulus saarestiku, kalapüügi ja laevateede poolest.", "Keitele_(lake)", {
    waterQuality: "Pikk ja sügav Kesk-Soome järv on valdavalt selge, kuid põhja- ja lõunasoppe mõjutavad metsa- ning turbamaad.",
    fauna: "Rääbis, siig, haug, ahven, koha ja luts; rahulikud lahed sobivad ka veelindudele.",
    flora: "Metsased saared, kivised rannad, vähesed roostikud ja järveäärsed kuuse-männi segametsad.",
    access: "Äänekoski, Viitasaari ja Keitele kanalite kaudu; parim kogemus on paadi või kanuumatkaga pikkadel väinadel.",
  }),
  createLake("Lappajärvi", "Soome", 63.15, 23.65, "142 km²", "38 m", "69 m", "Euroopa tähelepanuväärsemaid meteoriidikraatri järvi ja haruldane geoloogiline maamärk.", "Lappaj%C3%A4rvi", {
    waterQuality: "Kraatrinõos paiknev madal järv on tuultele avatud ja toitaineterikkam kui paljud sügavad Soome järved.",
    fauna: "Koha, haug, ahven, latikas ja särg; madalad rannad toetavad roostikulinde ning kalatoidulisi veelinde.",
    flora: "Põllumajandusmaastikuga kaldad, roostikud, madalad lahesopid ja kraatri serva metsased kõrgemad alad.",
    access: "Lappajärvi ja Vimpeli ümbrusest pääseb randadesse ja sadamatesse autoga; kraatrilugu on kohaliku turismi keskne teema.",
  }),
  createLake("Kitkajärvi", "Soome", 66.1, 28.6, "286 km²", "34 m", "240 m", "Kõrgel paiknev selgeveeliste järvede süsteem Kuusamo kandis, Oulanka maastike lähedal.", "Kitkaj%C3%A4rvi", {
    waterQuality: "Kõrgel paiknev külm ja selge järvesüsteem, mille vesi on vähetoiteline ning tundlik rannaehituse ja turismikoormuse suhtes.",
    fauna: "Muikku ehk rääbis, siig, harjus, haug, ahven ja luts; Kuusamo ümbruses kohtab kaure ja kalakotkast.",
    flora: "Kareda kliimaga männikud, kivised rannad, soised lahesopid ning niisked niidud väinade ääres.",
    access: "Kuusamo, Ruka ja Posio suunast pääseb järve äärde autoga; populaarne kalastuse, suvilate ja loodusturismi piirkond.",
  }),
  createLake("Kilpisjärvi", "Soome", 69.05, 20.8, "37 km²", "57 m", "473 m", "Soome käsivarre ikooniline mägijärv Saana jalamil ja kolme riigi piiri lähistel.", "Kilpisj%C3%A4rvi_(lake)", {
    waterQuality: "Külm, kirgas ja väga vähetoiteline mägijärv, mille jääkate püsib kaua ning veetemperatuur jääb ka suvel jahedaks.",
    fauna: "Arktika paalia, siig ja harjus; ümbruses pesitsevad mägi- ja tundralinnud ning liiguvad põhjapõdrad.",
    flora: "Tundrataimestik, vaevakased, samblikud, paljakud ja Saana jalami subarktilised niidud.",
    access: "Kilpisjärvi küla, E8 maantee ja Saana matkarada teevad ligipääsu lihtsaks; kolmikpunktile minnakse paadi või matkarajaga.",
  }),
  createLake("Lohjanjärvi", "Soome", 60.25, 24.0, "92 km²", "55 m", "32 m", "Lõuna-Soome üks liigirikkamaid ja soojemaid järvi, tähtis puhke- ja linnustikuala.", "Lohjanj%C3%A4rvi", {
    waterQuality: "Lõuna-Soomele omaselt toitaineterikkam ja soojem järv, mille seisund on lahtede kaupa erinev ning sõltub asustusest ja põllumajandusest.",
    fauna: "Koha, haug, ahven, latikas, angerjas ja vähid; madalad roostikud sobivad veelindudele.",
    flora: "Laiad roostikud, lopsakad lehtpuukaldad, viljapuuaiad, pärandmaastikud ja saarterikas veetaimestik.",
    access: "Lohja linnast, Karjalohjalt ja maanteede äärest väga lihtne; järv on populaarne ujumise, purjetamise ja suvilate piirkond.",
  }),
  createLake("Tuusulanjärvi", "Soome", 60.43, 25.05, "6 km²", "10 m", "38 m", "Soome kultuuriloo järv, mille kallastel elasid Sibelius, Järnefelt ja teised kunstnikud.", "Lake_Tuusula", {
    waterQuality: "Madal ja ajalooliselt eutrofeerunud järv, mida on taastatud hapnikustamise, valgalatööde ja toitainete vähendamisega.",
    fauna: "Särg, latikas, haug, ahven ja koha; roostikud ning madalad kaldad on olulised partidele ja roolindudele.",
    flora: "Ulatuslikud roostikud, kultuurmaastiku pargid, lehtpuukaldad ja madalaveelised taimevööndid.",
    access: "Järvenpää ja Tuusula kaudu väga lihtne; ümber järve kulgeb populaarne rattatee ning kultuurikodud on kaldal lähestikku.",
  }),
  createLake("Vesijärvi", "Soome", 61.0, 25.55, "108 km²", "42 m", "81 m", "Lahti linna järv, tuntud eduka veekaitse ja restaureerimise näitena.", "Vesij%C3%A4rvi", {
    waterQuality: "Kunagine tugevalt eutrofeerunud linnajärv, mille seisundit on parandatud koormuse vähendamise, hapnikustamise ja biomanipulatsiooniga.",
    fauna: "Koha, ahven, haug, latikas ja särg; kalastiku majandamine on olnud osa järve taastamisest.",
    flora: "Linnalähedased rannapargid, lahesoppide roostikud, veetaimestik ja metsaalad Enonsaari ning Vääksy suunas.",
    access: "Lahti sadamast ja Sibeliustalo ümbrusest on otsene ligipääs; Vääksy kanal ühendab Päijännega.",
  }),
  createLake("Vanajavesi", "Soome", 61.05, 24.15, "120 km²", "24 m", "79 m", "Häme ajalooline järvemaastik losside, asulate ja vanade veeteedega.", "Vanajavesi", {
    waterQuality: "Madal ja kultuurmaastiku keskel paiknev järv on toitaineterikkam, kuid paljud lõigud on aktiivselt hooldatud ja jälgitud.",
    fauna: "Koha, haug, ahven, latikas ja särg; lahesopid ning roostikud on head pesitsusalad veelindudele.",
    flora: "Roostikud, lehtpuurannad, põllumajandusmaastik, vanad mõisa- ja linnusepargid ning kaldataimestik.",
    access: "Hämeenlinna ja Valkeakoski kaudu väga lihtne; järve ääres on sadamad, linnuserannad ja ajaloolised veeteed.",
  }),
  createLake("Höytiäinen", "Soome", 62.75, 29.65, "283 km²", "59 m", "87 m", "Järv, mille 19. sajandi veetaseme langetamine lõi Soome tuntud hüdroloogilise juhtumi.", "H%C3%B6yti%C3%A4inen", {
    waterQuality: "Selge kuni mõõdukalt humiinne järv, mille rannavöönd muutus tugevalt pärast 1859. aasta järsku veetaseme alanemist.",
    fauna: "Haug, ahven, koha, rääbis ja siig; uued madalad rannad ning suudmealad toetavad veelinde.",
    flora: "Metsased kaldad, liivarannad, vanast järvepõhjast kujunenud niidud ja soostuvad madalikud.",
    access: "Joensuu ja Kontiolahti poolt on ligipääs hea; satamad, rannad ja Höytiäise kanal teevad järve kergesti külastatavaks.",
  }),
  createLake("Nuuksio Pitkäjärvi", "Soome", 60.28, 24.52, "2 km²", "23 m", "27 m", "Helsingi lähedane rahvuspargijärv, populaarne matkamiseks ja metsalooduse kogemiseks.", "Nuuksio_National_Park", {
    waterQuality: "Väike metsa- ja kaljujärv, mille seisundit mõjutavad eeskätt looduslik humiinvesi ja tugev puhkekoormus rahvuspargi servas.",
    fauna: "Ahven ja haug, kaldal konnad ja veelinnud; ümbritsevates metsades lend-orav, rähnid ja tavalised Lõuna-Soome imetajad.",
    flora: "Kaljumännikud, kuusikud, rabalaigud, samblad, mustikapuhmad ja kitsas kaldataimestik.",
    access: "Haltia, Solvalla ja Nuuksio teede kaudu pääseb järve äärde ka ühistranspordiga; rajad võivad nädalavahetustel olla rahvarohked.",
  }),
  createLake("Enontekiö Pöyrisjärvi", "Soome", 68.75, 23.95, "17 km²", "teadmata", "610 m", "Kauge liiva- ja tundramaastiku järv Pöyrisjärvi erämaa südames.", "P%C3%B6yrisj%C3%A4rvi_Wilderness_Area", {
    waterQuality: "Kauge, külm ja vähetoiteline erämaajärv, mille valgala koosneb tundrast, nõmmedest ja liivikutest.",
    fauna: "Harjus, siig ja paalia sõltuvalt ühendustest; ümbruses põhjapõdrad, rabapüüd, kurvitsalised ja rändlinnud.",
    flora: "Tundranõmmed, vaevakask, samblikud, kuivad liivased nõlvad ja madalad soostunud järveääred.",
    access: "Ligipääs nõuab erämaamatka Näkkälä või Hetta suunast; teid järve äärde ei ole ja ilm võib kiiresti muutuda.",
  }),
];

const norwayLakes: Lake[] = [
  createLake("Mjøsa", "Norra", 60.65, 11.0, "365 km²", "453 m", "123 m", "Norra suurim järv, Lillehammeri ja Hamariga seotud oluline siseveetee.", "Mj%C3%B8sa", {
    waterQuality: "Suur sügav järv paranes oluliselt pärast reoveekoormuse vähendamist; tänapäeval on see oluline joogivee-, suplus- ja puhkejärv.",
    fauna: "Kuulus suure Mjøsa forelli poolest, lisaks siig, ahven, haug, luts ja rääbis; kaldad toetavad veelinde ja rändlinde.",
    flora: "Põllumajanduslikud kaldad, Helgøya saare kultuurmaastik, roostikud suudmealadel ning metsased nõlvad järve põhjaosas.",
    access: "Oslo-Lillehammeri raudtee ja E6 kulgevad järve lähedal; Hamar, Gjøvik ja Lillehammer pakuvad sadamaid, randu ja paadiretki.",
  }),
  createLake("Røssvatnet", "Norra", 65.8, 13.9, "219 km²", "231 m", "374 m", "Norra üks suurimaid järvi ja tähtis hüdroenergia veehoidla Helgelandis.", "R%C3%B8ssvatnet", {
    waterQuality: "Külm mägi- ja veehoidlajärv, mille veetaset mõjutab hüdroenergia reguleerimine ning mille kaldad võivad olla hooajaliselt paljad.",
    fauna: "Forell, paalia ja siig; ümbruse mägi- ja rabamaastikud sobivad veelindudele ning põhjapõtradele.",
    flora: "Subarktilised kasemetsad, nõmmed, märgalad ja madal kaldataimestik reguleeritud veepiiri ümbruses.",
    access: "Hattfjelldali ja Hemnesi suunast autoga, kuid kaldad on pikad ja hajusad; parim külastusviis on kohalik tee, paat või kalastuslaager.",
  }),
  createLake("Femunden", "Norra", 62.25, 11.95, "203 km²", "130 m", "662 m", "Suur kõrglavamaa järv Femundsmarka rahvuspargi kõrval, tuntud kanuu- ja matkamaastikuna.", "Femunden", {
    waterQuality: "Külm, selge ja vähetoiteline kõrglavamaa järv, mille ümbrus on vähese asustusega ning tugevalt seotud rahvuspargi loodusmaastikuga.",
    fauna: "Forell, harjus, siig, paalia, haug ja ahven; ümbruses pesitsevad kalakotkas, kaurid ja rabade linnustik.",
    flora: "Hõredad männikud, rabad, samblikunõmmed, kivised rannad ja madal mägitaimestik Femundsmarka serval.",
    access: "Elgå ja Synnervika kaudu, suvel M/S Fæmund II laevaga; järv sobib kanuu- ja mitmepäevasteks matkaretkedeks.",
  }),
  createLake("Randsfjorden", "Norra", 60.4, 10.35, "140 km²", "120 m", "135 m", "Pikk ja fjorditaoline sisejärv Innlandetis, ajalooline laeva- ja puhkemaastik.", "Randsfjorden", {
    waterQuality: "Pikk ja kitsas järv saab vett Dokka ja Etna vesikonnast; seisund on valdavalt hea, kuid suudmealad on toitaineterikkamad.",
    fauna: "Forell, siig, ahven, haug ja luts; Dokka delta on oluline veelindude ja rändlindude ala.",
    flora: "Metsased nõlvad, põllumajanduslikud kaldad, delta roostikud ja madalad märgalad põhjaosas.",
    access: "Jevnakeri, Brandbu ja Dokka teede kaudu lihtne; lääne- ja idakallas pakuvad randu, sadamaid ning vaatepunkte.",
  }),
  createLake("Tyrifjorden", "Norra", 60.0, 10.2, "138 km²", "295 m", "63 m", "Oslo lähikonna suur järv, mille saared ja märgalad on linnustikule tähtsad.", "Tyrifjorden", {
    waterQuality: "Sügav ja mitme haruga järv, mille seisund on üldiselt hea; Storelva ja madalad lahed toovad juurde setteid ja toitaineid.",
    fauna: "Forell, haug, ahven, siig ja luts; Nordre Tyrifjorden ja Storelva märgalad on linnustikule väga olulised.",
    flora: "Roostikud ja märgalad põhjaosas, metsased saared, põllumaastikud ning järsud kaldad Steinsfjordeniga ühenduses.",
    access: "Hønefossi, Vikersundi ja Sundvolleni kaudu väga lihtne; Oslo piirkonnast jõuab järveni autoga lühikese ajaga.",
  }),
  createLake("Snåsavatnet", "Norra", 64.15, 12.0, "122 km²", "186 m", "24 m", "Trøndelagi suur järv, mida ümbritsevad põllud, metsad ja kalastuspaigad.", "Sn%C3%A5savatnet", {
    waterQuality: "Madalama kõrgusega suurjärv, mille seisundit mõjutavad põllumajandus, asulad ja metsased valgalad, kuid avavesi püsib jahe.",
    fauna: "Forell, paalia, haug, ahven ja siig; kaldamadalikud sobivad partidele ja teistele veelindudele.",
    flora: "Põllumajanduslikud rannad, kuuse- ja kasemetsad, roostikud ning väiksemad märgalad sissevoolude juures.",
    access: "E6 ja Nordlandi raudtee kulgevad järve lähedal; Snåsa ja Steinkjeri ümbrus annavad lihtsa ligipääsu.",
  }),
  createLake("Tinnsjå", "Norra", 59.85, 8.95, "51 km²", "460 m", "191 m", "Väga sügav Telemarki järv, tuntud Rjukani tööstusajaloo ja sõjaajaloo poolest.", "Tinnsj%C3%A5", {
    waterQuality: "Väga sügav ja külm orujärv, mille vesi on selge, kuid minevikus mõjutasid piirkonda Rjukani tööstus ja hüdroenergia.",
    fauna: "Forell, paalia, siig ja ahven; sügav külm vesi soosib külmaveelisi liike.",
    flora: "Järsud metsased nõlvad, kivised kaldad, vähesed roostikud ning kitsad kaldataimestiku vööndid.",
    access: "Rjukanist ja Tinn Austbygdist autoga; järvel on ajalooline praamiliiklus ja sõjaajaloo objektid.",
  }),
  createLake("Hornindalsvatnet", "Norra", 61.95, 6.35, "50 km²", "514 m", "53 m", "Euroopa sügavaim järv, dramaatiliste Lääne-Norra mägede vahel.", "Hornindalsvatnet", {
    waterQuality: "Äärmiselt sügav, külm ja selge järv, mille suur veemaht teeb selle aeglaselt soojenevaks ja stabiilseks.",
    fauna: "Forell, paalia, angerjas ja lõhelistega seotud kalastik; kalapüük toimub nii kaldalt kui paadist.",
    flora: "Järsud mäenõlvad, leht- ja segametsad, kivised kaldad ning kitsad madalveealad jõgede suudmetes.",
    access: "E39 ja Hornindali küla annavad väga hea ligipääsu; kalastamine ja paadisõit on järve peamised tegevused.",
  }),
  createLake("Bandak", "Norra", 59.35, 8.0, "26 km²", "325 m", "72 m", "Telemarki kanali kõige dramaatilisemaid järvi, järskude nõlvade ja ajaloolise laevateega.", "Bandak", {
    waterQuality: "Sügav, kitsas ja fjorditaoline järv, mille vesi on külm ning mida mõjutab Telemarki kanali veeliiklus.",
    fauna: "Forell, paalia ja siig, lisaks ahven madalamates osades; järsud kaldad piiravad ulatuslikke madalvee-elupaiku.",
    flora: "Järsud metsased kaljud, segametsad, väikesed jõedeltad ja kitsas kaldataimestik.",
    access: "Dalen on peamine ligipääsupunkt; suvel saab järve kogeda Telemarki kanali ajalooliste laevadega.",
  }),
  createLake("Nisser", "Norra", 59.05, 8.45, "76 km²", "234 m", "246 m", "Telemarki pikk järv liivarandade, saarte ja paadimatkadega.", "Nisser", {
    waterQuality: "Pikk ja suhteliselt selge järv, mille liivarannad ja madalad lahed soojenevad suvel kiiremini kui sügavad keskosad.",
    fauna: "Forell, ahven, haug ja siig; saared ning lahed pakuvad elupaiku veelindudele.",
    flora: "Männimetsad, liivarannad, kaljusaared, mustikanõmmed ja madalad roostunud lahesopid.",
    access: "Vrådal, Treungen ja Nissedal pakuvad randu, kämpinguid ja paadilaenutust; järv on Telemarki suvepuhkuse klassika.",
  }),
  createLake("Seljordsvatnet", "Norra", 59.5, 8.65, "16 km²", "150 m", "116 m", "Rahvapärimuses tuntud Selma järvekoletise järvena.", "Seljordsvatnet", {
    waterQuality: "Keskmise sügavusega orujärv, mille seisundit mõjutavad Seljordi asula, põllumajandus ja metsased nõlvad.",
    fauna: "Forell, ahven, haug ja siig; järv on kultuuriliselt tuntud rohkem Selma pärimuse kui erilise kalastiku poolest.",
    flora: "Põllu- ja heinamaakaldad, metsased nõlvad, roostikud madalamates lahtedes ja suplusrandade niidud.",
    access: "E134 kulgeb järve lähedal; Seljordi asulast pääseb kergesti randadesse, vaatekohtadesse ja paadisadamatesse.",
  }),
  createLake("Gjende", "Norra", 61.48, 8.7, "15.6 km²", "149 m", "984 m", "Jotunheimeni kuulus türkiissinine mägijärv Besseggeni matkaraja kõrval.", "Gjende", {
    waterQuality: "Liustikusette tõttu smaragdroheline ja külm kõrgalpne järv; toitainete tase on madal ning vesi püsib jahe ka suvel.",
    fauna: "Mägiforell ja paalia; ümbruses elavad põhjapõder, lumepüü ning kõrgalpse piirkonna röövlinnud.",
    flora: "Alpiniidud, madal pajustik, samblad, samblikud ja järskude nõlvade kiviklibutaimestik.",
    access: "Gjendesheimist liigub suvel Gjendebåten Memurubu ja Gjendebu suunas; Besseggeni matk algab tavaliselt paadisõiduga.",
  }),
  createLake("Bygdin", "Norra", 61.34, 8.8, "46 km²", "215 m", "1 058 m", "Jotunheimeni kõrgalpne järv, tuntud paadiliini ja mägimatkade poolest.", "Bygdin", {
    waterQuality: "Külm ja selge kõrgalpne järv, mille veetaset mõjutab reguleerimine ning pikk jääperiood.",
    fauna: "Mägiforell on peamine kalaliik; ümbruses kohtab põhjapõtru, rabalinde ja kõrgalpseid värvulisi.",
    flora: "Tundraniidud, madal pajustik, samblikud, kivised kaldad ja lühikese kasvuperioodiga mägitaimed.",
    access: "Valdresflye teelt ja Bygdini hotellist on lihtne ligipääs; suvel sõidab ajalooline M/B Bitihorn Eidsbugardeni.",
  }),
  createLake("Tyin", "Norra", 61.25, 8.25, "33 km²", "65 m", "1 084 m", "Kõrgel paiknev mägijärv Jotunheimeni lõunaserval, tähtis hüdroenergia ja matkamise jaoks.", "Tyin", {
    waterQuality: "Reguleeritud kõrgalpne järv, mille külm vesi ja muutuv veetase peegeldavad hüdroenergia kasutust.",
    fauna: "Mägiforell ja paalia; ümbruse avamaastikel liiguvad põhjapõdrad ning pesitsevad mägilinnud.",
    flora: "Paljakud, kiviklibu, samblikud, madal pajustik ja lühikese suvega alpitaimestik.",
    access: "Tyin-Filefjelli maantee ja lähedased mägimajad teevad ligipääsu heaks; ilm ja lumi piiravad hooajalist külastust.",
  }),
  createLake("Oldevatnet", "Norra", 61.78, 6.8, "7.9 km²", "teadmata", "33 m", "Liustikuroheline järv Briksdalsbreeni ja Jostedalsbreeni maastike all.", "Oldevatnet", {
    waterQuality: "Liustikujahuga heleroheline külm järv, mille läbipaistvus ja värvus sõltuvad sulaveest ning sademetest.",
    fauna: "Forell ja külmaveelised selgrootud; järve kohal ja orgudes liiguvad kajakad, kosklad ja mägilinnud.",
    flora: "Lopsakad orumetsad, lehtpuud, niisked niidud, koskede ümbruse samblad ja järsud mäenõlvad.",
    access: "Oldeni orust viib tee järve äärt mööda Briksdalsbreeni suunas; vaateid saab autoga, rattaga või paadiga.",
  }),
  createLake("Lovatnet", "Norra", 61.85, 6.95, "10.4 km²", "138 m", "52 m", "Kaunis, kuid traagilise ajalooga järv, mida tuntakse Loeni maalihke- ja tsunamikatastroofide tõttu.", "Lovatnet", {
    waterQuality: "Liustikusettega rohekas ja külm orujärv, mille järsud nõlvad muudavad ümbruse geoloogiliselt tundlikuks.",
    fauna: "Forell ja külmaveeline järveelustik; orgudes leidub veelinde ning järskudel nõlvadel mägiliike.",
    flora: "Lehtmetsad, niisked oruniidud, koskede samblad, mäenõlvade kase- ja lepavööndid ning madal kaldataimestik.",
    access: "Loenist viib kitsas tee järve äärde ja Kjenndalsbreeni suunas; ajaloolised katastroofipaigad jäävad sama oru äärde.",
  }),
  createLake("Jølstravatnet", "Norra", 61.5, 6.1, "40 km²", "233 m", "207 m", "Sunnfjordi pikk järv, tuntud forelli, kunstimaastike ja Jølsteri kultuuriloo poolest.", "J%C3%B8lstravatnet", {
    waterQuality: "Selge ja külm Lääne-Norra orujärv, mille veetaset ning läbipaistvust mõjutavad jõgede sissevool ja mägised valgalad.",
    fauna: "Jølsteri forell on järve tuntud kalavara, lisaks paalia ja muud külmaveelised liigid.",
    flora: "Rohelised oruniidud, leht- ja okasmetsad, järsud nõlvad ning jõgede suudmealade märjad niidud.",
    access: "E39 kulgeb järve ääres; Vassenden, Skei ja Astruptunet pakuvad lihtsat ligipääsu, randu ja kultuuripeatusi.",
  }),
  createLake("Eikesdalsvatnet", "Norra", 62.55, 8.1, "23 km²", "155 m", "22 m", "Møre og Romsdali järskude mäeseintega järv Mardalsfosseni lähedal.", "Eikesdalsvatnet", {
    waterQuality: "Sügav, külm ja kitsas orujärv, mille vesi tuleb mägijõgedest ja koskedest; hüdroenergia mõjutab mõnda sissevoolu.",
    fauna: "Forell ja paalia, suudmealadel ka merelise ühendusega seotud liike; järsud kaldad piiravad madalveealasid.",
    flora: "Järsud mäenõlvad, lehtmetsad, koskede niisked samblakooslused ja kitsad rohtsed rannad.",
    access: "Eikesdali külla viib tee Eresfjordist; Mardalsfosseni rada on peamine looduslik sihtkoht järve lõunaosas.",
  }),
  createLake("Storsjøen", "Norra", 61.45, 11.25, "48 km²", "309 m", "251 m", "Rendalenis paiknev sügav metsajärv, oluline kalastus- ja puhkejärv.", "Storsj%C3%B8en_(Rendalen)", {
    waterQuality: "Sügav metsajärv Østerdaleni vesikonnas, üldiselt jahe ja selge, kuid sissevoolud toovad humiinset metsavett.",
    fauna: "Forell, siig, harjus, haug, ahven ja luts; järv on tuntud kalastuspaik Rendalenis.",
    flora: "Männi- ja kuusemetsad, rabased kaldalõigud, kivised rannad ning madalad roostunud lahed.",
    access: "Rena ja Rendalen suunast autoga; järve ümbruses on paadisadamad, kalastuspaigad ja puhkemajad.",
  }),
  createLake("Altevatnet", "Norra", 68.7, 19.4, "80 km²", "teadmata", "489 m", "Tromsi suur mägijärv Rootsi piiri lähedal, värav Dividaleni ja tundramaastike juurde.", "Altevatnet", {
    waterQuality: "Külm reguleeritud mägijärv, mille veetaset mõjutab hüdroenergia ning mille valgala ulatub tundra- ja mägialadele.",
    fauna: "Paalia, forell ja harjus; ümbruses kohtab põhjapõtru, rabapüüsid, röövlinde ja Dividaleni mägifaunat.",
    flora: "Mägitundra, kased, pajustikud, samblikud, rabad ja kivised, veetaseme kõikumisest mõjutatud kaldad.",
    access: "Bardu kaudu viib tee järve lääneotsa; edasi liigutakse paadi, suusa või matkavarustusega, sest järv on pikk ja kõrvaline.",
  }),
];

export const finlandSection: Continent = {
  name: "Finland",
  nameEt: "Soome",
  description:
    "Soome on Euroopa klassikaline järvede maa: liustikujärgsed järvesüsteemid, saarestikud, rabaservad ja selgeveelised põhjapoolsed järved moodustavad riigi ühe tugevaima loodusliku identiteedi.",
  emoji: "🇫🇮",
  lakes: finlandLakes,
};

export const norwaySection: Continent = {
  name: "Norway",
  nameEt: "Norra",
  description:
    "Norra tähelepanuväärsed järved ulatuvad sügavatest fjorditaolistest orgudest kõrgalpse Jotunheimeni ja põhja tundramaastikeni. Paljud neist on seotud hüdroenergia, matkakultuuri ja dramaatilise mägimaastikuga.",
  emoji: "🇳🇴",
  lakes: norwayLakes,
};
