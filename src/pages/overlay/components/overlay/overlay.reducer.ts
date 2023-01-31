export const ACTIONS = {
  // Ambassador list
  SHOW_AMBASSADOR_LIST: 'showAmbassadorList',
  HIDE_AMBASSADOR_LIST: 'hideAmbassadorList',
  // Alveus intro
  SHOW_ALVEUS_INTRO: 'showAlveusIntro',
  HIDE_ALVEUS_INTRO: 'hideAlveusIntro'
}

interface OverlayState {
  showAmbassadorList: boolean,
  showAlveusIntro: boolean
}

export const OverlayReducer = (state: OverlayState, action: {type: string}) => {
    switch (action.type) {
      case ACTIONS.SHOW_AMBASSADOR_LIST:
        if (!state.showAmbassadorList) {
          return {
            showAmbassadorList: true,
            showAlveusIntro: false
          }
        }
        return state
      case ACTIONS.HIDE_AMBASSADOR_LIST:
        return { ...state, showAmbassadorList: false }

      case ACTIONS.SHOW_ALVEUS_INTRO:
        if (!state.showAlveusIntro) {
          return {
            showAmbassadorList: false,
            showAlveusIntro: true
          }
        }
        return state
      case ACTIONS.HIDE_ALVEUS_INTRO:
        return { ...state, showAlveusIntro: false }
      default:
        return state
    }
  }
