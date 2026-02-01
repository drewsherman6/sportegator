// High School Sports
const HIGH_SCHOOL_SPORTS = [
  'American Football',
  'Baseball',
  'Basketball',
  'Cross Country',
  'Field Hockey',
  'Golf',
  'Ice Hockey',
  'Lacrosse',
  'Soccer',
  'Softball',
  'Swimming & Diving',
  'Tennis',
  'Track & Field',
  'Volleyball',
  'Water Polo',
  'Wrestling',
  'Cheerleading',
  'Gymnastics',
  'Skiing',
  'Snowboarding',
]

// College Sports
const COLLEGE_SPORTS = [
  'American Football',
  'Baseball',
  'Basketball',
  'Bowling',
  'Cross Country',
  'Field Hockey',
  'Golf',
  'Gymnastics',
  'Ice Hockey',
  'Lacrosse',
  'Rowing',
  'Rugby',
  'Soccer',
  'Softball',
  'Swimming & Diving',
  'Tennis',
  'Track & Field',
  'Volleyball',
  'Water Polo',
  'Wrestling',
  'Equestrian',
  'Skiing',
  'Snowboarding',
  'Beach Volleyball',
  'Badminton',
  'Squash',
  'Handball',
]

// All unique sports
export const ALL_SPORTS = Array.from(new Set([...HIGH_SCHOOL_SPORTS, ...COLLEGE_SPORTS])).sort()

export const SPORTS_BY_LEVEL = {
  high_school: HIGH_SCHOOL_SPORTS.sort(),
  college: COLLEGE_SPORTS.sort(),
  academy: COLLEGE_SPORTS.sort(), // Similar to college
  semi_pro: ALL_SPORTS,
}

export const LEVELS = [
  { value: 'high_school', label: 'High School' },
  { value: 'college', label: 'College/University' },
  { value: 'academy', label: 'Academy' },
  { value: 'semi_pro', label: 'Semi-Pro' },
]

export const POSITIONS = {
  american_football: [
    'Quarterback',
    'Running Back',
    'Wide Receiver',
    'Tight End',
    'Offensive Lineman',
    'Defensive Lineman',
    'Linebacker',
    'Defensive Back',
    'Punter',
    'Kicker',
  ],
  baseball: [
    'Pitcher',
    'Catcher',
    'Infielder',
    'Outfielder',
    'Designated Hitter',
  ],
  basketball: [
    'Point Guard',
    'Shooting Guard',
    'Small Forward',
    'Power Forward',
    'Center',
  ],
  soccer: [
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Forward',
  ],
  volleyball: [
    'Outside Hitter',
    'Opposite',
    'Middle Blocker',
    'Setter',
    'Libero',
  ],
  lacrosse: [
    'Goalie',
    'Attack',
    'Midfield',
    'Defense',
    'Long Stick Midfielder',
  ],
  hockey: [
    'Goaltender',
    'Defenseman',
    'Forward',
  ],
  wrestling: ['Heavyweight', 'Light Heavyweight', 'Middleweight', 'Lightweight', 'Flyweight'],
}

export const DEFAULT_POSITION = 'Other'
