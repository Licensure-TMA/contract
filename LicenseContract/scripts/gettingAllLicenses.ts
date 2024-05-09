import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(11651n));
    
    const license = await main.getArrayOfLicenses()
    console.log(license)
}