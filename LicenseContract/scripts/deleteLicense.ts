import { address, Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(5641654n));

    await main.send(
        provider.sender(),
        {
            value: toNano('0.05')
        },
        {
            $$type: 'LicenseDelete',
            licenseId: 78609805328260369402669540407081073522911550811006507232313126786671296085399n
        }
    );
}
