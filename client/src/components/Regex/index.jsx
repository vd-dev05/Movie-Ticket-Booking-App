export const Regex = () =>{
    const reNumber1to10 = /^\d{10}$/;
    // const reNameSpace = /^[a-zA-Z\s\-]+$/ ;
    const reNameSpace = /^[a-zA-ZựỰịỊơƠẠƯạàáâãèéêìíòóôõùúưỳýđÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚƯỲÝĐ\s]+$/
    const test = /e/

return {reNumber1to10,reNameSpace,test}
}