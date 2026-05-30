import saimaaImg from "@/assets/lakes/saimaa.jpg";
import type { Continent, Lake } from "@/data/lakes";

const nordicLakeImage = saimaaImg;

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
): Lake => ({
  name,
  country,
  lat,
  lng,
  area,
  maxDepth,
  elevation,
  waterQuality:
    "Valdavalt puhas põhjamaine magevesi; seisund sõltub valgalast, asustusest ja metsandus- või põllumajanduskoormusest.",
  fauna: "Ahven, haug, siig, forell või lõhe sõltuvalt järve tüübist; kaldavööndites leidub veelinde ja kahepaikseid.",
  flora: "Okas- ja segametsad, rabaservad, pilliroog ning selgeveelistele järvedele omased veetaimed.",
  temperature: "Pinnavee temp. 0-22°C, talvel jääkate",
  access: "Ligipääs on üldiselt hea maanteede, matkaradade või paadisadamate kaudu; põhjapoolsemad järved on hooajaliselt kaugemad.",
  significance,
  googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`,
  wikipediaUrl: `https://en.wikipedia.org/wiki/${wikipediaPath}`,
  imageUrl: nordicLakeImage,
  imageCredit: "Placeholder",
});

const finlandLakes: Lake[] = [
  createLake("Saimaa", "Soome", 61.25, 28.25, "4 400 km²", "82 m", "76 m", "Soome suurim järvesüsteem ja äärmiselt ohustatud Saimaa viigerhülge kodu.", "Saimaa"),
  createLake("Päijänne", "Soome", 61.5, 25.5, "1 080 km²", "95 m", "78 m", "Soome suuruselt teine järv ja Helsingi piirkonna oluline joogiveeallikas Päijänne tunneli kaudu.", "P%C3%A4ij%C3%A4nne"),
  createLake("Inari järv", "Soome", 69.0, 27.75, "1 040 km²", "92 m", "119 m", "Lapimaa suurim järv, saamide kultuurmaastik ja suurte saartega arktiline järvemaailm.", "Lake_Inari"),
  createLake("Pielinen", "Soome", 63.25, 29.4, "894 km²", "60 m", "94 m", "Koli rahvusmaastiku järv, mille vaated kuuluvad Soome tuntumate loodusikoonide hulka.", "Pielinen"),
  createLake("Oulujärvi", "Soome", 64.3, 27.25, "928 km²", "38 m", "123 m", "Kainuu suur avar järv, mida kutsutakse liivarandade ja tuulisuse tõttu sageli Kainuu mereks.", "Ouluj%C3%A4rvi"),
  createLake("Puruvesi", "Soome", 61.8, 29.3, "416 km²", "60 m", "76 m", "Erakordselt selgeveelise Saimaa osa, tuntud läbipaistvuse ja rääbisepüügi poolest.", "Puruvesi"),
  createLake("Näsijärvi", "Soome", 61.75, 23.75, "257 km²", "63 m", "95 m", "Tampere põhjapoolne suurjärv, mille veeteed ja kaljud kujundavad linna ümbruse maastikku.", "N%C3%A4sij%C3%A4rvi"),
  createLake("Pyhäjärvi (Tampere)", "Soome", 61.35, 23.65, "122 km²", "46 m", "77 m", "Tampere lõunapoolne järv ja üks Soome tuntumaid linnalähedasi järvemaastikke.", "Pyh%C3%A4j%C3%A4rvi_(Tampere_region)"),
  createLake("Kallavesi", "Soome", 62.9, 27.8, "473 km²", "75 m", "82 m", "Kuopio ümbruse saarterohke järv ja keskne osa Põhja-Savo järveteedest.", "Kallavesi"),
  createLake("Keitele", "Soome", 62.8, 25.8, "493 km²", "64 m", "99 m", "Kesk-Soome pikk ja liigestunud järv, kuulus saarestiku, kalapüügi ja laevateede poolest.", "Keitele_(lake)"),
  createLake("Lappajärvi", "Soome", 63.15, 23.65, "142 km²", "38 m", "69 m", "Euroopa tähelepanuväärsemaid meteoriidikraatri järvi ja haruldane geoloogiline maamärk.", "Lappaj%C3%A4rvi"),
  createLake("Kitkajärvi", "Soome", 66.1, 28.6, "286 km²", "34 m", "240 m", "Kõrgel paiknev selgeveeliste järvede süsteem Kuusamo kandis, Oulanka maastike lähedal.", "Kitkaj%C3%A4rvi"),
  createLake("Kilpisjärvi", "Soome", 69.05, 20.8, "37 km²", "57 m", "473 m", "Soome käsivarre ikooniline mägijärv Saana jalamil ja kolme riigi piiri lähistel.", "Kilpisj%C3%A4rvi_(lake)"),
  createLake("Lohjanjärvi", "Soome", 60.25, 24.0, "92 km²", "55 m", "32 m", "Lõuna-Soome üks liigirikkamaid ja soojemaid järvi, tähtis puhke- ja linnustikuala.", "Lohjanj%C3%A4rvi"),
  createLake("Tuusulanjärvi", "Soome", 60.43, 25.05, "6 km²", "10 m", "38 m", "Soome kultuuriloo järv, mille kallastel elasid Sibelius, Järnefelt ja teised kunstnikud.", "Lake_Tuusula"),
  createLake("Vesijärvi", "Soome", 61.0, 25.55, "108 km²", "42 m", "81 m", "Lahti linna järv, tuntud eduka veekaitse ja restaureerimise näitena.", "Vesij%C3%A4rvi"),
  createLake("Vanajavesi", "Soome", 61.05, 24.15, "120 km²", "24 m", "79 m", "Häme ajalooline järvemaastik losside, asulate ja vanade veeteedega.", "Vanajavesi"),
  createLake("Höytiäinen", "Soome", 62.75, 29.65, "283 km²", "59 m", "87 m", "Järv, mille 19. sajandi veetaseme langetamine lõi Soome tuntud hüdroloogilise juhtumi.", "H%C3%B6yti%C3%A4inen"),
  createLake("Nuuksio Pitkäjärvi", "Soome", 60.28, 24.52, "2 km²", "23 m", "27 m", "Helsingi lähedane rahvuspargijärv, populaarne matkamiseks ja metsalooduse kogemiseks.", "Nuuksio_National_Park"),
  createLake("Enontekiö Pöyrisjärvi", "Soome", 68.75, 23.95, "17 km²", "teadmata", "610 m", "Kauge liiva- ja tundramaastiku järv Pöyrisjärvi erämaa südames.", "P%C3%B6yrisj%C3%A4rvi_Wilderness_Area"),
];

