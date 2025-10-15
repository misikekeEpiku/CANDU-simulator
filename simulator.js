/*
To implement

rod selection and individual managing
^ change insertion by number
^ fix rod (toggle)

some kind of heat venting

bulk control rod managing
^ color groups (red, blue, green, purple)
^ bulk change insertion

*/

// important constants

// STARTUP VARIABLES //

const Fuel = "NaturalUranium";
const IncludeBeryllium = false;

const FuelColumns = 5; // functionally -1
const FuelLayers = 5; // just fuel rows; functionally -1

const JoulesReduction = Qd("600e6");

const RodArray = []; 
const HorizontalRodArray = [];
const FuelArray = [];
const NotchAndPair = [];
const keys = [];
var MostRecentTarget = {};

// MEASURMENTS //

// strong simulation impact
const TargetFPS = 5;
const NeutronDensity = 100; // perforance intense. 100 is about safe. lower is less so. 
const CalandriaSizeCM = 852; // cm
const SimContainer = 450; // pixels
const SimPageMargin = 10; // pixels
const CalandriaScale = 350; // pixels
const CalandriaTopLeft = {x:50,y:50}; // pixels
const FluidElement = 300; // pixels
const FluidElementTL = {x:25,y:25}; // pixels
const FuelCylinderLength = 4; // pixels
const FuelCylinderDiameter = 3; // pixels
const FuelVisualScalingFactor = 6;
const AdjusterRodWidth = 8; // pixels

const coreHeight = FluidElement; // 300
const coreWidth = FluidElement; // 300

const DPI = coreWidth / (CalandriaSizeCM/(+InchFactor));
const DPCM = coreWidth / CalandriaSizeCM;

const IntervalVAdjusterRod = coreWidth/FuelColumns;
const DistanceBetweenVAdjusterRods = IntervalVAdjusterRod - AdjusterRodWidth;
const IntervalHAdjusterRod = coreHeight/FuelLayers;
const DistanceBetweenHAdjusterRods = IntervalHAdjusterRod - AdjusterRodWidth;
const FuelLayerSeparation = coreHeight/FuelLayers - (AdjusterRodWidth/2);

const FuelCylinderHeightCM = (FuelCylinderLength/DPCM); // cm
const FuelCylinderLengthCM = (FuelCylinderDiameter/DPCM); // cm
const FuelCylinderArea = (+pi) * Math.pow(FuelCylinderLengthCM/2, 2) * FuelCylinderHeightCM;

function AtomDensity(MaterialDensity_g_per_cm3, MolarMass_g_per_mol) {
  return MaterialDensity_g_per_cm3.mul(Avogadro).div(MolarMass_g_per_mol);
}

function CollisionProbability(Barns, AtomDensity, MaterialTravelDistance_cm) {
  const Sigma = Barns.mul(Barn);
  const MacroXS = AtomDensity.mul(Sigma);
  return Decimal.sub(1, Decimal.exp(MacroXS.mul(MaterialTravelDistance_cm).neg()));
}

function LogLineLineCrossSection(x1, y1, x2, y2, HardLine) { // approximation that uses an effective slope
  const EffectiveSlope = Decimal.div(Decimal.log(y2).sub(Decimal.log(y1)), Decimal.log(x2).sub(Decimal.log(x1)));
  return (eV)=>{Decimal.max(eV.pow(EffectiveSlope).sub(Decimal.mul(eV,HardLine)), Qd(0))};
}

function ThermalFavoredCrossSection() { // ambiguous with no inputs. this is modeled after u235's absorption cross section
  return LogLineLineCrossSection()
}

function FastFavoredCrossSection() { // ambiguous with no inputs. this is modeled after u238's fission cross section
  
}

const GenericFuels = {
  NaturalUraniums: {
    U238: Qd("0.99275"),
    U235: Qd("0.00720"),
    U234: Qd("0.00005"),
    Density: Qd("19.05"),
    AtomsInKG: Qd("1.15e24")
  }
}

function GetRandomFissionProducts(AtomicMass, Electrons, NeutronsReleased) { // 
  const SumProductMasses = AtomicMass-NeutronsReleased;
  const val = Object.values(Isotopes);
  const key = Object.keys(Isotopes);

  const SeenBefore = [];
  const Pairs = [];

  console.log("Looking for "+SumProductMasses+" from mass "+AtomicMass+" losing "+NeutronsReleased);
  for (var a in val) {
    const IsotopeA = val[a];
    if (IsotopeA.IllegalProduct) continue;
    for (var b in val) {
      const IsotopeB = val[b];
      if (IsotopeB.IllegalProduct) continue;
      const Target = (+IsotopeA.AtomicMass)+(+IsotopeB.AtomicMass);
      
      if (SeenBefore.includes(a) || SeenBefore.includes(b)) {
        continue;
      }

      if (SumProductMasses == Target) {
        //console.log("Found pair!");
        console.log(key[a]+" and "+key[b]);
        SeenBefore.push(a, b);
        Pairs.push([IsotopeA, IsotopeB]);
      }
    }
  }
}

GetRandomFissionProducts(230, 92, 3);

function GetBetaDecayProduct(AtomicMass, Electrons) { // the number of electrons will go up by one

}

const ColorDict = {
  yel:"#ffff00ff",
  dark:"#9a9a9aff",
  CellInnerLight:"#3d3d3dff",
  CellDark:"#252525ff",
  NUInnerLight:"#52ba4cff",
  NUDark:"#3d9339ff",
  bal:"#000000ff",
  U238:"#00bb06ff",
  U235:"#dfcc00ff",
  nal:"#ffa185ff", // color used for internal styling
  mel:"#7b0101ff" // color used for internal styling
}

const FuelCylinderRadiusCM = FuelCylinderDiameter/2/DPCM;
const FuelCylinderGrams = FuelCylinderArea*(GenericFuels[Fuel].Density); // g
const FuelCylinderKG = FuelCylinderGrams/1000*(+PoundFactor);

