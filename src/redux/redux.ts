import React from 'react';
import { MeteorProps } from '../interfaces/interfaces';
import sortBy from 'lodash/sortBy';
import * as actions from './actions';

export const Redux = React.createContext(null);

export const initialState = {
    meteorsInitial: [],
    meteors: [],
    year: 1999,
    mass: 0,
};

export function reducer(state: any, action: { type: any; payload: any }) {
    switch (action.type) {
        case actions.GET_METEORS:
            const meteors = action.payload.filter((meteor: MeteorProps) => {
                const year = new Date(meteor.year);
                return (
                    year.getFullYear() === state.year &&
                    Number(meteor.mass) >= state.mass
                );
            });

            return {
                ...state,
                meteorsInitial: action.payload,
                meteors: meteors,
            };
        case actions.UPDATE_YEAR:
            const resultsByYear = state.meteorsInitial.filter(
                (meteor: MeteorProps) => {
                    const year = new Date(meteor.year);
                    return (
                        year.getFullYear() === Number(action.payload) &&
                        Number(meteor.mass) >= state.mass
                    );
                }
            );
            return {
                ...state,
                year: action.payload,
                meteors: resultsByYear,
            };
        case actions.MAX_MASS_EXCEEDED:
            return {
                ...state,
                mass: action.payload,
                meteors: [],
            };
        case actions.FIND_METEORS_BY_MASS:
            const meteorToMatchMass = sortBy(state.meteorsInitial, (meteor) =>
                Number(meteor.mass)
            ).find((meteor) => Number(meteor.mass) >= Number(action.payload));

            if (meteorToMatchMass) {
                const selectedYearByMass = new Date(
                    meteorToMatchMass.year
                ).getFullYear();

                const collectionToMatchMass = state.meteorsInitial.filter(
                    (meteor: MeteorProps) => {
                        const year = new Date(meteor.year).getFullYear();
                        return (
                            year === selectedYearByMass &&
                            Number(meteor.mass) >= Number(action.payload)
                        );
                    }
                );

                return {
                    ...state,
                    mass: action.payload,
                    meteors: collectionToMatchMass,
                    year: selectedYearByMass,
                };
            }

            return {
                ...state,
            };

        case actions.UPDATE_MASS:
            const resultsByMass = state.meteorsInitial.filter(
                (meteor: MeteorProps) => {
                    const year = new Date(meteor.year);

                    return (
                        year.getFullYear() === Number(state.year) &&
                        Number(meteor.mass) >= Number(action.payload)
                    );
                }
            );

            return {
                ...state,
                mass: action.payload,
                meteors: resultsByMass,
            };
        default:
            return { ...state, meteors: state.meteorsInitial };
    }
}
