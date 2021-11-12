import type { RootState } from 'store';

export const selectErrors = (state: RootState) => state.errors;
export const selectErrorsList = (state: RootState) => selectErrors(state).errors;
export const selectErrorsMapping = (state: RootState) => selectErrors(state).mapping;
export const selectLoginError = (state: RootState) => selectErrorsMapping(state).login;
export const selectRegisterError = (state: RootState) => selectErrorsMapping(state).register;
