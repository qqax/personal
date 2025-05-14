export const shiftFromUTCToLocal = (date: Date | undefined) => {
    if (!date) {
        throw new Error("date is undefined");
    }
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

export const shiftFromUTCToLocalTimestamp = (date: Date | undefined) => {
    return shiftFromUTCToLocal(date).getTime();
};

export const getIntlDate = (locale: string, date: Date) => {
    return Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
};

export const getIntlTime = (locale: string, date: Date) => {
    return Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
    }).format(date);
};

export const normalizeMonth = (month: number) => {
    return month % 12 + 12;
}

export const isWeekday = (day: number) => {
    return day % 7 === 6 || day % 7 === 0;
}
