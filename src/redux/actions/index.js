const USER_LOGIN = 'USER_LOGIN';
const OUTRA_ACTION = 'OUTRA_ACTION';

export const minhaAction = (value) => ({ type: USER_LOGIN, value });

export const outraAction = (coisa) => ({ type: OUTRA_ACTION, coisa });
