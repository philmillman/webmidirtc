const PROG_CHANGE_CHANNEL = 14;
const FX_CONTROL_CHANNEL = 9;

export const msgMap = {
    play: {
        method: 'sendStart',
        params: '',
        device: 'outputDN',
        message: 'Someone pressed play'
    },
    stop: {
        method: 'sendStop',
        params: '',
        device: 'outputDN',
        message: 'Someone pressed stop'
    },
    prog1: {
        method: 'sendProgramChange',
        params: [0, PROG_CHANGE_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed to pattern 1'
    },
    prog2: {
        method: 'sendProgramChange',
        params: [1, PROG_CHANGE_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed to pattern 2'
    },
    prog3: {
        method: 'sendProgramChange',
        params: [2, PROG_CHANGE_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed to pattern 3'
    },
    prog4: {
        method: 'sendProgramChange',
        params: [3, PROG_CHANGE_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed to pattern 4'
    },
    muteDN: {
        method: 'sendControlChange',
        params: (val) => [94, 127, val],
        device: 'outputDN',
        message: 'Someone muted a digitone track'
    },
    unmuteDN: {
        method: 'sendControlChange',
        params: (val) => [94, 0, val],
        device: 'outputDN',
        message: 'Someone unmuted a digitone track'
    },
    delayVol: {
        method: 'sendControlChange',
        params: (val) => [20, val, FX_CONTROL_CHANNEL],
        device: 'outputDN',
        message: 'Someoned changed the delay volume'
    },
    delayFbk: {
        method: 'sendControlChange',
        params: (val) => [18, val, FX_CONTROL_CHANNEL],
        device: 'outputDN',
        message: 'Someoned changed the delay feedback'
    },
    delayTime: {
        method: 'sendControlChange',
        params: (val) => [15, val, FX_CONTROL_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed the delay time'
    },
    verbVol: {
        method: 'sendControlChange',
        params: (val) => [23, val, FX_CONTROL_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed the reverb volume'
    },
    verbDecay: {
        method: 'sendControlChange',
        params: (val) => [74, val, FX_CONTROL_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed the reverb decay'
    },
    verbPredelay: {
        method: 'sendControlChange',
        params: (val) => [21, val, FX_CONTROL_CHANNEL],
        device: 'outputDN',
        message: 'Someone changed the reverb predelay'

    },
    muteDT: {
        method: 'sendControlChange',
        params: (val) => [94, 127, val],
        device: 'outputDT',
        message: 'Someone muted a digitakt track'
    },
    unmuteDT: {
        method: 'sendControlChange',
        params: (val) => [94, 0, val],
        device: 'outputDT',
        message: 'Someone unmuted a digitakt track'
    },
}