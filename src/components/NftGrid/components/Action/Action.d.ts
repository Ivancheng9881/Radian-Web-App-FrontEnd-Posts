

interface INftActionBaseProps {
    iconClx?: any,
    actionHandler?(id: number): Promise<any>
};

export {
    INftActionBaseProps
}