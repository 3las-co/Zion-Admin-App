import { DropDownItem } from "./types";
import { format, parse } from "date-fns";

class Utils {
    static addIds = (items: DropDownItem[]): DropDownItem[] => {
        if (items.length > 0 && 'id' in items[0]) {
          return items;
        }

        return items.map((item, index) => ({...item, id: index}));
    };

    static formatTime = (time: string): string => {
        try {
            // Parse the input string into a Date object
            const parsedDate = parse(time, "HH:mm:ss 'GMT'XXX", new Date());

            // Format the Date object into the desired format: "hh:mm a"
            return format(parsedDate, 'hh:mm a'); // Example: "12:44 PM"
        } catch (error) {
            console.error('Error parsing time:', error);
            return time; // Return original input if parsing fails
        }
    };

    static dateToDetails = (date: Date): { key: Date; day: string; date: string; month: string } => {
      return {
          key: date,
          day: format(date, 'EEE').toUpperCase(), // Example: 'THU'
          date: format(date, 'dd'), // Example: '12'
          month: format(date, 'MMM').toUpperCase(), // Example: 'JUL'
      }
    };

    static formatTime24Hour(date: Date): string {
      const hours = date.getHours().toString().padStart(2, '0'); // Ensures two digits
      const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures two digits
      return `${hours}:${minutes}`; // Format: "23:30"
    }

    static formatDate(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0'); // Ensures two digits
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`; // Format: "24-05-2024"
    }

    static parseDateString(dateString: string): Date | null {
      const [day, month, year] = dateString.split('-').map(Number); // Split and convert to numbers

      // Check if the date is valid
      if (!day || !month || !year) {
        console.error('Invalid date format');
        return null;
      }

      // Create and return the Date object (month is 0-indexed, so subtract 1)
      return new Date(year, month - 1, day);
    }
}

export default Utils;
