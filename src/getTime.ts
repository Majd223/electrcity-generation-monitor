// Get the current time and format it to be like YYYY-MM-DD"T"HH
export function getDayBeforeTime(hourInput?: string): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hour = hourInput ? hourInput : "00";
    return `${year}-${month}-${day}T${hour}`;
}