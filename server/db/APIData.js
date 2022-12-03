// const Discogs = require("disconnect").Client;
// const discogDB = new Discogs("RightRoundRecords/1.0", {
//   userToken: "NksRxbPTaPeMRLmRcevYuULmVcahGrGzRxhLYuKI",
// }).database();
// const fs = require("fs");

// const storeData = (data, path) => {
//   try {
//     fs.writeFileSync(path, JSON.stringify(data));
//   } catch (err) {
//     console.error(err);
//   }
// };

// let i = 1000;

// const dataArray = [];
// const intervalId = setInterval(() => {
//   discogDB.getMaster(i++, function (err, data) {
//     dataArray.push(data);
//   });
//   if (i > 1501) {
//     clearInterval(intervalId);
//     storeData(dataArray, "server/db/DataStorage.json");
//   }
// }, 1100);

// const masterReleaseExample = {
//   id: 1001,
//   main_release: 16020,
//   most_recent_release: 1246967,
//   resource_url: "https://api.discogs.com/masters/1001",
//   uri: "https://www.discogs.com/master/1001-DJ-Hell-Diese-Momente-EP",
//   versions_url: "https://api.discogs.com/masters/1001/versions",
//   main_release_url: "https://api.discogs.com/releases/16020",
//   most_recent_release_url: "https://api.discogs.com/releases/1246967",
//   num_for_sale: 37,
//   lowest_price: 3.12,
//   images: [
//     {
//       type: "primary",
//       uri: "https://i.discogs.com/gQGxFaEGK-YMsRpBTJwQp0YyjzZ2ClWIoCctpM9cDFs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MDIw/LTE2MDQyMjU0ODkt/OTE3NS5qcGVn.jpeg",
//       resource_url:
//         "https://i.discogs.com/gQGxFaEGK-YMsRpBTJwQp0YyjzZ2ClWIoCctpM9cDFs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MDIw/LTE2MDQyMjU0ODkt/OTE3NS5qcGVn.jpeg",
//       uri150:
//         "https://i.discogs.com/u3QmviaJb1US2og-2sXWC5vwDLIkHR45QuUVjIZaIGQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MDIw/LTE2MDQyMjU0ODkt/OTE3NS5qcGVn.jpeg",
//       width: 600,
//       height: 600,
//     },
//     {
//       type: "secondary",
//       uri: "https://i.discogs.com/kS5E9zeSdqikJGfVyRvMK7B7bDnM-7-773mN_ub20B0/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MDIw/LTE2MDQyMjU0ODkt/NTM0MS5qcGVn.jpeg",
//       resource_url:
//         "https://i.discogs.com/kS5E9zeSdqikJGfVyRvMK7B7bDnM-7-773mN_ub20B0/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MDIw/LTE2MDQyMjU0ODkt/NTM0MS5qcGVn.jpeg",
//       uri150:
//         "https://i.discogs.com/cZcO5NB8yliFlYVFJF0-hen0OV6yo_lrgYAR5dZbscQ/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MDIw/LTE2MDQyMjU0ODkt/NTM0MS5qcGVn.jpeg",
//       width: 600,
//       height: 600,
//     },
//   ],
//   genres: ["Electronic"],
//   styles: ["Techno"],
//   year: 1997,
//   tracklist: [
//     {
//       position: "b",
//       type_: "track",
//       title: "Diese Momente Werden Nicht Verloren Sein Wie Tränen Im Regen!",
//       duration: "6:11",
//     },
//     {
//       position: "bb",
//       type_: "track",
//       title:
//         "So Regen Wir Die Ruder, Stemmen Uns Gegen Den Strom - Und Treiben Doch Stetig Zurück, Dem Vergangenen Zu!",
//       duration: "5:55",
//     },
//   ],
//   artists: [
//     {
//       name: "Hell",
//       anv: "DJ Hell",
//       join: "",
//       role: "",
//       tracks: "",
//       id: 114532,
//       resource_url: "https://api.discogs.com/artists/114532",
//       thumbnail_url:
//         "https://i.discogs.com/2kywgeAy3cEsrTk38WuhMPG8q9W1zxosk3H5JfjoZT0/rs:fit/g:sm/q:40/h:402/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTExNDUz/Mi0xMzc5NjI0MTA4/LTgwNTUuanBlZw.jpeg",
//     },
//   ],
//   title: "Diese Momente EP",
//   data_quality: "Correct",
//   videos: [
//     {
//       uri: "https://www.youtube.com/watch?v=rRD3LG6XBns",
//       title: "DJ Hell - Diese Momente EP",
//       description:
//         "So Regen Wir Die Ruder, Stemmen Uns Gegen Den Strom - Und Treiben Doch Stetig Zurück, Dem Vergangenen Zu! \r\n" +
//         "http://www.discogs.com/DJ-Hell-Diese-Momente-EP/release/16020",
//       duration: 351,
//       embed: true,
//     },
//     {
//       uri: "https://www.youtube.com/watch?v=qaaIR0QFoAI",
//       title:
//         "dj hell - Diese Momente Werden Nicht Verloren Sein Wie Tränen In Regen!",
//       description: " ",
//       duration: 373,
//       embed: true,
//     },
//     {
//       uri: "https://www.youtube.com/watch?v=Sbjt3QGSg7g",
//       title: "DJ Hell - Diese Momente",
//       description:
//         "Diese Momente EP was released in 1997 on Vinyl. \n" +
//         "Digitized and Remastered Edition @ Bandcamp: https://djhellofficial.bandcamp.com/album/diese-momente-ep\n" +
//         "\n" +
//         "Tracklist: Diese Momente Werden Nicht Verloren Sein Wie Tränen Im Regen! and So Regen Wir Die Rud",
//       duration: 721,
//       embed: true,
//     },
//   ],
// };

