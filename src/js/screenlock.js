
export async function requestScreenLock() {
    try {
       
        let screenlock = await navigator.wakeLock.request("screen");
        
        screenlock.addEventListener("release", () => {
            console.log("Wake Lock was released");
        });
        
        console.log("Wake Lock is active");
        
        return screenlock;
    } 
    catch (err) {
        console.error(`${err.name}, ${err.message}`);
        return null;
    }
}
