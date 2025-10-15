function Qd(str) {
  return new Decimal(str);
}

const pi = Qd(Math.PI);
const e = Qd(Math.E);
const Barn = Qd("1e-24"); 
const Avogadro = Qd("6.02214076e23"); // atoms/mol

const Mega = Qd("1e+6");
const Kilo = Qd("1e+3");
const Hecto = Qd("1e+2");

const KiloToPoundFactor = Qd("2.204622");
const InchToCMFactor = Qd("2.54");

const One = Qd("1");
const Zero = Qd("0");
const NOne = Qd("-1");

// its fine if some of these go unused so long as it keeps a naming convention

// GENERAL USE BASE CONVERSION FUNCTIONS //

function ToMicro(N) {
  return N.mul(Mega);
}

function ToMilli(N) {
  return N.mul(Kilo);
}

function ToCenti(N) {
  return N.mul(Hecto);
}

function ToHecto(N) {
  return N.div(Hecto);
}

function ToKilo(N) {
  return N.div(Kilo);
}

function ToMega(N) {
  return N.div(Mega);
}

// specific usecases in LogLineLine

function MicroToLog(Micro) {
  return ToMega(Micro).log("10");
}

function MilliToLog(Milli) {
  return ToKilo(Milli).log("10");
}

function ToLog(N) {
  return N.log("10");
}

function KiloToLog(Kilo) { // i am absolutely baffeled this has use
  return ToMilli(Kilo).log("10");
}

// generics

function CentiToBase(Centi) {
  return ToHecto(Centi);
}

// GENERAL USE UNIT CONVERSION FUNCTIONS //

function InchToCM(Inches) {
  return Inches.mul(InchToCMFactor);
}

function CMToInches(CM) {
  return CM.div(InchToCMFactor);
}

// all below functions do not use decimal.js, best to ignore them until i get to working on the main reactor handler.

function InchToCM(Inches){
  return Inches*2.54;
}

function CMtoInch(CM){
  return CM/2.54;
}

function decayByInches(ev, inches) {
  return ev / Math.pow(2, inches);
  // a neutron typically loses half of its electron volts per inch of deuterium oxide
}

function MeVtoeV(x) { // arbitrary, due for removal
  return x * 1e6;
}

function roundTo(x, n) {
  const factor = Math.pow(10, n);
  return Math.round(x * factor) / factor;
}

function Extra(Chance) {
  if (Math.random()<Chance) {
    return 1;
  }
  return 0;
}

function NYield(Neutrons) {
  return Extra(Neutrons % 1) + Math.floor(Neutrons)
}