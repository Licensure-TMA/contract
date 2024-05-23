import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type LicenseCreate = {
    $$type: 'LicenseCreate';
    sellerAddress: Address;
    contentName: string;
    contentDescription: string;
    contentUrls: string;
    licenseType: string;
    contentCategory: string;
    contentSubcategory: string;
    price: bigint;
    allRestrictions: string;
    additionalTerms: string;
}

export function storeLicenseCreate(src: LicenseCreate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2495643435, 32);
        b_0.storeAddress(src.sellerAddress);
        b_0.storeStringRefTail(src.contentName);
        b_0.storeStringRefTail(src.contentDescription);
        b_0.storeStringRefTail(src.contentUrls);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.licenseType);
        b_1.storeStringRefTail(src.contentCategory);
        b_1.storeStringRefTail(src.contentSubcategory);
        b_1.storeCoins(src.price);
        let b_2 = new Builder();
        b_2.storeStringRefTail(src.allRestrictions);
        b_2.storeStringRefTail(src.additionalTerms);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLicenseCreate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2495643435) { throw Error('Invalid prefix'); }
    let _sellerAddress = sc_0.loadAddress();
    let _contentName = sc_0.loadStringRefTail();
    let _contentDescription = sc_0.loadStringRefTail();
    let _contentUrls = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _licenseType = sc_1.loadStringRefTail();
    let _contentCategory = sc_1.loadStringRefTail();
    let _contentSubcategory = sc_1.loadStringRefTail();
    let _price = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _allRestrictions = sc_2.loadStringRefTail();
    let _additionalTerms = sc_2.loadStringRefTail();
    return { $$type: 'LicenseCreate' as const, sellerAddress: _sellerAddress, contentName: _contentName, contentDescription: _contentDescription, contentUrls: _contentUrls, licenseType: _licenseType, contentCategory: _contentCategory, contentSubcategory: _contentSubcategory, price: _price, allRestrictions: _allRestrictions, additionalTerms: _additionalTerms };
}

function loadTupleLicenseCreate(source: TupleReader) {
    let _sellerAddress = source.readAddress();
    let _contentName = source.readString();
    let _contentDescription = source.readString();
    let _contentUrls = source.readString();
    let _licenseType = source.readString();
    let _contentCategory = source.readString();
    let _contentSubcategory = source.readString();
    let _price = source.readBigNumber();
    let _allRestrictions = source.readString();
    let _additionalTerms = source.readString();
    return { $$type: 'LicenseCreate' as const, sellerAddress: _sellerAddress, contentName: _contentName, contentDescription: _contentDescription, contentUrls: _contentUrls, licenseType: _licenseType, contentCategory: _contentCategory, contentSubcategory: _contentSubcategory, price: _price, allRestrictions: _allRestrictions, additionalTerms: _additionalTerms };
}

function storeTupleLicenseCreate(source: LicenseCreate) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sellerAddress);
    builder.writeString(source.contentName);
    builder.writeString(source.contentDescription);
    builder.writeString(source.contentUrls);
    builder.writeString(source.licenseType);
    builder.writeString(source.contentCategory);
    builder.writeString(source.contentSubcategory);
    builder.writeNumber(source.price);
    builder.writeString(source.allRestrictions);
    builder.writeString(source.additionalTerms);
    return builder.build();
}

function dictValueParserLicenseCreate(): DictionaryValue<LicenseCreate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLicenseCreate(src)).endCell());
        },
        parse: (src) => {
            return loadLicenseCreate(src.loadRef().beginParse());
        }
    }
}

export type License = {
    $$type: 'License';
    licenseId: bigint;
    sellerAddress: Address;
    buyerAddress: Address;
    createdAt: bigint;
    contentName: string;
    contentDescription: string;
    contentUrls: string;
    licenseType: string;
    contentCategory: string;
    contentSubcategory: string;
    price: bigint;
    currency: string;
    allRestrictions: string;
    additionalTerms: string;
    status: string;
}

