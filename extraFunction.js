function Qd(str) {
  return new Decimal(str);
}

const PoundFactor = Qd("2.205");
const InchFactor = Qd("2.54");
const pi = Qd(Math.PI);
const Barn = Qd("1e-24"); 
const e = Qd(Math.E);
const Avogadro = Qd("6.02214076e23"); // atoms/mol

const Mega = Qd("1e6");
const One = Qd(1);
const Zero = Qd(0);
const NOne = Qd(-1);

// should be causious with these cuz of the log.

function Micro(N) {
    return Qd(N).div(Qd("1e+3")).log("10");
}

function Milli(N) {
    return Qd(N).div(Qd("1e6")).log("10");
}

function Reg(N) {
    return Qd(N).log(10);
}


// all below functions do not use decimal.js

function InchToCM(Inches){
  return Inches*2.54
}

function CMtoInch(CM){
  return CM/2.54
}

function decayByInches(ev, inches) {
  return ev / Math.pow(2, inches);
  // a neutron typically loses half of its electron volts per inch of deuterium oxide
}

function MeVtoeV(x) { // arbitrary
  return x * 1e6;
}

function roundTo(x, n) {
  const factor = Math.pow(10, n);
  return Math.round(x * factor) / factor;
}

