export function seq(len) {
    return Array.apply(null, { length: len }).map(Function.call, Number);
}

export enum CTRL_KEY {
    PowerSet,
    OperationalMode,
    SilentMode,
    FaultReset
}

export enum TIME_KEY {
    Month,
    Day,
    Hour,
    Minute
}

export enum CFG_KEY {
    SetTemp_Cool_WaterIN,
    SetTemp_Heat_WaterIN,
    SetTemp_Cool_WaterOUT,
    SetTemp_Heat_WaterOUT,
    Cooling_WaterCtrl,
    Heating_WaterCtrl,
    CtrlCycle,
    SetTemp_WaterAction
}

export function ensureBytes(data, len, dir = 'left') {
    data = data || '';
    let bitsLen = len * 2;
    let paddingLen = bitsLen - data.toString().length;

    if (dir === 'left') {
        return new Array(paddingLen + 1).join('0') + data;
    }

    return data + new Array(paddingLen + 1).join('0');
}

export function composeMQTTPayload(config) {
    let payload = '';
    let HEADER = 48;
    let TAIL = 54;
    let deviceType = 'D0';
    let action = config.action;
    let MAC = config.MAC;

    switch (action) {
        //”’H’(1Byte)+Dev_Type(0xD0,1Byte)+Dev_ID(8Byte)+’T’(1Byte)
        case 'DR':
            payload = [HEADER, deviceType, MAC, TAIL].join('');
            break;
        case 'DC':
            //”’H’(1Byte)+Dev_Type(0xD0,1Byte)+Dev_ID(8Byte)+YORK_MASTER_CTRL_CMD_TYPEDEF(4Byte)+EXEC_DATE_TYPEDEF(4Byte)+’T’(1Byte 
            payload = [
                HEADER,
                deviceType,
                MAC,
                ensureBytes(config[CTRL_KEY.PowerSet], 1),
                ensureBytes(config[CTRL_KEY.OperationalMode], 1),
                ensureBytes(config[CTRL_KEY.SilentMode], 1),
                ensureBytes(config[CTRL_KEY.FaultReset], 1),
                ensureBytes(config[TIME_KEY.Month], 1),
                ensureBytes(config[TIME_KEY.Day], 1),
                ensureBytes(config[TIME_KEY.Hour], 1),
                ensureBytes(config[TIME_KEY.Minute], 1),
                TAIL
            ].join('');
            break;
        case 'CFG':
            //”’H’(1Byte)+Dev_Type(0xD0,1Byte)+Dev_ID(8Byte)+YORK_MASTER_CFG_PARAM_TYPEDEF(14Byte)+’T’(1Byte)
            payload = [
                HEADER,
                deviceType,
                MAC,
                ensureBytes(config[CFG_KEY.SetTemp_Cool_WaterIN], 1),
                ensureBytes(config[CFG_KEY.SetTemp_Heat_WaterIN], 1),
                ensureBytes(config[CFG_KEY.SetTemp_Cool_WaterOUT], 1),
                ensureBytes(config[CFG_KEY.SetTemp_Heat_WaterOUT], 1),
                ensureBytes(config[CFG_KEY.Heating_WaterCtrl], 1),
                ensureBytes(config[CFG_KEY.CtrlCycle], 1),
                ensureBytes(config[CFG_KEY.SetTemp_WaterAction], 1),
                TAIL
            ].join('');
            break;
        default:
            console.warn(action, ' is not supported!');

    }

    return payload;
}