export function storeLicense(src: License) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.licenseId, 257);
        b_0.storeAddress(src.sellerAddress);
        b_0.storeAddress(src.buyerAddress);
        b_0.storeUint(src.createdAt, 32);
        b_0.storeStringRefTail(src.contentName);
        b_0.storeStringRefTail(src.contentDescription);
        b_0.storeStringRefTail(src.contentUrls);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.licenseType);
        b_1.storeStringRefTail(src.contentCategory);
        b_1.storeStringRefTail(src.contentSubcategory);
        b_1.storeCoins(src.price);
        let b_2 = new Builder();
        b_2.storeStringRefTail(src.currency);
        b_2.storeStringRefTail(src.allRestrictions);
        b_2.storeStringRefTail(src.additionalTerms);
        let b_3 = new Builder();
        b_3.storeStringRefTail(src.status);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLicense(slice: Slice) {
    let sc_0 = slice;
    let _licenseId = sc_0.loadIntBig(257);
    let _sellerAddress = sc_0.loadAddress();
    let _buyerAddress = sc_0.loadAddress();
    let _createdAt = sc_0.loadUintBig(32);
    let _contentName = sc_0.loadStringRefTail();
    let _contentDescription = sc_0.loadStringRefTail();
    let _contentUrls = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _licenseType = sc_1.loadStringRefTail();
    let _contentCategory = sc_1.loadStringRefTail();
    let _contentSubcategory = sc_1.loadStringRefTail();
    let _price = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _currency = sc_2.loadStringRefTail();
    let _allRestrictions = sc_2.loadStringRefTail();
    let _additionalTerms = sc_2.loadStringRefTail();
    let sc_3 = sc_2.loadRef().beginParse();
    let _status = sc_3.loadStringRefTail();
    return { $$type: 'License' as const, licenseId: _licenseId, sellerAddress: _sellerAddress, buyerAddress: _buyerAddress, createdAt: _createdAt, contentName: _contentName, contentDescription: _contentDescription, contentUrls: _contentUrls, licenseType: _licenseType, contentCategory: _contentCategory, contentSubcategory: _contentSubcategory, price: _price, currency: _currency, allRestrictions: _allRestrictions, additionalTerms: _additionalTerms, status: _status };
}

function loadTupleLicense(source: TupleReader) {
    let _licenseId = source.readBigNumber();
    let _sellerAddress = source.readAddress();
    let _buyerAddress = source.readAddress();
    let _createdAt = source.readBigNumber();
    let _contentName = source.readString();
    let _contentDescription = source.readString();
    let _contentUrls = source.readString();
    let _licenseType = source.readString();
    let _contentCategory = source.readString();
    let _contentSubcategory = source.readString();
    let _price = source.readBigNumber();
    let _currency = source.readString();
    let _allRestrictions = source.readString();
    let _additionalTerms = source.readString();
    let _status = source.readString();
    return { $$type: 'License' as const, licenseId: _licenseId, sellerAddress: _sellerAddress, buyerAddress: _buyerAddress, createdAt: _createdAt, contentName: _contentName, contentDescription: _contentDescription, contentUrls: _contentUrls, licenseType: _licenseType, contentCategory: _contentCategory, contentSubcategory: _contentSubcategory, price: _price, currency: _currency, allRestrictions: _allRestrictions, additionalTerms: _additionalTerms, status: _status };
}

function storeTupleLicense(source: License) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.licenseId);
    builder.writeAddress(source.sellerAddress);
    builder.writeAddress(source.buyerAddress);
    builder.writeNumber(source.createdAt);
    builder.writeString(source.contentName);
    builder.writeString(source.contentDescription);
    builder.writeString(source.contentUrls);
    builder.writeString(source.licenseType);
    builder.writeString(source.contentCategory);
    builder.writeString(source.contentSubcategory);
    builder.writeNumber(source.price);
    builder.writeString(source.currency);
    builder.writeString(source.allRestrictions);
    builder.writeString(source.additionalTerms);
    builder.writeString(source.status);
    return builder.build();
}

function dictValueParserLicense(): DictionaryValue<License> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLicense(src)).endCell());
        },
        parse: (src) => {
            return loadLicense(src.loadRef().beginParse());
        }
    }
}

export type LicenseArray = {
    $$type: 'LicenseArray';
    map: Dictionary<bigint, License>;
    length: bigint;
}

export function storeLicenseArray(src: LicenseArray) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.map, Dictionary.Keys.BigInt(257), dictValueParserLicense());
        b_0.storeUint(src.length, 64);
    };
}

export function loadLicenseArray(slice: Slice) {
    let sc_0 = slice;
    let _map = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserLicense(), sc_0);
    let _length = sc_0.loadUintBig(64);
    return { $$type: 'LicenseArray' as const, map: _map, length: _length };
}

function loadTupleLicenseArray(source: TupleReader) {
    let _map = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLicense(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'LicenseArray' as const, map: _map, length: _length };
}

function storeTupleLicenseArray(source: LicenseArray) {
    let builder = new TupleBuilder();
    builder.writeCell(source.map.size > 0 ? beginCell().storeDictDirect(source.map, Dictionary.Keys.BigInt(257), dictValueParserLicense()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserLicenseArray(): DictionaryValue<LicenseArray> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLicenseArray(src)).endCell());
        },
        parse: (src) => {
            return loadLicenseArray(src.loadRef().beginParse());
        }
    }
}

export type LicenseDelete = {
    $$type: 'LicenseDelete';
    licenseId: bigint;
}

export function storeLicenseDelete(src: LicenseDelete) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2185736809, 32);
        b_0.storeInt(src.licenseId, 257);
    };
}

export function loadLicenseDelete(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2185736809) { throw Error('Invalid prefix'); }
    let _licenseId = sc_0.loadIntBig(257);
    return { $$type: 'LicenseDelete' as const, licenseId: _licenseId };
}