//console.log(Decimal.sub(new Decimal(1), Decimal.pow(e,new Decimal(-1).mul(Isotopes.U238.NucleiDensity).mul(Isotopes.U238.Barns(0.2).mul(FuelCylinderRadiusCM)))))
//console.log(+Decimal.pow(e,new Decimal(-1).mul(Isotopes.U238.NucleiDensity).mul(Isotopes.U238.Barns(0.2).mul(FuelCylinderRadiusCM))))
const FuelNeutronEmissionMinute = Math.floor(FuelCylinderGrams*6.5);

const ContainerMain = document.getElementById("ContainerMain");
const Calandria = document.getElementById("Calandria");
const Core = document.getElementById("CoreContainer");
const VCopyableControlRod = document.getElementById("ctrlBase");
const HCopyableControlRod = document.getElementById("FuelLayerBase");
const Info = document.getElementById("info");
const CtrlRodContainer = document.getElementById("CtrlRodCont");
const FuelLayerContainer = document.getElementById("FuelLayerCont");
const FloodPanelDisplay = document.getElementById("FloodPanelDisplay");
const CopyableFuelRod = document.getElementById("FuelBase");
const NeutronGraphic = document.getElementById("neutrongraphic");
const MeanBundleHeat = document.getElementById("MeanBundleHeat");
const NeutronsSimulated = document.getElementById("NeutronsSimulated");
const MeanAdjusterRodInsertion = document.getElementById("MeanAdjusterRodInsertion");
const ELastMS = document.getElementById("LastMS");
const JoulesLF = document.getElementById("JoulesLastFrame");
const AdjustTo = document.getElementById("AdjustTo");
const BulkAdjuster = document.getElementById("BulkAdjuster");
const BulkAdjust1 = document.getElementById("BulkAdjust1");

VCopyableControlRod.style.width = AdjusterRodWidth;
VCopyableControlRod.style.height = FluidElement;
HCopyableControlRod.style.height = AdjusterRodWidth;
HCopyableControlRod.style.width = FluidElement;

_Scale(ContainerMain, SimContainer, SimPageMargin);
_Scale(Calandria, CalandriaScale, null, CalandriaTopLeft);
_Scale(Core, FluidElement, null, FluidElementTL);

VCopyableControlRod.style.display = 'none';
HCopyableControlRod.style.display = 'none';
NeutronGraphic.style.display = 'none';
Core.className = "Water";

function _Scale(Element, Scale, Margin, TL) {
  Element.style.height = Scale+"px";
  Element.style.width = Scale+"px";
  Element.style.margin = (Margin ?? "0px")+"px";
  if (TL) {
    Element.style.top = TL.y+"px";
    Element.style.left = TL.x+"px";
  }
}

// INFO PROMPT CONTROLLER //

document.addEventListener("keydown",(event)=>{
  keys[event.keyCode] = true;
  InfoUpdater(event, true);
})
document.addEventListener("keyup",(event)=>{
  keys[event.keyCode] = false;
  InfoUpdater(event, true);
})

var Holding = false;

document.addEventListener("mousemove",InfoUpdater)
document.addEventListener("mousedown", (Event)=>{
  //console.log("dooown :3")
  NotchAndPair.forEach((Pair)=>{
    if (Holding) return;
    const Notch = Pair.Notch;
    const Rod = Pair.Rod;
    const TL = TopLeft(Notch);
    const BR = BottomRight(Notch);
    
    if (!(Event.x > TL.x && Event.x < BR.x)) {// not horizontally inside notch
      return;
    }
    //console.log("horizontally insiiiiide :3");
    if (!(Event.y < BR.y && Event.y > TL.y)) {// not vertically inside notch
      return;
    }
    //console.log("Verically insiiide :D");
    Holding = Pair;
  });
})
document.addEventListener("mouseup", (Event)=>{
  if (Holding) {Holding = false;}
});

function HandleHolding(Event) {
  const Notch = Holding.Notch;
  const Rod = Holding.Rod;
  const CTL = TopLeft(Core);
  const CBR = BottomRight(Core);
  const NTL = TopLeft(Notch);
  const NBR = BottomRight(Notch);
  const x = Event.x;
  const y = Event.y;
  const Axis = Rod.__RodAxis; // "x", "y"
  if (Axis == "y") {
    const Height = CBR.y - CTL.y;
  
    const Of100 = (100/Height);
  
    const CursorHeight = 100-Of100*(Math.max(Math.min(CBR.y - y,Height), 0));
    const VisualScalingFactor = (100-(Math.ceil(Of100*Notch.clientHeight)))/100;
    Notch.style.top = CursorHeight*VisualScalingFactor+"%";
    // On the screen im working with this has produced a rounding error that prohibits the notches from
    // reaching the bottom of the adjuster rods but it IS 98% which is intended behavior so its good enough
    Rod.__Insertion = roundTo(CursorHeight/100,2);
  } else {
    const Width = CBR.x - CTL.x;
  
    const Of100 = (100/Width);
  
    const CursorWidth = 100-Of100*(Math.max(Math.min(CBR.x - x,Width), 0));
    const VisualScalingFactor = (100-(Math.ceil(Of100*Notch.clientWidth)))/100;
    Notch.style.left = CursorWidth*VisualScalingFactor+"%";
    // On the screen im working with this has produced a rounding error that prohibits the notches from
    // reaching the bottom of the adjuster rods but it IS 98% which is intended behavior so its good enough
    Rod.__Insertion = roundTo(1-(CursorWidth/100),2);
  }
  //RodDescriptor(Holding);
}

