// ============================================================
//  THE FIVE BOROUGHS — Mafia Management Game
//  Milestone 3: AI Rivals, Win/Loss & Polish
// ============================================================

// ── CONSTANTS ─────────────────────────────────────────────

const FIRST_NAMES = [
  'Antonio','Carmine','Salvatore','Giuseppe','Vito','Angelo',
  'Francesco','Leonardo','Marco','Nicola','Giovanni','Rocco',
  'Bruno','Carlo','Luigi','Enzo','Mario','Dante','Luca','Paolo',
  'Stefano','Vincenzo','Giacomo','Benedetto','Emilio','Cosimo',
  'Domenico','Filippo','Ignazio','Matteo','Sebastiano','Armando',
  'Ottavio','Vittorio','Alfredo','Renato','Sergio','Aurelio'
];

const LAST_NAMES = [
  'Maranzano','Luciano','Genovese','Gambino','Bonanno','Colombo',
  'Profaci','Mangano','Anastasia','Costello','Torrio','Masseria',
  'Gagliano','Reina','Morello','Terranova','Esposito','Ferrigno',
  'Valachi','Santino','Rizzi','Clemenza','Tessio','Falcone',
  'Romano','Rinaldi','Fontana','DeVito','Marchetti','Ferraro',
  'Conti','Vitale','Greco','Paterno','Scalise','Aiello','Badalamenti'
];

const FAMILY_NAMES = ['Maranzano','Gambino','Lucchese','Bonanno'];
const BOROUGHS     = ['Manhattan','Brooklyn','The Bronx','Queens'];

const BUSINESS_NAMES = [
  'Brooklyn Distillery','Fulton St. Speakeasy','East Side Numbers Parlor',
  'Midtown Laundry Co.','Pier 12 Shipping Depot','Delancey Butcher Shop',
  'Hotel Excelsior','Longshoremen\'s Local 88','City Trucking Co.',
  'Ristorante Napoli','Second Ave. Loan Office','Bronx Betting Parlor',
  'Hester St. Bakery','Canal St. Import Co.','Flatbush Social Club',
  'West Side Garage','Red Hook Warehouse','Harlem Policy Wheel',
  'Five Points Saloon','East River Freight'
];

const SALARY_RANGES = {
  don:         { min: 3000, max: 5000 },
  consigliere: { min: 2000, max: 3500 },
  underboss:   { min: 2000, max: 3000 },
  capo:        { min: 1000, max: 1800 },
  soldier:     { min: 200,  max: 500  }
};

const AGE_RANGES = {
  don:         { min: 40, max: 65 },
  consigliere: { min: 35, max: 60 },
  underboss:   { min: 35, max: 55 },
  capo:        { min: 28, max: 50 },
  soldier:     { min: 19, max: 40 }
};

const LOYALTY_RANGES = {
  don:         { min: 85, max: 100 },
  consigliere: { min: 75, max: 95  },
  underboss:   { min: 70, max: 90  },
  capo:        { min: 60, max: 80  },
  soldier:     { min: 40, max: 70  }
};

const ROLE_LABEL = {
  don: 'Don', consigliere: 'Consigliere', underboss: 'Underboss',
  capo: 'Capo', soldier: 'Soldier'
};

const FAMILY_COLORS = ['#c8952a', '#8b3a3a', '#3a5a8b', '#3a6a4a'];

const MAX_CAPOS             = 5;
const MAX_SOLDIERS_PER_CAPO = 5;

// ── EVENT TEMPLATES ───────────────────────────────────────

const FINANCE_TEMPLATES = [
  { name:'Bootleg Whiskey Run',
    desc:'A Canadian contact offers a share of a premium whiskey shipment. Half arrives, or it gets intercepted.',
    minCost:3000, maxCost:8000, minOdds:0.60, maxOdds:0.70, mult:2.2 },
  { name:'Numbers Racket Expansion',
    desc:'Bankroll a new numbers operation on the East Side. The cut is good if the neighborhood cooperates.',
    minCost:5000, maxCost:12000, minOdds:0.55, maxOdds:0.65, mult:2.5 },
  { name:'Dockworkers Shakedown',
    desc:'Pressure Pier 8 foremen for a cut of unloading fees. Quick money, but they might talk.',
    minCost:1000, maxCost:4000, minOdds:0.50, maxOdds:0.65, mult:3.0 },
  { name:'Precinct Captain Arrangement',
    desc:'A local captain will look the other way on your operations — if the price is right.',
    minCost:2000, maxCost:6000, minOdds:0.70, maxOdds:0.82, mult:1.8 },
  { name:'Counterfeit Bond Scheme',
    desc:'A forger has high-quality Treasury bonds. Very high upside. Very high chance of federal interest.',
    minCost:8000, maxCost:20000, minOdds:0.38, maxOdds:0.52, mult:3.8 },
  { name:'Shylock Portfolio Buyout',
    desc:'A retiring loan shark is selling his book of borrowers at a discount. Steady returns if collected.',
    minCost:4000, maxCost:10000, minOdds:0.65, maxOdds:0.75, mult:1.9 },
  { name:'Teamsters Dues Skim',
    desc:'Take a quiet cut from a local Teamsters chapter. The rank and file won\'t notice — unless someone talks.',
    minCost:2000, maxCost:7000, minOdds:0.55, maxOdds:0.68, mult:2.3 },
  { name:'Gambling Den Stake',
    desc:'Finance a backroom casino on 47th Street for a share of nightly action. Location is the risk.',
    minCost:6000, maxCost:15000, minOdds:0.58, maxOdds:0.72, mult:2.4 },
  { name:'Hijacked Silk Cargo',
    desc:'A truck carrying imported silk has been flagged. Fence it fast before the owner comes looking.',
    minCost:1500, maxCost:5000, minOdds:0.52, maxOdds:0.64, mult:2.8 },
  { name:'Protection Racket — Theater District',
    desc:'Extend protection services to the 44th Street theater owners. Most will pay without a fuss.',
    minCost:2500, maxCost:6000, minOdds:0.62, maxOdds:0.72, mult:2.1 }
];

const POLITICIAN_NAMES = [
  'Alderman Thomas Walsh',    'Councilman Albert Russo',
  'Ward Boss Patrick Corcoran','Magistrate Henry Sinclair',
  'Borough Chief Frank DiNapoli','Deputy Commissioner Roy Hagen',
  'State Senator Cornelius Burke','Judge Walter Farrell',
  'Police Captain Vincent Mazur','Assemblyman John Callahan',
  'Tax Collector Morris Greenbaum','Inspector Samuel Fitch',
  'City Clerk Raymond Oakes','Harbormaster Otto Schiller',
  'Fire Marshal Leonard Quint'
];

const POLITICAL_DESCS = [
  (n,b) => `${n} controls the ${b} ward contracts. His cooperation means uninterrupted operations in the district.`,
  (n,b) => `${n} sits on the ${b} licensing board. A friendly vote can open new territory without conflict.`,
  (n,b) => `${n} has connections to the DA's office in ${b}. Useful insurance against future indictments.`,
  (n,b) => `${n} oversees building inspections across ${b}. Keeping him close means no surprise shutdowns.`,
  (n,b) => `${n} runs the ${b} precinct budget hearings. His goodwill buys patience from patrol officers.`,
];

const CONFLICT_DESCS = [
  r => `The ${r} have been pressing hard on your bootleg routes. A show of force could push them back.`,
  r => `Word is the ${r} are looking to expand into your territory this quarter.`,
  r => `One of your men was roughed up by a ${r} soldier last week. This requires a response.`,
  r => `The ${r} shorted a payment owed to your family. Let it slide, or make an example.`,
  r => `Tensions with the ${r} have been building. Every week you wait, they read it as weakness.`,
  r => `A former associate is now running with the ${r}. He knows things. Time to act.`,
];

// ── STORYLINE TEMPLATES ───────────────────────────────────
// Each template has a run(org) that applies effects and returns
// { title, text, positive } or null if no valid target exists.

const STORYLINES_POSITIVE = [
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      if (!c) return null;
      const gain = randInt(7, 14);
      c.toughness = Math.min(100, c.toughness + gain);
      return { title: 'Battle-Hardened', positive: true,
        text: `Word reached the compound late on a Tuesday — ${c.name} had been jumped outside a bar on the West Side by three men with pipes. He gave better than he got. By morning he'd walked himself to a safe house, patched his own ribs, and was asking about the men who sent them. The incident shook loose something in him. The men noticed it too. He carries himself differently now — quieter, more deliberate, with a stillness that makes people careful around him. +${gain} Toughness.` };
    }
  },
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      if (!c) return null;
      const gain = randInt(6, 12);
      c.cunning = Math.min(100, c.cunning + gain);
      return { title: 'Street Education', positive: true,
        text: `${c.name} spent the better part of three months running numbers out of a barbershop in Red Hook. It wasn't glamorous work, but it put him at the table for half a dozen deals that went sideways in instructive ways. He watched a man lose everything because he telegraphed too much. He watched another walk away rich because he knew when to say nothing. Those lessons don't come from books. He's sharper for it, and the instincts are starting to show in the field. +${gain} Cunning.` };
    }
  },
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'capo' || r.role === 'underboss' || r.role === 'consigliere'));
      if (!c) return null;
      const gain = randInt(8, 13);
      c.charisma = Math.min(100, c.charisma + gain);
      return { title: 'The Word Gets Around', positive: true,
        text: `A dispute between two Longshoremen's captains had been festering for weeks — each man convinced the other owed him money, each one ready to make it violent. ${c.name} sat with them both at separate tables in the same week, said almost nothing, and somehow left each man believing he'd won. The docks stayed quiet. More importantly, word spread through the borough that the family had a man who could handle things without making them worse. Doors that had been politely closed are now opening. +${gain} Charisma.` };
    }
  },
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      if (!c) return null;
      const gain = randInt(8, 14);
      const chaGain = randInt(4, 8);
      c.toughness = Math.min(100, c.toughness + gain);
      c.charisma  = Math.min(100, c.charisma  + chaGain);
      return { title: 'Full Recovery', positive: true,
        text: `${c.name} had been off his game for months — a shoulder that wouldn't heal right, a mind that kept circling the same bad nights. The Don arranged for him to spend a few weeks upstate at a cousin's place, away from the city and the noise. He came back last week looking like a different man. The shoulder is right. The eyes are clear. He's been the first one in and last one out every day since he returned, and the younger soldiers have taken notice. +${gain} Toughness, +${chaGain} Charisma.` };
    }
  },
  {
    run(org) {
      const capo   = randFrom(org.roster.filter(r => r.role === 'capo'));
      const mentor = org.roster.find(r => r.role === 'underboss' || r.role === 'consigliere');
      if (!capo || !mentor) return null;
      const stat = randFrom(['cunning', 'charisma']);
      const gain = randInt(5, 10);
      capo[stat] = Math.min(100, capo[stat] + gain);
      const statLabel = stat === 'cunning' ? 'how to read a room' : 'how to hold a room';
      return { title: 'Under the Wing', positive: true,
        text: `${mentor.name} has been making a point of including ${capo.name} in conversations he used to handle alone — sitting across from city men, union officials, judges who need reminding of certain arrangements. At first ${capo.name} mostly listened. Lately he's been the one speaking first. ${mentor.name} has noticed it and said nothing, which is the highest compliment in his vocabulary. The old man is teaching ${statLabel}, and the lessons are taking. +${gain} ${stat.charAt(0).toUpperCase() + stat.slice(1)}.` };
    }
  },
  {
    run(org) {
      const bonus = randInt(2000, 7500);
      org.cash += bonus;
      const c = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      const who = c ? c.name : 'one of your men';
      return { title: 'Lucky Score', positive: true,
        text: `Years ago, ${who} lent a significant sum to a man who was convinced he had a sure thing at the track. The man lost, disappeared for a while, and became one of those debts everyone quietly wrote off. He resurfaced this quarter — different city, same guilty face — and made full repayment with interest, apparently convinced his luck had finally turned and he was clearing the ledger. ${who} brought every dollar to the family without being asked. The cash isn't enormous, but the loyalty is noted. +${fmt$(bonus)}.` };
    }
  },
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      if (!c) return null;
      const g1 = randInt(4, 8), g2 = randInt(3, 6);
      c.toughness = Math.min(100, c.toughness + g1);
      c.cunning   = Math.min(100, c.cunning   + g2);
      return { title: 'Proving Ground', positive: true,
        text: `${c.name} took a job no one sanctioned — a private collection run for a fence in Flatbush who didn't want to go through official channels. It should have been simple. It wasn't. Two men at the door, a count that didn't add up, and a back exit that turned out to be a dead end. ${c.name} walked out anyway, money in hand, nobody permanently damaged. He didn't report it for three days, which was the wrong call — but when he did explain himself, the account was detailed enough that nobody argued. Harder and smarter for it. +${g1} Toughness, +${g2} Cunning.` };
    }
  }
];

const STORYLINES_NEGATIVE = [
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      if (!c) return null;
      const loss = randInt(8, 14);
      c.toughness = Math.max(1, c.toughness - loss);
      return { title: 'Rough Night', positive: false,
        text: `The details came secondhand — ${c.name} had been down near Pier 17 settling what should have been a routine disagreement when it went sideways. There were four of them. He says three, but the doctor who set the ribs said the bruising told a different story. He was back on his feet within the week, but something is off. The confidence that made him useful in the field is rattled, and men who've fought before know what that looks like. He'll need time. -${loss} Toughness.` };
    }
  },
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      if (!c) return null;
      const lC = randInt(6, 12), lCha = randInt(4, 8);
      c.cunning  = Math.max(1, c.cunning  - lC);
      c.charisma = Math.max(1, c.charisma - lCha);
      return { title: 'The Vice Tightens', positive: false,
        text: `It started as social drinking — everyone in this business keeps a bottle close — but ${c.name}'s relationship with the bottle has crossed a line that the men have been too polite to name until now. He missed a meeting last Tuesday. He showed up to another one still half-gone, said the wrong things to the wrong people, and had to be steered out before it became a problem that couldn't be talked down. His instincts are dulled. The sharp angles that made him effective have gone soft. People have noticed, and when people notice, they stop trusting. -${lC} Cunning, -${lCha} Charisma.` };
    }
  },
  {
    run(org) {
      const eligible = org.roster.filter(r => r.role === 'soldier' || r.role === 'capo');
      if (eligible.length < 2) return null;
      const [a, b] = shuffle([...eligible]);
      const l = randInt(5, 10);
      a.toughness = Math.max(1, a.toughness - l);
      b.toughness = Math.max(1, b.toughness - l);
      return { title: 'Bad Blood', positive: false,
        text: `Nobody is entirely clear how it started — a split that wasn't divided right, or a woman, or an old grievance that finally found an excuse. What's clear is that ${a.name} and ${b.name} went at each other behind the garage on Mulberry Street last Thursday, and neither man pulled a weapon, which is the one grace in it. Two of the younger soldiers had to separate them. Both men showed up the next day acting like nothing happened, which is its own problem — because something did happen, and everyone knows it, and the resentment is still there like a coal that hasn't gone out. -${l} Toughness each.` };
    }
  },
  {
    run(org) {
      const cost = randInt(1500, 4500);
      const c    = randFrom(org.roster.filter(r => r.role === 'soldier' || r.role === 'capo'));
      const who  = c ? c.name : 'one of your men';
      org.cash   = Math.max(-20000, org.cash - cost);
      const lC   = randInt(4, 9);
      if (c) c.cunning = Math.max(1, c.cunning - lC);
      return { title: 'Law Trouble', positive: false,
        text: `${who} made a stupid mistake — the kind that comes from moving too fast and trusting the wrong face. A small transaction, a man who turned out to be on the precinct's payroll, a conversation that was almost certainly recorded. The family's man at the DA's office made a few calls, a sergeant who owes us three favors was quietly consulted, and the thing was buried before it became anything official. But it cost real money to make that happen, and ${who} knows it. He's been walking on eggshells since, which makes him less useful, not more. -${fmt$(cost)}, -${lC} Cunning.` };
    }
  },
  {
    run(org) {
      const c = randFrom(org.roster.filter(r => r.role === 'capo' || r.role === 'underboss' || r.role === 'consigliere'));
      if (!c) return null;
      const loss = randInt(8, 14);
      c.cunning = Math.max(1, c.cunning - loss);
      return { title: 'Burned Contact', positive: false,
        text: `${c.name} had been cultivating a source inside the Garment District's customs office for the better part of a year — a mid-level clerk with expensive habits and a flexible conscience. It seemed solid. Then word came through that the clerk had been picked up on an unrelated matter and had started talking to reduce his sentence. He named ${c.name}'s name, and the network ${c.name} had built around that relationship went cold within forty-eight hours. Nobody will take meetings. Nobody is returning messages. It will take months to rebuild what was quietly assembled over a year. -${loss} Cunning.` };
    }
  }
];

const STORYLINES_DEATH = [
  // weight: found_in_river (×2), crossfire (×1), illness (×1), senior_death (×1)
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'soldier');
      if (!candidates.length) return null;
      const c = randFrom(candidates);
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      return { title: 'Death in the Ranks', positive: false,
        text: `A fisherman found ${c.name} in the East River early on a Wednesday morning. No marks that a coroner would put in a report, no witnesses who would admit to being present, and no explanation that satisfies anyone who knew him. The precinct is treating it as a drowning. The men know better, but nobody is saying anything out loud. His capo is taking it harder than he's letting on. The slot he held in the family is now empty, and the question of who sent the message — and whether an answer is warranted — sits unspoken at every table.` };
    }
  },
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'soldier');
      if (!candidates.length) return null;
      const c = randFrom(candidates);
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      return { title: 'Found on Dekalb Avenue', positive: false,
        text: `${c.name} was discovered in a side alley off DeKalb Avenue with two shots in the back and his pockets untouched — whoever did it wasn't interested in making it look like a robbery. He'd been running a collection route in that neighborhood for three months without incident. Something changed. The men are rattled, not because death is unfamiliar, but because nobody knows who made the call or why. That uncertainty is its own kind of damage to morale, and the Don will need to address it before it festers.` };
    }
  },
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'soldier' || r.role === 'capo');
      if (!candidates.length) return null;
      const sorted = [...candidates].sort((a, b) => b.age - a.age);
      const c = sorted[0];
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      return { title: 'A Sudden Illness', positive: false,
        text: `${c.name} had been complaining about his stomach for weeks — everyone assumed it was nothing, the kind of thing men his age attribute to bad food or bad sleep and walk off. Then it wasn't nothing. He was admitted on a Thursday and gone by Sunday, the doctors talking about something in his blood that had apparently been growing for a long time without announcing itself. He was ${c.age} years old. There was a quiet service attended by more people than expected, which says something. The family loses a ${ROLE_LABEL[c.role].toLowerCase()} who knew where the bodies were buried — in both senses of the phrase.` };
    }
  },
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'soldier' || r.role === 'capo');
      if (!candidates.length) return null;
      const c = randFrom(candidates);
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      return { title: 'Caught in the Cross-Fire', positive: false,
        text: `${c.name} wasn't supposed to be there. The meeting was between two other parties entirely, a dispute over dockside percentages that had nothing to do with our operations — but ${c.name} was running a favor for a friend and walked into the middle of it at exactly the wrong moment. When the shooting started, he had nowhere to go. He was dead before anyone understood what had happened. The tragedy isn't just the loss — it's the randomness of it, the sheer bad luck that ends a capable man. His family has been quietly provided for.` };
    }
  },
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'consigliere' || r.role === 'underboss');
      if (!candidates.length) return null;
      const c = randFrom(candidates);
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      return { title: 'A Great Loss', positive: false,
        text: `${c.name} — your ${ROLE_LABEL[c.role].toLowerCase()}, a man who had been at the center of this family's operations for years — died this week under circumstances the family is keeping private out of respect. What can be said is this: he knew things about this city that no one else knows, had relationships that took a decade to cultivate, and carried the trust of men who don't give it easily. Replacing what he brought to the table is not a matter of filling a title. The organization will feel this absence in ways that won't be fully visible until something goes wrong and he isn't there to prevent it.` };
    }
  }
];

