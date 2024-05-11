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
        
        const result1 = await main.getLicenseIdbySellerAddress(deployer.address)
        console.log(result1)

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
        
        const result2 = await main.getLicenseIdbySellerAddress(deployer.address)
        console.log(result2)

        expect(arrayBefore.length).toBeLessThan(arrayAfter.length)
        expect(result1 != result2)
    });

    it('should getting', async () => {
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
        
        const result1 = await main.getLicenseIdbySellerAddress(deployer.address)
        console.log(result1)

        const license = await main.getOneLicensebyId(result1)
        console.log(license)

        expect(license != null)
    });

    it('should delete', async () => {
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
        
        const result1 = await main.getLicenseIdbySellerAddress(deployer.address)
        console.log(result1)

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
        
        const result2 = await main.getLicenseIdbySellerAddress(deployer.address)
        console.log(result2)

        const arrayBefore = await main.getArrayOfLicenses()
        console.log("arrayBefore:", arrayBefore.length)
        console.log("arrayBefore:", arrayBefore.map)

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseDelete',
                licenseId: result1
            }
        )

        const arrayAfter = await main.getArrayOfLicenses()
        console.log("arrayAfter:", arrayAfter.length)
        console.log("arrayAfter:", arrayAfter.map)

        expect(arrayAfter.length).toBeLessThan(arrayBefore.length)
    });

    it('should delete', async () => {
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
        
        const result1 = await main.getLicenseIdbySellerAddress(deployer.address)
        console.log(result1)

        const buy= await main.getOneLicensebyId(result1)
        console.log(buy)

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseBuy',
                licenseId: result1,
                buyerAddress: address('EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G')
            }
        )

        const buyResult= await main.getOneLicensebyId(result1)
        console.log(buyResult)

        expect(buyResult != buy)
    });
});