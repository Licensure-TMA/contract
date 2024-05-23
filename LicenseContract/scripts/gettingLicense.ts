import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(5641654n));
    
    const license = await main.getOneLicensebyId(78609805328260369402669540407081073522911550811006507232313126786671296085399n)
    console.log(license)
}