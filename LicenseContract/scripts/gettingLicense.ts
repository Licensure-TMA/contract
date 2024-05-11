import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(111112651n));
    
    const license = await main.getOneLicensebyId(33410445618380969054696306686309654449893145225497623448882212089499489n)
    console.log(license)
}