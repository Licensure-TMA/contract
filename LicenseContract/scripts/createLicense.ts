import { address, Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(11651n));

    await main.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'LicenseCreate',
            sellerAddress: address("EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G"),
            contentName: 'Videos with cats',
            contentDescription: "super",
            contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license",
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        }
    );
}
