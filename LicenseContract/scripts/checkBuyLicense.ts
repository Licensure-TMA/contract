import { Main } from '../wrappers/Main';
import { NetworkProvider } from '@ton/blueprint';
import { address } from '@ton/core';

export async function run(provider: NetworkProvider) {
    const main = provider.open(await Main.fromInit(5641654n));
    
    const license = await main.getResultOfBuy(address('0QAokDRDElCtgydnbRoag1uJAKJFU2yAQG8oP69FGjqZFMDx'))
    console.log(license)
}