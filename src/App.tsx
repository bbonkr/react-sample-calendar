import React from 'react';
import { CalendarView } from './components/CalendarView';

export const App = () => {
    return (
        <div>
            <h1>Hello World!</h1>
            <CalendarView
                selections={[new Date('2020-04-02'), new Date('2020-04-07')]}
            />
        </div>
    );
};
