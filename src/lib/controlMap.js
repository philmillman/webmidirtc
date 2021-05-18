const PROG_CHANGE_CHANNEL = 14;
const FX_CONTROL_CHANNEL = 9;
const DN_TRACK1_CHANNEL = 1;
const DN_TRACK2_CHANNEL = 2;
const DN_TRACK3_CHANNEL = 3;
const DN_TRACK4_CHANNEL = 4;

export const msgMap = {
    play: {
        method: 'sendStart',
        params: ''
    },
    stop: {
        method: 'sendStop',
        params: ''
    },
    prog1: {
        method: 'sendProgramChange',
        params: [0, PROG_CHANGE_CHANNEL]
    },
    prog2: {
        method: 'sendProgramChange',
        params: [1, PROG_CHANGE_CHANNEL]
    },
    prog3: {
        method: 'sendProgramChange',
        params: [2, PROG_CHANGE_CHANNEL]
    },
    prog4: {
        method: 'sendProgramChange',
        params: [3, PROG_CHANGE_CHANNEL]
    },
    mute1: {
        method: 'sendControlChange',
        params: [94, 127, DN_TRACK1_CHANNEL]
    },
    mute2: {
        method: 'sendControlChange',
        params: [94, 127, DN_TRACK2_CHANNEL]
    },
    mute3: {
        method: 'sendControlChange',
        params: [94, 127, DN_TRACK3_CHANNEL]
    },
    mute4: {
        method: 'sendControlChange',
        params: [94, 127, DN_TRACK4_CHANNEL]
    },
    unmute1: {
        method: 'sendControlChange',
        params: [94, 0, DN_TRACK1_CHANNEL]
    },
    unmute2: {
        method: 'sendControlChange',
        params: [94, 0, DN_TRACK2_CHANNEL]
    },
    unmute3: {
        method: 'sendControlChange',
        params: [94, 0, DN_TRACK3_CHANNEL]
    },
    unmute4: {
        method: 'sendControlChange',
        params: [94, 0, DN_TRACK4_CHANNEL]
    },
    delayVol: {
        method: 'sendControlChange',
        params: (val) => [20, val, FX_CONTROL_CHANNEL]
    },
    delayFbk: {
        method: 'sendControlChange',
        params: (val) => [18, val, FX_CONTROL_CHANNEL]
    },
    delayTime: {
        method: 'sendControlChange',
        params: (val) => [15, val, FX_CONTROL_CHANNEL]
    },
    verbVol: {
        method: 'sendControlChange',
        params: (val) => [23, val, FX_CONTROL_CHANNEL]
    },
    verbDecay: {
        method: 'sendControlChange',
        params: (val) => [74, val, FX_CONTROL_CHANNEL]
    },
    verbPredelay: {
        method: 'sendControlChange',
        params: (val) => [21, val, FX_CONTROL_CHANNEL]
    },
}