
//Helper Function for extracting some key value form Array of Object.
const getTextFromArray = (data: object[], name: string) => {
  const text = data?.reduce(getText, "");
  function getText(a: any, b: any) {
    return a + (a.split(",").indexOf(b[name]) === -1 ? `,${b[name]}`: "");
  }
  return text.slice(1,text.length);
};



export default getTextFromArray;
