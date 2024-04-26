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

message StatusChange {
    licenseId: Int as uint64;
    newStatus: String;
}

contract Main with Deployable {
    id: Int as uint32;
    licenses: LicenseArray;

    init(id: Int) {
        self.id = id;
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

    receive(msg: StatusChange) {
        let license: License = self.licenses.map.get(msg.licenseId)!!;
        license.status = msg.newStatus;
        self.licenses.map.set(msg.licenseId, null);
        self.licenses.map.set(msg.licenseId, license);
    }

    get fun arrayOfLicenses(): LicenseArray {
        return self.licenses;
    }

    get fun License(licenseId: Int): License {
        return self.licenses.map.get(licenseId)!!;
    }
}