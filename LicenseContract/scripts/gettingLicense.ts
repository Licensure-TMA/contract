import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';
import { address } from '@ton/core';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(11651n));
    
    const license = await main.getLicenseIdbySellerAddress(address("EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G"))
    console.log(license)
}