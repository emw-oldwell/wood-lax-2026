// Source of truth for the Wood Family Lacrosse 2026 schedule.
// Edit this file to update tournaments, lodging, or contacts — re-deploy to refresh.

const DATA = {
  meta: {
    title: "Wood Family Lacrosse — Summer 2026",
    season: "June – July 2026",
    girls: ["Kate", "Rachel"],
    homeBaseLabel: "varies by trip",
  },

  // Lodging colors (used on calendar + cards)
  lodgingColors: {
    "WEST_CHESTER":  "#DDEBF7",
    "STAYBRIDGE":    "#E2EFDA",
    "KIAWAH":        "#FCE4D6",
    "INDIGO":        "#D9E1F2",
    "CHATEAU":       "#FFF2CC",
    "MERRIWEATHER":  "#F4CCCC",
    "WAYNE_PA":      "#FFE699",
    "SPRINGHILL":    "#EAD1DC",
    "EMPTY":         "#FFFFFF",
  },

  // Lodging short labels
  lodgingLabels: {
    "WEST_CHESTER":  "West Chester VRBO",
    "STAYBRIDGE":    "Staybridge Albany",
    "KIAWAH":        "Kiawah",
    "INDIGO":        "Hotel Indigo WC",
    "CHATEAU":       "Chateau Spring Lake",
    "MERRIWEATHER":  "Merriweather MD",
    "WAYNE_PA":      "Wayne PA Farmhouse",
    "SPRINGHILL":    "SpringHill Frederica",
  },

  // Lodging records (chronological)
  lodging: [
    {
      id: "vrbo_west_chester",
      key: "WEST_CHESTER",
      name: "Chester County Oasis VRBO",
      label: "June Base",
      checkIn:  "2026-06-08T16:00",
      checkOut: "2026-06-27T11:00",
      nights: 19,
      address: "1210 Ashbridge Rd, West Chester, PA 19380",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=1210+Ashbridge+Rd+West+Chester+PA+19380",
      conf: "VRBO HA-6GKJ0S",
      hostPhone: "+1 484-410-9669",
      wifi: "NETGEAR50 / Gloria64!",
      managePage: "https://www.vrbo.com/trips",
      notes: "June base for all June lacrosse events.",
    },
    {
      id: "staybridge_albany",
      key: "STAYBRIDGE",
      name: "Staybridge Suites Albany Wolf Rd – Colonie Center",
      label: "Albany sub-trip",
      checkIn:  "2026-06-13T15:00",
      checkOut: "2026-06-14T12:00",
      nights: 1,
      roomType: "2-bedroom suite",
      address: "39 Wolf Rd, Albany, NY 12205",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=39+Wolf+Rd+Albany+NY+12205",
      conf: "44948738",
      hotelPhone: "",
      managePage: "https://www.ihg.com/staybridge",
      notes: "For HHH Away game Sun 6/14 at Afrim's Sports Park.",
    },
    {
      id: "flight_charleston",
      key: "FLIGHT",
      name: "✈ Private flight to Charleston",
      label: "TODO: Book on Airplane Manager",
      checkIn:  "2026-06-27T14:00",
      checkOut: "2026-06-27T18:00",
      nights: 0,
      tail: "N222JM",
      from: "NJ private airport (TBD — likely KBLM Monmouth Exec)",
      to: "KJZI Charleston Executive (Johns Island, SC)",
      managePage: "https://www.airplanemanager.com",
      notes: "After Lax 4 Cure Day 2 wraps up Sat 6/27.",
      isFlight: true,
    },
    {
      id: "kiawah",
      key: "KIAWAH",
      name: "Kiawah Island Vacation",
      label: "Family vacation",
      checkIn:  "2026-06-27T17:00",
      checkOut: "2026-07-04T11:00",
      nights: 7,
      address: "Kiawah Island, SC",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Kiawah+Island+SC",
      conf: "VRBO group booking",
      notes: "Eric, Jen, Kate, Rachel. Misses HHH practices Tue 6/30 + Thu 7/2.",
    },
    {
      id: "hotel_indigo_wc",
      key: "INDIGO",
      name: "Hotel Indigo West Chester – Downtown",
      label: "Nilly trip",
      checkIn:  "2026-07-06T15:00",
      checkOut: "2026-07-08T11:00",
      nights: 2,
      rooms: 2,
      address: "39 E. Gay Street, West Chester, PA",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=39+E+Gay+St+West+Chester+PA",
      conf: "46227163 + 24108419",
      managePage: "https://www.ihg.com/hotelindigo",
      notes: "2 rooms. For Nilly @ United Sports Tue 7/7 + Wed 7/8 (2-day event).",
    },
    {
      id: "chateau_spring_lake",
      key: "CHATEAU",
      name: "Chateau Inn & Suites",
      label: "Capelli trip",
      checkIn:  "2026-07-08T15:30",
      checkOut: "2026-07-13T10:00",
      nights: 5,
      roomType: "Luxury Parlor Two Queens",
      address: "500 Warren Ave, Spring Lake, NJ 07762",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=500+Warren+Ave+Spring+Lake+NJ+07762",
      hotelPhone: "+1 732-974-2000",
      conf: "757888",
      managePage: "https://www.chateauinn.com",
      notes: "For HHH G8 Tournament @ Capelli Tinton Falls 7/9–10.",
    },
    {
      id: "merriweather_md",
      key: "MERRIWEATHER",
      name: "Merriweather Lakehouse, Autograph Collection",
      label: "Goaliesmith trip",
      checkIn:  "2026-07-13T16:00",
      checkOut: "2026-07-15T11:00",
      nights: 2,
      address: "10209 Wincopin Circle, Columbia, MD 21044",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=10209+Wincopin+Cir+Columbia+MD+21044",
      hotelPhone: "+1 410-730-3900",
      conf: "77643881",
      managePage: "https://www.marriott.com/loyalty/findReservationList.mi",
      notes: "For Rachel solo Goaliesmith @ Coppermine, Baltimore, Tue 7/14 + Wed 7/15 (2-day event).",
    },
    {
      id: "vrbo_wayne_pa",
      key: "WAYNE_PA",
      name: "Historic Farmhouse in Wayne",
      label: "July Base",
      checkIn:  "2026-07-15T15:00",
      checkOut: "2026-07-22T11:00",
      nights: 7,
      address: "605 Knox Rd, Wayne, PA 19087",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=605+Knox+Rd+Wayne+PA+19087",
      hostPhone: "+1 484-432-8118",
      conf: "VRBO HA-T0YXQG",
      managePage: "https://www.vrbo.com/trips",
      notes: "6 adults. Covers HHH Maryland Cup 7/17 + Committed Games 7/19–20.",
    },
    {
      id: "springhill_frederica",
      key: "SPRINGHILL",
      name: "SpringHill Suites by Marriott Frederica",
      label: "AM Select trip",
      checkIn:  "2026-07-22T15:00",
      checkOut: "2026-07-24T12:00",
      nights: 2,
      address: "208 Dominus Drive, Frederica, DE 19946",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=208+Dominus+Dr+Frederica+DE+19946",
      hotelPhone: "+1 302-585-8586",
      conf: "70899185",
      managePage: "https://www.marriott.com/loyalty/findReservationList.mi",
      notes: "Same complex as DE Turf. For AM Select 7/23+.",
    },
  ],

  // Tournaments — chronological, one entry per day
  events: [
    { date: "2026-06-10", name: "Philly's Phinest Showcase – Day 1", venue: "William Penn Charter School", venueAddress: "3000 W School House Ln, Philadelphia PA 19144", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "35 min", isHHH: false },
    { date: "2026-06-11", name: "Philly's Phinest Showcase – Day 2", venue: "William Penn Charter School", venueAddress: "3000 W School House Ln, Philadelphia PA 19144", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "35 min", isHHH: false },
    { date: "2026-06-14", name: "HHH Away weekend", venue: "Afrim's Sports Park – Colonie", venueAddress: "969 Watervliet Shaker Rd, Colonie NY 12205", girls: "Both", lodgingKey: "STAYBRIDGE", driveFromLodging: "2 min", isHHH: true },
    { date: "2026-06-17", name: "BIC – Wilmington (Day 1)", venue: "Chase Fieldhouse", venueAddress: "401 Garasches Lane, Wilmington DE 19801", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "29 min", isHHH: false },
    { date: "2026-06-18", name: "BIC – Wilmington (Day 2)", venue: "Chase Fieldhouse", venueAddress: "401 Garasches Lane, Wilmington DE 19801", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "29 min", isHHH: false },
    { date: "2026-06-21", name: "HHH Philly Classic", venue: "Centre Square Park (Yost Rd fields)", venueAddress: "1527 & 1528 Yost Rd, Blue Bell PA 19422 (verify)", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "30 min", isHHH: true },
    { date: "2026-06-23", name: "Jr. Open – Iron Peak (Day 1)", venue: "Iron Peak Sports & Events", venueAddress: "137 Mountain View Rd, Hillsborough NJ 08844", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "1h 13m", isHHH: false, note: "Day trip from VRBO (Princeton hotel canceled)" },
    { date: "2026-06-24", name: "Jr. Open – Iron Peak (Day 2)", venue: "Iron Peak Sports & Events", venueAddress: "137 Mountain View Rd, Hillsborough NJ 08844", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "1h 13m", isHHH: false, note: "Day trip from VRBO" },
    { date: "2026-06-26", name: "HHH – Lax for the Cure (Day 1)", venue: "New Egypt High School", venueAddress: "117 Evergreen Rd, New Egypt NJ 08533", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "1h 09m", isHHH: true },
    { date: "2026-06-27", name: "HHH – Lax for the Cure (Day 2)", venue: "New Egypt High School", venueAddress: "117 Evergreen Rd, New Egypt NJ 08533", girls: "Both", lodgingKey: "WEST_CHESTER", driveFromLodging: "1h 09m", isHHH: true, note: "VRBO check-out 11 AM same day → after game, fly to Kiawah" },
    { date: "2026-07-07", name: "Nilly – Downingtown (Day 1)", venue: "United Sports Training Center", venueAddress: "1426 Marshallton Thorndale Rd, Downingtown PA 19335", girls: "Both", lodgingKey: "INDIGO", driveFromLodging: "16 min", isHHH: false },
    { date: "2026-07-08", name: "Nilly – Downingtown (Day 2)", venue: "United Sports Training Center", venueAddress: "1426 Marshallton Thorndale Rd, Downingtown PA 19335", girls: "Both", lodgingKey: "INDIGO", driveFromLodging: "16 min", isHHH: false, note: "After game, drive to Spring Lake" },
    { date: "2026-07-09", name: "HHH G8 Tournament (Day 1)", venue: "Capelli Sport Complex", venueAddress: "1659 Wayside Rd, Tinton Falls NJ 07724", girls: "Both", lodgingKey: "CHATEAU", driveFromLodging: "20 min", isHHH: true },
    { date: "2026-07-10", name: "HHH G8 Tournament (Day 2)", venue: "Capelli Sport Complex", venueAddress: "1659 Wayside Rd, Tinton Falls NJ 07724", girls: "Both", lodgingKey: "CHATEAU", driveFromLodging: "20 min", isHHH: true },
    { date: "2026-07-14", name: "Rachel – Goaliesmith HS Recruiting (Day 1)", venue: "Coppermine Sports Center", venueAddress: "5731 Cottonworth Ave, Baltimore MD 21209", girls: "Rachel", lodgingKey: "MERRIWEATHER", driveFromLodging: "24 min", isHHH: false },
    { date: "2026-07-15", name: "Rachel – Goaliesmith HS Recruiting (Day 2)", venue: "Coppermine Sports Center", venueAddress: "5731 Cottonworth Ave, Baltimore MD 21209", girls: "Rachel", lodgingKey: "MERRIWEATHER", driveFromLodging: "24 min", isHHH: false, note: "After game, ~4h drive to Wayne PA" },
    { date: "2026-07-17", name: "HHH – Maryland Cup", venue: "Calvert Regional Park", venueAddress: "304 Brick Meetinghouse Rd, North East MD 21901", girls: "Both", lodgingKey: "WAYNE_PA", driveFromLodging: "1h 03m", isHHH: true },
    { date: "2026-07-19", name: "Committed Games – Day 1", venue: "The Proving Grounds", venueAddress: "725 Conshohocken Rd, Conshohocken PA 19428", girls: "Both", lodgingKey: "WAYNE_PA", driveFromLodging: "12 min", isHHH: false },
    { date: "2026-07-20", name: "Committed Games – Day 2", venue: "The Proving Grounds", venueAddress: "725 Conshohocken Rd, Conshohocken PA 19428", girls: "Both", lodgingKey: "WAYNE_PA", driveFromLodging: "12 min", isHHH: false },
    { date: "2026-07-23", name: "AM Select – Delaware (Day 1)", venue: "DE Turf Sports Complex", venueAddress: "4000 Bay Rd, Frederica DE 19946", girls: "Both", lodgingKey: "SPRINGHILL", driveFromLodging: "<5 min (same complex)", isHHH: false },
    { date: "2026-07-24", name: "AM Select – Delaware (Day 2)", venue: "DE Turf Sports Complex", venueAddress: "4000 Bay Rd, Frederica DE 19946", girls: "Both", lodgingKey: "SPRINGHILL", driveFromLodging: "<5 min (same complex)", isHHH: false },
    { date: "2026-07-25", name: "AM Select – Delaware (Day 3)", venue: "DE Turf Sports Complex", venueAddress: "4000 Bay Rd, Frederica DE 19946", girls: "Both", lodgingKey: "SPRINGHILL", driveFromLodging: "<5 min (same complex)", isHHH: false, note: "Verify event runs 7/25 (hotel ends 7/24)" },
  ],

  // HHH practices
  practices: [
    "2026-06-02","2026-06-04","2026-06-09","2026-06-11","2026-06-16","2026-06-18",
    "2026-06-23","2026-06-25","2026-06-30","2026-07-02","2026-07-07","2026-07-09",
    "2026-07-14","2026-07-16",
  ],
  practicesSkipped: ["2026-06-30","2026-07-02"], // Kiawah window

  // Map of date (YYYY-MM-DD) to lodging key for the calendar background
  lodgingByDate: (() => {
    const map = {};
    function fill(start, end, key) {
      const s = new Date(start), e = new Date(end);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        map[d.toISOString().slice(0,10)] = key;
      }
    }
    fill("2026-06-08","2026-06-26","WEST_CHESTER");
    map["2026-06-13"] = "STAYBRIDGE";   // overrides
    fill("2026-06-27","2026-07-04","KIAWAH");
    fill("2026-07-06","2026-07-07","INDIGO");
    fill("2026-07-08","2026-07-12","CHATEAU");
    fill("2026-07-13","2026-07-14","MERRIWEATHER");
    fill("2026-07-15","2026-07-21","WAYNE_PA");
    fill("2026-07-22","2026-07-23","SPRINGHILL");
    return map;
  })(),

  // Document attachments — drop files into /docs and add entries here
  documents: [],
};
