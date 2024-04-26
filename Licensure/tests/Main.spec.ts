import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Main } from '../wrappers/Main';
import '@ton/test-utils';

describe('Main', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let main: SandboxContract<Main>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        main = blockchain.openContract(await Main.fromInit());

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
        const createdAt = new Date();
        const dateString = createdAt.toISOString();

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                licenseId: 1234567n,
                sellerAddress: deployer.address,
                buyerAddress: deployer.address,
                createdAt: dateString,
                contentName: 'Videos with cats',
                contentDescription: "super",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                currency: "TON",
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: "",
                status: "Pending"
            }
        )

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                licenseId: 87654n,
                sellerAddress: deployer.address,
                buyerAddress: deployer.address,
                createdAt: dateString,
                contentName: 'Videos with dogs',
                contentDescription: "super",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                currency: "TON",
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: "",
                status: "Pending"
            }
        )

        const arrayAfter = await main.getArrayOfLicenses()
        console.log("arrayAfter:", arrayAfter.length)
        console.log("arrayAfter:", arrayAfter.map)

        expect(arrayBefore.length).toBeLessThan(arrayAfter.length)
    });

    it('should get', async () => {
        const createdAt = new Date();
        const dateString = createdAt.toISOString();

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                licenseId: 1234567n,
                sellerAddress: deployer.address,
                buyerAddress: deployer.address,
                createdAt: dateString,
                contentName: 'Videos with cats',
                contentDescription: "super",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                currency: "TON",
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: "",
                status: "Pending"
            }
        )

        const license = await main.getLicense(1234567n)
        console.log(license)

        expect(license != null)
    });

    it('should delete', async () => {
        const createdAt = new Date();
        const dateString = createdAt.toISOString();

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                licenseId: 1234567n,
                sellerAddress: deployer.address,
                buyerAddress: deployer.address,
                createdAt: dateString,
                contentName: 'Videos with cats',
                contentDescription: "super",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                currency: "TON",
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: "",
                status: "Pending"
            }
        )

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                licenseId: 12324567n,
                sellerAddress: deployer.address,
                buyerAddress: deployer.address,
                createdAt: dateString,
                contentName: 'Videos with dogs',
                contentDescription: "super",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                currency: "TON",
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: "",
                status: "Pending"
            }
        )

        await main.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            {
                $$type: 'LicenseCreate',
                licenseId: 12134567n,
                sellerAddress: deployer.address,
                buyerAddress: deployer.address,
                createdAt: dateString,
                contentName: 'Videos with apples',
                contentDescription: "super",
                contentUrls:"1 - https://docs.tact-lang.org/cookbook/data-structures",
                licenseType: "Restricted license",
                contentCategory: "Video",
                contentSubcategory: "Internet video",
                price: 50n,
                currency: "TON",
                allRestrictions: "Duration: 1 year; Purpose: Training neural networks, Marketing; Modification: No",
                additionalTerms: "",
                status: "Pending"
            }
        )

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
                licenseId: 12324567n
            }
        )

        const arrayAfter = await main.getArrayOfLicenses()
        console.log("arrayAfter:", arrayAfter.length)
        console.log("arrayAfter:", arrayAfter.map)

        expect(arrayAfter.length).toBeLessThan(arrayBefore.length)
    });
});
