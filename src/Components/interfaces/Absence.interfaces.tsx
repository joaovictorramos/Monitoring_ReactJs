interface AbsenceData {
    id: string;
    date: string;
    justification: string;
    monitorId: {
        id: string;
        name: string;
    }
}

export default AbsenceData;