/**
 * date.js
 * Date component, formats the date and whatnot. Idk how this works, 
 * idc how it works, bc it works.
 */

 import { parseISO, format } from 'date-fns'; // for date formatting


 export default function Date({ dateString }){
     const date = parseISO(dateString);
     return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
 }