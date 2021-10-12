export const isEmpty=(object)=>{
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if(element.length===0){
        return true
      }
    }
  }
  return false
}