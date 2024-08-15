import { describe, it, expect } from 'vitest'

import { storeTilStoreOgSmå } from './store-små'

describe('Tester formatering av firmanavn', () => {
    const firmanavn = [
        'KRANOR AS,AVD SLEMMESTAD',
        'ARCHER AS,AVD BORETJENESTER',
        'TEKNISKBUREAU AS,AVD BERGEN',
        'SYKEHUSPARTNER,AVD SKØYEN',
        'TIPP TRANSPORT AS,AVD PORSGRUNN',
        'ECURA BO OG HABILITERING AS,AVD MOLDE',
        'FORA FORM AS,AVD ØRSTA',
        'VYGRUPPEN AS,SKIEN',
        'INNLANDET FYLKESKOMMUNE IKT OG,DOKUMENTASJONSFORVALTNING',
        'BUFETAT SØR,AGDER UNGDOMSHJEM,NES',
        'NORDHORDLAND FOLKEHØGSKOLE',
        'SAS INSTITUTE AS',
        'TYNSET VARETAXI AS',
        'RØRA FABRIKKER AS',
        'NYE FREDRIKSTAD ENDODONTI AS',
        'STRØMMEN STAAL RESTAURANT & BAR AS',
        'LØRENSKOG KOMMUNE FYSIO/ERGOTERAPI',
        'SANDVEDHAUGEN BARNEHAGE',
        'BERGMO SYKEHJEM',
        'RINGERIKSKJØKKEN',
        'ØSTLANDSKE VEI OG BETONG AS',
        'SMART-CONTROL AS',
        'NORD-ØSTERDAL VIDEREGÅENDE SKOLE',
        'LIJO RENHOLD AS',
        'NORSK TEKNISK INSTALLASJON AS',
        'GRØNMO AVFALLSANLEGG',
        'MOEN SKOLE',
        'APOTEK 1 SVANEN PORSGRUNN',
        'BRISK KOMPETANSESENTER',
        'ARI ALI ABDULLAH',
        'SAFEMATE AS',
        'CLARION HOTEL BERGEN AIRPORT',
        'FRESH FITNESS ST HANSHAUGEN',
        'BJØRNUNGEN BARNEHAGE',
        'RAGN SELLS AS,AVD BERGEN',
        'WIDERØE GROUND HANDLING AS,AVD GROUND SERVICES SOLA',
        'SYKEHUSET INNLANDET HF,DPS GJØVIK,DØGNENHET VALDRES',
        'POSTEN NORGE AS,ÅLESUND TERMINAL',
        'ØKONOMIRÅDGIVNING AS,AVD BRUMUNDDAL',
        'SYKEHUSET I VESTFOLD HF,,DPS VESTFOLD,,NØTTERØY - LINDE',
        'NG KIWI ØST AS,AVD 306 ELINGAARDKILEN',
        'MØRE OG ROMSDAL TINGRETT ÅLESUND',
        'AVARN SECURITY AS,AVD STAVANGER',
        'INTERSPORT TRONDHEIM - TILLER',
        'TINE SA,AVD SOLA',
        'NAV ARBEID OG YTELSER,AVD SKIEN',
        'ELKEM ASA,RANA',
        'BRAVIDA NORGE AS,AVD FREDRIKSTAD VVS',
        'NAV KONTAKTSENTER NORDLAND,BODØ',
        'HERØY KOMMUNE HEIMETENESTER YTRE',
        'RUSTIKA AS,AVD FEEL AMANDA',
        'AVONOVA HELSE AS,AVD LARVIK',
        'TEKNOTHERM MARINE AS,AVD TROMSØ',
        'SANDNES KOMMUNE ENHET FOR,FUNKSJONSHEMMEDE RINDAHAGEN',
        'PROACTIMA AS,HOVEDKONTOR',
        'HJEMMEBASERTE OMSORGSTJENESTER',
        'RUSH STAVANGER FORUS AS',
        'ADVOKAT24 AS',
        'VITUSAPOTEK SOLSIDEN',
        'NAV LØRENSKOG',
        'NORSK ELEKTRO OPTIKK AS',
        'G&G BROTHERS AS',
        'SMØRÅS SKOLE',
        'LUNDEÅNE BO- OG SERVICESENTER',
        'KIRKEALLEEN BOLIG',
        'VEFSN KULTURSKOLE',
        'TØMRERMESTER ARNSTEIN SØRGÅRD AS',
        'GYLAND BARNEHAGE',
        'GRUNDEN BOLIGER',
        'STRØMSØ BO- OG SERVICESENTER',
        'BAROKK',
        'HAV AS',
        'WEBHELP NORWAY CONSULTING AS',
        'HOLEN SKOLE',
        'MADAM REIERSEN AS',
        'DEN NORSKE KIRKE I LUNNER',
        'TAXI SØR AS',
        'ELVERUM KOMMUNE HJEMMEBASERT OMSORG',
        'NORLANDIA SJØFLYHAVNA AS,AVD BARNEHAGE',
        'BRUBAKKEN AS,AVD ØSTFOLD',
        'ELTEL NETWORKS AS,AVD ÅLESUND',
    ]

    it('Formateringen er riktig', () => {
        /*
                firmanavn.forEach(navn => {
                    console.log(':', storeTilStoreOgSmå(navn)) // eslint-disable-line
                })
        */
        expect(storeTilStoreOgSmå(firmanavn[0])).toEqual('Kranor AS, Avd Slemmestad')
        expect(storeTilStoreOgSmå(firmanavn[5])).toEqual('Ecura Bo og Habilitering AS, Avd Molde')
        expect(storeTilStoreOgSmå(firmanavn[8])).toEqual('Innlandet Fylkeskommune IKT og, Dokumentasjonsforvaltning')
        expect(storeTilStoreOgSmå(firmanavn[9])).toEqual('Bufetat Sør, Agder Ungdomshjem, Nes')
        expect(storeTilStoreOgSmå(firmanavn[40])).toEqual('NG Kiwi Øst AS, Avd 306 Elingaardkilen')
        expect(storeTilStoreOgSmå(firmanavn[69])).toEqual('Strømsø Bo- og Servicesenter')
    })
})
