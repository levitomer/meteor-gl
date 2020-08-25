import React, { ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from '../../hooks/useDebounce';
import { Redux } from '../../redux/redux';
import * as actions from '../../redux/actions';
import './Autocomplete.css';

const Autocomplete = (props: { suggestions: Array<number> }) => {
    const { state, dispatch }: any = React.useContext(Redux);
    const [active, setActive] = React.useState(0);
    const [filtered, setFiltered]: [Array<number>, Function] = React.useState(
        []
    );
    const [isShow, setIsShow] = React.useState(false);
    const [input, setInput] = React.useState(state.year);
    const year = useDebounce<string>(input, 500);

    React.useEffect(() => {
        if (input !== state.year) setInput(state.year);
    }, [state.year]);

    React.useEffect(() => {
        if (year !== state.year)
            dispatch({
                type: actions.UPDATE_YEAR,
                payload: year,
            });
    }, [year]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        if (!input) return;

        const isValidInput = /^\d+$/.test(input);
        if (!isValidInput) {
            toast.error(`Year must be a number in the range of 0 - 2022`);
            return;
        }

        const newFilteredSuggestions = props.suggestions.filter(
            (suggestion: any) =>
                String(suggestion).indexOf(input.toLowerCase()) > -1
        );

        setActive(0);
        setFiltered(newFilteredSuggestions);
        setIsShow(true);
        setInput(input);
    };

    const onClick = (e: any) => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);
        setInput(e.currentTarget.innerText);
    };

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            // enter key
            setActive(0);
            setIsShow(false);
            setInput(filtered[active]);
        } else if (e.keyCode === 38 && isShow) {
            // up arrow
            return active === 0 ? null : setActive(active - 1);
        } else if (e.keyCode === 40 && isShow) {
            // down arrow
            return active - 1 === filtered.length
                ? null
                : setActive(active + 1);
        }
    };

    const renderAutocomplete = () => {
        if (isShow && input) {
            if (filtered.length) {
                return (
                    <ul className="autocomplete">
                        {filtered.map((suggestion: number, index: number) => {
                            let className;
                            if (index === active) {
                                className = 'active';
                            }
                            return (
                                <li
                                    key={suggestion}
                                    className={className}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }
        return <></>;
    };

    return (
        <>
            <input
                type="text"
                onChange={handleChange}
                onKeyDown={onKeyDown}
                value={input}
                maxLength={4}
            />
            {renderAutocomplete()}
        </>
    );
};

export default Autocomplete;
