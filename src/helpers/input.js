
export const getPointerPosition = (e) => {
    if(!e || (!e.clientX && !e.touches[0])){
            throw new Error("getPointerPosition does not know how to handle this event. Here is the event:"+Object.keys(e));
        return;
    }
    if(e.clientX){
        return {
            clientX: e.clientX,
            clientY: e.clientY
        }
    }
    const {clientX, clientY} = e.touches[0];
    return {
        clientX,
        clientY
    }
}