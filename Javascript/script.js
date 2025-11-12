//
// placeholders (ł)
const łEvents = [ // mostly for reference
  "click",
];
function łcreate(inp) {
  return document.createElement(inp);
}
function łappend(ele) {
  document.body.append(ele);
}

class łspan {
  constructor(Text) {
    this.Text = łcreate("span");
    this.Text.innerHTML = Text;
  }
  col(color) {
    this.Text.style.color = color;
    return this;
  }
  size(fontSize) {
    this.Text.style.fontSize = fontSize+"px";
    return this;
  }
  stylize() {
    var classlist = "";
    for (let i = 0; i < arguments.length; i++) {
      this.Text.classList.add(arguments[i]);
    }
    return this;
  }
  hardReplace(content) {
    this.innerHTML = content;
    return this;
  }
}

class łbr {
  constructor(FontSize) {
    this.Text = łcreate("br");
    this.Text.style.fontSize = FontSize+"px";
  }
}

class łele {
  constructor(ele) {
    this.Element = łcreate(ele);
    this.scripts = [];
  }
  e() {
    return this.Element;
  }
  zindex(x) {
    this.e().style.zIndex = x;
    return this;
  }
  addClass(className) {
    for (let i = 0; i < arguments.length; i++) {
      this.e().classList.add(arguments[i]);
    }
    return this;
  }
  append(add) {
    this.Element.append(add);
    return this;
  }
  addScript(span) {
    for (let i = 0; i < arguments.length; i++) {
      this.scripts.push(arguments[i]);
    }
    return this;
  }
  killScripts() {
    this.scripts = [];
  }
  killContent() {
    this.e().innerHTML = null;
  }
  listen(event, handler) {
    this.Element.addEventListener(event, handler);
    return this;
  }
  finish() {
    var fn = "";
    this.scripts.forEach((v, i)=>{
      this.e().append(v.Text);
    })
    return this;
  }
  finishPre() {
    var fn = "";
    this.scripts.forEach((v, i)=>{
      this.e().prepend(v.Text);
    })
    return this;
  }
}

async function waitFor(wait, execute) {
  await new Promise(resolve => setTimeout(resolve, wait*1000));
  execute();
}

const łsticky = new łele("div");
const trayBlock = new łele("div");
const underbarContainer = new łele("div");
const slicktrayleft = new łele("div");
const slickrightbodyfill = new łele("div");
const shutTrayButton = new łele("button");
const mechanicaltray = new łele("div");
const LivingTrayContent = new łele("div");
const łmainSideBar = new łele("div");
const łbuttonMain = new łele("button");
const łbuttonAlt = new łele("button");
łsticky.addClass("topbar");
łappend(łsticky.e());
underbarContainer.addClass("underbarCont")
łappend(underbarContainer.e());
trayBlock.zindex("-1");
trayBlock.addClass("trayblock");
shutTrayButton.addClass("shutTrayBt")
slickrightbodyfill.append(shutTrayButton.e());
LivingTrayContent.addClass("ltc", "paper");
mechanicaltray.append(LivingTrayContent.e());
slickrightbodyfill.addClass("slickrightbodyfill");
trayBlock.append(slickrightbodyfill.e());
slicktrayleft.addClass("slickleft");
mechanicaltray.addClass("tray");
trayBlock.append(mechanicaltray.e());
trayBlock.append(slicktrayleft.e());
underbarContainer.append(trayBlock.e());
łbuttonMain.addClass("radius-thin", "sidebarBT", "anchorMiddleHori");
łbuttonAlt.addClass("radius-thin", "sidebarBT", "anchorMiddleHori");
łmainSideBar.addClass("mainSideBar");
łappend(łmainSideBar.e());
łmainSideBar.append(łbuttonMain.e());
łmainSideBar.append(łbuttonAlt.e());

// top left label text:
łsticky.addScript(new łspan("CANDU SIMULATOR").col("white").stylize("Mono")).finishPre();
shutTrayButton.addScript(new łspan("Shut Tray").col("white").stylize("Mono")).finish();
łbuttonMain.addScript(new łspan("<i>n<i>").col("white").stylize("Mono").size(18)).finish();
łbuttonAlt.addScript(new łspan("<i>a</i>").col("white").stylize("Mono").size(18)).finish();

var currentTABID = 0;
łbuttonMain.TABID = 1;
łbuttonMain.FUNCT = (ev)=>{LivingTrayContent.addScript(new łspan("Neutron Guide").size(22), new łbr(22), new łspan("Paragraph text.").size(14)).finish();};
łbuttonAlt.TABID = 2;
łbuttonAlt.FUNCT = (ev)=>{LivingTrayContent.addScript(new łspan("Header Text 2").size(22), new łbr(22), new łspan("Paragraph text 2.").size(14)).finish();};

function EmptyTray() {
  waitFor(0.2, ()=>{
    LivingTrayContent.killScripts();
    LivingTrayContent.killContent();
  });
}
function CloseTray() {
  trayBlock.e().classList.remove("extended");
  EmptyTray();
}
function OpenTray(Function) {
  Function();
  trayBlock.e().classList.add("extended");
}
function RefreshTray(Function) {
  trayBlock.e().classList.remove("extended");
  EmptyTray();
  waitFor(0.45, Function);
  waitFor(0.45, ()=>{trayBlock.e().classList.add("extended")});
}
function sidebarButtonHandler(Focus) {
  if (currentTABID == Focus.TABID) {
    RefreshTray(Focus.FUNCT);
    currentTABID = Focus.TABID; // arbit
  } else if (!(currentTABID == Focus.TABID) && Focus.TABID != 0) {
    RefreshTray(Focus.FUNCT);
    currentTABID = Focus.TABID;
  } else {
    OpenTray(Focus.FUNCT);
    currentTABID = Focus.TABID;
  }
}
function igniteButton(Bt) {
  Bt.listen("click", (ev)=>{sidebarButtonHandler(Bt)});
}

igniteButton(łbuttonMain);
igniteButton(łbuttonAlt);

shutTrayButton.listen("click", ()=>{
  CloseTray();
})