interface ConvertableObject {
  type: 'buffer';
  dataBase64: string;
}

const ensureExists = (data: any) => {
  if (!data) throw new Error('Please provide dataBase64 for type: buffer');
};

const processObject = (obj: ConvertableObject | any): any => {
  if (obj.type === 'buffer') {
    ensureExists(obj.dataBase64);
    const buffer = Buffer.from(obj.dataBase64, 'base64');
    return buffer;
  }
  return obj;
};

export const prepareInputData = (data: any[]): any[] => {
  if (!data) return [];
  const result: any[] = [];
  data.forEach((p) => {
    if (typeof p === 'object') {
      result.push(processObject(p));
      return;
    }
    result.push(p);
  });
  return result;
};

export const prepareOutputData = (data: any): any => {
  if (data instanceof Buffer) {
    return (data as Buffer).toString('base64');
  }
  return data;
};

export default {
  prepareInputData,
};
