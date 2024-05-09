import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { address, toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import '@ton/test-utils';

describe('Main', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let main: SandboxContract<Main>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        main = blockchain.openContract(await Main.fromInit(516516n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: main.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and main are ready to use
    });

    it('should create', async () => {
        const arrayBefore = await main.getArrayOfLicenses()
        console.log("arrayBefore:", arrayBefore.length)
        console.log("arrayBefore:", arrayBefore.map)

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                sellerAddress: deployer.address,
                contentName: 'Videos with dogs1',
                contentDescription: "super",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: ""
            }
        )

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                sellerAddress: deployer.address,
                contentName: 'Videos with dogs',
                contentDescription: "super!!!",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: ""
            }
        )

        const arrayAfter = await main.getArrayOfLicenses()
        console.log("arrayAfter:", arrayAfter.length)
        console.log("arrayAfter:", arrayAfter.map)
        
        const result = await main.getLicenseIdbySellerAddress(deployer.address)
        console.log(result)

        expect(arrayBefore.length).toBeLessThan(arrayAfter.length)
    });
});