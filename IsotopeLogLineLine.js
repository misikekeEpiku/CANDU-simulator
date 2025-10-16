// sources: JAEA nuclear data center, Los Alamos National Labratory
// JAEA does not have all the fission data for the more unlikely isotopes that LANL does have.

const JAEAX1 = ToLog("0.0256");
const JAEAX2 = MegaToLog("14");

const IsotopeLogLineLine = {
	U233:{
        Fission:{
            x1:JAEAX1,y1:ToLog("531.3"),x2:JAEAX2,y2:ToLog("2.364")
        },
        Absorption:{
            x1:Qd("1e-10"),y1:Qd("1e+3"),x2:Qd("0.9"),y2:Qd("1e-1")
        },
    },
    U234:{
        Fission:{
            x1:JAEAX1,y1:MicroToLog("67.02"),x2:JAEAX2,y2:ToLog("2.066")
        },
        Absorption:{
            x1:Pd("1e-9.5"),y1:Qd("1e+3"),x2:Qd("1e-2"),y2:Qd("0")
        },
    },
    U235:{
        Fission:{
            x1:JAEAX1,y1:ToLog("585.1"),x2:JAEAX2,y2:ToLog("2.053")
        },
        Absorption:{
            x1:Qd("1e-9"),y1:Pd("1e+2.8"),x2:Pd("1e-1.7"),y2:Qd("0")
        },
    },
    U236:{
        Fission:{
            x1:JAEAX1,y1:MicroToLog("259.4"),x2:JAEAX2,y2:ToLog("1.611")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Pd("1e+2.4"),x2:Qd("1e-2"),y2:Qd("0")
        },
    },
    U237:{
        Fission:false,  
        Absorption:{
            x1:Qd("1e-9"),y1:Qd("1e+4"),x2:Qd("1e-2"),y2:Qd("0")
        },
    },
    U238:{
        Fission:{
            x1:JAEAX1,y1:MicroToLog("16.8"),x2:JAEAX2,y2:ToLog("1.136")
        },
        Absorption:{
            x1:Qd("1e-10"),y1:Pd("1e+1.7"),x2:Pd("1e-6.5"),y2:Qd("0")
        },
    },
    U239:{
        Fission:false, 
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1e+3"),x2:Pd("1e-0.5"),y2:Qd("1e-1")
        },
    },
    U240:{
        Fission:{
            x1:JAEAX1,y1:MicroToLog("323"),x2:JAEAX2,y2:MilliToLog("83")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1e+3"),x2:Qd("1e-1"),y2:Qd("1e-1")
        },
    },
    U241:{ // dfv
        Fission:false, // no data
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1.3e+4"),x2:Qd("0"),y2:Qd("1e-1")
        },
    },
    // Np-234 to Np-238 are outrageously unlikely and will not be filled out presently.
    Np234:{
        Fission:false,
        Absorption:false,
    },
    Np235:{
        Fission:false,
        Absorption:false,
    },
    Np236:{
        Fission:false,
        Absorption:false,
    },
    Np237:{
        Fission:false,
        Absorption:false,
    },
    Np238:{
        Fission:false,
        Absorption:false,
    },
    Np239:{
        Fission:{
            x1:Qd("0"),y1:Qd("0"),x2:Qd("0"),y2:Qd("0")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1.3e+3"),x2:Qd("0.3e-1"),y2:Qd("0.7e-1")
        },
    },
    Np240:{
        Fission:false,
        Absorption:false,
    },
    // there are more plutonium isotopes i am not accounting for because they are unlikely
    // i may want to add them later.
    Pu239:{ // dfv
        Fission:{
            x1:JAEAX1,y1:ToLog("747.4"),x2:JAEAX2,y2:ToLog("2.334")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1.05e+4"),x2:Qd("1e-1"),y2:Qd("1e-1")
        },
    },
    Pu240:{
        Fission:{
            x1:JAEAX1,y1:MicroToLog("36"),x2:JAEAX2,y2:ToLog("2")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1.1e+4"),x2:Qd("1e-1"),y2:Qd("0")
        },
    },
    Pu241:{ // dfv
        Fission:{
            x1:JAEAX1,y1:KiloToLog("1.016"),x2:JAEAX2,y2:ToLog("2.26")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1.35e+4"),x2:Qd("1.5e-1"),y2:Qd("0.25e-1")
        },
    },
    Pu242:{
        Fission:{
            x1:JAEAX1,y1:MilliToLog("2.5"),x2:JAEAX2,y2:ToLog("2")
        },
        Absorption:{
            x1:Qd("1e-11"),y1:Qd("1e+3"),x2:Qd("0"),y2:Qd("1e-1")
        },
    },
};