// const majorReleaseExample = {
//   id: 16020,
//   status: "Accepted",
//   year: 1997,
//   resource_url: "https://api.discogs.com/releases/16020",
//   uri: "https://www.discogs.com/release/16020-DJ-Hell-Diese-Momente-EP",
//   artists: [
//     {
//       name: "Hell",
//       anv: "DJ Hell",
//       join: "",
//       role: "",
//       tracks: "",
//       id: 114532,
//       resource_url: "https://api.discogs.com/artists/114532",
//     },
//   ],
//   artists_sort: "Hell",
//   labels: [
//     {
//       name: "Sativae Recordings",
//       catno: "tiva008",
//       entity_type: "1",
//       entity_type_name: "Label",
//       id: 1494208,
//       resource_url: "https://api.discogs.com/labels/1494208",
//     },
//   ],
//   series: [],
//   companies: [
//     {
//       name: "Disko B",
//       catno: "",
//       entity_type: "6",
//       entity_type_name: "Licensed From",
//       id: 148,
//       resource_url: "https://api.discogs.com/labels/148",
//     },
//     {
//       name: "BMG Ufa",
//       catno: "",
//       entity_type: "21",
//       entity_type_name: "Published By",
//       id: 263856,
//       resource_url: "https://api.discogs.com/labels/263856",
//     },
//     {
//       name: "The Exchange",
//       catno: "",
//       entity_type: "30",
//       entity_type_name: "Lacquer Cut At",
//       id: 158759,
//       resource_url: "https://api.discogs.com/labels/158759",
//     },
//     {
//       name: "P.R. Records Limited",
//       catno: "",
//       entity_type: "29",
//       entity_type_name: "Mastered At",
//       id: 319506,
//       resource_url: "https://api.discogs.com/labels/319506",
//     },
//   ],
//   formats: [{ name: "Vinyl", qty: "1", descriptions: ['12"', "45 RPM", "EP"] }],
//   data_quality: "Needs Vote",
//   community: {
//     have: 965,
//     want: 389,
//     rating: { count: 218, average: 4.1 },
//     submitter: {
//       username: "Haze",
//       resource_url: "https://api.discogs.com/users/Haze",
//     },
//     contributors: [
//       { username: "Haze", resource_url: "https://api.discogs.com/users/Haze" },
//       {
//         username: "ichini",
//         resource_url: "https://api.discogs.com/users/ichini",
//       },
//       {
//         username: "helix",
//         resource_url: "https://api.discogs.com/users/helix",
//       },
//       {
//         username: "cthulhu303",
//         resource_url: "https://api.discogs.com/users/cthulhu303",
//       },
//       { username: "derb", resource_url: "https://api.discogs.com/users/derb" },
//       {
//         username: "bastard_peter",
//         resource_url: "https://api.discogs.com/users/bastard_peter",
//       },
//       {
//         username: "noiser",
//         resource_url: "https://api.discogs.com/users/noiser",
//       },
//       { username: "xybo", resource_url: "https://api.discogs.com/users/xybo" },
//       {
//         username: "schnipsi",
//         resource_url: "https://api.discogs.com/users/schnipsi",
//       },
//       {
//         username: "beztyol",
//         resource_url: "https://api.discogs.com/users/beztyol",
//       },
//       {
//         username: "wax_junkie",
//         resource_url: "https://api.discogs.com/users/wax_junkie",
//       },
//       { username: "stak", resource_url: "https://api.discogs.com/users/stak" },
//       {
//         username: "sonus",
//         resource_url: "https://api.discogs.com/users/sonus",
//       },
//       {
//         username: "RIOTRadioRecords",
//         resource_url: "https://api.discogs.com/users/RIOTRadioRecords",
//       },
//       {
//         username: "vinylmaddy",
//         resource_url: "https://api.discogs.com/users/vinylmaddy",
//       },
//       {
//         username: "cereal",
//         resource_url: "https://api.discogs.com/users/cereal",
//       },
//       { username: "vadz", resource_url: "https://api.discogs.com/users/vadz" },
//       {
//         username: "scherben",
//         resource_url: "https://api.discogs.com/users/scherben",
//       },
//       {
//         username: "Folkostak",
//         resource_url: "https://api.discogs.com/users/Folkostak",
//       },
//     ],
//     data_quality: "Needs Vote",
//     status: "Accepted",
//   },
//   format_quantity: 1,
//   date_added: "2001-11-09T16:55:48-08:00",
//   date_changed: "2021-03-06T22:04:01-08:00",
//   num_for_sale: 30,
//   lowest_price: 3.12,
//   master_id: 1001,
//   master_url: "https://api.discogs.com/masters/1001",
//   title: "Diese Momente EP",
//   country: "UK",
//   released: "1997",
//   notes:
//     "PO Box 14056,Edinburgh,EH10 4YA,Scotland \r\nLicensed from Disko B, Germany\r\nPublished by BMG Ufa\r\nCopyright 1997\r\n",
//   released_formatted: "1997",
//   identifiers: [
//     {
//       type: "Matrix / Runout",
//       value: "TIVA 008-B1 PR-m THE EXCHANGE - NILZ.",
//       description: "Runout side b etched",
//     },
//     {
//       type: "Matrix / Runout",
//       value: "TIVA 008-BB1 PR-m THE EXCHANGE - NILZ.",
//       description: "Runout side bb etched",
//     },
//   ],
//   videos: [
//     {
//       uri: "https://www.youtube.com/watch?v=rRD3LG6XBns",
//       title: "DJ Hell - Diese Momente EP",
//       description:
//         "So Regen Wir Die Ruder, Stemmen Uns Gegen Den Strom - Und Treiben Doch Stetig Zur\u00fcck, Dem Vergangenen Zu! \r\nhttp://www.discogs.com/DJ-Hell-Diese-Momente-EP/release/16020",
//       duration: 351,
//       embed: true,
//     },
//     {
//       uri: "https://www.youtube.com/watch?v=qaaIR0QFoAI",
//       title:
//         "dj hell - Diese Momente Werden Nicht Verloren Sein Wie Tr\u00e4nen In Regen!",
//       description: " ",
//       duration: 373,
//       embed: true,
//     },
//     {
//       uri: "https://www.youtube.com/watch?v=Sbjt3QGSg7g",
//       title: "DJ Hell - Diese Momente",
//       description:
//         "Diese Momente EP was released in 1997 on Vinyl. \nDigitized and Remastered Edition @ Bandcamp: https://djhellofficial.bandcamp.com/album/diese-momente-ep\n\nTracklist: Diese Momente Werden Nicht Verloren Sein Wie Tr\u00e4nen Im Regen! and So Regen Wir Die Rud",
//       duration: 721,
//       embed: true,
//     },
//   ],
//   genres: ["Electronic"],
//   styles: ["Techno"],
//   tracklist: [
//     {
//       position: "b",
//       type_: "track",
//       title:
//         "Diese Momente Werden Nicht Verloren Sein Wie Tr\u00e4nen Im Regen!",
//       duration: "6:11",
//     },
//     {
//       position: "bb",
//       type_: "track",
//       title:
//         "So Regen Wir Die Ruder, Stemmen Uns Gegen Den Strom - Und Treiben Doch Stetig Zur\u00fcck, Dem Vergangenen Zu!",
//       duration: "5:55",
//     },
//   ],
//   extraartists: [
//     {
//       name: "Nilesh Patel",
//       anv: "NILZ.",
//       join: "",
//       role: "Lacquer Cut By",
//       tracks: "",
//       id: 386598,
//       resource_url: "https://api.discogs.com/artists/386598",
//     },
//     {
//       name: "M (91)",
//       anv: "",
//       join: "",
//       role: "Plated By",
//       tracks: "",
//       id: 6742248,
//       resource_url: "https://api.discogs.com/artists/6742248",
//     },
//     {
//       name: "Filippo Moscatello",
//       anv: "Flippo Moscatello",
//       join: "",
//       role: "Producer, Written-By",
//       tracks: "",
//       id: 547677,
//       resource_url: "https://api.discogs.com/artists/547677",
//     },
//     {
//       name: "Hell",
//       anv: "DJ Hell",
//       join: "",
//       role: "Producer, Written-By",
//       tracks: "",
//       id: 114532,
//       resource_url: "https://api.discogs.com/artists/114532",
//     },
//   ],
//   images: [
//     {
//       type: "primary",
//       uri: "",
//       resource_url: "",
//       uri150: "",
//       width: 600,
//       height: 600,
//     },
//     {
//       type: "secondary",
//       uri: "",
//       resource_url: "",
//       uri150: "",
//       width: 600,
//       height: 600,
//     },
//   ],
//   thumb: "",
//   estimated_weight: 230,
//   blocked_from_sale: false,
// };
