export const getTimeStamp = (): number => Date.now();

export const transformTimestamp = (dateIso: string): number =>
  new Date(dateIso).getTime();
