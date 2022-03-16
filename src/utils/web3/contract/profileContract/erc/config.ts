import { abi } from './abi.json';

const address: string = '0x395684AbDfe92aD405024B2DE8b522dc3d70Fe43';

const payMasterAddress: string = '0x4A463A9d9bf35E70D9AA03EC3385adDF3360d46d'

const subgraph = {
    enabled: true,
    graphId: 'radian-subgraph',
} as const;

const ProfileContract__evm__config = {
    abi,
    address,
    payMasterAddress,
    subgraph,
} as const;

export default ProfileContract__evm__config;