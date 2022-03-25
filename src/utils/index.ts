

const utils = {
  importFile: async (path: string): Promise<any> => {
    return (await import(path))?.default;
  } 
}

export default utils;