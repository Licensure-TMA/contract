import { address, Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(111112651n));

    await main.send(
        provider.sender(),
        {
            value: toNano('0.05')
        },
        {
            $$type: 'LicenseDelete',
            licenseId: 33410445618380969054696306686309654449893145225497623448882212089499489n
        }
    );
}
