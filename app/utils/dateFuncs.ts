export const shiftFromUTCToLocale = (date: Date | undefined) => {
   if (!date) {
      throw new Error('date is undefined');
   }
   return  new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).getTime()
}
