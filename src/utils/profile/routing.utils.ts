

export function profileRouteBuilder(network: string, pid: string | number) : string {
    let route = `/p/${network}/${pid}`;
    return route;
}