function loadTupleLicenseDelete(source: TupleReader) {
    let _licenseId = source.readBigNumber();
    return { $$type: 'LicenseDelete' as const, licenseId: _licenseId };
}

function storeTupleLicenseDelete(source: LicenseDelete) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.licenseId);
    return builder.build();
}

function dictValueParserLicenseDelete(): DictionaryValue<LicenseDelete> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLicenseDelete(src)).endCell());
        },
        parse: (src) => {
            return loadLicenseDelete(src.loadRef().beginParse());
        }
    }
}

export type LicenseBuy = {
    $$type: 'LicenseBuy';
    licenseId: bigint;
    buyerAddress: Address;
}

export function storeLicenseBuy(src: LicenseBuy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2252110203, 32);
        b_0.storeInt(src.licenseId, 257);
        b_0.storeAddress(src.buyerAddress);
    };
}

export function loadLicenseBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2252110203) { throw Error('Invalid prefix'); }
    let _licenseId = sc_0.loadIntBig(257);
    let _buyerAddress = sc_0.loadAddress();
    return { $$type: 'LicenseBuy' as const, licenseId: _licenseId, buyerAddress: _buyerAddress };
}

function loadTupleLicenseBuy(source: TupleReader) {
    let _licenseId = source.readBigNumber();
    let _buyerAddress = source.readAddress();
    return { $$type: 'LicenseBuy' as const, licenseId: _licenseId, buyerAddress: _buyerAddress };
}

function storeTupleLicenseBuy(source: LicenseBuy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.licenseId);
    builder.writeAddress(source.buyerAddress);
    return builder.build();
}

function dictValueParserLicenseBuy(): DictionaryValue<LicenseBuy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLicenseBuy(src)).endCell());
        },
        parse: (src) => {
            return loadLicenseBuy(src.loadRef().beginParse());
        }
    }
}

 type Main_init_args = {
    $$type: 'Main_init_args';
    id: bigint;
}

function initMain_init_args(src: Main_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function Main_init(id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMain_init_args({ $$type: 'Main_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Main_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const Main_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LicenseCreate","header":2495643435,"fields":[{"name":"sellerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"contentName","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentUrls","type":{"kind":"simple","type":"string","optional":false}},{"name":"licenseType","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentCategory","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentSubcategory","type":{"kind":"simple","type":"string","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"allRestrictions","type":{"kind":"simple","type":"string","optional":false}},{"name":"additionalTerms","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"License","header":null,"fields":[{"name":"licenseId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"sellerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"buyerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"createdAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"contentName","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentDescription","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentUrls","type":{"kind":"simple","type":"string","optional":false}},{"name":"licenseType","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentCategory","type":{"kind":"simple","type":"string","optional":false}},{"name":"contentSubcategory","type":{"kind":"simple","type":"string","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"currency","type":{"kind":"simple","type":"string","optional":false}},{"name":"allRestrictions","type":{"kind":"simple","type":"string","optional":false}},{"name":"additionalTerms","type":{"kind":"simple","type":"string","optional":false}},{"name":"status","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"LicenseArray","header":null,"fields":[{"name":"map","type":{"kind":"dict","key":"int","value":"License","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LicenseDelete","header":2185736809,"fields":[{"name":"licenseId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LicenseBuy","header":2252110203,"fields":[{"name":"licenseId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"buyerAddress","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Main_getters: ABIGetter[] = [
    {"name":"arrayOfLicenses","arguments":[],"returnType":{"kind":"simple","type":"LicenseArray","optional":false}},
    {"name":"oneLicensebyId","arguments":[{"name":"licenseId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"License","optional":false}},
    {"name":"LicenseIdbySellerAddress","arguments":[{"name":"sellerAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Main_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"LicenseCreate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LicenseDelete"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LicenseBuy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Main implements Contract {
    
    static async init(id: bigint) {
        return await Main_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await Main_init(id);
        const address = contractAddress(0, init);
        return new Main(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Main(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Main_types,
        getters: Main_getters,
        receivers: Main_receivers,
        errors: Main_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: LicenseCreate | LicenseDelete | LicenseBuy | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LicenseCreate') {
            body = beginCell().store(storeLicenseCreate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LicenseDelete') {
            body = beginCell().store(storeLicenseDelete(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LicenseBuy') {
            body = beginCell().store(storeLicenseBuy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getArrayOfLicenses(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('arrayOfLicenses', builder.build())).stack;
        const result = loadTupleLicenseArray(source);
        return result;
    }
    
    async getOneLicensebyId(provider: ContractProvider, licenseId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(licenseId);
        let source = (await provider.get('oneLicensebyId', builder.build())).stack;
        const result = loadTupleLicense(source);
        return result;
    }
    
    async getLicenseIdbySellerAddress(provider: ContractProvider, sellerAddress: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(sellerAddress);
        let source = (await provider.get('LicenseIdbySellerAddress', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}