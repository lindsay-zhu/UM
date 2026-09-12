export const initialState = { scene: 0, step: 0, choices: {}, profile: null, sideVisit: false, diamonds: 0 };
export const maxStep = scene => ({4:5, 6:2, 7:5}[scene] ?? 0);
export function gameReducer(state, action) {
  switch (action.type) {
    case 'HOME': return { ...state, scene: 0, step: 0, profile: null, sideVisit: false };
    case 'RESTART': return { ...initialState, scene: 1, choices: {} };
    case 'VISIT': return { ...state, scene: action.scene, step: 0, profile: null, sideVisit: true };
    case 'PROFILE': return { ...state, profile: action.id };
    case 'NEXT':
      if(state.profile) return { ...state, profile: null };
      if(state.scene === 0 || state.scene === 12) return state;
      if(state.sideVisit && state.scene === 2) return { ...state, scene: 0, step: 0, sideVisit: false };
      if(state.step < maxStep(state.scene)) return { ...state, step: state.step + 1 };
      return { ...state, scene: state.scene + 1, step: 0, profile: null, diamonds: 0 };
    case 'PREV':
      if(state.profile) return { ...state, profile: null };
      if(state.sideVisit && [2,10].includes(state.scene)) return { ...state, scene: 0, step: 0, sideVisit: false };
      if(state.step > 0) return { ...state, step: state.step - 1 };
      return { ...state, scene: Math.max(0, state.scene - 1), step: maxStep(state.scene - 1), profile: null, diamonds: 0 };
    case 'CHOOSE': return { ...state, choices: { ...state.choices, [state.scene]: action.option } };
    case 'DIAMOND': return state.scene === 8 ? { ...state, diamonds: Math.min(5, state.diamonds + 1) } : state;
    default: return state;
  }
}