const STORYLINES_DEFECT = [
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'soldier');
      if (!candidates.length) return null;
      const c     = randFrom(candidates);
      const rival = randFrom(gs.rivals);
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      rival.roster.push({ id: uid(), name: c.name, age: c.age,
        charisma: c.charisma, toughness: c.toughness, cunning: c.cunning,
        loyalty: randInt(LOYALTY_RANGES.soldier.min, LOYALTY_RANGES.soldier.max),
        role: 'soldier', salary: c.salary, capoId: null, busyUntilTurn: null, prisonUntilTurn: null });
      modifyRelationship(org.id, rival.id, -randInt(10, 18), `${c.name} defected to the ${rival.familyName}`);
      return { title: 'A Man Lost', positive: false,
        text: `The ${rival.familyName} made ${c.name} an offer — better money, a cleaner arrangement, or perhaps simply the appeal of a fresh start somewhere he isn't owed anything. Whatever the reason, he accepted it. He cleared his belongings from the room on Hester Street on a Sunday while his capo was at mass, left no note, and was seen three days later working a corner that belongs to the ${rival.familyName}. There's a protocol for this kind of thing. The question is whether he knows enough to make the conversation that follows necessary, or whether the family swallows the insult and moves on.` };
    }
  },
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'soldier');
      if (!candidates.length) return null;
      const c     = randFrom(candidates);
      const rival = randFrom(gs.rivals);
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      rival.roster.push({ id: uid(), name: c.name, age: c.age,
        charisma: c.charisma, toughness: c.toughness, cunning: c.cunning,
        loyalty: randInt(LOYALTY_RANGES.soldier.min, LOYALTY_RANGES.soldier.max),
        role: 'soldier', salary: c.salary, capoId: null, busyUntilTurn: null, prisonUntilTurn: null });
      modifyRelationship(org.id, rival.id, -randInt(10, 18), `${c.name} defected to the ${rival.familyName}`);
      return { title: 'Turned Coat', positive: false,
        text: `${c.name} had been unhappy for some time — anyone paying attention would have seen it. The complaints about his cut, the way he stopped showing up early, the questions he asked that didn't quite make sense unless he was building a picture for someone else. When he finally made the move to the ${rival.familyName}, it was almost a relief for everyone except the men who'd vouched for him. Those men are now having uncomfortable conversations about their own judgment. The slot can be filled. The trust that went with him is harder to replace.` };
    }
  },
  {
    run(org) {
      const candidates = org.roster.filter(r => r.role === 'capo');
      if (!candidates.length) return null;
      const c     = randFrom(candidates);
      const rival = randFrom(gs.rivals);
      removeFromOrg(org, c.id);
      uiState.expanded.delete(c.id);
      rival.roster.push({ id: uid(), name: c.name, age: c.age,
        charisma: c.charisma, toughness: c.toughness, cunning: c.cunning,
        loyalty: randInt(LOYALTY_RANGES.capo.min, LOYALTY_RANGES.capo.max),
        role: 'capo', salary: c.salary, capoId: null, busyUntilTurn: null, prisonUntilTurn: null });
      modifyRelationship(org.id, rival.id, -randInt(18, 30), `${c.name} (Capo) defected to the ${rival.familyName}`);
      return { title: 'Betrayal', positive: false,
        text: `${c.name} didn't just walk — he walked to the ${rival.familyName} and took his network with him. His soldiers arrived at their usual corners to find new arrangements already in place, which means the move had been planned for weeks, possibly longer. He knows the routes, the contacts, the names of the men we use for sensitive work. The ${rival.familyName} didn't pay for a soldier. They paid for intelligence, and they got it. His soldiers are now unassigned and will need to be reabsorbed or replaced. The Don will need to assess how much damage has actually been done before deciding how to respond.` };
    }
  }
];

// ── NARRATIVE ARC TEMPLATES ───────────────────────────────

const ARC_TEMPLATES = [
  {
    id: 'double_game',
    title: 'The Double Game',
    setup(org) {
      const pool = org.roster.filter(c => c.role === 'capo' && !isCharUnavailable(c));
      if (!pool.length) return null;
      const char = randFrom(pool);
      const rival = randFrom(gs.rivals);
      return { charId: char.id, charName: char.name, charRole: char.role,
               rivalId: rival.id, rivalFamilyName: rival.familyName };
    },
    phase0(ctx) {
      return `${ctx.charName} came to you privately last week with news: a man from the ${ctx.rivalFamilyName} family approached him at a card game and made overtures about payment for "general information." He turned nothing over and brought it directly to you. The loyalty he has shown is noteworthy — but it is also an opportunity. Now you must decide how to respond.`;
    },
    choices: [
      { label: 'Run a Double Game', desc: 'Authorize him to play along and feed false intelligence, keeping the rival off-balance.' },
      { label: 'Shut It Down', desc: 'Have him refuse the contact cleanly. Safe, but a missed opportunity.' },
      { label: 'Send a Warning', desc: 'Use the contact to deliver a direct message to the rival — approach our men again at your peril.' }
    ],
    phase1: [
      {
        positive: true,
        narrative: (ctx) => `The double game paid off. ${ctx.charName} fed the ${ctx.rivalFamilyName} carefully curated misinformation for three weeks before their contact went silent — they either burned him or stopped believing him. Your plans remained intact while theirs ran into walls of their own making. ${ctx.charName}'s loyalty is beyond question now, and he earned a measure of standing in the organization for handling it without a single mistake.`,
        apply(ctx, org) { boostLoyaltyById(ctx.charId, org, 8); modifyRelationship(org.id, ctx.rivalId, 3, `Double game run against ${ctx.rivalFamilyName}`); }
      },
      {
        positive: null,
        narrative: (ctx) => `${ctx.charName} refused the contact cleanly and had no further communication with the ${ctx.rivalFamilyName}. The cautious play — nothing was gained, but nothing was lost. The family's trust in him is intact, and if the rival was fishing, they got nothing worth keeping. The matter is closed.`,
        apply(ctx, org) { boostLoyaltyById(ctx.charId, org, 4); }
      },
      {
        positive: null,
        narrative: (ctx) => `The warning reached the right ears in the ${ctx.rivalFamilyName} family. There has been no further contact since. Whether they received it as respect or a provocation remains unclear, but they have not pressed the matter. ${ctx.charName} delivered the message without incident. Relations with the ${ctx.rivalFamilyName} have cooled, but the boundary has been clearly drawn.`,
        apply(ctx, org) { boostLoyaltyById(ctx.charId, org, 5); modifyRelationship(org.id, ctx.rivalId, -10, `Warning delivered via attempted double-game contact`); }
      }
    ]
  },
  {
    id: 'the_ambitious_one',
    title: 'The Ambitious One',
    setup(org) {
      const pool = org.roster.filter(c =>
        (c.role === 'underboss' || c.role === 'capo') && !isCharUnavailable(c));
      if (!pool.length) return null;
      const char = randFrom(pool);
      return { charId: char.id, charName: char.name, charRole: char.role };
    },
    phase0(ctx) {
      return `Three of your captains have separately mentioned that ${ctx.charName} has been holding informal gatherings — late-night meetings at a social club on Mulberry Street, dinners where certain men are invited and others are not. None of it is openly disloyal. But he has not mentioned any of it to you. Either he is building something, or he is simply careless. Either reading demands a response.`;
    },
    choices: [
      { label: 'Promote and Bind', desc: 'A promotion and salary increase signals trust and locks his ambition to yours.' },
      { label: 'Direct Conversation', desc: 'Meet with him privately, acknowledge what you\'ve heard, and let him explain himself.' },
      { label: 'Watch and Wait', desc: 'Say nothing. Have someone track his movements and report back next quarter.' }
    ],
    phase1: [
      {
        positive: true,
        narrative: (ctx) => `The promotion landed well. ${ctx.charName} accepted it with visible gratitude and has not held another unsanctioned meeting since. Whether the ambition is truly satisfied or merely redirected is a question for a later season — but right now he is working hard, his men respect the new title, and the organization is more stable for the decision. It cost something in salary but purchased something worth more in loyalty.`,
        apply(ctx, org) {
          boostLoyaltyById(ctx.charId, org, 12);
          org.cash = Math.max(0, org.cash - 1500);
          const c = org.roster.find(r => r.id === ctx.charId);
          if (c) c.salary = Math.round(c.salary * 1.2);
        }
      },
      {
        positive: null,
        narrative: (ctx) => `The meeting was frank. ${ctx.charName} acknowledged the gatherings without apology — he said he was building relationships within the family, not around you. You read him for twenty minutes and concluded he was telling the truth, or a convincing version of it. You left him with a single clear instruction: anything involving this family comes through you first. He agreed. The question of his loyalty remains open, but it is managed.`,
        apply(ctx, org) { boostLoyaltyById(ctx.charId, org, 5); }
      },
      {
        positive: null,
        narrative: (ctx) => `The surveillance confirmed what you suspected — ambitious positioning, not treason. ${ctx.charName} has been testing loyalties, seeing who would follow him if asked. He does not know you know. You hold an advantage now. His standing within the organization is intact, but his loyalty has quietly eroded while you watched and said nothing.`,
        apply(ctx, org) { boostLoyaltyById(ctx.charId, org, -8); }
      }
    ]
  },
  {
    id: 'outside_pressure',
    title: 'The Outside Pressure',
    setup(org) {
      if (!org.businesses.length) return null;
      const biz = randFrom(org.businesses);
      return { bizId: biz.id, bizName: biz.name, bizIncomeSnapshot: biz.income };
    },
    phase0(ctx) {
      return `Federal agents have been seen asking questions around ${ctx.bizName} — talking to delivery boys, watching from a parked car across the street, sitting in the diner opposite and not drinking their coffee. Nothing has been seized or served yet, but the attention is real and growing. They are either building a case or fishing. You have a quarter to respond before this becomes something you cannot manage quietly.`;
    },
    choices: [
      { label: 'Go Dark', desc: 'Shut down operations temporarily and move the books. Lose income, but give them nothing to find.' },
      { label: 'Pay for Silence', desc: 'Get a message to the field agent running the surveillance. Expensive, but it has worked before.' },
      { label: 'Retain Counsel', desc: 'Put a legitimate attorney on retainer. Slower and cleaner — no criminal exposure.' }
    ],
    phase1: [
      {
        positive: null,
        narrative: (ctx) => `${ctx.bizName} went quiet for most of the quarter. The agents had nothing to observe and redirected their attention elsewhere by the second month. The lost income was real, but the organization took no legal damage and the books are clean. When operations resumed, the neighborhood had barely noticed the pause. Sometimes the safest move is to simply not be there when someone is looking.`,
        apply(ctx, org) { org.cash -= Math.round(ctx.bizIncomeSnapshot * 0.7); }
      },
      {
        positive: true,
        narrative: (ctx) => `The message reached the right desk. Surveillance on ${ctx.bizName} tapered off within two weeks and the federal file was quietly deprioritized. It cost significantly, but there were no arrests, no subpoenas, no testimony. The agent will need to be maintained going forward, but for now the heat is entirely off and business continues as normal.`,
        apply(_ctx, org) { org.cash -= 4000; }
      },
      {
        positive: null,
        narrative: (ctx) => `The attorney filed the appropriate paperwork and made the appropriate calls. The federal inquiry into ${ctx.bizName} ran into a wall of legitimate documentation and moved on to easier targets. Legal fees were substantial, but no one went to prison and the business continues to operate openly. It was the clean play — slower and more expensive, but it left no exposure.`,
        apply(_ctx, org) { org.cash -= 2500; }
      }
    ]
  },
  {
    id: 'the_rumor',
    title: 'The Rumor',
    setup(org) {
      const pool = org.roster.filter(c => c.role === 'soldier' && !isCharUnavailable(c));
      if (!pool.length) return null;
      const char = randFrom(pool);
      return { charId: char.id, charName: char.name, charRole: char.role };
    },
    phase0(ctx) {
      return `Word has reached you through two separate sources that ${ctx.charName} has been skimming — taking a cut off the top before reporting his collections. The amounts are individually small, but the pattern is clear to anyone looking at the books carefully. Either he believes you are not watching, or he has grown brazen enough not to care. This cannot be left unaddressed without sending the wrong message to everyone else in the organization.`;
    },
    choices: [
      { label: 'Confront Directly', desc: 'Sit him down and put the evidence in front of him. What happens next depends on how he answers.' },
      { label: 'Set a Trap', desc: 'Mark the money and let him steal again. Catch him with undeniable proof before you move.' },
      { label: 'Dismiss Quietly', desc: 'No confrontation. He is cut loose with a warning that word will travel if he causes problems.' }
    ],
    phase1: [
      {
        positive: null,
        narrative: (ctx) => `${ctx.charName} denied it for three minutes, then stopped. He made the argument that he had been underpaid for the work he did and that the skimming was his own private accounting correction. You told him what a correction from this family actually looks like. He returned what he took, plus a penalty, and was reassigned to work with less access and more supervision. He stays because leaving is more dangerous than staying — not because he has any loyalty left.`,
        apply(ctx, org) { org.cash += 500; boostLoyaltyById(ctx.charId, org, -15); }
      },
      {
        positive: true,
        narrative: (ctx) => `The marked bills worked exactly as intended. ${ctx.charName} was caught without any room for argument — no alternative explanation, no ambiguity. He understood immediately what that meant. The conversation was short. He was stripped of his responsibilities and placed under a capo who does not trust him. The money was recovered. The message to the rest of the organization was sent without a single word being spoken in public.`,
        apply(ctx, org) { org.cash += 300; boostLoyaltyById(ctx.charId, org, -6); }
      },
      {
        positive: null,
        narrative: (ctx) => `${ctx.charName} was let go without ceremony. The explanation given to his former colleagues was deliberately vague — reassignment, a change in plans, nothing that invites questions. He left without incident. Whether he stays quiet is a calculation he is now making on his own time. The family absorbed the loss of a soldier and moved on. It was the path of least friction, if not the most satisfying resolution.`,
        apply(ctx, org) { removeFromOrg(org, ctx.charId); uiState.expanded.delete(ctx.charId); }
      }
    ]
  }
];

// ── UTILITIES ─────────────────────────────────────────────

let _uid = 0;
function uid() { return ++_uid; }

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function fmt$(n) {
  const abs = Math.abs(Math.round(n));
  return `${n < 0 ? '-' : ''}$${abs.toLocaleString()}`;
}
function pct(odds) { return Math.round(odds * 100); }
function quarterLabel(q, y) { return `Q${q} ${y}`; }

// ── NAME GENERATION ───────────────────────────────────────

const _usedNames = new Set();
function genName() {
  let name, tries = 0;
  do {
    name = `${randFrom(FIRST_NAMES)} ${randFrom(LAST_NAMES)}`;
    tries++;
  } while (_usedNames.has(name) && tries < 300);
  _usedNames.add(name);
  return name;
}

// ── CHARACTER GENERATION ──────────────────────────────────

function genChar(role, capoId = null, customName = null) {
  const ar = AGE_RANGES[role], sr = SALARY_RANGES[role], lr = LOYALTY_RANGES[role];
  const name = customName ? (customName.trim() || genName()) : genName();
  if (customName) _usedNames.add(name);
  return {
    id: uid(), name, age: randInt(ar.min, ar.max),
    charisma: randInt(25, 90), toughness: randInt(25, 90),
    cunning: randInt(25, 90), loyalty: randInt(lr.min, lr.max),
    role, salary: randInt(sr.min, sr.max), capoId,
    busyUntilTurn: null, prisonUntilTurn: null
  };
}

// ── ORG GENERATION ────────────────────────────────────────

function genOrg(familyName, borough, isPlayer, colorIndex, donName = null) {
  const don = genChar('don', null, donName), con = genChar('consigliere'), ub = genChar('underboss');
  const capos    = [genChar('capo'), genChar('capo'), genChar('capo')];
  const soldiers = capos.flatMap(c => Array.from({ length: 5 }, () => genChar('soldier', c.id)));
  const roster   = [don, con, ub, ...capos, ...soldiers];
  const payroll  = roster.reduce((s, c) => s + c.salary, 0);
  const ti = Math.round(payroll * 1.2);
  const b1 = Math.round(ti * 0.55), b2 = ti - b1;
  const biz = shuffle(BUSINESS_NAMES);
  return {
    id: uid(), familyName, name: `${familyName} Family`,
    borough, isPlayer, colorIndex, cash: 100000,
    businesses: [
      { id: uid(), name: biz[0], income: b1, assetValue: b1 * 8, managerId: null },
      { id: uid(), name: biz[1], income: b2, assetValue: b2 * 8, managerId: null }
    ],
    properties: { warehouse: 0, safehouse: 0, compound: 0 },
    roster, influence: 0.25
  };
}

// ── GAME STATE ────────────────────────────────────────────

let gs = null;
const uiState = {
  expanded: new Set(), editingSalary: null,
  expandedBiz: new Set(), expandedPol: new Set(),
  viewingRival:   null,   // rivalId for dashboard modal
  viewingFamily:  null,   // orgId for family profile modal
  intelAgents:    {},     // bizId -> charId
  raidMode:       {},     // bizId -> 'sabotage'|'takeover'
  raidFighters:   {},     // bizId -> Set<charId>
  lastRaidResult: null    // { success, mode, bizName, notes[] }
};

// ── RELATIONSHIP SYSTEM ────────────────────────────────────
function relKey(id1, id2) {
  return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
}
function getRelationship(id1, id2) {
  if (id1 === id2) return 0;
  return (gs?.relationships?.[relKey(id1, id2)]?.score) ?? 0;
}
function modifyRelationship(id1, id2, delta, reason) {
  if (!gs || id1 === id2) return;
  const k   = relKey(id1, id2);
  if (!gs.relationships[k]) gs.relationships[k] = { score: 0, history: [] };
  const rel = gs.relationships[k];
  rel.score = Math.max(-100, Math.min(100, rel.score + delta));
  if (reason) {
    rel.history.unshift({ turn: gs.turnCount, delta, reason });
    if (rel.history.length > 6) rel.history.length = 6;
  }
}
function relLabel(score) {
  if (score >=  80) return { text: 'Allied',  color: '#f0c040' };
  if (score >=  40) return { text: 'Friendly', color: '#44cc88' };
  if (score >=  10) return { text: 'Cordial',  color: '#88aa88' };
  if (score >=  -9) return { text: 'Neutral',  color: '#888888' };
  if (score >= -40) return { text: 'Tense',    color: '#cc8844' };
  if (score >= -70) return { text: 'Hostile',  color: '#cc4444' };
  return               { text: 'At War',   color: '#aa1111' };
}
function initRelationships(orgs) {
  const rels = {};
  for (let i = 0; i < orgs.length; i++) {
    for (let j = i + 1; j < orgs.length; j++) {
      const k = relKey(orgs[i].id, orgs[j].id);
      rels[k] = { score: randInt(-15, 20), history: [] };
    }
  }
  return rels;
}

function genPoliticians(orgs) {
  // 12 shared city figures; each has a control map summing to 100 across all orgs
  const names = shuffle([...POLITICIAN_NAMES]).slice(0, 12);
  return names.map((name, i) => {
    const borough = BOROUGHS[i % BOROUGHS.length];
    // Random 20–30 raw points per org, then normalize to exactly 100
    const raw   = orgs.map(() => randInt(15, 40));
    const total = raw.reduce((s, v) => s + v, 0);
    const control = {};
    orgs.forEach((o, idx) => {
      control[String(o.id)] = Math.round(raw[idx] / total * 100);
    });
    // Fix rounding so values always sum to exactly 100
    const sum = Object.values(control).reduce((s, v) => s + v, 0);
    control[String(orgs[0].id)] += 100 - sum;
    return { id: uid(), name, borough, control };
  });
}