function HardUpdateNotches() {
  NotchAndPair.forEach((Holding)=>{
    const Notch = Holding.Notch;
    const Rod = Holding.Rod;
    const CTL = TopLeft(Core);
    const CBR = BottomRight(Core);
    const NTL = TopLeft(Notch);
    const NBR = BottomRight(Notch);
    const Axis = Rod.__RodAxis;
    const scale = 100-Rod.__Insertion*100;
    
    if (Axis == "y") {
      const Height = CBR.y - CTL.y;
  
      const Of100 = (100/Height);
      
      const VisualScalingFactor = (100-(Math.ceil(Of100*Notch.clientHeight)))/100;
      Notch.style.top = ((100-scale)*VisualScalingFactor)+"%";
    } else {
      const Width = CBR.x - CTL.x;
  
      const Of100 = (100/Width);
  
      const VisualScalingFactor = (100-(Math.ceil(Of100*Notch.clientWidth)))/100;
      Notch.style.left = (scale*VisualScalingFactor)+"%";
    }
  });
}

keys[16] = false;

function InfoUpdater(event, keyCase, silent){
  // this function handles mouseMove (e,null)=>{} AND keyDown (e,null)=>{} keyUp (e,true)=>{}
  function Update(Target) {
    var Desc = Target.__Desc ?? EmptyTipText;
    var Extras = Target.__Extras ?? false;
    var Stepless = false;
    if (Target.Detailer) {
      Desc = Target.Detailer.getDesc();
      Extras = Target.Detailer.getExtras();
      if (Target.Detailer._stepless) {
        Stepless = true;
      }
    }
    if (keys[16] == false) {
      if (!Extras) { // shift is not down and there are no extras
        Info.innerHTML = Desc;
      } else { // shift is not down and there are extras
        Info.innerHTML = Desc+"<br>"+_Spacer+_p("Shift⇧ for more.", null, true);
      }
    } else {
      if (!Extras) { // shift is down and there are no extras
        if (Stepless) {
          Info.innerHTML = Desc+_Spacer+_p("Nothing to see here.", null, true);
        } else {
          Info.innerHTML = Desc+"<br>"+_Spacer+_p("Nothing to see here.", null, true);
        }
      } else { // shift is down and there are extras
        Info.innerHTML = Desc+"<br>"+_Spacer+Extras;
      }
    }
  }
  if (silent && MostRecentTarget) { // passive case used to refresh
    Update(MostRecentTarget)
    return;
  }
  if (keyCase && MostRecentTarget) { // Key handler. No description.
    Update(MostRecentTarget)
    return;
  }
  if (!event) {return;}
  if (!event.pageX) {
    Info.innerHTML = EmptyTipText;
    return;
  } // if not a mouseMove event
  if (Holding) {HandleHolding(event);}
  var Targ = event.target;
  MostRecentTarget = Targ;
  if (!ContainerMain.contains(Targ)) { // if the main container does not contain the target element
    Targ = null;
    MostRecentTarget = null;
    Info.innerHTML = EmptyTipText;
    Info.style.display = "none";
    return;
  }
  Info.style.display = "block";
  Info.style.top = Math.round(event.pageY)+"px";
  Info.style.left = Math.round(event.pageX)+15+"px";
  if (!Targ) return;
  Update(Targ);
  //Info.innerHTML = EmptyTipText; // Fallback
}

function contentHider(Body) {
  const Button = document.getElementById(Body+"hide");
  const Cont = document.getElementById(Body+"content");
  if (Button.innerText == "x") {
    Button.innerText = "Ex";
    Cont.style.display = "none";
  } else {
    Button.innerText = "x";
    Cont.style.display = "block";
  }
}

// TEXT FUNCTIONS //

function Combiner(List, Mode) {
  if (!Mode) Mode = "legacy";
  Mode = Mode.toLowerCase();
  
  var fn = "";
  for (let i = 0; i <= List.length-1; i++) {
    if (Mode == "legacy") {
      if (i == 0 || i == 1) {
        fn = fn + List[i];
        continue;
      }
      fn = fn +"<br>"+ List[i];
    } else if (Mode == "super") {
      if (i == 0 || i == 1 || i == 2) {
        fn = fn + List[i];
        continue;
      }
      fn = fn +"<br>"+ List[i];
    } else if (Mode == "minor") {
      fn = fn + List[i];
    } else {
      if (i == 0) {
        fn = fn + List[i];
        continue;
      }
      fn = fn +"<br>"+ List[i];
    }
  }
  return fn;
}

const NUFuelGradient = (`radial-gradient(${ColorDict["NUInnerLight"]}, ${ColorDict["NUDark"]})`);

function AssumeColor(col) {
  if (!col) {
    col = "white";
  }
  if (ColorDict[col]) {col = ColorDict[col];}
  return col
}
function Header(txt,color) {
  return `<h3 ${_cls} style='color:${AssumeColor(color)};padding-top:0px;margin-top:0px;'>${txt}</h3>`;
}
function Para(txt, color, subt) {
  if (!subt) return `<span ${_cls} class="info-txt" style='color:${AssumeColor(color)};'>${txt}</span>`;
  return `<span ${_cls} class="info-txt" style='color:${AssumeColor(color)};font-size:10px;'>${txt}</span>`;
}
function DisplayVal(Disp) {
  return ": "+Disp+";"
}
function HardSize(x, px) {
  return `<span style="font-size:${px}px">${x}</span>`
}
function _internal(col) {
  return `<span style="font-size:8px;color:${ColorDict[col ?? "dark"]}">&#60internal&#62</span>`;
}
function Fast() { // greater than 500 electron volts
  return `<span ${_cls} style='${_Math}'>n<sub style='${_Math}'>fast</sub></span>`
}
function Epi() { // less than or equal to 500 electron volts
  return `<span ${_cls} style='${_Math}'>n<sub style='${_Math}'>epi</sub></span>`
}
function Thermal() { // less than 0.025 electron volts
  return `<span ${_cls} style='${_Math}'>n<sub style='${_Math}'>th</sub></span>`
}
function Neutron() { // generic class
  return `<span ${_cls} style='${_Math}'>n</span>`
}

