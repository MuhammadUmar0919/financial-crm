export const TimeSleep = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = "Data fetched successfully";
            resolve(data);
        }, 2000);
    });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await sleep(2000);
