/*
functions to be used by anything else which might need them.
functions named with __ are deprecated, do not use Qd() and are to be replaced.
functions marked with `// LOGIC` do not use Qd() on purpose.
other notion here:
`// APPROX` are functions that are close enough to an accurate result. they are subject to change.

*/


function Qd(str) { // quick decimal
  return new Decimal(str);
}

function Pd(str) { // precision decimal
  const power = str.slice(str.indexOf("e")+1);
  return Qd("10").pow(Qd(power));
}

const pi = Qd(Math.PI);
const e = Qd(Math.E);
const c = Qd("299792458");
const Barn = Qd("1e-24"); 
const Avogadro = Qd("6.02214076e23");
const R0 = Qd("1.2e-15");
const ProtonMass = Qd("1.0072765");
const NeutronMass = Qd("1.008665");

const Mega = Qd("1e+6");
const Kilo = Qd("1e+3");
const Hecto = Qd("1e+2");

const KiloToPoundFactor = Qd("2.204622");
const InchToCMFactor = Qd("2.54");
const eVToJoulesFactor = Qd("1.60218e-19");
const DaltonToKGFactor = Qd("1.6605300000013E-27");

const NOne = Qd("-1");
const Zero = Qd("0");
const One = Qd("1");
const Two = Qd("2");
const Three = Qd("3");
const Five = Qd("5");
const Ten = Qd("10");
const FOT = Qd("4").div(Three);
const OT = One.div(Three);

// GENERAL USE MATHS //

class Weight {
  constructor(Total) {
    this.Total = Total;
    this.Results = []; // {Identifier, Weight}
  }
  AppendResult(Identifier, Weight) {
    this.Results.push({Identity: Identifier, Weight:Weight});
    this.Total = this.Total.add(Weight);
    this.Results.sort((a, b) => a.Weight.toNumber() - b.Weight.toNumber());
  }
  AddResult(Identifier, Weight) {
    this.Results.push({Identity: Identifier, Weight:Weight});
    this.Results.sort((a, b) => a.Weight.toNumber() - b.Weight.toNumber());
  }
  GetResult() {
    const Choice = Qd(Math.random()).mul(this.Total).floor();
    var i, sum = Zero;
    for (i in this.Results) {
      sum = sum.add(this.Results[i].Weight);
      if (Choice.lte(sum)) {return this.Results[i].Identity};
    }
  }
}

// Generic collection
function Square(N) {
  return N.pow(Two)
}

function Cube(N) {
  return N.pow(Three);
}

// BaseTo collection
function BaseToMicro(N) {
  return N.mul(Mega);
}

function BaseToMilli(N) {
  return N.mul(Kilo);
}

function BaseToCenti(N) {
  return N.mul(Hecto);
}

function BaseToHecto(N) {
  return N.div(Hecto);
}

function BaseToKilo(N) {
  return N.div(Kilo);
}

function BaseToMega(N) {
  return N.div(Mega);
}

// ToBase collection
function MicroToBase(N) {
  return BaseToMega(N);
}

function MilliToBase(N) {
  return BaseToKilo(N);
}

function CentiToBase(N) {
  return BaseToHecto(N);
}

function HectoToBase(N) {
  return BaseToCenti(N)
}

function KiloToBase(N) {
  return BaseToMilli(N);
}

function MegaToBase(N) {
  return BaseToMega(N);
}

// Tolog collection
// generally only going to see use in ILLL
function MicroToLog(Micro) {
  return BaseToMega(Qd(Micro)).log("10");
}

function MilliToLog(Milli) {
  return BaseToKilo(Qd(Milli)).log("10");
}

function ToLog(N) {
  return Qd(N).log("10");
}

function KiloToLog(Kilo) {
  return BaseToMilli(Qd(Kilo)).log("10");
}

function MegaToLog(Mega) {
  return BaseToMicro(Qd(Mega)).log("10");
}

// GENERAL USE UNIT CONVERSION FUNCTIONS //

function InchToCM(Inches) {
  return Inches.mul(InchToCMFactor);
}

function CMToInches(CM) {
  return CM.div(InchToCMFactor);
}

function eVToJoules(eV) {
  return eV.div(eVToJoulesFactor);
}

function DaltonToKG(Dalton) {
  return Dalton.mul(DaltonToKGFactor);
}