class Paragraph {
  constructor(Paragraph, Color) {
    this.Name = Paragraph;
    this.ColorDictRef = Color;
    this._extra = false;
    this._small = false;
  }
  small() {
    this.small = !(this.small);
    return this;
  }
  extra() {
    this._extra = !(this._extra);
    return this;
  }
  Output() {
    if (typeof (this.Name) === "function") {
      return this.Name();
    } else {
      return this.Name;
    }
  }
  Finalize() {
    if (this.Output() == "") {
      return "#&kill"
    }
    return _p(this.Output(),this.ColorDictRef,this._small);
  }
}

class Property {
  constructor(Name, Color, FetchFunction) {
    this.Name = Name;
    this.ColorDictRef = Color;
    this.Fetch = FetchFunction ?? false;
    if (!this.Fetch) {Error("class Property needs a FetchFunction. (function which returns a string or a string)")}
    this.Suffix = "";
    this._internal = false;
    this._flipped = false;
    this._extra = false;
    this._ic_ = "dark"; // i love adding increasingly more arbitrary assortments of _
  }
  suff(x, skipSpace) {
    if (skipSpace ?? false) {this.Suffix = x;} else {this.Suffix = " "+x;}
    return this;
  }
  internal(col) {
    this._internal = !(this._internal);
    this._ic_ = col ?? this._ic_; // the ?? operator is a gift from god
    return this;
  }
  flip() {
    this._flipped = !(this._flipped);
    return this;
  }
  extra() {
    this._extra = !(this._extra);
    return this;
  }
  _Prefix() {
    if (this._internal) {
      return _internal(this._ic_)+" ";
    } else {
      return "";
    }
  }
  _ValueColor() {
    if (this._flipped) {
      return "bal";
    } else {
      return "";
    }
  }
  Output() {
    if (typeof (this.Fetch) === "function") {
      return this.Fetch();
    } else {
      return this.Fetch;
    }
  }
  Finalize() {
    return this._Prefix()+_p(this.Name,this.ColorDictRef)+_p(_d(this.Output()+this.Suffix), this._ValueColor());
  }
}

class Detailer {
  constructor(Header, HeaderColorDictRef) {
    this.Header = Header;
    this.HeaderColorDictRef = HeaderColorDictRef;
    this.desc = false;
    this.extras = false;
    this._Abackstep = false;
    this._Bbackstep = false;
    // steptypes "legacy" "nonLegacy" "super" "minor"
    this._stepless = false;
    this.properties = [];
  }
  backstepA(x) {
    this._Abackstep = x;
    return this;
  }
  backstepB(x) {
    this._Bbackstep = x;
    return this;
  }
  stepless() {
    this._stepless = !(this._stepless);
    return this;
  }
  defDesc(x, color) {
    this.desc = _p(x, color);
    return this;
  }
  defExtras(x, color) {
    this.extras = _p(x, color);
    return this;
  }
  defProps(x) {
    this.properties = x;
    return this;
  }
  finalizedProperties(extras) {
    const target = [];
    this.properties.forEach((Prop)=>{
      if (Prop._extra == extras) {
        const Fin = Prop.Finalize();
        if (Fin != "#&kill") {
          target.push(Fin);
        }
      }
    });
    return target;
  }
  _getDesc() {
    if (this.desc) {
      return this.desc
    } else {
      return ""
    }
  }
  _getExtras() {
    if (this.extras) {
      return this.extras
    } else {
      return ""
    }
  }
  getDesc() {
    return _c([_h(this.Header, this.HeaderColorDictRef), this._getDesc()].concat(this.finalizedProperties(false)), this._Abackstep);
  }
  getExtras() {
    return _c([this._getExtras()].concat(this.finalizedProperties(true)), this._Bbackstep);
  }
}

function ColorArrayToText(a) {
  return `rgb(${a.r},${a.g},${a.b})`
};

// TEXT CONSTANTS //
const _c=Combiner,_h=Header,_p=Para,_d=DisplayVal;
const _cls="class='info-txt'";
const _Math = 'font-family: "XITS Math", "CMU Serif Roman", "Cambria Math", "Noto Sans Math";font-style: italic;';
const EmptyTipText = `<span style='color:yellow; font-size: 12px;'>Something ${HardSize("(maybe)", 8)} went wrong!</span>`;
const _Spacer = "<div style='height:3px;background-color:rgba(0,0,0,0);'></div>";

function GeneralInformationPanelUpdater() {
  var MBH = 0;
  var NS = 0;
  
  Object.values(FuelArray).forEach((FuelBundle)=>{
    MBH += FuelBundle.__Heat;
    NS += FuelBundle.__NeutronsLastFrame;
  });
  MBH = MBH/Object.values(FuelArray).length;
  MBH = roundTo(MBH, 2);
  
  var MARI = 0;
  const arawerarwar$$$$ = Object.values(RodArray).concat(Object.values(HorizontalRodArray));
  arawerarwar$$$$.forEach((Adjuster)=>{
    MARI += Adjuster.__Insertion;
  });
  MARI = MARI/arawerarwar$$$$.length*100;
  MARI = roundTo(MARI, 2);
  
  const A = new Property("Mean Bundle Heat", "red", MBH).flip();
  const B = new Property("Mean Adjuster Rod Insertion", "red", MARI).flip().suff("%", true);
  const BC = new Property("Joules Last Frame", "mel", JoulesOutput).flip().internal("mel");
  const C = new Property("Neutrons Simulated", "mel", NS).flip().internal("mel");
  const D = new Property("Last Frame Time", "mel", LastMS).flip().suff("MS").internal("mel");
  
  MeanBundleHeat.innerHTML = A.Finalize();
  MeanAdjusterRodInsertion.innerHTML = B.Finalize();
  JoulesLF.innerHTML = BC.Finalize();
  NeutronsSimulated.innerHTML = C.Finalize();
  ELastMS.innerHTML = D.Finalize();
  
  A = null;
  B = null;
  BC = null;
  C = null;
  D = null;
}