function applyPoliticalControl(orgId, polId, gain) {
  const pol = gs.politicians.find(p => p.id === polId);
  if (!pol) return;
  const key = String(orgId);
  pol.control[key] = (pol.control[key] ?? 0) + gain;
  // Re-normalize all values to sum to 100
  const total = Object.values(pol.control).reduce((s, v) => s + v, 0);
  const keys  = Object.keys(pol.control);
  keys.forEach(k => { pol.control[k] = Math.round(pol.control[k] / total * 100); });
  // Fix any rounding drift
  const sum = Object.values(pol.control).reduce((s, v) => s + v, 0);
  pol.control[keys[0]] += 100 - sum;
}

function initGame(playerFamilyName = null, playerDonName = null) {
  _uid = 0; _usedNames.clear();
  uiState.expanded.clear(); uiState.editingSalary = null;
  uiState.expandedBiz.clear(); uiState.expandedPol.clear();
  const fam = shuffle(FAMILY_NAMES), bor = shuffle(BOROUGHS);
  const pFamName = (playerFamilyName && playerFamilyName.trim()) || fam[0];
  gs = {
    year: 1921, quarter: 1, turnCount: 0,
    player:  genOrg(pFamName, bor[0], true,  0, playerDonName),
    rivals: [genOrg(fam[1], bor[1], false, 1),
             genOrg(fam[2], bor[2], false, 2),
             genOrg(fam[3], bor[3], false, 3)],
    politicians: [],
    log: [], currentEvents: [], rivalUpdates: [],
    actionCap: 0.01, bonusTurn: false, gameOver: null
  };
  gs.politicians       = genPoliticians(allOrgs());
  gs.playerIntel       = {};
  gs.relationships     = initRelationships(allOrgs());
  gs.pendingArcOutcomes = [];
  gs.lastArcId         = null;
  gs.donComment        = '';
  calcInfluence();
  gs.currentEvents = generateEvents();
}

function renderSetup() {
  document.getElementById('app').innerHTML = `
<div class="setup-overlay">
  <div class="setup-panel">
    <div class="setup-logo">${LOGO_SVG}</div>
    <div class="setup-divider"></div>
    <div class="setup-form">
      <div class="setup-field">
        <label class="setup-label">Family Name</label>
        <input id="setup-family" class="setup-input" type="text" maxlength="24"
               placeholder="e.g. Maranzano" />
      </div>
      <div class="setup-field">
        <label class="setup-label">Don's Name</label>
        <input id="setup-don" class="setup-input" type="text" maxlength="36"
               placeholder="e.g. Salvatore Maranzano" />
      </div>
    </div>
    <button class="setup-btn" onclick="startGame()">Begin</button>
    <div class="setup-note">Leave blank to generate randomly</div>
  </div>
</div>`;
  setTimeout(() => document.getElementById('setup-family')?.focus(), 50);
}

function startGame() {
  const familyInput = document.getElementById('setup-family')?.value.trim() || null;
  const donInput    = document.getElementById('setup-don')?.value.trim()    || null;
  initGame(familyInput, donInput);
  const audio = document.getElementById('bg-music');
  if (audio) { audio.volume = 0.35; audio.play().catch(() => {}); }
  render();
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  audio.muted = !audio.muted;
  document.getElementById('music-btn').textContent = audio.muted ? '♪ off' : '♪';
}

// ── INFLUENCE CALCULATION ─────────────────────────────────

function allOrgs() { return [gs.player, ...gs.rivals]; }
function orgPayroll(org) { return org.roster.reduce((s, c) => s + c.salary, 0); }
function effectiveBizIncome(org, b) {
  if (b.sabotagedUntilTurn && b.sabotagedUntilTurn > gs.turnCount) {
    const base = b.managerId ? (() => {
      const mgr = org.roster.find(c => c.id === b.managerId);
      if (!mgr) { b.managerId = null; return b.income; }
      return Math.round(b.income * (0.5 + effectiveStat(mgr, 'cunning') / 100));
    })() : b.income;
    return Math.round(base * 0.5); // sabotaged: half income
  }
  if (!b.managerId) return b.income;
  const mgr = org.roster.find(c => c.id === b.managerId);
  if (!mgr) { b.managerId = null; return b.income; }
  return Math.round(b.income * (0.5 + effectiveStat(mgr, 'cunning') / 100));
}
function orgIncome(org) {
  const base = org.businesses.reduce((s, b) => s + effectiveBizIncome(org, b), 0);
  return Math.round(base * orgWarehouseBonus(org));
}
function isManagingBusiness(org, charId) {
  return org.businesses.some(b => b.managerId === charId);
}
function soldierCapPerCapo(org) {
  return MAX_SOLDIERS_PER_CAPO + (org.properties?.compound ?? 0);
}
function orgWarehouseBonus(org) {
  return 1 + (org.properties?.warehouse ?? 0) * 0.05;
}
function orgSafehouseBonus(org) {
  return 1 + (org.properties?.safehouse ?? 0) * 0.05;
}
function isCharBusy(c) {
  return c.busyUntilTurn != null && c.busyUntilTurn >= gs.turnCount;
}
function isImprisoned(c) {
  return c.prisonUntilTurn != null && c.prisonUntilTurn > gs.turnCount;
}
function isCharUnavailable(c) {
  return isCharBusy(c) || isImprisoned(c);
}
function markBusy(c) {
  if (c) c.busyUntilTurn = gs.turnCount + 1;
}
function imprison(c, turns) {
  if (!c) return;
  c.prisonUntilTurn = gs.turnCount + turns;
}
function boostLoyalty(c, amount) {
  if (c) c.loyalty = Math.max(0, Math.min(100, c.loyalty + amount));
}
function boostLoyaltyById(charId, org, amount) {
  const c = org.roster.find(r => r.id === charId);
  boostLoyalty(c, amount);
}
// Loyalty gives ±5% bonus to other stats: loyalty 50 = ×1.0, 0 = ×0.95, 100 = ×1.05
function effectiveStat(char, stat) {
  const base  = char[stat] ?? 0;
  const mult  = 1 + ((char.loyalty ?? 50) - 50) / 1000;
  return Math.round(base * mult);
}
const PROPERTY_DEFS = [
  { type: 'warehouse', label: 'Warehouse',          cost: 50000,
    desc: 'Increases total business income by 5% per warehouse owned.' },
  { type: 'safehouse', label: 'Safehouse',           cost: 50000,
    desc: 'Increases effective toughness of all fighters by 5% per safehouse.' },
  { type: 'compound',  label: 'Compound Expansion',  cost: 50000,
    desc: 'Each capo can command one additional soldier per compound expansion.' }
];

function buyProperty(type) {
  const def = PROPERTY_DEFS.find(d => d.type === type);
  if (!def) return;
  const org = gs.player;
  if (org.cash < def.cost) return;
  org.cash -= def.cost;
  if (!org.properties) org.properties = { warehouse: 0, safehouse: 0, compound: 0 };
  org.properties[type] = (org.properties[type] ?? 0) + 1;
  addLog(`Purchased ${def.label} (${fmt$(def.cost)}).`);
  renderPreserveScroll();
}

function renderPropertiesPanel(org) {
  const props = org.properties ?? { warehouse: 0, safehouse: 0, compound: 0 };
  const canAfford = org.cash >= 50000;
  return PROPERTY_DEFS.map(def => {
    const count = props[def.type] ?? 0;
    let effectLabel = '';
    if (def.type === 'warehouse') effectLabel = `+${count * 5}% income${count > 0 ? ` (×${(1 + count * 0.05).toFixed(2)})` : ''}`;
    if (def.type === 'safehouse') effectLabel = `+${count * 5}% fighter toughness${count > 0 ? ` (×${(1 + count * 0.05).toFixed(2)})` : ''}`;
    if (def.type === 'compound')  effectLabel = `${MAX_SOLDIERS_PER_CAPO + count} soldiers/capo${count > 0 ? ` (+${count})` : ''}`;
    return `<div class="prop-row">
      <div class="prop-info">
        <span class="prop-name">${def.label}</span>
        <span class="prop-count">${count} owned</span>
        <span class="prop-effect ${count > 0 ? 'pos' : ''}">${effectLabel || def.desc}</span>
      </div>
      <button class="btn-prop-buy" onclick="buyProperty('${def.type}')" ${!canAfford ? 'disabled' : ''}
        title="${def.desc} Cost: ${fmt$(def.cost)}">
        Buy ${fmt$(def.cost)}
      </button>
    </div>`;
  }).join('');
}

function assignManagerToBiz(bizId, charIdStr) {
  const org = gs.player;
  const biz = org.businesses.find(b => b.id === bizId);
  if (!biz) return;
  const newCharId = charIdStr ? Number(charIdStr) : null;
  // A member can only manage one business — unassign them from any other
  if (newCharId) org.businesses.forEach(b => { if (b.managerId === newCharId) b.managerId = null; });
  biz.managerId = newCharId;
  renderPreserveScroll();
}
function orgNetWorth(org){ return org.cash + org.businesses.reduce((s, b) => s + b.assetValue, 0); }
function orgPolitical(org) {
  if (!gs?.politicians?.length) return 0;
  return gs.politicians.reduce((s, p) => s + (p.control[String(org.id)] ?? 0), 0);
}

function calcInfluence() {
  // Pure calculation — no capping here
  const orgs = allOrgs(), n = orgs.length;
  const tI = orgs.reduce((s, o) => s + orgIncome(o),    0);
  const tP = orgs.reduce((s, o) => s + orgPolitical(o), 0);
  const tN = orgs.reduce((s, o) => s + orgNetWorth(o),  0);
  orgs.forEach(o => {
    const mkt = tI > 0 ? orgIncome(o)    / tI : 1/n;
    const pol = tP > 0 ? orgPolitical(o) / tP : 1/n;
    const nw  = tN > 0 ? orgNetWorth(o)  / tN : 1/n;
    o.influence = mkt * 0.40 + pol * 0.35 + nw * 0.25;
  });
  const total = orgs.reduce((s, o) => s + o.influence, 0);
  if (total > 0) orgs.forEach(o => o.influence /= total);
}

// Snapshot current influence values before an action
function snapInfluence() {
  return new Map(allOrgs().map(o => [o.id, o.influence]));
}

// Apply caps after calcInfluence(); pass null to skip either cap
function applyInfluenceCaps(snap, maxGain, maxLoss) {
  const orgs = allOrgs();
  orgs.forEach(o => {
    const prev  = snap.get(o.id) ?? o.influence;
    const delta = o.influence - prev;
    if (maxGain != null && delta >  maxGain) o.influence = prev + maxGain;
    if (maxLoss != null && delta < -maxLoss) o.influence = prev - maxLoss;
  });
  const t = orgs.reduce((s, o) => s + o.influence, 0);
  if (t > 0) orgs.forEach(o => o.influence /= t);
}

// Estimate how much influence a political control gain would add.
// Total political is always 12 × 100 = 1200 (shared model, constant).
function estimatePolGain(ctrlGain) {
  const TOTAL_POL = (gs.politicians?.length ?? 12) * 100;
  const myP  = orgPolitical(gs.player);
  const base = myP / TOTAL_POL;
  // After normalization the gain is diluted; approx factor ≈ (100 - myShareOnPol) / 100
  const after = (myP + ctrlGain * 0.75) / TOTAL_POL;
  return Math.max(0, after - base) * 0.35;
}

// Estimate how much influence a net cash gain would add
function estimateFinGain(netCash) {
  const totalNW = allOrgs().reduce((s, o) => s + orgNetWorth(o), 0);
  const myNW    = orgNetWorth(gs.player);
  const base    = totalNW > 0 ? myNW / totalNW : 0.25;
  const after   = (myNW + netCash) / Math.max(totalNW + netCash, 1);
  return (after - base) * 0.25;
}

function fmtPctGain(v) {
  const cap   = gs?.actionCap ?? 0.01;
  const clamped = Math.min(v, cap);
  const s = (clamped * 100).toFixed(2);
  return `~+${s}% influence`;
}

// ── LOG HELPER ────────────────────────────────────────────

function addLog(text) {
  gs.log.unshift(text);
  if (gs.log.length > 35) gs.log.length = 35;
}

function logEntryHtml(text) {
  let cls = '';
  if (text.startsWith('⚔'))                                            cls = 'log-combat';
  else if (text.includes(' – Finance:') || text.includes('cashed in') ||
           text.includes('fell through'))                               cls = 'log-finance';
  else if (text.includes(' – Politics:') || text.includes('political footing') ||
           text.includes('Bribed'))                                     cls = 'log-political';
  else if (text.includes(' – Recruit') || text.includes('joins the family') ||
           text.includes('brought on') || text.includes('natural causes')) cls = 'log-recruit';
  else if (text.startsWith('Storyline'))                               cls = 'log-storyline';
  return `<div class="log-entry ${cls}">${text}</div>`;
}

// ── STAT PROGRESSION & STORYLINE ─────────────────────────

function processStatProgression() {
  // Each turn: 3–5 characters quietly gain or lose a point or two
  const org = gs.player;
  if (!org.roster.length) return;
  const count   = Math.min(org.roster.length, randInt(3, 5));
  const targets = shuffle([...org.roster]).slice(0, count);
  targets.forEach(c => {
    const stat  = randFrom(['charisma','toughness','cunning','loyalty']);
    const delta = Math.random() < 0.62 ? randInt(1, 3) : -randInt(1, 2);
    c[stat] = Math.max(1, Math.min(100, c[stat] + delta));
  });
}

function generateRegularStoryline() {
  const roll = Math.random();
  let pool;
  if      (roll < 0.42) pool = STORYLINES_POSITIVE;
  else if (roll < 0.80) pool = STORYLINES_NEGATIVE;
  else if (roll < 0.92) pool = STORYLINES_DEATH;
  else                  pool = STORYLINES_DEFECT;

  for (let attempt = 0; attempt < 6; attempt++) {
    const result = randFrom(pool).run(gs.player);
    if (result) {
      return { id: uid(), type: 'storyline', state: 'pending',
        title: result.title, text: result.text, positive: result.positive,
        outcome: null };
    }
  }
  return { id: uid(), type: 'storyline', state: 'pending',
    title: 'Quiet Quarter',
    text: 'Nothing of consequence this quarter. The streets are watching.',
    positive: null, outcome: null };
}

function tryStartArcEvent() {
  if (Math.random() >= 0.28) return null;
  const org = gs.player;
  const available = ARC_TEMPLATES.filter(t => t.id !== gs.lastArcId);
  const template  = randFrom(available.length ? available : ARC_TEMPLATES);
  for (let attempt = 0; attempt < 5; attempt++) {
    const ctx = template.setup(org);
    if (!ctx) continue;
    return {
      id: uid(), type: 'arc', arcPhase: 0,
      arcTemplateId: template.id,
      title: template.title,
      state: 'pending',
      ctx,
      narrative: template.phase0(ctx),
      choices: template.choices,
      choiceIdx: null,
      outcome: null
    };
  }
  return null;
}

function generateStorylineOrArcEvent() {
  const arcEv = tryStartArcEvent();
  return arcEv ?? generateRegularStoryline();
}

function generateArcOutcomeEvent(pending) {
  const template = ARC_TEMPLATES.find(t => t.id === pending.arcTemplateId);
  if (!template) return null;
  const outcome = template.phase1[pending.choiceIdx];
  if (!outcome) return null;
  const org = gs.player;
  if (outcome.apply) outcome.apply(pending.ctx, org);
  const narrativeText = outcome.narrative(pending.ctx);
  return {
    id: uid(), type: 'arc', arcPhase: 1,
    arcTemplateId: pending.arcTemplateId,
    title: `${template.title} — Aftermath`,
    state: 'pending',
    ctx: pending.ctx,
    choiceIdx: pending.choiceIdx,
    narrative: narrativeText,
    choices: null,
    outcome: { text: narrativeText, positive: outcome.positive }
  };
}

function resolveArcChoice(eventId, choiceIdx) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.type !== 'arc' || ev.arcPhase !== 0 || ev.state !== 'pending') return;
  ev.choiceIdx = choiceIdx;
  ev.state     = 'resolved';
  ev.outcome   = { text: `You chose: "${ev.choices[choiceIdx].label}". The consequences will become clear next quarter.`, positive: null };
  gs.lastArcId = ev.arcTemplateId;
  gs.pendingArcOutcomes.push({ arcTemplateId: ev.arcTemplateId, choiceIdx, ctx: ev.ctx });
  addLog(`Arc — ${ev.title}: chose "${ev.choices[choiceIdx].label}"`);
  renderPreserveScroll();
}

function acknowledgeArcOutcome(eventId) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.type !== 'arc' || ev.arcPhase !== 1 || ev.state !== 'pending') return;
  ev.state = 'resolved';
  addLog(`Arc outcome — ${ev.title}`);
  renderPreserveScroll();
}

function acknowledgeStoryline(eventId) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending') return;
  ev.state   = 'resolved';
  ev.outcome = { text: ev.text, positive: ev.positive };
  addLog(`Storyline — ${ev.title}: ${ev.text}`);
  renderPreserveScroll();
}

function assignSoldierToCapo(soldierId, capoIdStr) {
  const org     = gs.player;
  const soldier = org.roster.find(c => c.id === soldierId);
  if (!soldier || soldier.role !== 'soldier') return;
  const newCapoId = capoIdStr ? Number(capoIdStr) : null;
  if (newCapoId) {
    const capo = org.roster.find(c => c.id === newCapoId && c.role === 'capo');
    if (!capo) return;
    const count = org.roster.filter(s => s.capoId === newCapoId).length;
    if (count >= soldierCapPerCapo(org)) return; // capo full
  }
  soldier.capoId = newCapoId;
  renderPreserveScroll();
}

function toggleBiz(id) {
  if (uiState.expandedBiz.has(id)) uiState.expandedBiz.delete(id);
  else uiState.expandedBiz.add(id);
  renderPreserveScroll();
}
function togglePol(id) {
  if (uiState.expandedPol.has(id)) uiState.expandedPol.delete(id);
  else uiState.expandedPol.add(id);
  renderPreserveScroll();
}

function bizRowHtml(b) {
  const exp        = uiState.expandedBiz.has(b.id);
  const org        = gs.player;
  const effIncome  = effectiveBizIncome(org, b);
  const totalI     = allOrgs().reduce((s, o) => s + orgIncome(o), 0);
  const sharePct   = totalI > 0 ? ((effIncome / totalI) * 100).toFixed(1) : '—';
  const infContrib = totalI > 0 ? ((effIncome / totalI) * 0.40 * 100).toFixed(2) : '—';
  const mgr        = b.managerId ? org.roster.find(c => c.id === b.managerId) : null;

  return `<div class="biz-item ${exp ? 'exp' : ''}" onclick="toggleBiz(${b.id})">
    <div class="biz-row">
      <span class="biz-name">${b.name}</span>
      <span class="biz-income">${fmt$(effIncome)}/qtr${mgr ? ' ★' : ''}</span>
      <span class="biz-arrow">${exp ? '▲' : '▼'}</span>
    </div>
    ${exp ? `<div class="biz-detail">
      <div class="biz-detail-row"><span>Base income</span><span>${fmt$(b.income)}/qtr</span></div>
      ${mgr ? `<div class="biz-detail-row"><span>Manager bonus</span>
        <span class="pos">×${(0.5 + mgr.cunning / 100).toFixed(2)} (${mgr.name}, CUN ${mgr.cunning})</span></div>` : ''}
      <div class="biz-detail-row"><span>Asset value</span><span>${fmt$(b.assetValue)}</span></div>
      <div class="biz-detail-row"><span>City income share</span><span>${sharePct}%</span></div>
      <div class="biz-detail-row"><span>Influence contribution</span><span>~${infContrib}%</span></div>
      <div class="biz-mgr-row" onclick="event.stopPropagation()">
        <span class="sal-label">MANAGER</span>
        <select class="capo-assign-select" onchange="assignManagerToBiz(${b.id},this.value)">
          <option value="">— None —</option>
          ${org.roster.map(c => {
            const elsewhere = org.businesses.some(ob => ob.id !== b.id && ob.managerId === c.id);
            return `<option value="${c.id}" ${b.managerId === c.id ? 'selected' : ''} ${elsewhere ? 'disabled' : ''}>
              ${c.name} — ${ROLE_LABEL[c.role]} — CUN: ${c.cunning}${elsewhere ? ' (managing other)' : ''}</option>`;
          }).join('')}
        </select>
      </div>
    </div>` : ''}
  </div>`;
}