// LOGIC FUNCTIONS //

function Extra(Chance) { // LOGIC
  if (Math.random()<Chance) {
    return 1;
  }
  return 0;
}

function NYield(Neutrons) { // LOGIC
  return Extra(Neutrons % 1) + Math.floor(Neutrons);
}

function NYielder(MeanNeutrons) { // LOGIC
  return ()=>{return NYield(MeanNeutrons)};
}

// NUCLEAR FUNCTIONS //

function AtomDensity(Density, MolarMass) { // APPROX
  return Density.mul(Avogadro).div(MolarMass);
}

function CollisionProbability(Barns, AtomDensity, MaterialTravelDistance) { // APPROX
  const Sigma = Barns.mul(Barn);
  const MacroXS = AtomDensity.mul(Sigma);
  return Decimal.sub(1, Decimal.exp(MacroXS.mul(MaterialTravelDistance).neg()));
}

function LogLineLineCrossSection(x1, y1, x2, y2) { // APPROX
  const EffectiveSlope = Decimal.div(Decimal.log(y2).sub(Decimal.log(y1)), Decimal.log(x2).sub(Decimal.log(x1)));
  return (eV)=>{Decimal.max(eV.pow(EffectiveSlope), Qd(0))};
}

function NormalDistribution(MaxProbability, multi, center, FuelMass) { 
  const sig2 = Square(One.div(multi));
  return (MaxProbability.div(Two.mul(pi).mul(sig2)).mul(e.pow((Square(FuelMass.sub(center)).div(sig2.mul(Two))).neg()))).div(multi);
}

function FissionProductCurve(MaxProbability, multiA, multiB, centerA, centerB) { // APPROX
  return (ProductMass)=>{
    return (NormalDistribution(MaxProbability, multiA, centerA, ProductMass).add(NormalDistribution(MaxProbability, multiB, centerB, ProductMass))).div(Qd("100"));
  };
}

function LikelyProductDistributor(centerA) { // the only thing that generally changes is the low weight product centers
  return FissionProductCurve(Qd("22.7"), Qd("0.21"), Qd("0.16"), centerA, Qd("132"));
}

function centerAApprox(FuelMass) {
  return Qd("95").add((FuelMass.div(Two).sub(Qd("235").div(Two))));
}

function GetSetWeight(FuelAtomicMass, ProductA, ProductB) {
  const ThisSetSolver = LikelyProductDistributor(centerAApprox(FuelAtomicMass));
  const ProbabilityA = ThisSetSolver(ProductA);
  const ProbabilityB = ThisSetSolver(ProductB);
  const FinalWeight = ProbabilityA.add(ProbabilityB);
  return FinalWeight;
}

function GetNuclearRadius(MolarMass) { // APPROX
  return R0.mul(MolarMass.pow(OT));
}

function GetNuclearVolume(MolarMass) { // APPROX
  return (FOT.mul(pi)).mul(Cube(GetNuclearRadius(MolarMass)));
}

function GetMassEnergyEquilvalence(Mass) { // APPROX // requires that i have two define products or this cannot be calculated.
  Mass = NeutronMass.mul(Mass);
  return DaltonToKG(Mass).mul(Square(c));
}

function GetIsotopePreciseMass(AtomicMass, Electrons) { // APPROX
  return Electrons.mul(ProtonMass).add(NeutronMass.mul(AtomicMass.sub(Electrons)));
}

