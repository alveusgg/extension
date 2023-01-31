export const ACTIONS = {
  // Ambassador list
  TOGGLE_AMBASSADOR_LIST: 'toggleAmbassadorList',
  SHOW_AMBASSADOR_LIST: 'showAmbassadorList',
  HIDE_AMBASSADOR_LIST: 'hideAmbassadorList',
  // Alveus intro
  TOGGLE_ALVEUS_INTRO: 'toggleAlveusIntro'
}

interface OverlayState {
  showAmbassadorList: boolean,
  showAlveusIntro: boolean
}

export const OverlayReducer = (state: OverlayState, action: {type: string}) => {
    switch (action.type) {
      case ACTIONS.TOGGLE_AMBASSADOR_LIST:
        // if the ambassador list is closed, close all other overlays and show the ambassador list
        // ! Refactor this so it is not hard coded
        if (!state.showAmbassadorList) {
          return {
            showAmbassadorList: true,
            showAlveusIntro: false
          }
        }
        // if the ambassador list is open, close it
        return { ...state, showAmbassadorList: false }
      case ACTIONS.SHOW_AMBASSADOR_LIST:
        return { ...state, showAmbassadorList: true }
      case ACTIONS.HIDE_AMBASSADOR_LIST:
        return { ...state, showAmbassadorList: false }
      case ACTIONS.TOGGLE_ALVEUS_INTRO:
        // if the alveus intro is closed, close all other overlays and show the alveus intro
        // ! Refactor this so it is not hard coded
        if (!state.showAlveusIntro) {
          return {
            showAmbassadorList: false,
            showAlveusIntro: true
          }
        }
        // if the alveus intro is open, close it
        return { ...state, showAlveusIntro: false }
      default:
        return state
    }
  }
