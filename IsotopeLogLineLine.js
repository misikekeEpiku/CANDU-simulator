// sources: JAEA nuclear data center, Los Alamos National Labratory
const JAEAX1 = Qd("1e-0.6");
const JAEAX2 = Qd("1e+2.1461");

function Micro(N) {
    return Qd(N).div(Qd("1e+3")).log("10");
}
function Milli(N) {
    return Qd(N).div(Qd("1e6")).log("10");
}
function Reg(N) {
    return Qd(N).log(10);
}

IsotopeLogLineLine = {
	U233:{
        Fission:{
            x1:JAEAX1,y1:Qd("1e+3.725"),x2:JAEAX2,y2:Qd("1e+1.28")
        },
        Absorption:{
            x1:Qd("1e-10"),y1:Qd("1e+3"),x2:Qd("1e-0.1"),y2:Qd("1e-1")
        },
    },
    U234:{
        Fission:{
            x1:JAEAX1,y1:Qd("1e-0.1737"),x2:JAEAX2,y2:Qd("1e+1.3")
        },
        Absorption:{
            x1:Qd("1e-9.5"),y1:Qd("1e+3"),x2:Qd("1e-2"),y2:Qd("0")
        },
    },
    U235:{
        Fission:{
            x1:Qd("1e-2"),y1:Qd("1e+0.8"),x2:Qd("1e-5.5"),y2:Qd("1e+1.6")
        },
        Absorption:{
            x1:Qd("1e-9"),y1:Qd("1e+2.8"),x2:Qd("1e-1.7"),y2:Qd("0")
        },
    },
    U236:{
        Fission:{
            x1:JAEAX1,y1:Micro("259.4"),x2:JAEAX2,y2:Reg("1.611")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1e+2.4"),x2:Qd("1e-2"),y2:Qd("0")
        },
    },
    U237:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
    U238:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
    U239:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
    U240:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
    Np239:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
    Np240:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
    Pu239:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
    Pu240:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
    },
};