function polRowHtml(pol) {
  const exp    = uiState.expandedPol.has(pol.id);
  const orgs   = allOrgs();
  const player = gs.player;
  // Sort families by control descending for the expanded bars
  const sorted = orgs.slice().sort((a, b) =>
    (pol.control[String(b.id)] ?? 0) - (pol.control[String(a.id)] ?? 0));
  const playerCtrl = Math.round(pol.control[String(player.id)] ?? 0);

  return `<div class="pol-item ${exp ? 'exp' : ''}" onclick="togglePol(${pol.id})">
    <div class="pol-row-header">
      <span class="pol-name">${pol.name}</span>
      <span class="pol-bor-tag">${pol.borough}</span>
      <span class="pol-arrow">${exp ? '▲' : '▼'}</span>
    </div>
    <div class="pol-bar-row">
      <div class="pol-track">
        <div class="pol-fill" style="width:${playerCtrl}%;background:${FAMILY_COLORS[player.colorIndex]}"></div>
      </div>
      <span class="pol-val">${playerCtrl}%</span>
    </div>
    ${exp ? `<div class="pol-detail">
      ${sorted.map(o => {
        const ctrl = Math.round(pol.control[String(o.id)] ?? 0);
        return `<div class="pol-family-row">
          <span class="pol-fam-name${o.isPlayer ? ' player' : ''}" style="color:${FAMILY_COLORS[o.colorIndex]}">${o.familyName}</span>
          <div class="pol-fam-track">
            <div class="pol-fam-fill" style="width:${ctrl}%;background:${FAMILY_COLORS[o.colorIndex]}"></div>
          </div>
          <span class="pol-fam-val">${ctrl}%</span>
        </div>`;
      }).join('')}
      <div class="biz-detail-row" style="margin-top:6px">
        <span>Influence contribution</span>
        <span>~${(playerCtrl / ((gs.politicians?.length ?? 12) * 100) * 0.35 * 100).toFixed(2)}%</span>
      </div>
    </div>` : ''}
  </div>`;
}

// ── EVENT GENERATION ──────────────────────────────────────

function generateRivalUpdate(rival) {
  const tier       = influenceTier(rival);
  const cashFlush  = rival.cash > 150000;
  const cashTight  = rival.cash < 25000;
  const bizCount   = rival.businesses.length;
  const soldierCt  = rival.roster.filter(c => c.role === 'soldier').length;
  const polCt = gs.politicians
    ? gs.politicians.filter(p => (p.control[String(rival.id)] ?? 0) >= 35).length
    : 0;

  const pool = [];
  if (tier === 'high') {
    pool.push(`The ${rival.familyName} hold the city's reins and show no sign of loosening their grip.`);
    pool.push(`Word from the streets puts the ${rival.familyName} at the top of every racket. They're not looking over their shoulder.`);
    pool.push(`The ${rival.familyName} are tightening their stranglehold. Their political connections are paying dividends.`);
    pool.push(`The ${rival.familyName} ran an efficient quarter — business up, opposition quiet.`);
  } else if (tier === 'mid') {
    pool.push(`The ${rival.familyName} are holding steady. Ambitious, but not yet in a position to make a decisive move.`);
    pool.push(`Reports put the ${rival.familyName} in consolidation mode — building quietly, waiting for an opening.`);
    pool.push(`The ${rival.familyName} made some noise in ${rival.borough} this quarter but nothing decisive came of it.`);
    pool.push(`The ${rival.familyName} are a mid-tier presence — not to be underestimated, not yet to be feared.`);
  } else {
    pool.push(`The ${rival.familyName} are struggling to maintain their footing. Morale on their streets is said to be low.`);
    pool.push(`The ${rival.familyName} have taken hits recently. They may be looking to cause trouble to recoup lost ground.`);
    pool.push(`Sources put the ${rival.familyName} on the back foot. Their operation is fraying at the edges.`);
    pool.push(`The ${rival.familyName} are bleeding influence and running short on options.`);
  }
  // Situational addenda
  if (cashTight)      pool.push(`Rumor has it the ${rival.familyName} are strapped for cash and cutting corners.`);
  if (cashFlush)      pool.push(`The ${rival.familyName} are flush — and spending it on things that should concern you.`);
  if (bizCount === 0) pool.push(`The ${rival.familyName} have been stripped of their businesses. They're running on borrowed time.`);
  if (soldierCt < 5)  pool.push(`The ${rival.familyName} have very few soldiers left on the street. They're exposed.`);
  if (polCt >= 2)     pool.push(`The ${rival.familyName} have been buying friends in City Hall. Their political influence is growing.`);

  return randFrom(pool);
}

function generateDonComment() {
  const org  = gs.player;
  const orgs = allOrgs().sort((a, b) => b.influence - a.influence);
  const rank = orgs.findIndex(o => o.isPlayer) + 1;
  const imprisoned = org.roster.filter(c => isImprisoned(c));
  const hostile    = gs.rivals.filter(r => getRelationship(org.id, r.id) < -30);

  const pool = [];

  if (rank === 1) pool.push(
    'We sit at the top of this city. Every move we make should ensure we stay there.',
    'We lead the pack. Don\'t let comfort make us slow.',
    'The other families are watching us now. Good — let them watch and wonder.'
  );
  else if (rank === 4) pool.push(
    'We are at the bottom and everyone knows it. That changes this quarter or heads will roll.',
    'I won\'t pretend the situation isn\'t desperate. It is. We fix it or we don\'t survive.',
    'Last place is a temporary condition. I intend to make it very temporary.'
  );
  else pool.push(
    'Middle of the pack. Not where we belong. Not where we\'ll stay.',
    'There\'s room above us. The men holding those positions are not smarter than us — they are simply further ahead. For now.',
    'We are neither first nor last. That is a position for a family without ambition. It isn\'t ours.'
  );

  if (imprisoned.length > 0) pool.push(
    `With ${imprisoned.length === 1 ? imprisoned[0].name : imprisoned.length + ' men'} behind bars, we operate short-handed. That is a wound we need to manage.`,
    `The loss of ${imprisoned[0].name} to the federal pen costs us more than his salary. We work around it and we don\'t complain about it out loud.`
  );

  if (hostile.length > 0) pool.push(
    `The ${hostile[0].familyName} have made their hostility plain. We don\'t blink first, but we don\'t invite disaster either.`,
    `${hostile.length > 1 ? hostile.length + ' families have' : 'The ' + hostile[0].familyName + ' has'} decided we are enemies. Fine. We have survived worse opinions than theirs.`
  );

  if (org.cash < 5000) pool.push(
    'The treasury is nearly dry. Every dollar spent this quarter must earn two back.',
    'Cash is short. We need a return this quarter or we start making decisions we\'d rather avoid.'
  );
  else if (org.cash > 100000) pool.push(
    'The cash position is strong. A well-funded family has options a desperate one doesn\'t.',
    'We have reserves. Use them wisely — money represents time, and time in this city is influence.'
  );

  return randFrom(pool);
}

function boroughDominance() {
  const names = ['Manhattan', 'Brooklyn', 'The Bronx', 'Queens'];
  const orgs  = allOrgs();
  const result = {};
  names.forEach(bName => {
    const pols = gs.politicians.filter(p => p.borough === bName);
    const totals = {};
    orgs.forEach(o => {
      totals[String(o.id)] = pols.reduce((sum, p) => sum + (p.control[String(o.id)] ?? 0), 0);
    });
    const winnerId = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);
    const winner   = orgs.find(o => String(o.id) === winnerId);
    result[bName]  = winner ?? null;
  });
  return result;
}

function renderBoroughMap() {
  const dom  = boroughDominance();
  const orgs = allOrgs();
  const col  = (bName) => {
    const w = dom[bName];
    return w ? FAMILY_COLORS[w.colorIndex] : '#555';
  };
  return `<div class="borough-map-wrap">
    <svg class="borough-map-svg" viewBox="0 0 220 170" xmlns="http://www.w3.org/2000/svg">
      <polygon class="boro-poly" points="70,8 132,5 127,52 80,56 68,28"
        fill="${col('The Bronx')}33" stroke="${col('The Bronx')}" stroke-width="1.5"/>
      <text class="boro-label" x="100" y="34">The Bronx</text>
      <polygon class="boro-poly" points="36,30 56,24 62,132 42,136 28,80"
        fill="${col('Manhattan')}33" stroke="${col('Manhattan')}" stroke-width="1.5"/>
      <text class="boro-label" x="44" y="81" text-anchor="middle"
        transform="rotate(-80 44 81)">Manhattan</text>
      <polygon class="boro-poly" points="92,52 150,46 156,118 94,124"
        fill="${col('Queens')}33" stroke="${col('Queens')}" stroke-width="1.5"/>
      <text class="boro-label" x="124" y="88">Queens</text>
      <polygon class="boro-poly" points="46,122 106,118 110,155 44,158"
        fill="${col('Brooklyn')}33" stroke="${col('Brooklyn')}" stroke-width="1.5"/>
      <text class="boro-label" x="78" y="142">Brooklyn</text>
    </svg>
    <div class="boro-legend">
      ${orgs.map(o => `<span class="boro-legend-item">
        <span class="boro-legend-dot" style="background:${FAMILY_COLORS[o.colorIndex]}"></span>
        <span class="${o.isPlayer ? 'boro-legend-player' : ''}">${o.familyName}</span>
      </span>`).join('')}
    </div>
  </div>`;
}

function generateEvents() {
  processStatProgression();
  gs.actionCap    = gs.turnCount % 4 === 0 ? 0.02 : 0.01;
  gs.bonusTurn    = gs.turnCount % 4 === 0;
  gs.donComment   = generateDonComment();
  gs.rivalUpdates = gs.rivals.map(r => ({
    id: r.id, familyName: r.familyName, color: FAMILY_COLORS[r.colorIndex],
    text: generateRivalUpdate(r)
  }));

  const events = [];

  // Process any arc outcomes carried over from last turn
  if (gs.pendingArcOutcomes.length) {
    gs.pendingArcOutcomes.forEach(p => {
      const ev = generateArcOutcomeEvent(p);
      if (ev) events.push(ev);
    });
    gs.pendingArcOutcomes = [];
  }

  events.push(generateStorylineOrArcEvent());
  events.push(generateRecruitEvent());
  events.push(generateFinanceEvent());
  events.push(generatePoliticalEvent());
  events.push(generateConflictEvent());
  return events;
}

function generateRecruitEvent() {
  return { id: uid(), type: 'recruit', state: 'pending',
           candidates: [genCandidate(), genCandidate(), genCandidate()], outcome: null };
}
function genCandidate() {
  const sr = SALARY_RANGES.soldier;
  const lr = LOYALTY_RANGES.soldier;
  return { id: uid(), name: genName(), age: randInt(19, 35),
    charisma: randInt(20, 85), toughness: randInt(20, 85),
    cunning: randInt(20, 85), loyalty: randInt(lr.min, lr.max),
    salary: randInt(sr.min, sr.max) };
}

function generateFinanceEvent() {
  const t = randFrom(FINANCE_TEMPLATES);
  const cost = randInt(t.minCost, t.maxCost);
  const baseOdds = randInt(Math.round(t.minOdds*100), Math.round(t.maxOdds*100)) / 100;
  return { id: uid(), type: 'finance', state: 'pending',
    name: t.name, desc: t.desc, cost, baseOdds, mult: t.mult,
    assignedCharId: null, selectedPolId: null, giveCut: false, outcome: null };
}

function assignPolToCard(eventId, polIdStr) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev) return;
  ev.selectedPolId = polIdStr ? Number(polIdStr) : null;
  renderPreserveScroll();
}

function toggleCut(eventId, val) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev) return;
  ev.giveCut = !!val;
  renderPreserveScroll();
}

function generatePoliticalEvent() {
  const pol      = randFrom(gs.politicians);
  const baseCost = randInt(3000, 12000), ctrlGain = randInt(10, 25);
  return { id: uid(), type: 'political', state: 'pending',
    politicianId: pol.id, politicianName: pol.name, borough: pol.borough,
    baseCost, ctrlGain,
    desc: randFrom(POLITICAL_DESCS)(pol.name, pol.borough),
    assignedCharId: null, giveCut: false, outcome: null };
}

function generateConflictEvent() {
  const rival = gs.rivals[gs.turnCount % gs.rivals.length];
  const fighters = rival.roster.filter(c => c.role === 'soldier' || c.role === 'capo');
  const avgT = fighters.length ? fighters.reduce((s, c) => s + c.toughness, 0) / fighters.length : 50;
  return { id: uid(), type: 'conflict', state: 'pending',
    rivalId: rival.id, rivalName: rival.name, rivalFamilyName: rival.familyName,
    rivalStrength: Math.round(avgT * Math.min(fighters.length, 8) / 3),
    negotiateCost: randInt(2000, 5000),
    desc: randFrom(CONFLICT_DESCS)(rival.name),
    conflictMode: null, selectedFighters: [], giveCut: false,
    chosenAction: null, outcome: null };
}

// ── TURN PROCESSING ───────────────────────────────────────

function allEventsResolved() {
  return gs.currentEvents.every(e => e.state !== 'pending');
}

function advanceTurn() {
  if (!allEventsResolved() || gs.gameOver) return;

  // Snapshot influence before any end-of-turn changes (for loss cap)
  const turnSnap = snapInfluence();

  // Read player's conflict choice before clearing events
  const conflictEv     = gs.currentEvents.find(e => e.type === 'conflict');
  const playerDefended = conflictEv?.chosenAction === 'defend';
  const playerNegWith  = conflictEv?.chosenAction === 'negotiate' ? conflictEv.rivalId : null;

  // Income and payroll for all orgs
  allOrgs().forEach(org => { org.cash += orgIncome(org) - orgPayroll(org); });

  // Political control: gentle entropy — each politician drifts 2 pts toward equality each quarter
  gs.politicians.forEach(pol => {
    const ids  = Object.keys(pol.control);
    const avg  = 100 / ids.length;
    ids.forEach(k => {
      const delta = pol.control[k] > avg ? -2 : pol.control[k] < avg ? 2 : 0;
      pol.control[k] = Math.max(0, pol.control[k] + delta);
    });
    // Re-normalize to 100
    const sum = Object.values(pol.control).reduce((s, v) => s + v, 0);
    if (sum !== 100 && sum > 0) {
      const factor = 100 / sum;
      ids.forEach(k => { pol.control[k] = Math.round(pol.control[k] * factor); });
      const fix = Object.values(pol.control).reduce((s, v) => s + v, 0);
      pol.control[ids[0]] += 100 - fix;
    }
  });

  // AI turns
  processAITurns(playerDefended, playerNegWith);

  // Player finance log
  const inc = orgIncome(gs.player), pay = orgPayroll(gs.player), net = inc - pay;
  addLog(`${quarterLabel(gs.quarter, gs.year)}: Income ${fmt$(inc)}, Payroll ${fmt$(pay)}, Net ${net >= 0 ? '+' : ''}${fmt$(net)}.`);

  // Advance date
  gs.quarter++;
  if (gs.quarter > 4) { gs.quarter = 1; gs.year++; }
  gs.turnCount++;

  // Aging and natural death (once per year)
  if (gs.turnCount % 4 === 0) processAgingAndDeath();

  // Government raids — 5% chance per managed player business
  gs.player.businesses.forEach(b => {
    if (b.managerId && Math.random() < 0.05) {
      const mgr = gs.player.roster.find(c => c.id === b.managerId);
      if (mgr) {
        const sentence = randInt(1, 10);
        imprison(mgr, sentence);
        b.managerId = null;
        addLog(`🚔 ${mgr.name} arrested — ${b.name} raided by federal agents. Sentenced to ${sentence} quarter${sentence !== 1 ? 's' : ''} in prison.`);
      }
    }
  });

  calcInfluence();
  applyInfluenceCaps(turnSnap, 0.05, 0.05); // cap both gains and losses at 5%/turn

  // Relationship drift — all pairs slowly drift toward neutral (±1/turn),
  // plus AI-vs-AI random events occasionally shift things
  if (gs.relationships) {
    Object.values(gs.relationships).forEach(rel => {
      if (rel.score > 0) rel.score = Math.max(0, rel.score - 1);
      else if (rel.score < 0) rel.score = Math.min(0, rel.score + 1);
    });
    // AI-vs-AI random friction or cooperation (one pair per turn)
    const rivals = gs.rivals;
    if (rivals.length >= 2) {
      const a = randFrom(rivals), b = randFrom(rivals.filter(r => r.id !== a.id));
      if (a && b) {
        const shift = randInt(-6, 4);
        const reason = shift < 0 ? `Rivalry intensified between ${a.familyName} and ${b.familyName}`
                                 : `Tensions eased between ${a.familyName} and ${b.familyName}`;
        modifyRelationship(a.id, b.id, shift, gs.turnCount % 3 === 0 ? reason : null);
      }
    }
  }

  if (checkEndConditions()) { render(); return; }

  gs.currentEvents = generateEvents();
  render();
}

function newGame() {
  if (window.confirm('Start a new game? All progress will be lost.')) {
    renderSetup();
  }
}

// ── AI TURN PROCESSING ────────────────────────────────────

function influenceTier(org) {
  return org.influence < 0.20 ? 'low' : org.influence < 0.38 ? 'mid' : 'high';
}

function processAITurns(playerDefended, playerNegWith) {
  gs.rivals.forEach(rival => {
    const tier = influenceTier(rival);
    aiRecruit(rival);
    aiFinance(rival, tier);
    aiPolitical(rival, tier);
    aiConflict(rival, tier, playerDefended, playerNegWith);
  });
}

function aiRecruit(org) {
  const capos    = org.roster.filter(c => c.role === 'capo');
  const soldiers = org.roster.filter(c => c.role === 'soldier');
  if (soldiers.length >= capos.length * soldierCapPerCapo(org)) return;
  if (Math.random() > 0.70) return;
  const cand = genCandidate();
  let capoId = null;
  if (capos.length) {
    const withSlot = capos.filter(cp =>
      org.roster.filter(s => s.capoId === cp.id).length < soldierCapPerCapo(org));
    if (withSlot.length) {
      const t = withSlot.reduce((a, b) =>
        org.roster.filter(s => s.capoId === a.id).length <=
        org.roster.filter(s => s.capoId === b.id).length ? a : b);
      capoId = t.id;
    }
  }
  org.roster.push({ id: cand.id, name: cand.name, age: cand.age,
    charisma: cand.charisma, toughness: cand.toughness,
    cunning: cand.cunning, loyalty: cand.loyalty ?? randInt(LOYALTY_RANGES.soldier.min, LOYALTY_RANGES.soldier.max),
    role: 'soldier', salary: cand.salary, capoId, busyUntilTurn: null });
}