GeneralInformationPanelUpdater();

function CoreDescriptor() { // used by HTML
  if (Core.className == "HeavyWater") {
    FloodPanelDisplay.innerHTML = new Property("Fluid", "red", "Dideuterium Monoxide").flip().Finalize();
  } else if (Core.className == "Water") {
    FloodPanelDisplay.innerHTML = new Property("Fluid", "red", "Diprotium Monoxide").flip().Finalize();
  }
}
CoreDescriptor();

// CALANDRIA DETAILER //

const CalandriaProps = [
  new Property("Inner Bounds", "red", ()=>{return roundTo(CMtoInch(CalandriaSizeCM),2)}).suff("Inches")
]
const CalandriaDetailer = new Detailer("Calandria", "yel").defDesc("The shell of the reactor.").defProps(CalandriaProps);

Calandria.Detailer = CalandriaDetailer;

// CORE DETAILER //

const CoreFludTranslator = {HeavyWater: "Dideuterium Monoxide", Water: "Diprotium Monoxide"};
const CoreProps = [
  new Property("Fluid", "red", ()=>{return CoreFludTranslator[Core.classList]}),
  new Paragraph(()=>{if (Core.classList == "Water") {return "Water is a good "+Neutron()+" absorber, which makes simply filling the reactor chamber with water a good way to stop fission."} else {return "A "+Neutron()+" typically loses half of its electron volts per inch of deuterium oxide."}}).extra(),
  new Paragraph(()=>{if (Core.classList == "HeavyWater") {return "In this simulation, "+Neutron()+"s "+_p("always","red")+" just lose half."} else {return ""}}).extra(),
  new Paragraph(()=>{if (Core.classList == "HeavyWater") {return ""} else {return HardSize("Yeah, I'll bet you've never heard water being called diprotium monoxide.",8)}}, "dark").extra()
]

const CoreDetailer = new Detailer("Calandria Fluid", "yel").defProps(CoreProps).backstepA("super");
Core.Detailer = CoreDetailer;

// SIM CONTAINER DETAILER //

ContainerMain.Detailer = new Detailer("Simulation Container", "yel").stepless();

// MATHS //

// FISSION RESEARCH //
/*
0% fission for fast
0.7% fission for epithermal
  Only U235 fissions with epithermal
100% fission for thermal

as a neutron is moderated it releases heat to the moderator. 
*/

// NEUTRON CREATION //
/*
1:
U238 and U235 both emit alpha radiation. 
2:
alpha radiation is not the source of neutrons in candus 
3:
A gamma particle colliding with a deuterium neucleus splits into a proton and a neutron !neutron alert!
i do not know what happens to the second neutron. i also do not care :D
4:
as it turns out u238 is (weakly) self-igniting so you dont need a neutron source
u238 will emit ~6.5 neutrons per minute per gram
5: it is not self-igniting because emitted neutrons are fast.
*/
/*
// TRIPPING //
The reactor's reactivity is heavyily limited by replacing the deuterium oxide with regular water which absorbs neutrons as opposed to moderating them.
For this simulation, the reactor will have zero reactivity when filled with water.
*/

/*
// FLUX CALCULATION //

as on the nuclear regulator commission:
The neutron flux value is calculated as the neutron density (n) multiplied by neutron velocity (v), where n is the number of neutrons per cubic centimeter (expressed as neutrons/cm3) and v is the distance the neutrons travel in 1 second (expressed in centimeters per second, or cm/sec).

nf = RodNeutrons/RodCM*NeutronVelocity

i do not have the information to accurately calculate neutron velocity so fixed values should be used for thermal, epithermal and fast

thermal 2200 m/s

since the range of energy for epithermal and fast neutrons is so absurdly large i have decided against calculating fast or epithermal flux. theyll just be displayed as "x>0"

*/

/*
when u238 fissions it releases 2 to 3 neutrons // 2+(Math.random() < 0.45 ? 1 : 0)
0.7% of neutrons will fission with u235, which also releases 2 to 3 neutrons at a higher rate // 2+(Math.random() < 0.50 ? 1 : 0)

the ev of neutrons from u235 fission is 200 MeV
i do not know the amount of electron volts in a neutron that can fission with u235 :(
*/

/*
Uranium-238 is not fissile and absorbs thermal neutrons.

U238 absorbs slow neutrons to become U239
I will assume this process happens throughly enough somewhat consistently happen quickly.
U239 beta decays into Np239
U239 has a half-life of 23 minutes.
Np239 has a half-life of around 2.7 days
Np239 beta decays into Pu239

Plutonium-239 is fissile.
*/

class NeutronParticle {
  constructor() {
    this.ElectronVolts = MeVtoeV(20*+Math.random())
    // typical eV for a neutron from U238
  }
}

function BottomRight(Element) {
  const rect = Element.getBoundingClientRect();
  return {x:rect.right, y:rect.bottom}
}
function TopLeft(Element) {
  const rect = Element.getBoundingClientRect();
  return {x:rect.left, y:rect.top}
}
function Middle(Element) {
  const rect = Element.getBoundingClientRect();
  return new Victor((rect.left+rect.right)/2,(rect.top+rect.bottom)/2);
}
function Cast(Body, Start, End) {
  const TL = TopLeft(Body);
  const BR = BottomRight(Body);
  let x1 = TL.x, y1 = TL.y;
  let x2 = BR.x, y2 = BR.y;
  let x3 = Start.x, y3 = Start.y;
  let x4 = End.x, y4 = End.y;
  
  let intersection;
  let intersection_pt;
  let D = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);          
  let nT = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);         
  let nU = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);         
  let t = nT / D; 
  let u = -nU / D;
  
  if (t > 0 && t < 1 && u > 0) {
    intersection = true; 
    intersection_pt = [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  } else {
    intersection = false;
    intersection_pt = null;
  }
  
  return intersection;
}

