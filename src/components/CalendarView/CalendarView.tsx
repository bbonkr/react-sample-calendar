import React, { useEffect, useState } from 'react';
import './style.css';
import { Box } from './Box';
import moment from 'moment';

interface DayItem {
    date: Date;
    text: string;
    isPreviousMonth: boolean;
    isNextMonth: boolean;
    isHoliday: boolean;
    isToday: boolean;
    isSelected: boolean;
    isSelectedStart: boolean;
    isSelectedEnd: boolean;
}

interface CalendarViewProp {
    selection?: Date;
    selections?: Date[];
}

export const CalendarView = ({ selection, selections }: CalendarViewProp) => {
    const [date, setDate] = useState<Date>(selection || new Date());
    const [selectedDates, setSelectedDates] = useState<Date[]>(
        selections || [],
    );
    const [records, setRecords] = useState<(DayItem[])[]>([]);
    const today = moment();

    const updateRecords = (basisDate: Date) => {
        setRecords(prevState => {
            const basis = moment(basisDate);
            const startWeek = basis
                .clone()
                .startOf('month')
                .week();
            const newRecords: (DayItem[])[] = [];
            for (let week = startWeek; true; week++) {
                const items: DayItem[] = Array(7)
                    .fill(0)
                    .map<DayItem>((i, index) => {
                        const current = moment(basisDate)
                            .clone()
                            .week(week)
                            .startOf('week')
                            .add(i + index, 'day');

                        return {
                            date: current.toDate(),
                            text: current.date().toString(),
                            isHoliday: 0 === current.day(),
                            isPreviousMonth:
                                current.month() !== basis.month() &&
                                week === startWeek,
                            isNextMonth:
                                current.month() !== basis.month() &&
                                week !== startWeek,
                            isToday:
                                current.format('YYYY-MM-DD') ===
                                moment().format('YYYY-MM-DD'),
                            isSelected:
                                selectedDates &&
                                selectedDates.length > 1 &&
                                current.isBetween(
                                    moment(selectedDates[0]),
                                    moment(selectedDates[1]),
                                    'day',
                                    '[]',
                                ),
                            isSelectedStart:
                                selectedDates &&
                                selectedDates.length > 0 &&
                                current.format('YYYY-MM-DD') ===
                                    moment(selectedDates[0]).format(
                                        'YYYY-MM-DD',
                                    ),
                            isSelectedEnd:
                                selectedDates &&
                                selectedDates.length > 1 &&
                                current.format('YYYY-MM-DD') ===
                                    moment(selectedDates[1]).format(
                                        'YYYY-MM-DD',
                                    ),
                        };
                    });

                newRecords.push(items);
                if (basis.month() !== moment(items[6].date).month()) {
                    break;
                }
            }

            return [...newRecords];
        });
    };

    useEffect(() => {
        updateRecords(date);
    }, [date]);

    // if (firstDayWeekday > 0) {
    //     for (let i = firstDayWeekday; i >= 0; i--) {
    //         if (!records[0]) {
    //             records[0] = [];
    //         }
    //         records[0].push({
    //             date: firstDayOfThisMonth
    //                 .clone()
    //                 .add(i * -1, 'day')
    //                 .toDate(),
    //         });
    //     }
    // }

    const getButtonTitle = (
        date: Date,
        value: number,
        interval: 'year' | 'month',
    ): string => {
        const d = moment(date).add(value, interval);

        return `Move to ${d.format('YYYY-MM')}`;
    };

    const handleClickPrevYear = () => {
        setDate(prevState =>
            moment(prevState)
                .add(-1, 'year')
                .toDate(),
        );
    };

    const handleClickPrevMonth = () => {
        setDate(prevState =>
            moment(prevState)
                .add(-1, 'month')
                .toDate(),
        );
    };
    const handleClickNextMonth = () => {
        setDate(prevState =>
            moment(prevState)
                .add(1, 'month')
                .toDate(),
        );
    };
    const handleClickNextYear = () => {
        setDate(prevState =>
            moment(prevState)
                .add(1, 'year')
                .toDate(),
        );
    };

    const handleClickToday = () => {
        setDate(today.toDate());
    };

    return (
        <div className="calendar-container">
            <div className="calendar-title">
                <button
                    className="calendar-button"
                    onClick={handleClickPrevYear}
                    title={getButtonTitle(date, -1, 'year')}
                >
                    {'<<'}
                </button>
                <button
                    className="calendar-button"
                    onClick={handleClickPrevMonth}
                    title={getButtonTitle(date, -1, 'month')}
                >
                    {'<'}
                </button>
                <div>{moment(date).year()}</div>
                <div>{moment(date).month() + 1}</div>
                <button
                    className="calendar-button"
                    onClick={handleClickNextMonth}
                    title={getButtonTitle(date, 1, 'month')}
                >
                    {'>'}
                </button>
                <button
                    className="calendar-button"
                    onClick={handleClickNextYear}
                    title={getButtonTitle(date, 1, 'year')}
                >
                    {'>>'}
                </button>
            </div>
            <div className="week-container">
                {moment.weekdaysMin(true).map((item, index) => (
                    <Box text={item} isHoliday={index === 0} />
                ))}
            </div>
            {records.map(a => (
                <div className="week-container">
                    {a.map(b => (
                        <Box {...b} />
                    ))}
                </div>
            ))}
            <div className="bottom-container">
                <button onClick={handleClickToday}>
                    Today: {today.format('YYYY-MM-DD')}
                </button>
            </div>
        </div>
    );
};
