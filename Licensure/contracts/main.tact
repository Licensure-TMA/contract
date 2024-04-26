import "@stdlib/deploy";

message LicenseCreate {
    licenseId: Int as uint64;
    sellerAddress: Address;
    buyerAddress: Address;
    createdAt: String;
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

struct License {
    licenseId: Int as uint64;
    sellerAddress: Address;
    buyerAddress: Address;
    createdAt: String;
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
    licenseId: Int as uint64;
}

contract Main with Deployable {
    licenses: LicenseArray;

    init() {
        self.licenses = LicenseArray{map: emptyMap()};
    }

    receive(msg: LicenseCreate) {
        let license: License = License {
            licenseId: msg.licenseId,
            sellerAddress: msg.sellerAddress,
            buyerAddress: msg.buyerAddress,
            createdAt: msg.createdAt,
            contentName: msg.contentName,
            contentDescription: msg.contentDescription,
            contentUrls: msg.contentUrls,
            licenseType: msg.licenseType,
            contentCategory: msg.contentCategory,
            contentSubcategory: msg.contentSubcategory,
            price: msg.price,
            currency: msg.currency,
            allRestrictions: msg.allRestrictions,
            additionalTerms: msg.additionalTerms,
            status: msg.status
        };

        self.licenses.map.set(msg.licenseId, license);
        self.licenses.length = self.licenses.length + 1;
    }

    receive(msg: LicenseDelete) {
        self.licenses.map.set(msg.licenseId, null);
        self.licenses.length = self.licenses.length - 1;
    }

    get fun arrayOfLicenses(): LicenseArray {
        return self.licenses;
    }

    get fun License(licenseId: Int): License {
        return self.licenses.map.get(licenseId)!!;
    }
}