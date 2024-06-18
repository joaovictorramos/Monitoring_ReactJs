interface DaysOfTheWeekData {
    id: string;
    daysWeek: string;
}

interface MonitorData {
    id: string;
    institutionalEmail: string;
    name: string;
    actualPeriod: number;
    startHour: string;
    endHour: string;
    typeOfMonitoring: string;
    matterId: {
        name: string;
    };
    classroomId: {
        name: string;
        block: string;
    }
    daysOfTheWeekIds: DaysOfTheWeekData[];
}

export default MonitorData;