function CheckElementsInSameColumn(BodyA, BodyB) { // actually checks for colinarity
  if ((BodyA.xen == BodyB.xen) && (BodyA.yen == BodyB.yen)) { // mathless check :3
    return true;
  } else {
    return false;
  }
}

function GetExtremeRods(BodyA,BodyB) {
  const A = Middle(BodyA);
  const B = Middle(BodyB);
  var Parts = [];
  
  const Right = Math.max(A.x, B.x);
  const Left = Math.min(A.x, B.x);
  
  const Bottom = Math.max(A.y, B.y);
  const Top = Math.min(A.y, B.y);
  
  Object.values(RodArray).forEach((Rod)=>{
    const RodMiddle = Middle(Rod);
    if ( (Left < RodMiddle.x) && (Right > RodMiddle.x) ){
      Parts.push(Rod);
    }
  });
  Object.values(HorizontalRodArray).forEach((Rod)=>{
    const RodMiddle = Middle(Rod);
    if ( (Top < RodMiddle.y) && (Bottom > RodMiddle.y) ){
      Parts.push(Rod);
    }
  });
  
  return Parts;
}

const Normal = new Victor(1,0);

// DESIGN INITALIZER //

for (let i = 1; i < FuelColumns; i++) {
  // will run i times
  // first execution is at 0, final i-1
  
  // !VERTICAL! //
  
  
  const Clone = VCopyableControlRod.cloneNode(true);
  
  Clone.__RodAxis = "y";
  Clone.__Insertion = 1;
  Clone.style.display = "block";
  
  const Props = [
    new Property("Insertion", "red", ()=>{return roundTo(Clone.__Insertion, 2)})
  ];
  const CloneDetailer = new Detailer("Adjuster Rod", "yel").defExtras("Boron rods are inserted into the reactor between fuel to limit "+Neutron()+" flux.").defProps(Props).backstepA("minor");
  Clone.Detailer = CloneDetailer;
  
  const Notch = Clone.children[0];
  Notch.Detailer = new Detailer("Meter Notch", "yel").defDesc("Drag to set adjuster rod insertion.");
  CtrlRodContainer.append(Clone);
  NotchAndPair.push({Notch: Notch, Rod: Clone});
  Notch.style.zIndex = 2;
  RodArray[i] = Clone;
  
  Clone.style.left = Math.floor(IntervalVAdjusterRod*i)-(AdjusterRodWidth/2)+"px";
}

for (let i = 1; i < FuelLayers; i++) {
  // !HORIZONAL! //
  
  const Clone = HCopyableControlRod.cloneNode(true);
  
  Clone.__RodAxis = "x";
  Clone.__Insertion = 1;
  Clone.style.display = "block";
  
  const Props = [
    new Property("Insertion", "red", ()=>{return roundTo(Clone.__Insertion, 2)})
  ];
  const CloneDetailer = new Detailer("Adjuster Rod", "yel").defExtras("Boron rods are inserted into the reactor between fuel to limit "+Neutron()+" flux.").defProps(Props).backstepA("minor");
  Clone.Detailer = CloneDetailer;
  
  const Notch = Clone.children[0];
  Notch.Detailer = new Detailer("Meter Notch", "yel").defDesc("Drag to set adjuster rod insertion.");
  CtrlRodContainer.append(Clone);
  NotchAndPair.push({Notch: Notch, Rod: Clone});
  Notch.style.zIndex = 2;
  HorizontalRodArray[i] = Clone;
  
  Clone.style.top = Math.floor(IntervalHAdjusterRod*i)-(AdjusterRodWidth/2)+"px";
}

