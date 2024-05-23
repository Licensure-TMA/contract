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
}

message LicenseBuy {
    licenseId: Int;
    buyerAddress: Address;
}

contract Main with Deployable {
    id: Int as uint32;
    licenses: LicenseArray;
    pairs: map<Address, Int>;

    init(id: Int) {
        self.id = id;
        self.licenses = LicenseArray{map: emptyMap()};
        self.pairs = emptyMap();
    }

    receive(msg: LicenseCreate) {
        let licenseId: Int = sha256(msg.contentDescription) / pow(10, 35); //появляется проблема при приведении типа, если число 256 битное

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

        self.licenses.map.set(licenseId, license);
        self.licenses.length = self.licenses.length + 1;

        self.pairs.set(msg.sellerAddress, null);
        self.pairs.set(msg.sellerAddress, licenseId);

        self.reply(licenseId.toString().asComment());
    }

    receive(msg: LicenseDelete) {
        self.licenses.map.set(msg.licenseId, null);
        self.licenses.length = self.licenses.length - 1;
        self.reply("OK".asComment());
    }

    receive(msg: LicenseBuy) {
        let license: License = self.licenses.map.get(msg.licenseId)!!;
        license.status = "Paid";
        license.buyerAddress = msg.buyerAddress;
        self.licenses.map.set(msg.licenseId, null);
        self.licenses.map.set(msg.licenseId, license);
        //self.reply("OK".asComment());

        send(SendParameters{
            to: sender(), // send the message back to the original sender
            value: 0,
            mode: SendRemainingBalance, // or mode: 128
            body: "Hello from Tact!".asComment() // comment (optional)
        });
    }

    get fun arrayOfLicenses(): LicenseArray {
        return self.licenses;
    }

    get fun oneLicensebyId(licenseId: Int): License {
        let license: License = self.licenses.map.get(licenseId)!!;
        return license;
    }

    get fun LicenseIdbySellerAddress(sellerAddress: Address): Int {
        return self.pairs.get(sellerAddress)!!;
    }
}