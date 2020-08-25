import React from 'react';
import './Tooltip.css';

const Tooltip = (info: any) => {
    const { name, mass, year, recclass } = info.object;

    return (
        <div className="tooltip" style={{ left: info.x, top: info.y }}>
            <div>
                <b>{name}</b>
            </div>
            <p>
                Fell at {new Date(year).getFullYear()} and has a mass of{' '}
                {Math.round(mass)}. It is part of {recclass} meteors group.
            </p>
        </div>
    );
};

export default Tooltip;