function aiFinance(org, tier) {
  const prob = tier === 'low' ? 0.65 : tier === 'mid' ? 0.55 : 0.45;
  if (Math.random() > prob) return;
  // Low-influence AI prefers high-mult templates
  const pool = tier === 'low'
    ? FINANCE_TEMPLATES.filter(t => t.mult >= 2.5)
    : FINANCE_TEMPLATES;
  const t    = randFrom(pool.length ? pool : FINANCE_TEMPLATES);
  const cost = randInt(t.minCost, t.maxCost);
  if (org.cash < cost) return;
  org.cash -= cost;
  const odds = (t.minOdds + t.maxOdds) / 2 + (tier === 'low' ? 0.03 : 0);
  if (Math.random() < odds) {
    org.cash += Math.round(cost * t.mult);
    if (Math.random() < 0.35)
      addLog(`The ${org.name} cashed in on ${t.name.toLowerCase()}.`);
  } else {
    if (Math.random() < 0.25)
      addLog(`The ${org.name}'s venture into ${t.name.toLowerCase()} fell through.`);
  }
}

function aiPolitical(org, tier) {
  const prob = tier === 'low' ? 0.28 : tier === 'mid' ? 0.48 : 0.62;
  if (Math.random() > prob) return;
  const cost = randInt(3000, 12000);
  if (org.cash < cost) return;
  org.cash -= cost;
  const ctrlGain = randInt(10, 25);
  const pol      = randFrom(gs.politicians);
  applyPoliticalControl(org.id, pol.id, ctrlGain);
  if (Math.random() < 0.35)
    addLog(`The ${org.name} secured political footing in ${pol.borough}.`);
}

function aiConflict(org, tier, playerDefended, playerNegWith) {
  const aggressProb = tier === 'low' ? 0.42 : tier === 'mid' ? 0.28 : 0.16;
  if (Math.random() > aggressProb) return;

  const myFighters = org.roster.filter(c => c.role === 'soldier' || c.role === 'capo');
  if (myFighters.length === 0) return;

  // Pick target: sometimes the player, sometimes another rival
  const playerTargetProb = tier === 'low' ? 0.45 : tier === 'mid' ? 0.30 : 0.20;
  let target;
  if (Math.random() < playerTargetProb) {
    target = gs.player;
  } else {
    const others = gs.rivals.filter(r => r.id !== org.id);
    target = others.reduce((a, b) => a.influence < b.influence ? a : b);
  }

  // Skip if negotiated this turn
  if (target.isPlayer && playerNegWith === org.id) return;

  // Build attack force (2–4 random fighters)
  const sendCt    = Math.min(randInt(2, 4), myFighters.length);
  const attackers = shuffle([...myFighters]).slice(0, sendCt);
  const atkStr    = attackers.reduce((s, c) => s + c.toughness, 0);

  // Defender strength based on their fighters' average
  const defFighters = target.roster.filter(c => c.role === 'soldier' || c.role === 'capo');
  const avgDefTou   = defFighters.length
    ? defFighters.reduce((s, c) => s + c.toughness, 0) / defFighters.length
    : 40;
  let defStr = avgDefTou * Math.min(defFighters.length, 6) / 2;
  if (target.isPlayer && playerDefended) defStr *= 1.35;

  const winProb = atkStr + defStr > 0 ? atkStr / (atkStr + defStr) : 0.5;
  const win     = Math.random() < winProb;

  if (win) {
    // Attacker wins — take cash or business
    const useCash = target.businesses.length === 0 || Math.random() < 0.55;
    if (useCash) {
      const prize  = Math.min(randInt(1000, 5000), Math.max(0, target.cash));
      target.cash  = Math.max(0, target.cash - prize);
      org.cash    += prize;
      if (target.isPlayer)
        addLog(`⚔ The ${org.name} struck your operations and took ${fmt$(prize)}.`);
      else if (Math.random() < 0.3)
        addLog(`⚔ The ${org.name} muscled the ${target.name} for cash.`);
    } else {
      const biz           = randFrom(target.businesses);
      target.businesses   = target.businesses.filter(b => b.id !== biz.id);
      org.businesses.push(biz);
      if (target.isPlayer)
        addLog(`⚔ The ${org.name} seized your ${biz.name}.`);
      else if (Math.random() < 0.3)
        addLog(`⚔ The ${org.name} stripped the ${target.name} of a business.`);
    }
    // Target casualties (1–2 soldiers first)
    const casCt = Math.min(randInt(1, 2), defFighters.length);
    shuffle([...defFighters]).slice(0, casCt).forEach(c => {
      removeFromOrg(target, c.id);
      if (target.isPlayer) {
        uiState.expanded.delete(c.id);
        addLog(`⚔ You lost ${c.name} in the attack.`);
      }
    });
    // Attacker minor casualty
    if (myFighters.length > 1 && Math.random() < 0.25)
      removeFromOrg(org, randFrom(myFighters).id);

  } else {
    // Defender wins — attacker casualties
    const atkCasCt = Math.min(randInt(1, 2), attackers.length);
    attackers.slice(0, atkCasCt).forEach(c => removeFromOrg(org, c.id));
    if (target.isPlayer) {
      addLog(`⚔ The ${org.name} moved on your operations but was repelled.`);
      if (playerDefended) addLog(`Your defensive posture paid off.`);
    }
  }
}

// ── AGING & NATURAL DEATH ─────────────────────────────────

function processAgingAndDeath() {
  allOrgs().forEach(org => {
    const dead = [];
    org.roster.forEach(c => {
      c.age++;
      // Natural death — rises steeply after 70
      if (c.age >= 70 && Math.random() < (c.age - 65) * 0.04) dead.push(c);
    });
    dead.forEach(c => {
      if (c.role === 'capo') {
        const others = org.roster.filter(r => r.role === 'capo' && r.id !== c.id);
        org.roster.filter(s => s.capoId === c.id).forEach(s =>
          s.capoId = others.length ? others[0].id : null);
      }
      org.roster = org.roster.filter(r => r.id !== c.id);
      uiState.expanded.delete(c.id);
      if (org.isPlayer)
        addLog(`${c.name} (${ROLE_LABEL[c.role]}) died of natural causes at age ${c.age}.`);
    });
  });
}

// ── WIN / LOSS CONDITIONS ─────────────────────────────────

function checkEndConditions() {
  // Win: first family to 50% influence
  const winner = allOrgs().find(o => o.influence >= 0.50);
  if (winner) {
    gs.gameOver = {
      type: winner.isPlayer ? 'win' : 'loss',
      reason: winner.isPlayer ? null : 'dominated',
      winnerName: winner.familyName,
      winnerIsPlayer: winner.isPlayer,
      date: quarterLabel(gs.quarter, gs.year)
    };
    return true;
  }
  // Loss: deeply bankrupt
  if (gs.player.cash < -20000) {
    gs.gameOver = {
      type: 'loss', reason: 'bankrupt',
      winnerName: null, winnerIsPlayer: false,
      date: quarterLabel(gs.quarter, gs.year)
    };
    return true;
  }
  // Loss: influence effectively wiped out
  if (gs.player.influence < 0.01) {
    gs.gameOver = {
      type: 'loss', reason: 'influence',
      winnerName: null, winnerIsPlayer: false,
      date: quarterLabel(gs.quarter, gs.year)
    };
    return true;
  }
  return false;
}

// ── ORG MANAGEMENT ────────────────────────────────────────

function toggleMember(id) {
  if (uiState.expanded.has(id)) uiState.expanded.delete(id);
  else uiState.expanded.add(id);
  renderPreserveScroll();
}

function startEditSalary(id) {
  uiState.editingSalary = id;
  renderPreserveScroll();
  setTimeout(() => {
    const el = document.getElementById(`sal-${id}`);
    if (el) { el.focus(); el.select(); }
  }, 0);
}

function saveSalary(id) {
  const el = document.getElementById(`sal-${id}`);
  if (!el) return;
  const char = gs.player.roster.find(c => c.id === id);
  if (!char) return;
  const sr = SALARY_RANGES[char.role], raw = parseInt(el.value, 10);
  char.salary = isNaN(raw) ? char.salary : Math.max(sr.min, Math.min(sr.max, raw));
  uiState.editingSalary = null;
  renderPreserveScroll();
}

function salaryKey(e, id) {
  if (e.key === 'Enter')  saveSalary(id);
  if (e.key === 'Escape') { uiState.editingSalary = null; renderPreserveScroll(); }
}

function promoteChar(id) {
  const org = gs.player, char = org.roster.find(c => c.id === id);
  if (!char) return;

  if (char.role === 'soldier') {
    if (org.roster.filter(c => c.role === 'capo').length >= MAX_CAPOS) return;
    char.role = 'capo'; char.capoId = null;
    const sr = SALARY_RANGES.capo;
    if (char.salary < sr.min) char.salary = sr.min;
    boostLoyalty(char, randInt(10, 15));

  } else if (char.role === 'capo') {
    const hasUB  = org.roster.some(c => c.role === 'underboss');
    const hasCon = org.roster.some(c => c.role === 'consigliere');
    if      (!hasUB)  char.role = 'underboss';
    else if (!hasCon) char.role = 'consigliere';
    else return;
    const sr = SALARY_RANGES[char.role];
    if (char.salary < sr.min) char.salary = sr.min;
    boostLoyalty(char, randInt(10, 15));

  } else if (char.role === 'underboss' || char.role === 'consigliere') {
    if (!org.roster.some(c => c.role === 'don')) {
      char.role = 'don';
      const sr = SALARY_RANGES.don;
      if (char.salary < sr.min) char.salary = sr.min;
      boostLoyalty(char, randInt(10, 15));
    }
  }
  renderPreserveScroll();
}

function demoteChar(id) {
  const org = gs.player, char = org.roster.find(c => c.id === id);
  if (!char) return;
  if (char.role === 'consigliere' || char.role === 'underboss') {
    if (org.roster.filter(c => c.role === 'capo').length >= MAX_CAPOS) return;
    char.role = 'capo';
    const sr = SALARY_RANGES.capo;
    if (char.salary > sr.max) char.salary = sr.max;
  } else if (char.role === 'capo') {
    reassignSoldiers(org, id);
    char.role = 'soldier'; char.capoId = null;
    const sr = SALARY_RANGES.soldier;
    if (char.salary > sr.max) char.salary = sr.max;
  }
  renderPreserveScroll();
}

function removeChar(id) {
  const org = gs.player, char = org.roster.find(c => c.id === id);
  if (!char || char.role === 'don') return;
  if (char.role === 'capo') reassignSoldiers(org, id);
  org.businesses.forEach(b => { if (b.managerId === id) b.managerId = null; });
  org.roster = org.roster.filter(c => c.id !== id);
  uiState.expanded.delete(id);
  renderPreserveScroll();
}

function reassignSoldiers(org, capoId) {
  const displaced = org.roster.filter(s => s.capoId === capoId);
  displaced.forEach(s => {
    // Find the capo with fewest soldiers that still has a slot
    const others = org.roster.filter(c => c.role === 'capo' && c.id !== capoId);
    const withSlot = others.filter(cp =>
      org.roster.filter(x => x.capoId === cp.id).length < soldierCapPerCapo(org));
    if (withSlot.length) {
      const t = withSlot.reduce((a, b) =>
        org.roster.filter(x => x.capoId === a.id).length <=
        org.roster.filter(x => x.capoId === b.id).length ? a : b);
      s.capoId = t.id;
    } else {
      s.capoId = null; // becomes unassigned
    }
  });
}

function removeFromOrg(org, charId) {
  const char = org.roster.find(c => c.id === charId);
  if (!char) return;
  if (char.role === 'capo') {
    const others = org.roster.filter(c => c.role === 'capo' && c.id !== charId);
    org.roster.filter(s => s.capoId === charId).forEach(s =>
      s.capoId = others.length ? others[0].id : null);
  }
  org.businesses.forEach(b => { if (b.managerId === charId) b.managerId = null; });
  org.roster = org.roster.filter(c => c.id !== charId);
}

// ── EVENT ACTION HANDLERS ─────────────────────────────────

function assignCharToCard(eventId, charIdStr) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev) return;
  ev.assignedCharId = charIdStr ? Number(charIdStr) : null;
  renderPreserveScroll();
}

function recruitCandidate(eventId, idx) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending') return;
  const org     = gs.player;
  const capos   = org.roster.filter(c => c.role === 'capo');
  const soldiers = org.roster.filter(c => c.role === 'soldier');
  if (soldiers.length >= capos.length * soldierCapPerCapo(org)) return;
  const cand   = ev.candidates[idx];
  // Assign to the capo with fewest soldiers that still has a slot open
  let capoId   = null;
  if (capos.length) {
    const withSlot = capos.filter(cp =>
      org.roster.filter(s => s.capoId === cp.id).length < soldierCapPerCapo(org));
    if (withSlot.length) {
      const t = withSlot.reduce((a, b) =>
        org.roster.filter(s => s.capoId === a.id).length <=
        org.roster.filter(s => s.capoId === b.id).length ? a : b);
      capoId = t.id;
    }
  }
  org.roster.push({ id: cand.id, name: cand.name, age: cand.age,
    charisma: cand.charisma, toughness: cand.toughness,
    cunning: cand.cunning, loyalty: cand.loyalty ?? randInt(LOYALTY_RANGES.soldier.min, LOYALTY_RANGES.soldier.max),
    role: 'soldier', salary: cand.salary, capoId, busyUntilTurn: null });
  ev.state   = 'resolved';
  ev.outcome = { text: `${cand.name} joins the family as a Soldier at ${fmt$(cand.salary)}/qtr.`, positive: true };
  addLog(` – Recruited ${cand.name}.`);
  renderPreserveScroll();
}

function declineRecruitment(eventId) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending') return;
  ev.state = 'skipped';
  ev.outcome = { text: 'No new recruits taken this quarter.', positive: null };
  renderPreserveScroll();
}

function calcAdjustedOdds(base, cunning) {
  if (cunning == null) return base;
  return Math.max(0.05, Math.min(0.95, base + (cunning - 50) / 50 * 0.15));
}
function calcBribeCost(base, charisma) {
  if (charisma == null) return base;
  return Math.round(base * (1 - (charisma / 100) * 0.20));
}

function resolveFinance(eventId, accept) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending') return;
  if (!accept) {
    ev.state = 'skipped'; ev.outcome = { text: 'Opportunity passed.', positive: null };
    renderPreserveScroll(); return;
  }
  const org    = gs.player;
  const selPol = ev.selectedPolId ? gs.politicians.find(p => p.id === ev.selectedPolId) : null;
  const polCtrl = selPol ? Math.round(selPol.control[String(org.id)] ?? 0) : 0;
  const polFee  = selPol ? Math.round(400 + (100 - polCtrl) * 12) : 0;
  if (org.cash < ev.cost + polFee) return;

  org.cash -= ev.cost;

  const assigned = org.roster.filter(c => !isManagingBusiness(org, c.id))
                             .find(c => c.id === ev.assignedCharId);
  let finalOdds = calcAdjustedOdds(ev.baseOdds, assigned ? effectiveStat(assigned, 'cunning') : null);
  let polNote   = '';

  if (selPol) {
    org.cash -= polFee;
    const complies = Math.random() < polCtrl / 100;
    if (complies) {
      const bonus = polCtrl / 100 * 0.15;
      finalOdds   = Math.max(0.05, Math.min(0.95, finalOdds + bonus));
      polNote     = ` ${selPol.name} came through (+${Math.round(bonus * 100)}% odds).`;
    } else {
      polNote = ` ${selPol.name} didn't cooperate — fee lost.`;
    }
  }

  const success = Math.random() < finalOdds;
  let cutNote = '';
  if (success) {
    const gross  = Math.round(ev.cost * ev.mult);
    const profit = gross - ev.cost;
    if (ev.giveCut && assigned) {
      const cut     = Math.round(profit * 0.10);
      const loyGain = randInt(5, 10);
      boostLoyalty(assigned, loyGain);
      cutNote = ` Gave ${assigned.name} a ${fmt$(cut)} cut (+${loyGain} loyalty).`;
      org.cash += gross - cut; // player keeps 90% of profit
      ev.outcome = { text: `Success. Net gain: +${fmt$(profit - cut)}.${cutNote}${polNote}`, positive: true };
      addLog(` – Finance: ${ev.name} succeeded. +${fmt$(profit - cut)}.`);
    } else {
      org.cash += gross;
      ev.outcome = { text: `Success. Net gain: +${fmt$(profit)}.${polNote}`, positive: true };
      addLog(` – Finance: ${ev.name} succeeded. +${fmt$(profit)}.`);
    }
  } else {
    ev.outcome = { text: `Failed. Lost ${fmt$(ev.cost)}.${polNote}`, positive: false };
    addLog(` – Finance: ${ev.name} failed. -${fmt$(ev.cost)}.`);
  }
  markBusy(assigned);
  ev.state = 'resolved';
  renderPreserveScroll();
}

function resolvePolitical(eventId, pay) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending') return;
  if (!pay) {
    ev.state = 'skipped'; ev.outcome = { text: 'Passed on the opportunity.', positive: null };
    renderPreserveScroll(); return;
  }
  const org      = gs.player;
  const assigned = org.roster.find(c => c.id === ev.assignedCharId);
  const cost     = calcBribeCost(ev.baseCost, assigned ? effectiveStat(assigned, 'charisma') : null);
  const cut      = (ev.giveCut && assigned) ? Math.round(cost * 0.10) : 0;
  if (org.cash < cost + cut) return;
  org.cash -= cost + cut;
  applyPoliticalControl(org.id, ev.politicianId, ev.ctrlGain);
  const pol     = gs.politicians.find(p => p.id === ev.politicianId);
  const newCtrl = pol ? Math.round(pol.control[String(org.id)] ?? 0) : ev.ctrlGain;
  let cutNote = '';
  if (cut > 0) {
    const loyGain = randInt(5, 10);
    boostLoyalty(assigned, loyGain);
    cutNote = ` Paid ${assigned.name} a ${fmt$(cut)} kickback (+${loyGain} loyalty).`;
  }
  markBusy(assigned);
  ev.state   = 'resolved';
  ev.outcome = { text: `${ev.politicianName} responds to your overtures in ${ev.borough}. Your control: ${newCtrl}%.${cutNote}`, positive: true };
  addLog(` – Politics: Bribed ${ev.politicianName} (${ev.borough}).`);
  renderPreserveScroll();
}

function setConflictMode(eventId, mode) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending') return;
  ev.conflictMode = mode; renderPreserveScroll();
}
function cancelAggress(eventId) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev) return;
  ev.conflictMode = null; ev.selectedFighters = []; renderPreserveScroll();
}
function toggleFighter(eventId, charId) {
  const ev  = gs.currentEvents.find(e => e.id === eventId);
  if (!ev) return;
  const idx = ev.selectedFighters.indexOf(charId);
  if (idx >= 0) ev.selectedFighters.splice(idx, 1); else ev.selectedFighters.push(charId);
  renderPreserveScroll();
}