function GetPossibleFissionProducts(AtomicMass, Electrons, NeutronsReleased, Meta) {
  const SumProductMasses = AtomicMass.sub(NeutronsReleased);
  const val = Object.values(Isotopes);
  const key = Object.keys(Isotopes);
  var FullFuelWeight = Qd("0");

  const SeenBefore = [];
  const Pairs = [];

  //console.log("Looking for "+(+SumProductMasses)+" from mass "+AtomicMass+" losing "+NeutronsReleased);
  for (var a in val) {
    const IsotopeA = val[a];
    if (IsotopeA.IllegalProduct || IsotopeA.Fuel) continue;
    for (var b in val) {
      const IsotopeB = val[b];
      if (IsotopeB.IllegalProduct || IsotopeB.Fuel) continue;
      const Target = (+IsotopeA.AtomicMass)+(+IsotopeB.AtomicMass);
      
      if (SeenBefore.includes(a) || SeenBefore.includes(b)) {
        continue;
      }

      if ((+SumProductMasses) == Target) {
        //console.log(key[a]+" and "+key[b]);
        SeenBefore.push(a, b);
        Pairs.push([IsotopeA, IsotopeB]);
        //console.log(SumProductMasses);
        const SetWeight = GetSetWeight(SumProductMasses, IsotopeA.AtomicMass, IsotopeB.AtomicMass).mul(Mega.mul("100")).floor();
        FullFuelWeight = FullFuelWeight.add(SetWeight);
        //console.log(+SetWeight);
        if (Meta) {
          if (Meta.Fuel) {
            const Fuel = Meta.Fuel;
            if (!Fuel.Weight[NeutronsReleased]) {
              Fuel.Weight[NeutronsReleased] = new Weight(Zero);
            }
            Fuel.Weight[NeutronsReleased].AppendResult([IsotopeA, IsotopeB], SetWeight);
          }
        }
      }
    }
  }
  //console.log("Combined weight of all product pairs:");
  //console.log(+FullFuelWeight);
}

function GetBetaDecayProduct(AtomicMass, Electrons) { 

}

function SimplifyResult(Arr) {
  return Arr[0].Symbol+" and "+Arr[1].Symbol+` (${(+Arr[0].AtomicMass)+(+Arr[1].AtomicMass)})`;
}

function SimpleGetRandomProducts(Fuel, LostNeutrons, Meta) {
  if (!Meta) {
    if (!Isotopes[Fuel]) return "that doesnt exist MORON";
    if (!Isotopes[Fuel].Fuel) return "not a fricken fuel MORON";
    return SimplifyResult(Isotopes[Fuel].Weight[LostNeutrons].GetResult());
  } else if (Meta=="Result+Energy") {
    if (!Isotopes[Fuel]) return "that doesnt exist MORON";
    if (!Isotopes[Fuel].Fuel) return "not a fricken fuel MORON";
    console.log("Energy (J): "+(+GetMassEnergyEquilvalence(Qd(LostNeutrons))));
    console.log(SimplifyResult(Isotopes[Fuel].Weight[LostNeutrons].GetResult()));
  }
}


// need to create a curve for fission product probabilities. the yield is different by fissioned fuel which means each fuel ideally needs its own curve
// in the calculation, the result should be a pair of two isotopes with a combined probability. like a version of GetPossibleFissionProducts()
// except that it also returns the probability of the pair.

// calc reaction. have the mass of the fuel + 1 neutron - NYield. 
// get mass defect: above number - two added product masses



/*
https://www.google.com/search?q=can+the+joules+released+by+u235+fission+be+approximately+calculated&sca_esv=8d3d49c28ce86d19&rlz=1CAHTBP_enUS1159&ei=ehDxaJuAKOvKp84P6Zj2gQc&ved=0ahUKEwibpc7NhamQAxVr5ckDHWmMPXAQ4dUDCBA&uact=5&oq=can+the+joules+released+by+u235+fission+be+approximately+calculated&gs_lp=Egxnd3Mtd2l6LXNlcnAiQ2NhbiB0aGUgam91bGVzIHJlbGVhc2VkIGJ5IHUyMzUgZmlzc2lvbiBiZSBhcHByb3hpbWF0ZWx5IGNhbGN1bGF0ZWQyBBAAGEcyBBAAGEcyBBAAGEcyBBAAGEcyBBAAGEcyBBAAGEcyBBAAGEcyBBAAGEdI70xQpw5YxktwAHgCkAEDmAEAoAEAqgEAuAEDyAEA-AEBmAIBoAIPmAMAiAYBkAYIkgcBMaAHALIHALgHAMIHAzMtMcgHCg&sclient=gws-wiz-serp&safe=active&ssui=on
*/

// DEPRECATED //

function __InchToCM(Inches){
  return Inches*2.54;
}

function __CMtoInch(CM){
  return CM/2.54;
}

function __decayByInches(ev, inches) { // REPLACE SOON
  return ev / Math.pow(2, inches);
  // a neutron typically loses half of its electron volts per inch of deuterium oxide
}

function __MeVtoeV(x) { // arbitrary, due for removal
  return x * 1e6;
}

function __roundTo(x, n) {
  const factor = Math.pow(10, n);
  return Math.round(x * factor) / factor;
}