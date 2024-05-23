import { address, Address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(5641654n));

    await main.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'LicenseCreate',
            sellerAddress: address("EQAokDRDElCtgydnbRoag1uJAKJFU2yAQG8oP69FGjqZFCa-"),
            contentName: 'Video with cats on YT',
            contentDescription: "CATS are very amusing; they make us smile and laugh! They are the best! You are usually cheerful when you are among cats and animals!",
            contentUrls:"1 - https://www.youtube.com/watch?v=IzluNxh-8_o",
            licenseType: "Restricted license",
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 1n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        }
    );
}