function resolveAggress(eventId) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending' || ev.selectedFighters.length === 0) return;
  const org   = gs.player;
  const rival = gs.rivals.find(r => r.id === ev.rivalId);
  const pStr  = Math.round(ev.selectedFighters.reduce((s, id) => {
    const c = org.roster.find(m => m.id === id); return s + (c ? effectiveStat(c, 'toughness') : 0);
  }, 0) * orgSafehouseBonus(org));
  const win   = Math.random() < (pStr + ev.rivalStrength > 0 ? pStr / (pStr + ev.rivalStrength) : 0.5);
  // Fighters that survive (won't be known until casualties are applied, so mark all for now)
  const sentFighters = ev.selectedFighters.map(id => org.roster.find(c => c.id === id)).filter(Boolean);
  let txt = '', cutNote = '';
  if (win) {
    const rivF  = rival.roster.filter(c => c.role === 'soldier' || c.role === 'capo');
    const casCt = Math.min(randInt(1, 2), rivF.length);
    shuffle([...rivF]).slice(0, casCt).forEach(c => removeFromOrg(rival, c.id));
    const useCash = rival.businesses.length === 0 || Math.random() < 0.6;
    if (useCash) {
      const prize = randInt(2000, 8000);
      if (ev.giveCut && sentFighters.length) {
        const totalCut   = Math.round(prize * 0.10);
        const perFighter = Math.round(totalCut / sentFighters.length);
        const loyGain    = randInt(5, 10);
        sentFighters.forEach(c => { org.cash -= perFighter; boostLoyalty(c, loyGain); });
        cutNote = ` Shared ${fmt$(totalCut)} with the men (+${loyGain} loyalty each).`;
        org.cash += prize;
      } else {
        org.cash += prize;
      }
      txt = `Victory. Eliminated ${casCt} ${casCt===1?'enemy':'enemies'}. Seized ${fmt$(prize)}.${cutNote}`;
    } else {
      const biz = randFrom(rival.businesses);
      rival.businesses = rival.businesses.filter(b => b.id !== biz.id);
      org.businesses.push({ ...biz, managerId: null });
      if (ev.giveCut && sentFighters.length) {
        const loyGain = randInt(5, 10);
        sentFighters.forEach(c => boostLoyalty(c, loyGain));
        cutNote = ` Promised the men a share (+${loyGain} loyalty each).`;
      }
      txt = `Victory. Eliminated ${casCt} ${casCt===1?'enemy':'enemies'}. Seized ${biz.name}.${cutNote}`;
    }
  } else {
    const casCt = Math.min(randInt(1, 2), ev.selectedFighters.length);
    shuffle([...ev.selectedFighters]).slice(0, casCt).forEach(id => {
      org.roster = org.roster.filter(c => c.id !== id); uiState.expanded.delete(id);
    });
    const rs = rival.roster.filter(c => c.role === 'soldier');
    if (rs.length) removeFromOrg(rival, randFrom(rs).id);
    txt = `Defeat. Lost ${casCt} ${casCt===1?'man':'men'}. The ${ev.rivalFamilyName} held their ground.`;
  }
  // Mark all surviving sent fighters as busy next turn
  const survivingFighters = sentFighters.filter(c => org.roster.includes(c));
  survivingFighters.forEach(markBusy);
  if (win) {
    modifyRelationship(org.id, ev.rivalId, -randInt(12, 20), `Attacked the ${ev.rivalFamilyName}`);
  } else {
    modifyRelationship(org.id, ev.rivalId, -randInt(5, 10), `Failed assault on the ${ev.rivalFamilyName}`);
  }
  ev.state        = 'resolved';
  ev.outcome      = { text: txt, positive: win };
  ev.chosenAction = 'aggress';
  addLog(`⚔ Conflict vs. ${ev.rivalFamilyName}: ${txt}`);
  renderPreserveScroll();
}

function resolveConflictAction(eventId, action) {
  const ev = gs.currentEvents.find(e => e.id === eventId);
  if (!ev || ev.state !== 'pending') return;
  ev.chosenAction = action;
  if (action === 'defend') {
    ev.state   = 'resolved';
    ev.outcome = { text: 'Fortified positions. No action taken this quarter.', positive: null };
  } else if (action === 'negotiate') {
    if (gs.player.cash < ev.negotiateCost) return;
    gs.player.cash -= ev.negotiateCost;
    modifyRelationship(gs.player.id, ev.rivalId, randInt(6, 12), `Negotiated peace with the ${ev.rivalFamilyName}`);
    ev.state   = 'resolved';
    ev.outcome = { text: `Paid ${fmt$(ev.negotiateCost)} to ease tensions with the ${ev.rivalFamilyName}.`, positive: null };
    addLog(`Negotiated with ${ev.rivalFamilyName}. Paid ${fmt$(ev.negotiateCost)}.`);
  } else if (action === 'ignore') {
    ev.state   = 'skipped';
    ev.outcome = { text: 'Let it lie. For now.', positive: null };
  }
  renderPreserveScroll();
}

// ── GRAPHICS ──────────────────────────────────────────────

const LOGO_SVG = `<svg width="340" height="108" viewBox="0 0 340 108" xmlns="http://www.w3.org/2000/svg">
  <!-- thin top rule -->
  <line x1="20" y1="14" x2="340" y2="14" stroke="#c8952a" stroke-width="0.5" opacity="0.4"/>
  <!-- decorative side bars -->
  <rect x="20" y="22" width="2" height="48" fill="#c8952a" opacity="0.6"/>
  <rect x="318" y="22" width="2" height="48" fill="#c8952a" opacity="0.6"/>
  <!-- inner accent lines -->
  <line x1="28" y1="26" x2="28" y2="66" stroke="#c8952a" stroke-width="0.5" opacity="0.35"/>
  <line x1="312" y1="26" x2="312" y2="66" stroke="#c8952a" stroke-width="0.5" opacity="0.35"/>
  <!-- THE -->
  <text x="170" y="35" text-anchor="middle"
    font-family="Georgia,serif" font-size="10" letter-spacing="9" fill="#c8952a">THE</text>
  <!-- diamond dividers -->
  <polygon points="68,43 73,48 68,53 63,48" fill="#c8952a" opacity="0.7"/>
  <polygon points="277,43 272,48 277,53 282,48" fill="#c8952a" opacity="0.7"/>
  <line x1="28" y1="48" x2="60" y2="48" stroke="#c8952a" stroke-width="0.8" opacity="0.6"/>
  <line x1="76" y1="48" x2="264" y2="48" stroke="#c8952a" stroke-width="0.3" opacity="0.2"/>
  <line x1="280" y1="48" x2="312" y2="48" stroke="#c8952a" stroke-width="0.8" opacity="0.6"/>
  <!-- FIVE BOROUGHS -->
  <text x="170" y="68" text-anchor="middle"
    font-family="Georgia,serif" font-size="30" letter-spacing="2"
    fill="#e8d4a0" font-style="italic">Five Boroughs</text>
  <!-- subtitle -->
  <text x="170" y="84" text-anchor="middle"
    font-family="Georgia,serif" font-size="9" letter-spacing="5"
    fill="#c8952a" opacity="0.75">NEW YORK CITY · 1921</text>
  <!-- thin bottom rule -->
  <line x1="20" y1="94" x2="320" y2="94" stroke="#c8952a" stroke-width="0.5" opacity="0.4"/>
</svg>`;

const DON_AVATAR_SVG = `<svg width="72" height="80" viewBox="0 0 72 80" xmlns="http://www.w3.org/2000/svg">
  <!-- medallion background -->
  <circle cx="36" cy="36" r="33" fill="#1a1208" stroke="#c8952a" stroke-width="1.2" opacity="0.9"/>
  <!-- suit / shoulders -->
  <path d="M4 80 Q4 54 18 50 L26 58 L36 52 L46 58 L54 50 Q68 54 68 80 Z" fill="#161010"/>
  <!-- shirt & tie -->
  <path d="M30 52 L36 50 L42 52 L39 66 L36 72 L33 66 Z" fill="#e8e0d0" opacity="0.9"/>
  <path d="M34 54 L36 58 L38 54 L37 50 L35 50 Z" fill="#8b3a3a"/>
  <path d="M33 66 L36 74 L39 66 L36 69 Z" fill="#6a2828"/>
  <!-- lapels -->
  <path d="M26 58 L30 52 L36 56 L28 70 Z" fill="#1e1414"/>
  <path d="M46 58 L42 52 L36 56 L44 70 Z" fill="#1e1414"/>
  <!-- collar -->
  <path d="M30 52 L36 50 L36 56 Z" fill="#d0c8b8" opacity="0.8"/>
  <path d="M42 52 L36 50 L36 56 Z" fill="#d0c8b8" opacity="0.8"/>
  <!-- neck -->
  <rect x="31" y="46" width="10" height="8" rx="2" fill="#2a1e14"/>
  <!-- head -->
  <ellipse cx="36" cy="34" rx="14" ry="15" fill="#2a1e14"/>
  <!-- face shading -->
  <ellipse cx="36" cy="36" rx="10" ry="11" fill="#3a2818" opacity="0.7"/>
  <!-- eyes -->
  <ellipse cx="30" cy="33" rx="2.5" ry="1.8" fill="#1a1208"/>
  <ellipse cx="42" cy="33" rx="2.5" ry="1.8" fill="#1a1208"/>
  <circle cx="30.5" cy="33" r="0.8" fill="#4a3020" opacity="0.7"/>
  <circle cx="42.5" cy="33" r="0.8" fill="#4a3020" opacity="0.7"/>
  <!-- fedora brim -->
  <ellipse cx="36" cy="21" rx="21" ry="5" fill="#111008"/>
  <!-- fedora crown -->
  <path d="M18 21 Q18 6 36 6 Q54 6 54 21 Z" fill="#111008"/>
  <!-- hat band -->
  <path d="M18 21 Q18 17 36 17 Q54 17 54 21 Z" fill="#c8952a" opacity="0.7"/>
  <!-- hat highlight -->
  <ellipse cx="36" cy="21" rx="21" ry="5" fill="none" stroke="#c8952a" stroke-width="0.6" opacity="0.4"/>
</svg>`;

// ── RENDER HELPERS ────────────────────────────────────────

const STAT_COLORS = {
  charisma: '#c8952a', toughness: '#7a6860', cunning: '#508878', loyalty: '#7a5080'
};

function statBarsHtml(char) {
  return ['charisma','toughness','cunning','loyalty'].map(stat => {
    const val = char[stat] ?? 0, color = STAT_COLORS[stat];
    return `<div class="stat-bar">
      <span class="stat-lbl">${stat.slice(0,3).toUpperCase()}</span>
      <div class="stat-track"><div class="stat-fill" style="width:${val}%;background:${color}"></div></div>
      <span class="stat-val">${val}</span>
    </div>`;
  }).join('');
}

function memberHtml(char, org) {
  const exp    = uiState.expanded.has(char.id);
  const sr     = SALARY_RANGES[char.role];
  const editSal = uiState.editingSalary === char.id;
  const capoCt = org.roster.filter(c => c.role === 'capo').length;
  const hasDon = org.roster.some(c => c.role === 'don');

  let promoteLabel = null;
  if (char.role === 'soldier' && capoCt < MAX_CAPOS) promoteLabel = 'Promote to Capo';
  if (char.role === 'capo') {
    if (!org.roster.some(c => c.role === 'underboss'))      promoteLabel = 'Promote to Underboss';
    else if (!org.roster.some(c => c.role === 'consigliere')) promoteLabel = 'Promote to Consigliere';
  }
  if ((char.role === 'underboss' || char.role === 'consigliere') && !hasDon)
    promoteLabel = 'Promote to Don';

  let demoteLabel = null;
  if ((char.role === 'underboss' || char.role === 'consigliere') && capoCt < MAX_CAPOS) demoteLabel = 'Demote to Capo';
  if (char.role === 'capo') demoteLabel = 'Demote to Soldier';

  const canRemove = char.role !== 'don';

  const busy       = isCharBusy(char);
  const imprisoned = isImprisoned(char);
  const prisonLeft = imprisoned ? char.prisonUntilTurn - gs.turnCount : 0;
  return `<div class="member ${exp ? 'exp' : ''} ${busy ? 'char-busy' : ''} ${imprisoned ? 'char-imprisoned' : ''}" data-id="${char.id}">
    <div class="member-row" onclick="toggleMember(${char.id})">
      <span class="role-tag role-${char.role}">${ROLE_LABEL[char.role].toUpperCase()}</span>
      <span class="m-name">${char.name}${imprisoned ? ` <span class="prison-badge">imprisoned (${prisonLeft} qtr${prisonLeft !== 1 ? 's' : ''})</span>` : busy ? ' <span class="busy-badge">recovering</span>' : ''}</span>
      <span class="m-age">${char.age}</span>
      <span class="m-arrow">${exp ? '▲' : '▼'}</span>
    </div>
    ${exp ? `<div class="member-detail">
      ${char.role === 'don' ? `<div class="don-avatar-wrap">${DON_AVATAR_SVG}<span class="don-avatar-label">Don</span></div>` : ''}
      <div class="stat-bars">${statBarsHtml(char)}</div>
      <div class="salary-row">
        <span class="sal-label">SALARY</span>
        ${editSal
          ? `<input id="sal-${char.id}" class="sal-input" type="number"
                    value="${char.salary}" min="${sr.min}" max="${sr.max}"
                    onblur="saveSalary(${char.id})" onkeydown="salaryKey(event,${char.id})" />`
          : `<span class="sal-value" onclick="startEditSalary(${char.id});event.stopPropagation()">
               ${fmt$(char.salary)}<small>/qtr</small></span>`}
        <span class="sal-range">${fmt$(sr.min)}–${fmt$(sr.max)}</span>
      </div>
      ${char.role === 'soldier' ? (() => {
          const capoList = org.roster.filter(c => c.role === 'capo');
          if (!capoList.length) return '';
          return `<div class="capo-assign-row">
            <span class="sal-label">CAPO</span>
            <select class="capo-assign-select" onchange="assignSoldierToCapo(${char.id},this.value)" onclick="event.stopPropagation()">
              <option value="">— Unassigned —</option>
              ${capoList.map(cp => {
                const ct = org.roster.filter(s => s.capoId === cp.id).length;
                const cap  = soldierCapPerCapo(org);
                const full = ct >= cap && cp.id !== char.capoId;
                return `<option value="${cp.id}" ${char.capoId === cp.id ? 'selected' : ''} ${full ? 'disabled' : ''}>
                  ${cp.name} (${ct}/${cap})</option>`;
              }).join('')}
            </select>
          </div>`;
        })() : ''}
      <div class="action-row">
        ${promoteLabel ? `<button class="btn btn-pos" onclick="promoteChar(${char.id});event.stopPropagation()">${promoteLabel}</button>` : ''}
        ${demoteLabel  ? `<button class="btn btn-neu" onclick="demoteChar(${char.id});event.stopPropagation()">${demoteLabel}</button>`  : ''}
        ${canRemove    ? `<button class="btn btn-neg" onclick="removeChar(${char.id});event.stopPropagation()">Remove</button>`           : ''}
      </div>
    </div>` : ''}
  </div>`;
}

function vacantHtml(role) {
  return `<div class="member vacant"><div class="member-row">
    <span class="role-tag role-${role} vacant-tag">${ROLE_LABEL[role].toUpperCase()}</span>
    <span class="m-name dim">— Vacant —</span>
  </div></div>`;
}

function orgTreeHtml(org) {
  const roster   = org.roster;
  const don      = roster.find(c => c.role === 'don');
  const con      = roster.find(c => c.role === 'consigliere');
  const ub       = roster.find(c => c.role === 'underboss');
  const capos    = roster.filter(c => c.role === 'capo');
  const soldiers = roster.filter(c => c.role === 'soldier');

  let h = don ? memberHtml(don, org) : vacantHtml('don');
  h += '<div class="tree-indent">';
  h += con ? memberHtml(con, org) : vacantHtml('consigliere');
  h += ub  ? memberHtml(ub,  org) : vacantHtml('underboss');
  capos.forEach(capo => {
    h += memberHtml(capo, org);
    const mySoldiers = soldiers.filter(s => s.capoId === capo.id);
    if (mySoldiers.length) {
      h += '<div class="tree-indent">';
      mySoldiers.forEach(s => { h += memberHtml(s, org); });
      h += '</div>';
    }
  });
  const unassigned = soldiers.filter(s => !capos.some(c => c.id === s.capoId));
  if (unassigned.length) {
    h += `<div class="section-label">Unassigned Soldiers</div>`;
    h += '<div class="tree-indent">';
    unassigned.forEach(s => { h += memberHtml(s, org); });
    h += '</div>';
  }
  h += '</div>';
  return h;
}

// ── RIVAL MODAL ───────────────────────────────────────────

function openRivalModal(rivalId) {
  uiState.viewingRival = rivalId;
  renderPreserveScroll();
}
function closeRivalModal() {
  uiState.viewingRival  = null;
  uiState.lastRaidResult = null;
  renderPreserveScroll();
}
function setIntelAgent(bizId, charIdStr) {
  uiState.intelAgents[bizId] = charIdStr ? Number(charIdStr) : null;
  renderPreserveScroll();
}
function setRaidMode(bizId, mode) {
  uiState.raidMode[bizId] = mode;
  renderPreserveScroll();
}
function toggleRaidFighter(bizId, charId) {
  if (!uiState.raidFighters[bizId]) uiState.raidFighters[bizId] = new Set();
  const s = uiState.raidFighters[bizId];
  if (s.has(charId)) s.delete(charId); else s.add(charId);
  renderPreserveScroll();
}

function gatherIntel(bizId) {
  const agentId = uiState.intelAgents[bizId];
  if (!agentId) return;
  const agent = gs.player.roster.find(c => c.id === agentId);
  if (!agent || isCharBusy(agent)) return;

  // Find rival owning this business
  let targetBiz = null, targetRival = null;
  for (const r of gs.rivals) {
    const b = r.businesses.find(b => b.id === bizId);
    if (b) { targetBiz = b; targetRival = r; break; }
  }
  if (!targetBiz) return;

  const trueDefenses   = randInt(15, 80);
  const trueProfit     = Math.round(orgIncome(targetRival) / Math.max(1, targetRival.businesses.length));
  const eCunning       = effectiveStat(agent, 'cunning');
  // Margin of error: 0% at CUN 100, up to 40% at CUN 0
  const marginPct      = Math.round((100 - eCunning) * 0.4);
  const applyErr = v => Math.max(1, Math.round(v * (1 + (randInt(-marginPct, marginPct)) / 100)));
  gs.playerIntel[bizId] = {
    defenses:     applyErr(trueDefenses),
    profitPerQtr: applyErr(trueProfit),
    marginPct,
    turnGathered: gs.turnCount
  };
  markBusy(agent);
  delete uiState.intelAgents[bizId];
  addLog(` – Intel: ${agent.name} gathered intel on ${targetBiz.name}.`);
  renderPreserveScroll();
}