for (let x = 0; x < FuelColumns; x++) {
  
  for (let y = 0; y < FuelLayers; y++) {
    
    const halfrod = (AdjusterRodWidth / 2);
    const rod = AdjusterRodWidth;
    
    const pad = 12;
    //const fuelinset = 8;
    const halfpad = pad/2;
    
    const CalcSize = DistanceBetweenHAdjusterRods-pad;
    const FuelSize = FuelCylinderDiameter*FuelVisualScalingFactor;//CalcSize - fuelinset;
    
    const t = (y * (coreHeight/FuelColumns))+halfrod+halfpad;
    const l = (x * (coreHeight/FuelLayers))+halfrod+halfpad;
    
    const CellGradient = 
      (`radial-gradient(${ColorDict["CellInnerLight"]}, ${ColorDict["CellDark"]})`);
    
    const cell = document.createElement("div");
    
    cell.style.zIndex = 98;
    
    cell.style.width =  `${CalcSize}px`;
    cell.style.height = `${CalcSize}px`;
    cell.style.position = "absolute";
    cell.style.top = t+"px";
    cell.style.left = l+"px";
    cell.style.background = CellGradient;
    
    const Props = [
      new Property("Size", "nal", ()=>{return CalcSize}).internal(),
      new Property("X", "nal", ()=>{return l}).internal(),
      new Property("Y", "nal", ()=>{return t}).internal(),
      new Paragraph("The channel is lined with beryllium which reacts with <math><mmultiscripts><mi>α</mi><mprescripts/><mi>2</mi><mi>4</mi></mmultiscripts></math> from "+_p("U238", "U238")+".").extra(),
      new Paragraph("This reaction creates "+Fast()+".").extra(),
      new Paragraph("extra paragraph").extra()
    ];
    const CellDetailer = new Detailer("Fuel Channel", "yel").defDesc("A channel to hold fission fuel and distribute heat.").defProps(Props);
    cell.Detailer = CellDetailer;
    
    CtrlRodContainer.append(cell);
    
    const Fuel = document.createElement("div");
    Fuel.style.borderRadius = "50%";
    Fuel.style.position = "relative";
    Fuel.style.top = "50%";
    Fuel.style.left = "50%";
    Fuel.style.width = FuelSize+"px";
    Fuel.style.height = FuelSize+"px";
    Fuel.style.transform = "translate(-50%,-50%)";
    Fuel.style.background = NUFuelGradient;
    
    Fuel.xen = x;
    Fuel.yen = y;
    
    Fuel.__Heat = 0;
    Fuel.__NeutronsLastFrame = 0;
    Fuel.__Type = "Natural Uranium";
    Fuel.__Weight = FuelCylinderGrams;
    
    const FuelProps = [
      new Property("Type", "red", ()=>{return Fuel.__Type}),
      new Property("Weight", "red", ()=>{return roundTo(FuelCylinderKG*(+PoundFactor),2)}).suff("LBS"),
      new Property("Heat Units", "nal", ()=>{return Fuel.__Heat}).internal(),
      new Property("NFL", "nal", ()=>{return Fuel.__NeutronsLastFrame}).internal(),
      new Paragraph("NU consists of 99.3% "+_p("U238","U238")+" and 0.7% "+_p("U235", "U235")+".").extra(),
      new Paragraph(_p("U238","U238")+" emits ~6.5 "+Fast()+" per minute per gram through spontaneous fission.").extra()
    ]
    const FuelDetailer = new Detailer("Fuel Bundle", "yel").defProps(FuelProps).backstepA("super");
    Fuel.Detailer = FuelDetailer;
    
    const keys = Object.keys(FuelArray).length;
    FuelArray[keys] = Fuel;
    
    Fuel.style.display = "block";
    cell.append(Fuel);
  }
}

function hexToRgb(hex) {
  // Remove leading # if present
  hex = hex.replace(/^#/, "");

  // If shorthand (#abc), expand to full form (#aabbcc)
  if (hex.length === 3) {
    hex = hex.split("").map(ch => ch + ch).join("");
  }

  // Parse r, g, b
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return { r, g, b };
}
function interpolateRgb(rgb1, rgb2, alpha) {
  // clamp alpha between 0 and 1
  alpha = Math.max(0, Math.min(1, alpha));

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * alpha);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * alpha);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * alpha);

  return { r, g, b };
}


const StartTime = Date.now();
var Delta = 0;
var TimeOfLastFrame = 0;
var LastMS = 0;
var Time = Date.now()-StartTime;
var TimeScale = 1; // non functional rn
var JoulesOutput = new Decimal("0");

var MostFissions = 0;

var Runtime = window.setInterval(MainCalculations, 1000/TargetFPS);
MainCalculations();


var ArbitraryTestFinished = false;

function ArbitraryTest() {
  //window.clearInterval(Runtime);
}

function RecalcTime(output) {
  Time = (Date.now()-StartTime)/1000;
  Delta = Time-TimeOfLastFrame;
  if (output) console.log(Time);
}

function MainCalculations() {
  RecalcTime(keys[70]); // output time if f is down
  
  if (keys[82]) { // output delta if r is down
    console.log(Delta);
  }
  
  if (keys[69]) { // exit loop if e is down
    window.clearInterval(Runtime);
    console.warn("Exited");
  } 
  
  Object.values(FuelArray).forEach((e)=>{
    e.Redness = 0;
    e.Fissions = 0;
    e.__NeutronsLastFrame = 0;
    if (e.__Type == "Natural Uranium") {
      e.style.background = NUFuelGradient;
      if (!(e.NUInit)) {
        e.NUInit = true;
        e.__Atoms = {};
        const qa = e.__Atoms;
        e.__Count = NUAtomsInKG*new Decimal((new Decimal(e.__Weight)).div(new Decimal("1000")));
        qa.U238 = Decimal.mul(e.__Count, new Decimal("0.993"));
        qa.U235 = Decimal.mul(e.__Count, new Decimal("0.007"));
        const sz = new Decimal(0);
        qa.U239 = sz;
        qa.Np239 = sz;
        qa.Pu239 = sz;
        qa.SatanicWasteProducts = {}
        sz = null;
      }
      // 1000 total 
      // 900 U238
      // 100 U238
      // x greater than 900 should select U235
      // x less than 100 should select U238
      function GetHitIsotope() {
        
      }
      const Selected = Math.random() * e.__Count;

      let threshold = 0;

      if ((threshold += e.__Atoms.U238) >= Selected) {
        //console.log("U238", Selected);
      } else if ((threshold += e.__Atoms.U235) >= Selected) {
        //console.log("U235", Selected);
      } else if ((threshold += e.__Atoms.U239) >= Selected) {
        //console.log("U239", Selected);
      } else if ((threshold += e.__Atoms.Np239) >= Selected) {
        //console.log("Np239", Selected);
      } else {
        //console.log("Pu239", Selected);
      }
      //console.log(threshold);

    }
    
  })
  var ReactorReturns;
  if (Core.className == "HeavyWater") { // Main Reactor functions
    ReactorReturns = HandleReactor();
  }
  
  if (Time>=1 && (!ArbitraryTestFinished)) {
    ArbitraryTest();
    ArbitraryTestFinished = true;
  }
  InfoUpdater(null, false, true);
  GeneralInformationPanelUpdater();
  TimeOfLastFrame = Time;
}

function GetNeutrons(Time) {
  const RawEmittedNeutrons = (Time/60)*FuelNeutronEmissionMinute;
  const SimulatedNeutrons = Math.floor(RawEmittedNeutrons/NeutronDensity);
  const WeakDensity = Math.floor(RawEmittedNeutrons%NeutronDensity);
  return [SimulatedNeutrons, WeakDensity];
}