const norwayLakes: Lake[] = [
  createLake("Mjøsa", "Norra", 60.65, 11.0, "365 km²", "453 m", "123 m", "Norra suurim järv, Lillehammeri ja Hamariga seotud oluline siseveetee.", "Mj%C3%B8sa"),
  createLake("Røssvatnet", "Norra", 65.8, 13.9, "219 km²", "231 m", "374 m", "Norra üks suurimaid järvi ja tähtis hüdroenergia veehoidla Helgelandis.", "R%C3%B8ssvatnet"),
  createLake("Femunden", "Norra", 62.25, 11.95, "203 km²", "130 m", "662 m", "Suur kõrglavamaa järv Femundsmarka rahvuspargi kõrval, tuntud kanuu- ja matkamaastikuna.", "Femunden"),
  createLake("Randsfjorden", "Norra", 60.4, 10.35, "140 km²", "120 m", "135 m", "Pikk ja fjorditaoline sisejärv Innlandetis, ajalooline laeva- ja puhkemaastik.", "Randsfjorden"),
  createLake("Tyrifjorden", "Norra", 60.0, 10.2, "138 km²", "295 m", "63 m", "Oslo lähikonna suur järv, mille saared ja märgalad on linnustikule tähtsad.", "Tyrifjorden"),
  createLake("Snåsavatnet", "Norra", 64.15, 12.0, "122 km²", "186 m", "24 m", "Trøndelagi suur järv, mida ümbritsevad põllud, metsad ja kalastuspaigad.", "Sn%C3%A5savatnet"),
  createLake("Tinnsjå", "Norra", 59.85, 8.95, "51 km²", "460 m", "191 m", "Väga sügav Telemarki järv, tuntud Rjukani tööstusajaloo ja sõjaajaloo poolest.", "Tinnsj%C3%A5"),
  createLake("Hornindalsvatnet", "Norra", 61.95, 6.35, "50 km²", "514 m", "53 m", "Euroopa sügavaim järv, dramaatiliste Lääne-Norra mägede vahel.", "Hornindalsvatnet"),
  createLake("Bandak", "Norra", 59.35, 8.0, "26 km²", "325 m", "72 m", "Telemarki kanali kõige dramaatilisemaid järvi, järskude nõlvade ja ajaloolise laevateega.", "Bandak"),
  createLake("Nisser", "Norra", 59.05, 8.45, "76 km²", "234 m", "246 m", "Telemarki pikk järv liivarandade, saarte ja paadimatkadega.", "Nisser"),
  createLake("Seljordsvatnet", "Norra", 59.5, 8.65, "16 km²", "150 m", "116 m", "Rahvapärimuses tuntud Selma järvekoletise järvena.", "Seljordsvatnet"),
  createLake("Gjende", "Norra", 61.48, 8.7, "15.6 km²", "149 m", "984 m", "Jotunheimeni kuulus türkiissinine mägijärv Besseggeni matkaraja kõrval.", "Gjende"),
  createLake("Bygdin", "Norra", 61.34, 8.8, "46 km²", "215 m", "1 058 m", "Jotunheimeni kõrgalpne järv, tuntud paadiliini ja mägimatkade poolest.", "Bygdin"),
  createLake("Tyin", "Norra", 61.25, 8.25, "33 km²", "65 m", "1 084 m", "Kõrgel paiknev mägijärv Jotunheimeni lõunaserval, tähtis hüdroenergia ja matkamise jaoks.", "Tyin"),
  createLake("Oldevatnet", "Norra", 61.78, 6.8, "7.9 km²", "teadmata", "33 m", "Liustikuroheline järv Briksdalsbreeni ja Jostedalsbreeni maastike all.", "Oldevatnet"),
  createLake("Lovatnet", "Norra", 61.85, 6.95, "10.4 km²", "138 m", "52 m", "Kaunis, kuid traagilise ajalooga järv, mida tuntakse Loeni maalihke- ja tsunamikatastroofide tõttu.", "Lovatnet"),
  createLake("Jølstravatnet", "Norra", 61.5, 6.1, "40 km²", "233 m", "207 m", "Sunnfjordi pikk järv, tuntud forelli, kunstimaastike ja Jølsteri kultuuriloo poolest.", "J%C3%B8lstravatnet"),
  createLake("Eikesdalsvatnet", "Norra", 62.55, 8.1, "23 km²", "155 m", "22 m", "Møre og Romsdali järskude mäeseintega järv Mardalsfosseni lähedal.", "Eikesdalsvatnet"),
  createLake("Storsjøen", "Norra", 61.45, 11.25, "48 km²", "309 m", "251 m", "Rendalenis paiknev sügav metsajärv, oluline kalastus- ja puhkejärv.", "Storsj%C3%B8en_(Rendalen)"),
  createLake("Altevatnet", "Norra", 68.7, 19.4, "80 km²", "teadmata", "489 m", "Tromsi suur mägijärv Rootsi piiri lähedal, värav Dividaleni ja tundramaastike juurde.", "Altevatnet"),
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
