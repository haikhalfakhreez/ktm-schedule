import batuCavesWdJson from 'lib/batu-caves-wd.json'
import klangWdJson from 'lib/klang-wd.json'

const destinationsA = [
  "Pulau Sebang",
  "Rembau",
  "Sungai Gadut",
  "Senawang",
  "Seremban",
  "Tiroi",
  "Labu",
  "Nilai",
  "Batang Benar",
  "Bangi",
  "UKM",
  "Kajang",
  "Serdang",
  "Bandar Tasek Selatan",
  "Salak Selatan",
  "Seputeh",
  "MidValley",
  "KL Sentral",
  "Kuala Lumpur",
  "Bank Negara",
  "Putra",
  "Sentul",
  "Batu Kentonmen",
  "Kampung Batu",
  "Taman Wahyu",
  "Batu Caves"
] as const

const destinationsB = [
  "Tanjung Malim",
  "K Kubu Bharu",
  "Rasa",
  "Batang Kali",
  "Serendah",
  "Rawang",
  "Kuang",
  "Sungai Buloh",
  "Kepong Sentral",
  "Kepong",
  "Segambut",
  "Sentul",
  "Putra",
  "Bank Negara",
  "Kuala Lumpur",
  "KL Sentral",
  "Abdullah Hukum",
  "Angkasapuri",
  "Pantai Dalam",
  "Petaling",
  "Jalan Templer",
  "Kg Dato Harun",
  "Seri Setia",
  "Setia Jaya",
  "Subang Jaya",
  "Batu Tiga",
  "Shah Alam",
  "Padang Jawa",
  "Bukit Badak",
  "Klang",
  "Teluk Pulai",
  "Teluk Gadong",
  "Kg Raja Uda",
  "Jalan Kastam",
  "Pelabuhan Klang"
] as const

type DestinationsAKey = keyof typeof batuCavesWdJson.train
type DestinationsAName = typeof destinationsA[number]
type DestinationsBKey = keyof typeof klangWdJson.train
type DestinationsBName = typeof destinationsB[number]

export type DestinationsKey = DestinationsAKey & DestinationsBKey
export type DestinationsName = DestinationsAName & DestinationsBName