function HandleReactor() {
  const START = Date.now();
  const NeutronSet = GetNeutrons(Delta);
  const SimulatedNeutrons = NeutronSet[0];
  const Final = NeutronSet[1];
  var Rays = SimulatedNeutrons;
  if (Final > 0) {
    //Rays+=1;
  }
  // NeutronSet[0] represents full density neutrons
  // Neutronset[1] represents the density of the last neutron to simulate with less than the regular neutron density
  
  // currently i calculate another whole ray for the final ray. it might make more sense for the existing rays
  // to have a higher effective density like this: (current density) += Final/Rays
  var FinalNeutrons = 0;
  var FinalCasts = 0;
  var ISCChecls = 0;
  var FinalRayHits = 0;
  JoulesOutput = Decimal.max(JoulesOutput.sub(JoulesReduction.div(new Decimal(TargetFPS))),new Decimal(0));
  // subtract 
  Object.values(FuelArray).forEach((Element)=>{
    for (var i = 0; i < Rays; i++) {
      // will run i times
      // first execution is at 0, final i-1
      for (let alti = 0; alti < Object.values(FuelArray).length; alti++) {
        const OtherElement = FuelArray[alti];
        if (Element == OtherElement) {continue;}
        var ThisNeutron = new Neutron();
        var ElectronVolts = ThisNeutron.ElectronVolts;
        ThisNeutron = null;
        const ISC = CheckElementsInSameColumn(Element, OtherElement);
        ISCChecls++;
        
        var effectiveNeutronDensity = NeutronDensity+(OtherElement.Fissions*(2+Extra(0.4)));
        //if (i == Rays-1) {effectiveNeutronDensity = Final};
        
        effectiveNeutronDensity += (Final/Rays);
        
        if (ISC == false) {
          // get the control rods between them
          // calculate the number of neutrons lost after passing through
          // if neutrons reaches zero then continue
          // GetExtremeRods(BodyA,BodyB)
          const er = GetExtremeRods(Element,OtherElement);
          er.forEach((R)=>{
            const ins = 1-R.__Insertion;
            effectiveNeutronDensity = Math.max(ins*effectiveNeutronDensity, 0);
          })
          effectiveNeutronDensity = Math.floor(effectiveNeutronDensity);
        }
        
        if (effectiveNeutronDensity <= 0) {
          continue;
        }
        
        const ThisFuelVic = Middle(Element);
        const Dir = Normal.clone().rotateByDeg(Math.random()*360).multiply(new Victor(1500,1500));
        const Distance = ThisFuelVic.distance(Dir);
        const DistanceInches = Distance/DPI; 
        
        ElectronVolts = decayByInches(ElectronVolts, DistanceInches);
        if (ElectronVolts > 0.025) { // the neutron is not thermal which means i dont care about it
          continue;
        }
        
        var Res = Cast(OtherElement, ThisFuelVic, Dir);
        FinalCasts++;
        // NU #52BA4C
        if (Res) {
          OtherElement.__Heat += (effectiveNeutronDensity*HeatPerFission.NU);
          OtherElement.__NeutronsLastFrame =+ effectiveNeutronDensity;
          OtherElement.Redness += 1/Rays;
          OtherElement.Fissions += effectiveNeutronDensity;
          const IsU235 = Extra(0.007);
          if (IsU235) {
            // u235
            // 3.2e-11
            JoulesOutput = JoulesOutput.add(JoulesPerFission["U235"]);
          } else {
            // u238
            // 3.18e-11
            JoulesOutput = JoulesOutput.add(JoulesPerFission["U238"]);
          }
          
          if (OtherElement.Fissions > MostFissions) {
            MostFissions = OtherElement.Fissions;
          }
          FinalNeutrons += effectiveNeutronDensity;
          FinalRayHits++;
          i++;
        } else {
          //OtherElement.__NeutronsLastFrame = 0;
          OtherElement.style.background = NUFuelGradient;
        }
        const NUInnerLight = hexToRgb(ColorDict["NUInnerLight"]);
        const NUDark = hexToRgb(ColorDict["NUDark"]);
        const res1 = interpolateRgb(NUInnerLight, {r:255,g:40,b:40}, OtherElement.Redness);
        const res2 = interpolateRgb(NUDark, {r:255,g:0,b:0}, OtherElement.Redness);
        const FuelGradient = (`radial-gradient(${ColorArrayToText(res1)}, ${ColorArrayToText(res2)})`);
        OtherElement.style.background = FuelGradient;
      }
    }
  });
  //console.log(FinalNeutrons);
  //Core.className = "Water";
  //console.log("Colinear Checks: "+ISCChecls);
  //console.log("Casts: "+FinalCasts);
  //console.log("HitCasts: "+FinalRayHits);
  //console.log("Process MS: "+(Date.now()-START));
  // estimate total isc checks / most possible rays:
  // Math.pow(Object.values(FuelArray).length,2)*Rays
  LastMS = Date.now()-START;
  return MostFissions;
}
function killVisual() {
  const elementsToRemove = document.getElementsByClassName("Neutron"); // i dont think ive literally ever used this selector.
  Object.values(elementsToRemove).forEach(element => {
    element.remove();
  });
}

NeutronGraphic.remove();
HCopyableControlRod.remove();
VCopyableControlRod.remove();
//CopyableFuelLayer.remove();

function BulkControl(x) {
  const c = Object.values(RodArray).concat(Object.values(HorizontalRodArray));
  c.forEach((rod)=>{
    rod.__Insertion = x;
  });
  GeneralInformationPanelUpdater();
  HardUpdateNotches();
}

BulkAdjuster.addEventListener("click", (e) => {
  BulkControl(Number(AdjustTo.value))
});
BulkAdjust1.addEventListener("click", (e) => {
  BulkControl(1);
});
