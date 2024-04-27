import { address, Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(1651651n));
    const createdAt = new Date();
    const dateString = createdAt.toISOString();

    await main.send(
        provider.sender(),
        {
            value: toNano('0.05')
        },
        {
            $$type: 'LicenseDelete',
            licenseId: 1234567n
        }
    );
}
