import React from 'react';
import './style.css';

interface BoxProp {
    text?: string | number;
    isHoliday?: boolean;
    isPreviousMonth?: boolean;
    isNextMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    isSelectedStart?: boolean;
    isSelectedEnd?: boolean;
}

export const Box = ({
    text,
    isHoliday,
    isPreviousMonth,
    isNextMonth,
    isToday,
    isSelected,
    isSelectedStart,
    isSelectedEnd,
}: BoxProp) => {
    return (
        <div
            className={`box ${isHoliday ? 'holiday' : ''} ${
                isPreviousMonth ? 'previous-month' : ''
            } ${isNextMonth ? 'next-month' : ''}`}
        >
            <div
                className={`selectionBox ${
                    isSelected ? 'selectionBox-selected' : ''
                } ${isSelectedStart ? 'selectionBox-selected-start' : ''} ${
                    isSelectedEnd ? 'selectionBox-selected-end' : ''
                }`}
            >
                <div className={`${isToday ? 'today' : ''}`}>{text}</div>
            </div>
        </div>
    );
};