function executeRaid(bizId) {
  const intel    = gs.playerIntel[bizId];
  const mode     = uiState.raidMode[bizId];
  const fighters = [...(uiState.raidFighters[bizId] ?? new Set())];
  if (!intel || !mode || fighters.length === 0) return;

  let targetBiz = null, targetRival = null;
  for (const r of gs.rivals) {
    const b = r.businesses.find(b => b.id === bizId);
    if (b) { targetBiz = b; targetRival = r; break; }
  }
  if (!targetBiz) { delete gs.playerIntel[bizId]; return; }

  const org       = gs.player;
  const sentChars = fighters.map(id => org.roster.find(c => c.id === id)).filter(Boolean);
  const pStr      = Math.round(sentChars.reduce((s, c) => s + effectiveStat(c, 'toughness'), 0) * orgSafehouseBonus(org));
  // Takeover is 50% harder (×2.1 vs ×1.4 previously)
  const threshold = mode === 'takeover' ? intel.defenses * 2.1 : intel.defenses;
  const win       = Math.random() < (pStr / (pStr + threshold));

  sentChars.forEach(markBusy);
  delete gs.playerIntel[bizId];
  delete uiState.raidMode[bizId];
  delete uiState.raidFighters[bizId];

  const notes = [];

  if (win) {
    if (mode === 'sabotage') {
      targetBiz.sabotagedUntilTurn = gs.turnCount + 2;
      modifyRelationship(org.id, targetRival.id, -randInt(15, 25), `Sabotaged ${targetBiz.name}`);
      notes.push(`${targetBiz.name} has been crippled — income halved for 2 turns.`);
      addLog(`Raid (sabotage): ${targetBiz.name} crippled for 2 turns.`);
    } else {
      targetRival.businesses = targetRival.businesses.filter(b => b.id !== bizId);
      org.businesses.push({ ...targetBiz, managerId: null, sabotagedUntilTurn: null });
      modifyRelationship(org.id, targetRival.id, -randInt(22, 35), `Seized ${targetBiz.name}`);
      notes.push(`${targetBiz.name} has been seized from the ${targetRival.familyName}.`);
      addLog(`Raid (takeover): Seized ${targetBiz.name} from ${targetRival.familyName}.`);
    }
    // Chance one fighter gets arrested during a successful raid (15%)
    const survivingChars = sentChars.filter(c => org.roster.some(r => r.id === c.id));
    survivingChars.forEach(c => {
      if (Math.random() < 0.15) {
        const sentence = randInt(1, 5);
        imprison(c, sentence);
        notes.push(`${c.name} was arrested during the operation (${sentence} quarter${sentence !== 1 ? 's' : ''}).`);
        addLog(`🚔 ${c.name} arrested during raid on ${targetBiz.name}. ${sentence} quarter${sentence !== 1 ? 's' : ''} in prison.`);
      }
    });
  } else {
    modifyRelationship(org.id, targetRival.id, -randInt(8, 14), `Failed raid on ${targetBiz.name}`);
    notes.push(`The raid on ${targetBiz.name} failed.`);
    // On failure, 1 fighter is killed or imprisoned
    if (sentChars.length) {
      const casualty = randFrom(sentChars);
      if (Math.random() < 0.5) {
        removeFromOrg(org, casualty.id);
        notes.push(`${casualty.name} was killed in the operation.`);
        addLog(`Raid failed on ${targetBiz.name}. ${casualty.name} killed.`);
      } else {
        const sentence = randInt(2, 8);
        imprison(casualty, sentence);
        notes.push(`${casualty.name} was arrested — ${sentence} quarter${sentence !== 1 ? 's' : ''} in prison.`);
        addLog(`Raid failed on ${targetBiz.name}. ${casualty.name} arrested (${sentence} qtrs).`);
      }
    }
  }

  uiState.lastRaidResult = { success: win, mode, bizName: targetBiz.name, notes };
  renderPreserveScroll();
}

function openFamilyModal(orgId)  { uiState.viewingFamily = orgId;   renderPreserveScroll(); }
function closeFamilyModal()      { uiState.viewingFamily = null;    renderPreserveScroll(); }

function renderFamilyModal() {
  const orgId = uiState.viewingFamily;
  const all   = allOrgs();
  const org   = all.find(o => o.id === orgId);
  if (!org) return '';

  const color    = FAMILY_COLORS[org.colorIndex];
  const don      = org.roster.find(c => c.role === 'don');
  const isPlayer = org.isPlayer;

  // ── Don profile ──
  const donHtml = don ? `
    <div class="fm-don-wrap">
      <div class="fm-don-avatar">${DON_AVATAR_SVG}</div>
      <div class="fm-don-info">
        <div class="fm-don-name" style="color:${color}">${don.name}</div>
        <div class="fm-don-meta">Don · Age ${don.age}</div>
        <div class="fm-don-stats">
          <span class="fm-stat"><span class="fm-stat-lbl" style="color:#c8952a">CHA</span> ${don.charisma}</span>
          <span class="fm-stat"><span class="fm-stat-lbl" style="color:#7a6860">TOU</span> ${don.toughness}</span>
          <span class="fm-stat"><span class="fm-stat-lbl" style="color:#508878">CUN</span> ${don.cunning}</span>
          <span class="fm-stat"><span class="fm-stat-lbl" style="color:#7a5080">LOY</span> ${don.loyalty}</span>
        </div>
        <div class="fm-don-roster">
          ${org.roster.length} members &nbsp;·&nbsp;
          ${org.roster.filter(c=>c.role==='capo').length} capos &nbsp;·&nbsp;
          ${org.roster.filter(c=>c.role==='soldier').length} soldiers
        </div>
      </div>
    </div>` : `<div class="fm-vacant">Don's seat is vacant.</div>`;

  // ── Relationships ──
  const others = all.filter(o => o.id !== orgId);
  const relRows = others.map(other => {
    const score = getRelationship(orgId, other.id);
    const lbl   = relLabel(score);
    const pct   = ((score + 100) / 200 * 100).toFixed(0); // 0–100% bar width
    const rel   = gs.relationships?.[relKey(orgId, other.id)];
    const history = rel?.history ?? [];
    return `<div class="fm-rel-row">
      <div class="fm-rel-header">
        <span class="fm-rel-dot" style="background:${FAMILY_COLORS[other.colorIndex]}"></span>
        <span class="fm-rel-name ${other.isPlayer ? 'fm-player' : ''}">${other.familyName}</span>
        <span class="fm-rel-badge" style="background:${lbl.color}22;color:${lbl.color};border-color:${lbl.color}55">${lbl.text}</span>
        <span class="fm-rel-score" style="color:${lbl.color}">${score > 0 ? '+' : ''}${score}</span>
      </div>
      <div class="fm-rel-track">
        <div class="fm-rel-neutral"></div>
        <div class="fm-rel-fill" style="width:${pct}%;background:${lbl.color}"></div>
      </div>
      ${history.length ? `<div class="fm-rel-history">${history.slice(0,3).map(h =>
        `<div class="fm-rel-event">
          <span class="fm-rel-turn">Q${h.turn}</span>
          <span class="fm-rel-delta ${h.delta >= 0 ? 'pos' : 'neg'}">${h.delta >= 0 ? '+' : ''}${h.delta}</span>
          <span class="fm-rel-reason">${h.reason}</span>
        </div>`).join('')}</div>` : ''}
    </div>`;
  }).join('');

  return `<div class="family-modal-overlay" onclick="closeFamilyModal()">
    <div class="family-modal" onclick="event.stopPropagation()">
      <div class="family-modal-header" style="border-bottom-color:${color}">
        <div>
          <div class="family-modal-title" style="color:${color}">${org.familyName} Family</div>
          <div class="family-modal-sub">${org.borough} · ${(org.influence*100).toFixed(1)}% influence${isPlayer ? ' · Your Family' : ''}</div>
        </div>
        <button class="rival-modal-close" onclick="closeFamilyModal()">✕</button>
      </div>
      <div class="family-modal-body">
        <div class="fm-section-head">Don's Profile</div>
        ${donHtml}
        <div class="fm-section-head" style="margin-top:18px">Family Relations</div>
        <div class="fm-rel-note">Relationship scores shift with every conflict, negotiation, defection, and raid.</div>
        ${relRows}
      </div>
    </div>
  </div>`;
}

function renderRivalModal() {
  const rival = gs.rivals.find(r => r.id === uiState.viewingRival);
  if (!rival) return '';
  const org   = gs.player;
  const color = FAMILY_COLORS[rival.colorIndex];

  // Roster section — redacted stats (we see names/roles/age only)
  const rosterRows = rival.roster.map(c => `
    <div class="rm-member-row">
      <span class="role-tag role-${c.role}" style="border-color:${color}">${ROLE_LABEL[c.role].toUpperCase()}</span>
      <span class="rm-name">${c.name}</span>
      <span class="rm-age">Age ${c.age}</span>
    </div>`).join('');

  // Businesses section
  const availAgents = org.roster.filter(c => !isCharUnavailable(c) && !isManagingBusiness(org, c.id));
  const bizRows = rival.businesses.map(b => {
    const intel = gs.playerIntel[b.id];
    const mode  = uiState.raidMode[b.id] ?? null;
    const raidFighters = uiState.raidFighters[b.id] ?? new Set();
    const raidPStr = [...raidFighters].reduce((s, id) => {
      const c = org.roster.find(m => m.id === id);
      return s + (c ? effectiveStat(c, 'toughness') : 0);
    }, 0);
    const raidAvailable = org.roster.filter(c =>
      (c.role === 'soldier' || c.role === 'capo') && !isCharUnavailable(c));

    if (!intel) {
      // No intel yet — show gather-intel UI
      const selAgent = uiState.intelAgents[b.id] ?? null;
      return `<div class="rm-biz-row">
        <div class="rm-biz-header">
          <span class="rm-biz-name">${b.name}</span>
          <span class="rm-biz-income unknown">Income: ???</span>
          <span class="rm-biz-def unknown">Defenses: Unknown</span>
        </div>
        <div class="rm-intel-row">
          <span class="rm-intel-lbl">Send agent:</span>
          <select class="assign-select rm-select" onchange="setIntelAgent(${b.id},this.value)">
            <option value="">— Pick an agent —</option>
            ${availAgents.map(c => `<option value="${c.id}" ${selAgent === c.id ? 'selected' : ''}>
              ${c.name} (${ROLE_LABEL[c.role]}) CUN ${effectiveStat(c,'cunning')}</option>`).join('')}
          </select>
          <button class="btn-rm-intel" onclick="gatherIntel(${b.id})" ${!selAgent ? 'disabled' : ''}>Gather Intel</button>
        </div>
      </div>`;
    }

    // Intel known — show data + raid UI
    const winPct = mode ? Math.round(raidPStr / (raidPStr + (mode === 'takeover' ? intel.defenses * 2.1 : intel.defenses)) * 100) : 0;
    const mLabel = intel.marginPct > 0 ? ` ±${intel.marginPct}%` : '';
    return `<div class="rm-biz-row rm-biz-known">
      <div class="rm-biz-header">
        <span class="rm-biz-name">${b.name}</span>
        <span class="rm-biz-income">~${fmt$(intel.profitPerQtr)}/qtr${mLabel}</span>
        <span class="rm-biz-def">Defenses: ~${intel.defenses}${mLabel}</span>
        <span class="rm-intel-badge">Intel ✓</span>
      </div>
      <div class="rm-raid-section">
        <div class="rm-raid-modes">
          <button class="btn-rm-mode ${mode==='sabotage'?'active':''}" onclick="setRaidMode(${b.id},'sabotage')">
            Sabotage<small>Halve income for 2 turns</small>
          </button>
          <button class="btn-rm-mode ${mode==='takeover'?'active':''}" onclick="setRaidMode(${b.id},'takeover')">
            Take Over<small>Seize the business</small>
          </button>
        </div>
        ${mode ? `
        <div class="rm-fighter-list">
          ${raidAvailable.length === 0 ? '<div class="warn-text">No available fighters.</div>' :
            raidAvailable.map(c => `<div class="rm-fighter-row" onclick="toggleRaidFighter(${b.id},${c.id})">
              <input type="checkbox" ${raidFighters.has(c.id)?'checked':''} onclick="event.stopPropagation()">
              <span>${c.name}</span>
              <span class="fighter-role">${ROLE_LABEL[c.role]}</span>
              <span class="fighter-tou">TOU ${effectiveStat(c,'toughness')}</span>
            </div>`).join('')}
        </div>
        ${raidFighters.size > 0 ? `
        <div class="rm-raid-odds">
          <span>Est. win chance: <b class="${winPct>=50?'pos':'neg'}">${winPct}%</b></span>
          ${mode==='takeover'?'<small class="cut-preview">(Take-over requires 40% more strength)</small>':''}
        </div>
        <button class="btn-rm-execute" onclick="executeRaid(${b.id})">
          ${mode === 'sabotage' ? 'Launch Sabotage' : 'Launch Takeover'}
        </button>` : ''}` : ''}
      </div>
    </div>`;
  }).join('') || '<div class="rm-empty">No business interests on record.</div>';

  return `<div class="rival-modal-overlay" onclick="closeRivalModal()">
    <div class="rival-modal" onclick="event.stopPropagation()">
      <div class="rival-modal-header" style="border-bottom-color:${color}">
        <div>
          <span class="rival-modal-title" style="color:${color}">${rival.familyName} Family</span>
          <span class="rival-modal-borough">${rival.borough}</span>
        </div>
        <button class="rival-modal-close" onclick="closeRivalModal()">✕</button>
      </div>
      <div class="rival-modal-body">
        ${uiState.lastRaidResult ? (() => {
          const r = uiState.lastRaidResult;
          const cls = r.success ? 'rm-result-banner success' : 'rm-result-banner failure';
          return `<div class="${cls}">
            <div class="rm-result-title">${r.success ? (r.mode === 'sabotage' ? 'Sabotage Successful' : 'Takeover Successful') : 'Raid Failed'}</div>
            ${r.notes.map(n => `<div class="rm-result-note">${n}</div>`).join('')}
          </div>`;
        })() : ''}
        <div class="rm-section-label">LEADERSHIP &amp; ROSTER</div>
        <div class="rm-roster">${rosterRows}</div>
        <div class="rm-section-label">BUSINESS INTERESTS</div>
        <div class="rm-businesses">${bizRows}</div>
      </div>
    </div>
  </div>`;
}

// ── EVENT CARD RENDERS ────────────────────────────────────

const CARD_TYPE_LABEL = {
  storyline:'STORYLINE', recruit:'RECRUITMENT', finance:'FINANCIAL',
  political:'POLITICAL', conflict:'CONFLICT', arc:'NARRATIVE ARC'
};

function renderEventCard(ev) {
  const pending = ev.state === 'pending';
  const negCls  = ev.outcome?.positive === false ? ' neg-outcome' : '';
  const titles  = {
    storyline: ev.title  || 'This Quarter',
    recruit:   'Choose a Recruit',
    finance:   ev.name   || 'Financial Opportunity',
    political: ev.politicianName || 'Political Opportunity',
    conflict:  ev.rivalName      || 'Conflict',
    arc:       ev.title  || 'Narrative Arc'
  };
  const bodies = { storyline: renderStorylineBody,
                   recruit: renderRecruitBody, finance: renderFinanceBody,
                   political: renderPoliticalBody, conflict: renderConflictBody,
                   arc: renderArcBody };
  return `<div class="event-card ${ev.state}${negCls}">
    <div class="card-header">
      <span class="card-type-tag card-type-${ev.type}">${CARD_TYPE_LABEL[ev.type] ?? ev.type.toUpperCase()}</span>
      <span class="card-title">${titles[ev.type] ?? ''}</span>
      ${ev.state === 'resolved' ? '<span class="card-check">✓</span>' : ''}
      ${ev.state === 'skipped'  ? '<span class="card-skip">—</span>'  : ''}
    </div>
    ${pending ? (bodies[ev.type] ?? (() => ''))(ev) : resolvedBodyHtml(ev)}
  </div>`;
}

function renderArcBody(ev) {
  if (ev.arcPhase === 0) {
    return `<div class="card-body">
      <div class="arc-narrative arc-neu">${ev.narrative}</div>
      <div class="arc-choices">
        ${ev.choices.map((c, i) => `
          <button class="btn-arc-choice" onclick="resolveArcChoice(${ev.id}, ${i})">
            <span class="arc-choice-label">${c.label}</span>
            <span class="arc-choice-desc">${c.desc}</span>
          </button>`).join('')}
      </div>
    </div>`;
  }
  const cls = ev.outcome?.positive === true ? 'arc-pos' : ev.outcome?.positive === false ? 'arc-neg' : 'arc-neu';
  return `<div class="card-body">
    <div class="arc-narrative ${cls}">${ev.narrative}</div>
    <div class="card-actions">
      <button class="btn-card-neu" onclick="acknowledgeArcOutcome(${ev.id})">Acknowledge</button>
    </div>
  </div>`;
}

function resolvedBodyHtml(ev) {
  const cls = ev.outcome?.positive === true ? 'pos' : ev.outcome?.positive === false ? 'neg' : 'neu';
  return `<div class="card-outcome ${cls}">${ev.outcome?.text ?? ''}</div>`;
}

function renderStorylineBody(ev) {
  const cls = ev.positive === true ? 'storyline-pos' : ev.positive === false ? 'storyline-neg' : 'storyline-neu';
  return `<div class="card-body">
    <div class="storyline-narrative ${cls}">${ev.text}</div>
    <div class="card-actions">
      <button class="btn-card-neu" onclick="acknowledgeStoryline(${ev.id})">Acknowledge</button>
    </div>
  </div>`;
}

function renderRecruitBody(ev) {
  const org     = gs.player;
  const capos   = org.roster.filter(c => c.role === 'capo');
  const soldCt  = org.roster.filter(c => c.role === 'soldier').length;
  const soldMax = capos.length * soldierCapPerCapo(org);
  const full    = soldCt >= soldMax;
  let h = `<div class="card-body">
    <div class="card-desc">Three men are looking for work. Choose one, or decline all.</div>
    ${full ? `<div class="warn-text">Soldier roster is full (${soldCt}/${soldMax}). Promote a soldier to Capo or remove a member first.</div>` : ''}
    <div class="candidate-grid">`;
  ev.candidates.forEach((c, i) => {
    h += `<div class="candidate-card">
      <div class="candidate-name">${c.name}</div>
      <div class="candidate-age">Age ${c.age}</div>
      <div class="candidate-stats">
        <span>CHA <b>${c.charisma}</b></span><span>TOU <b>${c.toughness}</b></span>
        <span>CUN <b>${c.cunning}</b></span><span>LOY <b>${c.loyalty}</b></span>
      </div>
      <div class="candidate-sal">${fmt$(c.salary)}/qtr</div>
      <button class="btn-recruit" onclick="recruitCandidate(${ev.id},${i})" ${full ? 'disabled' : ''}>Recruit</button>
    </div>`;
  });
  h += `</div><div class="card-actions">
    <button class="btn-card-neg" onclick="declineRecruitment(${ev.id})">Decline All</button>
  </div></div>`;
  return h;
}

