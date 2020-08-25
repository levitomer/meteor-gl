import React, { ChangeEvent } from 'react';
import { MeteorProps } from '../../interfaces/interfaces';
import Autocomplete from '../Autocomplete/Autocomplete';
import toast from 'react-hot-toast';
import { Redux } from '../../redux/redux';
import { useDebounce } from '../../hooks/useDebounce';
import * as actions from '../../redux/actions';
import meteor from '../../assets/meteor.png';
import './Filters.css';

const FilterByMass = () => {
    const MAX_MASS = '23000000';
    const { state, dispatch }: any = React.useContext(Redux);
    const [input, setInput] = React.useState<string>(state.mass);
    const mass = useDebounce<string>(input, 500);

    const handleChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value !== mass) {
                setInput(e.target.value);
            }
        },
        [mass]
    );

    React.useEffect(() => {
        if (Number(mass) > Number(MAX_MASS)) {
            toast.error('Max mass exeeded');
            dispatch({
                type: actions.MAX_MASS_EXCEEDED,
                payload: mass,
            });
            return;
        }

        if (mass !== state.mass) {
            dispatch({
                type: actions.UPDATE_MASS,
                payload: mass,
            });
        }

        const meteorsByMass = state.meteors.find(
            (meteor: MeteorProps) => Number(meteor.mass) >= Number(mass)
        );

        if (!meteorsByMass && Number(mass) !== 0) {
            toast.error(
                `The mass was not found, jumping to first-year where there is a mass that fits the criteria`
            );
            dispatch({
                type: actions.FIND_METEORS_BY_MASS,
                payload: mass,
            });
        }
    }, [dispatch, mass]);

    return (
        <div className="flex-row">
            <div>Mass</div>
            <div className="block">
                <input
                    type="text"
                    value={input}
                    maxLength={MAX_MASS.length}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

const FilterByYear = () => {
    const generateYearsFrom = React.useCallback((startYear = 0) => {
        const endDate = new Date().getFullYear();
        let years = [];

        for (var i = startYear; i <= endDate; i++) {
            years.push(startYear);
            startYear++;
        }
        return years;
    }, []);

    const suggestions = generateYearsFrom(1880);

    return (
        <div className="flex-row">
            <div>Year</div>
            <div className="block">
                <Autocomplete suggestions={suggestions} />
            </div>
        </div>
    );
};

const Filters = React.memo(() => (
    <div className="filters-container">
        <div className="filters">
            <div className="filter-title">
                <img
                    src={meteor}
                    alt="Logo"
                    style={{
                        width: '70px',
                        height: '55px',
                    }}
                />
                filters
            </div>
            <div className="filter-fields">
                <FilterByYear />
                <FilterByMass />
            </div>
        </div>
    </div>
));

export default Filters;
