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

        const deployResult = await main.send(deployer.getSender(), { value: toNano('0.05') }, { $$type: 'Deploy', queryId: 0n });

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

    it('should create license', async () => {
        const arrayBefore = await main.getArrayOfLicenses();
        console.log("arrayBefore length:", arrayBefore.length);

        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate',
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs1',
            contentDescription: "super",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license",
            contentCategory: "Video", 
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });

        const result1 = await main.getResultOfCreate(deployer.address);
        console.log("Created license ID:", result1);

        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate',
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs2',
            contentDescription: "super!!!",  
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license",
            contentCategory: "Video",
            contentSubcategory: "Internet video", 
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });

        const arrayAfter = await main.getArrayOfLicenses();
        console.log("arrayAfter length:", arrayAfter.length);

        expect(arrayBefore.length).toBeLessThan(arrayAfter.length); 
    });

    it('should get license by ID', async () => {
        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate',
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs1',
            contentDescription: "super",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license",
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No", 
            additionalTerms: ""
        });
        
        const licenseId = await main.getResultOfCreate(deployer.address);
        console.log("Created license ID:", licenseId);

        const license = await main.getOneLicensebyId(licenseId);
        console.log("Retrieved license:", license);

        expect(license).not.toBeNull();
    });

    it('should delete license', async () => {
        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate', 
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs1',
            contentDescription: "super",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license",
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });

        const licenseId1 = await main.getResultOfCreate(deployer.address);
        console.log("Created license ID 1:", licenseId1);
        
        await main.send(deployer.getSender(), { value: toNano('0.05') }, { 
            $$type: 'LicenseCreate',
            sellerAddress: deployer.address, 
            contentName: 'Videos with dogs2',
            contentDescription: "super!!!",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license",
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });

        const licenseId2 = await main.getResultOfCreate(deployer.address);  
        console.log("Created license ID 2:", licenseId2);

        const arrayBefore = await main.getArrayOfLicenses();
        console.log("arrayBefore length:", arrayBefore.length);
        
        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseDelete', 
            licenseId: licenseId1,
            sellerAddress: deployer.address
        });

        const deletedLicenseId = await main.getResultOfDelete(deployer.address);
        console.log("Deleted license ID:", deletedLicenseId);
        
        const arrayAfter = await main.getArrayOfLicenses();
        console.log("arrayAfter length:", arrayAfter.length);
        
        expect(arrayAfter.length).toBeLessThan(arrayBefore.length);
    });
    
    it('should buy license', async () => {
        const price = 50n;

        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate',
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs1',
            contentDescription: "super",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license", 
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: price,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });
        
        const licenseId = await main.getResultOfCreate(deployer.address);
        console.log("Created license ID:", licenseId);
        
        const licenseBefore = await main.getOneLicensebyId(licenseId);
        console.log("License before purchase:", licenseBefore);
        
        const forTransfer = price + (price * BigInt(3) / BigInt(100));
        console.log('amount:', price, ' ', 'forTransfer:', forTransfer);
        await main.send(deployer.getSender(), { value: toNano(forTransfer) }, { 
            $$type: 'LicenseBuyV2',
            licenseId: licenseId,
            buyerAddress: address('UQCbnJk3TBqKhQT8N_TaqDtCyLDyBKRSPxZhYWsn23X0UTeo'),
            amount: price
        });
        
        const boughtLicenseId = await main.getResultOfBuy(address('UQCbnJk3TBqKhQT8N_TaqDtCyLDyBKRSPxZhYWsn23X0UTeo'));
        console.log("Bought license ID:", boughtLicenseId); 
        
        const licenseAfter = await main.getOneLicensebyId(licenseId);
        console.log("License after purchase:", licenseAfter);
        
        expect(licenseAfter.buyerAddress).not.toEqual(licenseBefore.buyerAddress);
        expect(licenseAfter.status).toEqual("Paid"); 
    });

    it('should fail to delete license without permission', async () => {
        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate', 
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs1',
            contentDescription: "super",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license",
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });

        const licenseId = await main.getResultOfCreate(deployer.address);
        console.log("Created license ID:", licenseId);

        const anotherAddress = address('EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G');
        
        await expect(main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseDelete', 
            licenseId: licenseId,
            sellerAddress: anotherAddress
        })).rejects.toThrow("No permission to delete");
    });

    it('should fail to buy own license', async () => {
        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate',
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs1',
            contentDescription: "super",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license", 
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });
        
        const licenseId = await main.getResultOfCreate(deployer.address);
        console.log("Created license ID:", licenseId);
        
        await expect(main.send(deployer.getSender(), { value: toNano('0.05') }, { 
            $$type: 'LicenseBuy',
            licenseId: licenseId,
            buyerAddress: deployer.address
        })).rejects.toThrow("No permission to buy");
    });

    it('should fail to buy non-existing license', async () => {
        const nonExistingLicenseId = 12345n;
        const buyerAddress = address('EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G');
        
        await expect(main.send(deployer.getSender(), { value: toNano('0.05') }, { 
            $$type: 'LicenseBuy',
            licenseId: nonExistingLicenseId,
            buyerAddress: buyerAddress
        })).rejects.toThrow("No license exists");
    });

    it('should fail to buy already purchased license', async () => {
        await main.send(deployer.getSender(), { value: toNano('0.05') }, {
            $$type: 'LicenseCreate',
            sellerAddress: deployer.address,
            contentName: 'Videos with dogs1',
            contentDescription: "super",
            contentUrls: "1 - https://docs.tact-lang.org/cookbook/data-structures",
            licenseType: "Restricted license", 
            contentCategory: "Video",
            contentSubcategory: "Internet video",
            price: 50n,
            allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
            additionalTerms: ""
        });
        
        const licenseId = await main.getResultOfCreate(deployer.address);
        console.log("Created license ID:", licenseId);
        
        const buyerAddress = address('EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G');
        await main.send(deployer.getSender(), { value: toNano('0.05') }, { 
            $$type: 'LicenseBuy',
            licenseId: licenseId,
            buyerAddress: buyerAddress 
        });
        
        await expect(main.send(deployer.getSender(), { value: toNano('0.05') }, { 
            $$type: 'LicenseBuy',
            licenseId: licenseId,
            buyerAddress: buyerAddress
        })).rejects.toThrow("License is already purchased");
    });
});