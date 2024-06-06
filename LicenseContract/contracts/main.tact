import "@stdlib/deploy";

message LicenseCreate {
    sellerAddress: Address;
    contentName: String;
    contentDescription: String;
    contentUrls: String;
    licenseType: String;
    contentCategory: String;
    contentSubcategory: String;
    price: Int as coins;
    allRestrictions: String;
    additionalTerms: String;
}

struct License {
    licenseId: Int;
    sellerAddress: Address;
    buyerAddress: Address;
    createdAt: Int as uint32;
    contentName: String;
    contentDescription: String;
    contentUrls: String;
    licenseType: String;
    contentCategory: String;
    contentSubcategory: String;
    price: Int as coins;
    currency: String;
    allRestrictions: String;
    additionalTerms: String;
    status: String;
}

struct LicenseArray {
    map: map<Int, License>;
    length: Int as uint64 = 0;
}

message LicenseDelete {
    licenseId: Int;
    sellerAddress: Address;
}

message LicenseBuy {
    licenseId: Int;
    buyerAddress: Address;
}

contract Main with Deployable {
    id: Int as uint32;
    licenses: LicenseArray;
    pairsUsersCreatedContracts: map<Address, Int>;
    pairsUsersDeletedContracts: map<Address, Int>;
    pairsUsersBoughtContracts: map<Address, Int>;

    const MinTonForStorage: Int = ton("0.01"); // enough for 1 KB of storage for 2.5 years
    deployer: Address;

    init(id: Int) {
        self.id = id;
        self.licenses = LicenseArray {map: emptyMap()};
        self.pairsUsersCreatedContracts = emptyMap();
        self.pairsUsersDeletedContracts = emptyMap();
        self.pairsUsersBoughtContracts = emptyMap();
        self.deployer = sender();
    }

    receive(msg: LicenseCreate) {
        //Create licenseId
        let licenseId: Int = sha256(msg.contentDescription);

        //Create new License
        let license: License = License {
            licenseId: licenseId,
            sellerAddress: msg.sellerAddress,
            buyerAddress: newAddress(0, 0),
            createdAt: now(),
            contentName: msg.contentName,
            contentDescription: msg.contentDescription,
            contentUrls: msg.contentUrls,
            licenseType: msg.licenseType,
            contentCategory: msg.contentCategory,
            contentSubcategory: msg.contentSubcategory,
            price: msg.price,
            currency: "TON",
            allRestrictions: msg.allRestrictions,
            additionalTerms: msg.additionalTerms,
            status: "Pending"
        };

        //Save License
        self.licenses.map.set(licenseId, license);
        self.licenses.length = self.licenses.length + 1;

        //Update operation result
        self.pairsUsersCreatedContracts.set(msg.sellerAddress, null);
        self.pairsUsersCreatedContracts.set(msg.sellerAddress, licenseId);
    }

    receive(msg: LicenseDelete) {
        //Check License
        let license: License = self.licenses.map.get(msg.licenseId)!!;
        require(license.sellerAddress == msg.sellerAddress, "No permission to delete");
        require(license.licenseId != null, "No license exists");
        
        //Delete License
        self.licenses.map.set(msg.licenseId, null);
        self.licenses.length = self.licenses.length - 1;
        
        //Update operation result
        self.pairsUsersDeletedContracts.set(msg.sellerAddress, null);
        self.pairsUsersDeletedContracts.set(msg.sellerAddress, msg.licenseId);
    }

    receive(msg: LicenseBuy) {
        //Make copy of License
        let license: License = self.licenses.map.get(msg.licenseId)!!;

        //Check License
        require(license.sellerAddress != msg.buyerAddress, "No permission to buy");
        require(license.licenseId != null, "No license exists");
        require(license.status == "Pending", "License is already purchased");

        //Mark as Paid
        license.status = "Paid";
        license.buyerAddress = msg.buyerAddress;

        //Delete original License
        self.licenses.map.set(msg.licenseId, null);

        //Save copy of License with new info
        self.licenses.map.set(msg.licenseId, license);
        
        //Update operation result
        self.pairsUsersBoughtContracts.set(msg.buyerAddress, null);
        self.pairsUsersBoughtContracts.set(msg.buyerAddress, msg.licenseId);
    }

    // this will withdraw the entire balance but leave 0.01 for storage rent costs
    receive("withdraw safe") {
        require(sender() == self.deployer, "Only deployer is allowed to withdraw");
        
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: myBalance() - context().value - self.MinTonForStorage,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    get fun balance(): String {
        return myBalance().toCoinsString();
    }

    get fun resultOfCreate(sellerAddress: Address): Int {
        return self.pairsUsersCreatedContracts.get(sellerAddress)!!;
    }

    get fun resultOfDelete(sellerAddress: Address): Int {
        return self.pairsUsersDeletedContracts.get(sellerAddress)!!;
    }

    get fun resultOfBuy(buyerAddress: Address): Int {
        return self.pairsUsersBoughtContracts.get(buyerAddress)!!;
    }

    get fun arrayOfLicenses(): LicenseArray {
        return self.licenses;
    }

    get fun oneLicensebyId(licenseId: Int): License {
        let license: License = self.licenses.map.get(licenseId)!!;
        return license;
    }
}