const Isotopes = {
  U233: {
    AtomicMass: Qd(233),
    Electrons: Qd(92),
    IllegalProduct: true,
    Fuel: true,
  },
  U234: {
    AtomicMass: Qd(234),
    Electrons: Qd(92),
    IllegalProduct: true,
    Fuel: true,
  },
  U235: {
    AtomicMass: Qd(235),
    Electrons: Qd(92),
    FissionJoules: Qd("3.2e-11"),
    NeutronReleaseFission: NYielder(2.47),
    IllegalProduct: true,
    Fuel: true,
  },
  U236: {
    AtomicMass: Qd(236),
    Electrons: Qd(92),
    IllegalProduct: true,
    Fuel: true,
  },
  U237: {
    AtomicMass: Qd(237),
    Electrons: Qd(92),
    IllegalProduct: true,
    Fuel: true,
  },
  U238: {
    AtomicMass: Qd(238),
    Electrons: Qd(92),
    FissionJoules: Qd("3.18e-11"),
    NeutronReleaseFission: NYielder(2.07),
    IllegalProduct: true, 
    Fuel: true,
  },
  U239: {
    AtomicMass: Qd(239),
    Electrons: Qd(92),
    IllegalProduct: true,
    Fuel: true,
  },
  Np239: {
    AtomicMass: Qd(239),
    Electrons: Qd(93),
    IllegalProduct: true,
    Fuel: true,
  },
  Np240: {
    AtomicMass: Qd(240),
    Electrons: Qd(93),
    IllegalProduct: true,
    Fuel: true,
  },
  Pu239: {
    AtomicMass: Qd(239),
    Electrons: Qd(94),
    IllegalProduct: true,
    Fuel: true,
  },
  Pu240: {
    AtomicMass: Qd(240),
    Electrons: Qd(94),
    IllegalProduct: true,
    Fuel: true,
  },
  Pu241: {
    AtomicMass: Qd(241),
    Electrons: Qd(94),
    IllegalProduct: true,
    Fuel: true,
  },
  Ge76: {
    AtomicMass: Qd(75),
    Electrons: Qd(32),
    IllegalProduct: false,
  },
  Ge75: { // decays into Ar75 // half life 82.78 minutes
    AtomicMass: Qd(75),
    Electrons: Qd(32),
    IllegalProduct: false,
  },
  Ge74: {
    AtomicMass: Qd(74),
    Electrons: Qd(32),
    IllegalProduct: false,
  },
  Ge73: {
    AtomicMass: Qd(73),
    Electrons: Qd(32),
    IllegalProduct: false,
  },
  Ge72: {
    AtomicMass: Qd(72),
    Electrons: Qd(32),
    IllegalProduct: false,
  },
  As75: { 
    AtomicMass: Qd(75),
    Electrons: Qd(33),
    IllegalProduct: true,
  },
  As76: { 
    AtomicMass: Qd(76),
    Electrons: Qd(33),
    IllegalProduct: true,
  },
  Se76: {
    AtomicMass: Qd(76),
    Electrons: Qd(34),
    IllegalProduct: true,
  },
  Se77: {
    AtomicMass: Qd(77),
    Electrons: Qd(34),
    IllegalProduct: false,
  },
  Se78: {
    AtomicMass: Qd(78),
    Electrons: Qd(34),
    IllegalProduct: false,
  },
  Se79: {
    AtomicMass: Qd(79),
    Electrons: Qd(34),
    IllegalProduct: false,
  },
  Se80: {
    AtomicMass: Qd(80),
    Electrons: Qd(34),
    IllegalProduct: false,
  },
  Se82: {
    AtomicMass: Qd(82),
    Electrons: Qd(34),
    IllegalProduct: false,
  },
  Br81: {
    AtomicMass: Qd(81),
    Electrons: Qd(35),
    IllegalProduct: false,
  },
  Kr83: {
    AtomicMass: Qd(83),
    Electrons: Qd(36),
    IllegalProduct: false,
  },
  Kr84: {
    AtomicMass: Qd(84),
    Electrons: Qd(36),
    IllegalProduct: false,
  },
  Kr85: {
    AtomicMass: Qd(85),
    Electrons: Qd(36),
    IllegalProduct: false,
  },
  Kr86: {
    AtomicMass: Qd(86),
    Electrons: Qd(36),
    IllegalProduct: false,
  },
  Rb85: {
    AtomicMass: Qd(85),
    Electrons: Qd(37),
    IllegalProduct: false,
  },
  Rb87: {
    AtomicMass: Qd(37),
    Electrons: Qd(92),
    IllegalProduct: false,
  },
  Sr88: {
    AtomicMass: Qd(38),
    Electrons: Qd(92),
    IllegalProduct: false,
  },
  Sr89: {
    AtomicMass: Qd(38),
    Electrons: Qd(92),
    IllegalProduct: false,
  },
  Sr90: { 
    AtomicMass: Qd(38), 
    Electrons: Qd(92),
    IllegalProduct: false
  },
  Y89: {
    AtomicMass: Qd(89),
    Electrons: Qd(39),
    IllegalProduct: false,
  },
  Y90: {
    AtomicMass: Qd(90), // decays into Zr90 // half life 2.67 days
    Electrons: Qd(39),
    IllegalProduct: false,
  },
  Y91: {
    AtomicMass: Qd(91),
    Electrons: Qd(39),
    IllegalProduct: false,
  },
  Zr90: {
    AtomicMass: Qd(90), //from Y90
    Electrons: Qd(40),
    IllegalProduct: false,
  },
  Zr91: {
    AtomicMass: Qd(91),
    Electrons: Qd(40),
    IllegalProduct: false,
  },
  Zr92: {
    AtomicMass: Qd(92),
    Electrons: Qd(40),
    IllegalProduct: false,
  },
  Zr93: {
    AtomicMass: Qd(93), // notably low neutron cross section. 
    Electrons: Qd(40),
    IllegalProduct: false,
  },
  Zr94: {
    AtomicMass: Qd(94),
    Electrons: Qd(40),
    IllegalProduct: false,
  },
  Zr95: {
    AtomicMass: Qd(95), // decays into Nb95 // half life 65 days
    Electrons: Qd(40),
    IllegalProduct: false,
  },
  Zr96: {
    AtomicMass: Qd(96),
    Electrons: Qd(40),
    IllegalProduct: false,
  },
  Zr97: {
    AtomicMass: Qd(97), // decays into Nb97 // half life 16.9 hours
    Electrons: Qd(40),
    IllegalProduct: true,
  },
  Nb95: {
    AtomicMass: Qd(95), // decays into Mo95 // half life 35 days
    Electrons: Qd(41),
    IllegalProduct: false,
  },
  Nb97: {
    AtomicMass: Qd(97), // decays into Mo97 // half life 72 minutes
    Electrons: Qd(41),
    IllegalProduct: true,
  },
  Mo95: {
    AtomicMass: Qd(95),
    Electrons: Qd(42),
    IllegalProduct: false,
  },
  Mo97: {
    AtomicMass: Qd(97),
    Electrons: Qd(42),
    IllegalProduct: false,
  },
  Mo98: {
    AtomicMass: Qd(98),
    Electrons: Qd(42),
    IllegalProduct: false,
  },
  Mo99: {
    AtomicMass: Qd(99), // decays into Tc99 // 
    Electrons: Qd(42),
    IllegalProduct: false,
  },
  Mo100: {
    AtomicMass: Qd(100), 
    Electrons: Qd(42),
    IllegalProduct: false,
  },
  Tc99: {
    AtomicMass: Qd(99),
    Electrons: Qd(43),
    IllegalProduct: false,
  },
  Ru101: {
    AtomicMass: Qd(101), 
    Electrons: Qd(44),
    IllegalProduct: false,
  },
  Ru102: {
    AtomicMass: Qd(102), 
    Electrons: Qd(44),
    IllegalProduct: false,
  },
  Ru103: {
    AtomicMass: Qd(103), // decays into Rh103 // half life 39 days
    Electrons: Qd(44),
    IllegalProduct: false,
  },
  Ru104: {
    AtomicMass: Qd(104), 
    Electrons: Qd(44),
    IllegalProduct: false,
  },
  Ru105: { // decays into Rh105 // half life 4.44 hours
    AtomicMass: Qd(105), 
    Electrons: Qd(44),
    IllegalProduct: false,
  },
  Ru106: {
    AtomicMass: Qd(106), 
    Electrons: Qd(44),
    IllegalProduct: false,
  },
  Rh103: {
    AtomicMass: Qd(103), // decays into Pd103 // half life 17 days
    Electrons: Qd(45),
    IllegalProduct: false,
  },
  Rh105: { // decays into Pd105 // half life 35.36 hours
    AtomicMass: Qd(105), 
    Electrons: Qd(45),
    IllegalProduct: false,
  },
  Pd105: {
    AtomicMass: Qd(105), 
    Electrons: Qd(46),
    IllegalProduct: false,
  },
  Pd106: {
    AtomicMass: Qd(106), 
    Electrons: Qd(46),
    IllegalProduct: false,
  },
  Pd107: {
    AtomicMass: Qd(107), 
    Electrons: Qd(46),
    IllegalProduct: false,
  },
  Pd108: {
    AtomicMass: Qd(108), 
    Electrons: Qd(46),
    IllegalProduct: false,
  },
  Pd109: { 
    AtomicMass: Qd(109), // decays into Ag109m // Half life 13.7 hours
    Electrons: Qd(46),
    IllegalProduct: false,
  },
  Pd110: {
    AtomicMass: Qd(110), 
    Electrons: Qd(46),
    IllegalProduct: false,
  },
  Ag109: {
    AtomicMass: Qd(109), 
    Electrons: Qd(47),
    IllegalProduct: false,
  },
  Ag109m: { // decays into Ag109 // half life 39.7 second 
    AtomicMass: Qd(109), 
    Electrons: Qd(47),
    IllegalProduct: false,
    MetaStable: true,
  },
  Ag111: {
    AtomicMass: Qd(111), // decays into Cd111 // half life 7.45 days
    Electrons: Qd(47),
    IllegalProduct: false,
  },
  Cd111: {
    AtomicMass: Qd(111), 
    Electrons: Qd(48),
    IllegalProduct: false,
  },
  Cd112: {
    AtomicMass: Qd(112), 
    Electrons: Qd(48),
    IllegalProduct: false,
  },
  Cd113: {
    AtomicMass: Qd(113), 
    Electrons: Qd(48),
    IllegalProduct: false,
  },
  Cd114: {
    AtomicMass: Qd(114), 
    Electrons: Qd(48),
    IllegalProduct: false,
  },
  Cd115m: {
    AtomicMass: Qd(115), // decays into Cd115 // half life 44.6
    Electrons: Qd(48),
    IllegalProduct: false,
    MetaStable: true,
  },
  Cd115: {
    AtomicMass: Qd(115), // decays into In115 // half life 2.2 days 
    Electrons: Qd(48),
    IllegalProduct: false,
  },
  Cd116: {
    AtomicMass: Qd(116), 
    Electrons: Qd(48),
    IllegalProduct: false,
  },
  In115: {
    AtomicMass: Qd(115),
    Electrons: Qd(49),
    IllegalProduct: false,
  },
  Sn117: {
    AtomicMass: Qd(117),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn118: {
    AtomicMass: Qd(118),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn119: {
    AtomicMass: Qd(119),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn120: {
    AtomicMass: Qd(120),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn121m: {
    AtomicMass: Qd(121),
    Electrons: Qd(50),
    IllegalProduct: false,
    MetaStable: true,
  },
  Sn121: {
    AtomicMass: Qd(121),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn122: {
    AtomicMass: Qd(122),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn123: {
    AtomicMass: Qd(123),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn124: {
    AtomicMass: Qd(124),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn125: {
    AtomicMass: Qd(125), // decays into Sb125 // half life 9.64 days
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sn126: {
    AtomicMass: Qd(126),
    Electrons: Qd(50),
    IllegalProduct: false,
  },
  Sb121: {
    AtomicMass: Qd(121),
    Electrons: Qd(51),
    IllegalProduct: false,
  },
  Sb123: {
    AtomicMass: Qd(123),
    Electrons: Qd(51),
    IllegalProduct: false,
  },
  Sb124: {
    AtomicMass: Qd(124),
    Electrons: Qd(51),
    IllegalProduct: false,
  },
  Sb125: {
    AtomicMass: Qd(125),
    Electrons: Qd(51),
    IllegalProduct: false,
  },
  Te125: {
    AtomicMass: Qd(125),
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  Te126: {
    AtomicMass: Qd(126),
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  Te127m: {
    AtomicMass: Qd(127), // decays into Te127 // half life 109 days
    Electrons: Qd(52),
    IllegalProduct: false,
    MetaStable: true,
  },
  Te127: {
    AtomicMass: Qd(127), // decays into I127 // half life 9.35 hours
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  Te128: {
    AtomicMass: Qd(128),
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  Te129m: {
    AtomicMass: Qd(129), // decays into Te129 // half life 33.6 days
    Electrons: Qd(52),
    IllegalProduct: false,
    MetaStable: true,
  },
  Te129: {
    AtomicMass: Qd(129), // decays into I229 // half life 69.6 minutes
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  Te130: {
    AtomicMass: Qd(130),
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  Te131: {
    AtomicMass: Qd(131), // decays into I131 // half life 25 minutes
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  Te132: {
    AtomicMass: Qd(132), // decays into I132 // half life 3.2 days
    Electrons: Qd(52),
    IllegalProduct: false,
  },
  I127: {
    AtomicMass: Qd(127),
    Electrons: Qd(53),
    IllegalProduct: false,
  },
  I129: {
    AtomicMass: Qd(129),
    Electrons: Qd(53),
    IllegalProduct: false,
  },
  I131: {
    AtomicMass: Qd(131), // decays into Xe131 // half life 8.04 days
    Electrons: Qd(53),
    IllegalProduct: false,
  },
  I132: {
    AtomicMass: Qd(132),
    Electrons: Qd(53),
    IllegalProduct: true,
  },
  Xe131: {
    AtomicMass: Qd(131),
    Electrons: Qd(54),
    IllegalProduct: false,
  },
  Xe132: {
    AtomicMass: Qd(132),
    Electrons: Qd(54),
    IllegalProduct: false,
  },
  Xe133: {
    AtomicMass: Qd(134), // decays into Cs133 // half life 5.245 days
    Electrons: Qd(54),
    IllegalProduct: false,
  },
  Xe134: {
    AtomicMass: Qd(134),
    Electrons: Qd(54),
    IllegalProduct: false,
  },
  Xe135: { // decays into Cs135 // half life 9.14 hours
    AtomicMass: Qd(135),
    Electrons: Qd(54),
    IllegalProduct: false,
  },
  Xe136: {
    AtomicMass: Qd(136),
    Electrons: Qd(54),
    IllegalProduct: false,
  },
  Xe137: {
    AtomicMass: Qd(137), // decays into Cs137 // half life 3.82 minutes
    Electrons: Qd(54),
    IllegalProduct: false,
  },
  Cs133: {
    AtomicMass: Qd(133),
    Electrons: Qd(55),
    IllegalProduct: false,
  },
  Cs134: {
    AtomicMass: Qd(134),
    Electrons: Qd(55),
    IllegalProduct: true,
  },
  Cs135: {
    AtomicMass: Qd(135),
    Electrons: Qd(55),
    IllegalProduct: false,
  },
  Cs137: {
    AtomicMass: Qd(137),
    Electrons: Qd(55),
    IllegalProduct: false,
  },
  Ba138: {
    AtomicMass: Qd(138),
    Electrons: Qd(56),
    IllegalProduct: false,
  },
  Ba139: {
    AtomicMass: Qd(139), // decays into La139 // half life 83.1 minutes 
    Electrons: Qd(56),
    IllegalProduct: false,
  },
  Ba140: {
    AtomicMass: Qd(140), // decays into La140 // half life 12.8 days 
    Electrons: Qd(56),
    IllegalProduct: false,
  },
  La139: {
    AtomicMass: Qd(139),
    Electrons: Qd(57),
    IllegalProduct: false,
  },
  La140: {
    AtomicMass: Qd(140), // decays into Ce140 // half life 40.3 hours
    Electrons: Qd(57),
    IllegalProduct: false,
  },
  Ce140: {
    AtomicMass: Qd(140),
    Electrons: Qd(58),
    IllegalProduct: false,
  },
  Ce141: {
    AtomicMass: Qd(141),
    Electrons: Qd(58),
    IllegalProduct: false,
  },
  Ce142: {
    AtomicMass: Qd(142),
    Electrons: Qd(58),
    IllegalProduct: false,
  },
  Ce143: {
    AtomicMass: Qd(143), // decays into Pr143 // half life 33 hours
    Electrons: Qd(58),
    IllegalProduct: false,
  },
  Ce144: {
    AtomicMass: Qd(144),
    Electrons: Qd(58),
    IllegalProduct: false,
  },
  Pr141: {
    AtomicMass: Qd(141),
    Electrons: Qd(59),
    IllegalProduct: false,
  },
  Pr143: {
    AtomicMass: Qd(143),
    Electrons: Qd(59),
    IllegalProduct: false,
  },
  Nd143: {
    AtomicMass: Qd(143),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Nd144: {
    AtomicMass: Qd(144),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Nd145: {
    AtomicMass: Qd(145),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Nd146: {
    AtomicMass: Qd(146),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Nd147: {
    AtomicMass: Qd(147),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Nd148: {
    AtomicMass: Qd(148),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Nd149: { // decays into Pm149 // half life 1.728 hours
    AtomicMass: Qd(149),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Nd150: {
    AtomicMass: Qd(150),
    Electrons: Qd(60),
    IllegalProduct: false,
  },
  Pm147: {
    AtomicMass: Qd(147),
    Electrons: Qd(61),
    IllegalProduct: false,
  },
  Pm149: { // decays into Sm149 // half life 2.2 days
    AtomicMass: Qd(149),
    Electrons: Qd(61),
    IllegalProduct: false,
  },
  Pm151: { // decays into Sm151 // half life 28.4 hours 
    AtomicMass: Qd(151),
    Electrons: Qd(61),
    IllegalProduct: false,
  },
  Sm147: {
    AtomicMass: Qd(147),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm149: {
    AtomicMass: Qd(149),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm151: {
    AtomicMass: Qd(151),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm152: {
    AtomicMass: Qd(152),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm153: { // decays into Eu153 // half life 46.3 hours
    AtomicMass: Qd(153),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm154: {
    AtomicMass: Qd(154),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm153: {
    AtomicMass: Qd(153),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm154: {
    AtomicMass: Qd(154),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm155: {
    AtomicMass: Qd(155),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Sm156: {
    AtomicMass: Qd(156),
    Electrons: Qd(62),
    IllegalProduct: false,
  },
  Gd155: {
    AtomicMass: Qd(155),
    Electrons: Qd(63),
    IllegalProduct: false,
  },
  Gd156: {
    AtomicMass: Qd(156),
    Electrons: Qd(63),
    IllegalProduct: false,
  },
  Gd157: {
    AtomicMass: Qd(157),
    Electrons: Qd(63),
    IllegalProduct: false,
  },
  Gd158: {
    AtomicMass: Qd(158),
    Electrons: Qd(63),
    IllegalProduct: false,
  },
  Gd159: {
    AtomicMass: Qd(159), // decays into Tb159 // half life 18.479 hours
    Electrons: Qd(63),
    IllegalProduct: false,
  },
  Gd160: {
    AtomicMass: Qd(160),
    Electrons: Qd(63),
    IllegalProduct: false,
  },
  Tb159: {
    AtomicMass: Qd(159),
    Electrons: Qd(64),
    IllegalProduct: false,
  },
  Tb161: {
    AtomicMass: Qd(161),
    Electrons: Qd(64),
    IllegalProduct: false,
  },
};

const isolen = Object.keys(Isotopes);

for (var i = 0; i < isolen.length; i++) {
  const Name = isolen[i];
  const Isotope = Isotopes[Name];
  const ElementRef = GetPeriodicTableElementByNumber(+Isotope.Electrons); // dont know why it wants to be -1
  const _sym = ElementRef.symbol+"-"+(+Isotope.AtomicMass);
  const __sym = ElementRef.symbol+(+Isotope.AtomicMass);
  Isotope.ElementName = ElementRef.name;
  Isotope.Symbol = _sym;
  Isotope.MolarMass = Isotope.MolarMass ?? Isotope.AtomicMass.add(Qd(ElementRef.atomic_mass).mod(One));
  Isotope.Fuel = Isotope.Fuel ?? false;
  Isotope.IllegalProduct = Isotope.IllegalProduct ?? false;
  Isotope.Density = ElementRef.density;
  Isotope.NucleiVolume = GetNuclearVolume(Isotope.MolarMass);
  Isotope.NucleiDensity = Isotope.MolarMass/Isotope.NucleiVolume;
  Isotope.PreciseMass = Isotope.MolarMass; //GetIsotopePreciseMass(Isotope.AtomicMass, Isotope.Electrons); // absolutely no idea
  Isotope.LightProductCommon = centerAApprox(Isotope.AtomicMass);
  Isotope.ProductCurse = LikelyProductDistributor(Isotope.LightProductCommon);
  
  const Focus = IsotopeLogLineLine[__sym];
  if (Focus) {
    const Fis = Focus.Fission;
    const Abs = Focus.Absorption;
    
    if (Fis) {
      Isotope.FissionCrossSection = LogLineLineCrossSection(Fis.x1, Fis.y1, Fis.x2, Fis.y2);
    } else {
      Isotope.FissionCrossSection = false;
    }
    if (Abs) {
      Isotope.AbsorptionCrossSection = LogLineLineCrossSection(Abs.x1, Abs.y1, Abs.x2, Abs.y2);
    } else {
      Isotope.AbsorptionCrossSection = false;
    }
  } else {
    IsotopeLogLineLine[__sym] = {
      Fission: false,
      Absorption: false,
    }
  }
}

for (var i = 0; i < isolen.length; i++) {
  const Name = isolen[i];
  const Isotope = Isotopes[Name];
  if (Isotope.Fuel) {
    Isotope.Weight = [];
    GetPossibleFissionProducts(Isotope.AtomicMass, 0, Qd("2"), {Fuel:Isotope});
    GetPossibleFissionProducts(Isotope.AtomicMass, 0, Qd("3"), {Fuel:Isotope});
    GetPossibleFissionProducts(Isotope.AtomicMass, 0, Qd("4"), {Fuel:Isotope});
  }
}