function renderFinanceBody(ev) {
  const org = gs.player;
  // Managers and busy chars can't be assigned
  const eligibleChars = org.roster.filter(c => !isManagingBusiness(org, c.id) && !isCharUnavailable(c));
  if (ev.assignedCharId && !eligibleChars.find(c => c.id === ev.assignedCharId))
    ev.assignedCharId = null;
  const assigned  = eligibleChars.find(c => c.id === ev.assignedCharId) ?? null;
  const adjOdds   = calcAdjustedOdds(ev.baseOdds, assigned ? effectiveStat(assigned, 'cunning') : null);
  const adjPct    = pct(adjOdds), basePct = pct(ev.baseOdds), diff = adjPct - basePct;
  const netGain   = Math.round(ev.cost * ev.mult) - ev.cost;
  const cutAmt    = assigned && ev.giveCut ? Math.round(netGain * 0.10) : 0;

  // Political asset
  const availPols = gs.politicians.filter(p => (p.control[String(org.id)] ?? 0) >= 10);
  const selPol    = ev.selectedPolId ? gs.politicians.find(p => p.id === ev.selectedPolId) : null;
  const polCtrl   = selPol ? Math.round(selPol.control[String(org.id)] ?? 0) : 0;
  const polFee    = selPol ? Math.round(400 + (100 - polCtrl) * 12) : 0;
  const polBonus  = selPol ? polCtrl / 100 * 0.15 : 0;
  const finalOdds = Math.max(0.05, Math.min(0.95, adjOdds + polBonus));
  const finalPct  = pct(finalOdds);
  const totalCost = ev.cost + polFee;
  const canAfford = org.cash >= totalCost;

  return `<div class="card-body">
    <div class="card-desc">${ev.desc}</div>
    <div class="card-detail-row"><span class="lbl">Investment</span><span class="val neg">-${fmt$(ev.cost)}</span></div>
    <div class="card-detail-row"><span class="lbl">On success</span><span class="val pos">+${fmt$(netGain)} net &mdash; ${fmtPctGain(estimateFinGain(netGain))} influence</span></div>
    <div class="card-detail-row"><span class="lbl">Base odds</span><span class="val">${basePct}%</span></div>
    <div class="card-divider"></div>
    <div class="card-assign">
      <label>ASSIGN MEMBER &mdash; Cunning improves odds (&plusmn;15%)</label>
      <select class="assign-select" onchange="assignCharToCard(${ev.id}, this.value)">
        <option value="">— No assignment —</option>
        ${eligibleChars.map(c => `<option value="${c.id}" ${ev.assignedCharId === c.id ? 'selected' : ''}>
          ${c.name} &mdash; ${ROLE_LABEL[c.role]} &mdash; CUN: ${c.cunning} &mdash; LOY: ${c.loyalty}</option>`).join('')}
      </select>
    </div>
    ${assigned ? `<div class="card-detail-row"><span class="lbl">Adjusted odds</span>
      <span class="val ${diff >= 0 ? 'pos' : 'neg'}">${adjPct}% <small>(${diff >= 0 ? '+' : ''}${diff}%)</small></span></div>
    <div class="card-cut-row">
      <label class="cut-label">
        <input type="checkbox" onchange="toggleCut(${ev.id},this.checked)" ${ev.giveCut ? 'checked' : ''}>
        Give ${assigned.name} a 10% cut on success <small class="cut-preview">(${fmt$(cutAmt)} &mdash; +5–10 loyalty)</small>
      </label>
    </div>` : ''}
    ${availPols.length ? `<div class="card-divider"></div>
    <div class="card-assign pol-asset-section">
      <label>TAP A POLITICAL ASSET &mdash; Pay a fee; they act only if they trust you</label>
      <select class="assign-select" onchange="assignPolToCard(${ev.id}, this.value)">
        <option value="">— No political asset —</option>
        ${availPols.map(p => {
          const ctrl = Math.round(p.control[String(org.id)] ?? 0);
          const fee  = Math.round(1000 + (100 - ctrl) * 30);
          return `<option value="${p.id}" ${ev.selectedPolId === p.id ? 'selected' : ''}>
            ${p.name} &mdash; ${ctrl}% control &mdash; fee ${fmt$(fee)}</option>`;
        }).join('')}
      </select>
    </div>
    ${selPol ? `<div class="card-detail-row"><span class="lbl">Compliance chance</span>
        <span class="val">${polCtrl}%</span></div>
      <div class="card-detail-row"><span class="lbl">Fee (win or lose)</span>
        <span class="val neg">-${fmt$(polFee)}</span></div>
      <div class="card-detail-row"><span class="lbl">If complies</span>
        <span class="val pos">+${Math.round(polBonus * 100)}% odds → ${finalPct}% total</span></div>` : ''}` : ''}
    ${!canAfford ? `<div class="warn-text">Insufficient funds — need ${fmt$(totalCost)}</div>` : ''}
    <div class="card-actions">
      <button class="btn-card-pos" onclick="resolveFinance(${ev.id},true)" ${!canAfford ? 'disabled' : ''}>Accept</button>
      <button class="btn-card-neg" onclick="resolveFinance(${ev.id},false)">Pass</button>
    </div>
  </div>`;
}

function renderPoliticalBody(ev) {
  const org           = gs.player;
  const eligibleChars = org.roster.filter(c => !isCharUnavailable(c));
  if (ev.assignedCharId && !eligibleChars.find(c => c.id === ev.assignedCharId))
    ev.assignedCharId = null;
  const assigned  = eligibleChars.find(c => c.id === ev.assignedCharId) ?? null;
  const cost      = calcBribeCost(ev.baseCost, assigned ? effectiveStat(assigned, 'charisma') : null);
  const savings   = ev.baseCost - cost;
  const cutAmt    = assigned && ev.giveCut ? Math.round(cost * 0.10) : 0;
  const canAfford = org.cash >= cost + cutAmt;
  const pol       = gs.politicians.find(p => p.id === ev.politicianId);
  const myCtrl    = pol ? Math.round(pol.control[String(org.id)] ?? 0) : 0;

  return `<div class="card-body">
    <div class="card-desc">${ev.desc}</div>
    <div class="card-detail-row"><span class="lbl">Borough</span><span class="val">${ev.borough}</span></div>
    <div class="card-detail-row"><span class="lbl">Base bribe</span><span class="val neg">-${fmt$(ev.baseCost)}</span></div>
    <div class="card-detail-row"><span class="lbl">Your current control</span><span class="val">${myCtrl}%</span></div>
    <div class="card-detail-row"><span class="lbl">Control gain</span><span class="val pos">+${ev.ctrlGain} pts &mdash; ${fmtPctGain(estimatePolGain(ev.ctrlGain))}</span></div>
    <div class="card-divider"></div>
    <div class="card-assign">
      <label>ASSIGN MEMBER &mdash; Charisma reduces cost (up to &minus;20%)</label>
      <select class="assign-select" onchange="assignCharToCard(${ev.id}, this.value)">
        <option value="">— No assignment —</option>
        ${eligibleChars.map(c => `<option value="${c.id}" ${ev.assignedCharId === c.id ? 'selected' : ''}>
          ${c.name} &mdash; ${ROLE_LABEL[c.role]} &mdash; CHA: ${c.charisma} &mdash; LOY: ${c.loyalty}</option>`).join('')}
      </select>
    </div>
    ${assigned && savings > 0 ? `<div class="card-detail-row"><span class="lbl">Effective cost</span>
      <span class="val pos">${fmt$(cost)} <small>(save ${fmt$(savings)})</small></span></div>` : ''}
    ${assigned ? `<div class="card-cut-row">
      <label class="cut-label">
        <input type="checkbox" onchange="toggleCut(${ev.id},this.checked)" ${ev.giveCut ? 'checked' : ''}>
        Give ${assigned.name} a 10% kickback <small class="cut-preview">(${fmt$(cutAmt)} &mdash; +5–10 loyalty)</small>
      </label>
    </div>` : ''}
    ${!canAfford ? `<div class="warn-text">Insufficient funds — need ${fmt$(cost + cutAmt)}</div>` : ''}
    <div class="card-actions">
      <button class="btn-card-pos" onclick="resolvePolitical(${ev.id},true)" ${!canAfford ? 'disabled' : ''}>Pay Bribe</button>
      <button class="btn-card-neg" onclick="resolvePolitical(${ev.id},false)">Pass</button>
    </div>
  </div>`;
}

function renderConflictBody(ev) {
  const org = gs.player;
  let h = `<div class="card-body"><div class="card-desc">${ev.desc}</div>`;

  if (ev.conflictMode === 'aggress') {
    // Available fighters: exclude busy chars
    const fighters     = org.roster.filter(c => (c.role === 'soldier' || c.role === 'capo') && !isCharUnavailable(c));
    const busyFighters = org.roster.filter(c => (c.role === 'soldier' || c.role === 'capo') && isCharUnavailable(c));
    // Remove any busy selected fighters
    ev.selectedFighters = ev.selectedFighters.filter(id => fighters.some(c => c.id === id));
    const pStr = Math.round(ev.selectedFighters.reduce((s, id) => {
      const c = org.roster.find(m => m.id === id); return s + (c ? effectiveStat(c, 'toughness') : 0);
    }, 0) * orgSafehouseBonus(org));
    const total  = pStr + ev.rivalStrength;
    const winPct = total > 0 ? Math.round(pStr / total * 100) : 50;

    if (fighters.length === 0 && busyFighters.length > 0) {
      h += `<div class="warn-text">All available fighters are recovering from last turn's action.</div>`;
    } else if (fighters.length === 0) {
      h += `<div class="warn-text">No soldiers or capos available to send.</div>`;
    } else {
      h += `<div class="fighter-list-label">SELECT FIGHTERS</div><div class="fighter-list">`;
      fighters.forEach(c => {
        const chk = ev.selectedFighters.includes(c.id);
        h += `<div class="fighter-row" onclick="toggleFighter(${ev.id},${c.id})">
          <input type="checkbox" class="fighter-check" ${chk ? 'checked' : ''}
                 onchange="toggleFighter(${ev.id},${c.id})" onclick="event.stopPropagation()">
          <span class="fighter-name">${c.name}</span>
          <span class="fighter-role">${ROLE_LABEL[c.role]}</span>
          <span class="fighter-tou">TOU ${c.toughness}</span>
          <span class="fighter-loy">LOY ${c.loyalty}</span>
        </div>`;
      });
      h += `</div>`;
      if (busyFighters.length) h += `<div class="warn-text dim-text">${busyFighters.length} fighter${busyFighters.length>1?'s are':' is'} recovering and unavailable.</div>`;
      h += `<div class="card-detail-row"><span class="lbl">Your strength</span><span class="val">${pStr}</span></div>
        <div class="card-detail-row"><span class="lbl">Est. win chance</span>
          <span class="val ${winPct >= 50 ? 'pos' : 'neg'}">${winPct}%</span></div>`;
      if (ev.selectedFighters.length > 0) {
        h += `<div class="card-cut-row">
          <label class="cut-label">
            <input type="checkbox" onchange="toggleCut(${ev.id},this.checked)" ${ev.giveCut ? 'checked' : ''}>
            Promise a share of the spoils <small class="cut-preview">(10% of cash prize on win &mdash; +5–10 loyalty each)</small>
          </label>
        </div>`;
      }
    }
    h += `<div class="card-actions">
      <button class="btn-card-pos" onclick="resolveAggress(${ev.id})" ${ev.selectedFighters.length === 0 ? 'disabled' : ''}>Attack</button>
      <button class="btn-card-neg" onclick="cancelAggress(${ev.id})">Cancel</button>
    </div>`;
  } else {
    h += `<div class="conflict-actions">
      <button class="btn-conflict aggress"   onclick="setConflictMode(${ev.id},'aggress')">
        <div class="cf-title">Aggress</div>
        <div class="cf-desc">Send men to strike their operations</div>
      </button>
      <button class="btn-conflict defend"    onclick="resolveConflictAction(${ev.id},'defend')">
        <div class="cf-title">Defend</div>
        <div class="cf-desc">Fortify positions this quarter</div>
      </button>
      <button class="btn-conflict negotiate" onclick="resolveConflictAction(${ev.id},'negotiate')">
        <div class="cf-title">Negotiate</div>
        <div class="cf-desc">Pay ${fmt$(ev.negotiateCost)} to ease tensions</div>
      </button>
      <button class="btn-conflict ignore"    onclick="resolveConflictAction(${ev.id},'ignore')">
        <div class="cf-title">Ignore</div>
        <div class="cf-desc">Let it lie for now</div>
      </button>
    </div>`;
  }
  h += '</div>';
  return h;
}

// ── END SCREEN ────────────────────────────────────────────

function renderEndScreen() {
  const go   = gs.gameOver;
  const orgs = allOrgs().slice().sort((a, b) => b.influence - a.influence);
  const isWin = go.type === 'win' && go.winnerIsPlayer;

  const headline = isWin
    ? `The ${go.winnerName} Family controls New York.`
    : go.reason === 'bankrupt'
      ? `The ${gs.player.familyName} Family is bankrupt.`
      : go.reason === 'influence'
        ? `The ${gs.player.familyName} Family has been wiped out.`
        : `The ${go.winnerName} Family has seized New York.`;

  const sub = isWin
    ? 'Manhattan is yours. For now.'
    : `You lasted until ${go.date}.`;

  const standings = orgs.map((o, i) => {
    const p = (o.influence * 100).toFixed(1);
    const w = Math.round(o.influence * 180);
    return `<div class="es-standing ${o.isPlayer ? 'es-player' : ''}">
      <span class="es-rank">${i + 1}</span>
      <span class="es-name">${o.familyName}</span>
      <div class="es-bar-track">
        <div class="es-bar-fill" style="width:${w}px;background:${FAMILY_COLORS[o.colorIndex]}"></div>
      </div>
      <span class="es-pct">${p}%</span>
    </div>`;
  }).join('');

  return `<div class="endscreen-overlay">
    <div class="endscreen ${isWin ? 'win' : 'loss'}">
      <div class="es-date">${go.date}</div>
      <div class="es-headline">${headline}</div>
      <div class="es-sub">${sub}</div>
      <div class="es-standings">${standings}</div>
      <button class="es-btn" onclick="newGame()">Play Again</button>
    </div>
  </div>`;
}

// ── MAIN RENDER ───────────────────────────────────────────

function renderPreserveScroll() {
  const os = document.querySelector('.panel-org .panel-body')?.scrollTop      ?? 0;
  const es = document.querySelector('.panel-events .panel-body')?.scrollTop   ?? 0;
  const is = document.querySelector('.panel-influence .panel-body')?.scrollTop ?? 0;
  const ms = document.querySelector('.rival-modal-body')?.scrollTop             ?? 0;
  const fs = document.querySelector('.family-modal-body')?.scrollTop            ?? 0;
  render();
  const op = document.querySelector('.panel-org .panel-body');
  const ep = document.querySelector('.panel-events .panel-body');
  const ip = document.querySelector('.panel-influence .panel-body');
  const mp = document.querySelector('.rival-modal-body');
  const fp = document.querySelector('.family-modal-body');
  if (op) op.scrollTop = os;
  if (ep) ep.scrollTop = es;
  if (ip) ip.scrollTop = is;
  if (mp) mp.scrollTop = ms;
  if (fp) fp.scrollTop = fs;
}

function render() {
  const org      = gs.player;
  const payroll  = orgPayroll(org);
  const income   = orgIncome(org);
  const net      = income - payroll;
  const netWorth = orgNetWorth(org);
  const orgs     = allOrgs();
  const resolved = allEventsResolved();
  const pending  = gs.currentEvents.filter(e => e.state === 'pending').length;

  document.getElementById('app').innerHTML = `
<div class="layout">
  <header class="header">
    <span class="header-title">The Five Boroughs</span>
    <span class="header-sep">·</span>
    <span class="header-date">${quarterLabel(gs.quarter, gs.year)}</span>
    <span class="header-sep">·</span>
    <span class="header-org">${org.name} &mdash; ${org.borough}</span>
    <div class="header-btns">
      <button id="music-btn" class="btn-music" onclick="toggleMusic()">♪</button>
      <button class="btn-new-game" onclick="newGame()">New Game</button>
      <button class="btn-end-turn" onclick="advanceTurn()" ${!resolved || gs.gameOver ? 'disabled' : ''}>
        ${resolved ? 'End Turn →' : `${pending} Event${pending !== 1 ? 's' : ''} Pending`}
      </button>
    </div>
  </header>

  <div class="panels">
    <aside class="panel panel-org">
      <div class="panel-head">Organization</div>
      <div class="panel-body">
        <div class="org-summary">
          <span>${org.roster.length} members</span>
          <span>Payroll ${fmt$(payroll)}/qtr</span>
        </div>
        ${orgTreeHtml(org)}
      </div>
    </aside>

    <main class="panel panel-events">
      <div class="panel-head">Turn Events &mdash; ${quarterLabel(gs.quarter, gs.year)}${gs.bonusTurn ? ' <span class="bonus-badge">★ BONUS QUARTER</span>' : ''}</div>
      <div class="panel-body">
        ${gs.donComment ? `
        <div class="don-voice">
          <div class="don-voice-avatar">${DON_AVATAR_SVG}</div>
          <div class="don-voice-quote">"${gs.donComment}"</div>
        </div>` : ''}
        ${gs.rivalUpdates.length ? `
        <div class="intel-block">
          <div class="intel-head">Intelligence</div>
          ${gs.rivalUpdates.map(u => `
          <div class="intel-row">
            <span class="intel-dot" style="background:${u.color}"></span>
            <span class="intel-text">
              <b class="rival-link" onclick="openRivalModal(${u.id})">${u.familyName}</b>: ${u.text}
            </span>
          </div>`).join('')}
        </div>` : ''}
        <div class="events-list">
          ${gs.currentEvents.map(renderEventCard).join('')}
        </div>
        ${gs.log.length ? `
        <div class="turn-log">
          <div class="log-head">Turn Log</div>
          ${gs.log.slice(0, 12).map(logEntryHtml).join('')}
        </div>` : ''}
      </div>
    </main>

    <aside class="panel panel-influence">
      <div class="panel-head">Influence</div>
      <div class="panel-body">
        <div class="influence-bars">
          ${orgs.map(o => {
            const p    = (o.influence * 100).toFixed(1);
            const rel  = !o.isPlayer ? relLabel(getRelationship(org.id, o.id)) : null;
            return `<div class="inf-row inf-row-clickable" onclick="openFamilyModal(${o.id})">
              <div class="inf-labels">
                <span class="inf-name${o.isPlayer ? ' player' : ''}">${o.familyName}</span>
                <span class="inf-pct">${p}%</span>
              </div>
              <div class="inf-track">
                <div class="inf-fill" style="width:${p}%;background:${FAMILY_COLORS[o.colorIndex]}"></div>
              </div>
              ${rel ? `<div class="inf-rel-badge" style="color:${rel.color};border-color:${rel.color}44">${rel.text}</div>` : ''}
            </div>`;
          }).join('')}
          <div class="win-note">First to 50% wins &nbsp;·&nbsp; <span style="color:var(--text-muted);font-size:10px">Click a family to view profile</span></div>
        </div>

        <div class="fin-block">
          <div class="fin-head">The Five Boroughs</div>
          ${renderBoroughMap()}
        </div>

        <div class="fin-block">
          <div class="fin-head">Finances</div>
          <div class="fin-row"><span class="fl">Cash</span>
            <span class="fr ${org.cash < 0 ? 'neg' : ''}">${fmt$(org.cash)}</span></div>
          <div class="fin-row"><span class="fl">Net Worth</span>
            <span class="fr">${fmt$(netWorth)}</span></div>
          <div class="fin-row"><span class="fl">Income</span>
            <span class="fr pos">${fmt$(income)}/qtr</span></div>
          <div class="fin-row"><span class="fl">Payroll</span>
            <span class="fr neg">-${fmt$(payroll)}/qtr</span></div>
          <div class="fin-divider"></div>
          <div class="fin-row bold"><span class="fl">Net</span>
            <span class="fr ${net >= 0 ? 'pos' : 'neg'}">${net >= 0 ? '+' : ''}${fmt$(net)}/qtr</span></div>
        </div>

        <div class="fin-block">
          <div class="fin-head">Businesses</div>
          ${org.businesses.map(b => bizRowHtml(b)).join('')}
          ${org.businesses.length === 0 ? '<div class="fin-row"><span class="fl neg">No businesses</span></div>' : ''}
        </div>

        <div class="fin-block">
          <div class="fin-head">Properties</div>
          ${renderPropertiesPanel(org)}
        </div>

        <div class="fin-block">
          <div class="fin-head">Political Figures</div>
          ${gs.politicians.map(p => polRowHtml(p)).join('')}
        </div>

        <div class="fin-block">
          <div class="fin-head">Roster</div>
          <div class="fin-row"><span class="fl">Don</span>
            <span class="fr" style="font-size:11px">${org.roster.find(c => c.role === 'don')?.name ?? '— Vacant —'}</span></div>
          <div class="fin-row"><span class="fl">Members</span><span class="fr">${org.roster.length}</span></div>
          <div class="fin-row"><span class="fl">Capos</span>
            <span class="fr">${org.roster.filter(c => c.role === 'capo').length} / ${MAX_CAPOS}</span></div>
          <div class="fin-row"><span class="fl">Soldiers</span>
            <span class="fr">${org.roster.filter(c => c.role === 'soldier').length} / ${org.roster.filter(c => c.role === 'capo').length * soldierCapPerCapo(org)}</span></div>
        </div>
      </div>
    </aside>
  </div>
</div>
${gs.gameOver ? renderEndScreen() : ''}
${uiState.viewingRival  ? renderRivalModal()  : ''}
${uiState.viewingFamily ? renderFamilyModal() : ''}`;
}

// ── INIT ──────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => { renderSetup(); });
