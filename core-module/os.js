// need to improve app performance ==>
const os=require("os");

console.log(os.platform());//win32
console.log(os.type());//Windows_NT
console.log(os.machine());//x86_64
console.log(os.arch());// x64
console.log(os.homedir());//C:\Users\LAPTOP CARE
console.log(os.hostname());//favouritesir

console.log(os.freemem());//3429470208 ==> ram size in byte
console.log(os.totalmem());//8450351104 ==> ram size in byte

// other important 
console.log(os.cpus());// give cpus core and other info
// [
//     {
//       model: 'Intel(R) Core(TM) i3-4130 CPU @ 3.40GHz',
//       speed: 3392,
//       times: {
//         user: 1906484,
//         nice: 0,
//         sys: 1375093,
//         idle: 13846343,
//         irq: 82140
//       }
//     },
//     {
//       model: 'Intel(R) Core(TM) i3-4130 CPU @ 3.40GHz',
//       speed: 3392,
//       times: { user: 1964984, nice: 0, sys: 971859, idle: 14190937, irq: 19156 }
//     },
//     {
//       model: 'Intel(R) Core(TM) i3-4130 CPU @ 3.40GHz',
//       speed: 3392,
//       times: { user: 2218500, nice: 0, sys: 972265, idle: 13937015, irq: 15640 }
//     },
//     {
//       model: 'Intel(R) Core(TM) i3-4130 CPU @ 3.40GHz',
//       speed: 3392,
//       times: { user: 2224703, nice: 0, sys: 837125, idle: 14065953, irq: 18859 }
//     }
//   ]

