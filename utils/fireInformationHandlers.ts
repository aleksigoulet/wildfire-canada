/**
 * Returns the stage of control for a fire when given a two-letter stage of control code.
 * @param code - a two letter stage of control code.
 * @returns - a full stage of control string.
 */
function getControlStageString(code: string) : string {
  switch ( code ) {
    case 'OC':
      return 'Out of Control';
    case 'BH':
      return 'Being Held';
    case 'UC':
      return 'Under Control';
    case 'EX':
      return 'Out';
    default:
      // default is to return the original string
      // useful for non-standard codes (ex: US)
      return code;
  }
}

/**
 * Returns the type of response for a fire when given a three-letter response code.
 * @param code - a three-letter response code.
 * @returns - a full reponse string.
 */
function getResponseTypeString(code: string) : string {
  switch ( code ) {
    case 'FUL':
      return 'Full Response';
    case 'MOD':
      return 'Modified Response';
    case 'MON':
      return 'Monitored Response';
    default: 
      // default is to return the original string
      return code;
  }
}


export { getControlStageString, getResponseTypeString }