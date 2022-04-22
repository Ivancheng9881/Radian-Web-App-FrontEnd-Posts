import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import RadianInput from "../../../components/RadianForm";
import { IPriceFeed } from "../../../schema/Token/priceFeed";
import { ITokenBalance } from "../../../schema/Token/tokenList";

interface ITableData {
    balance: number,
    symbol: string,
    visible: boolean,
    lastPrice?: number,
}

interface PageProps {
    data?: ITokenBalance[],
    priceFeed?: IPriceFeed[]
}

const TokenTable : FC<PageProps> = ({
    data
}) => {

    const TOKEN_VISIBILITY_OPTIONS = [
        { label: 'All Public', value: 1 },
        { label: 'All Private', value: 0 }
    ];
    const tableCol = [
        { 
            title: 'Token', 
            dataIndex: 'symbol',
            key: 'symbol'
        },
        { 
            title: 'Amount', 
            dataIndex: 'balance',
            key: 'balance',
            render: (balance: number, record: ITableData) => {
                return `${Number(balance.toPrecision(4))} ${record.symbol}`
            }
        },
        {
            title: 'Price (in USD)',
            dataIndex: 'lastPrice',
            key: 'lastPrice',
            render: (lastPrice: number, record: ITableData) => {
                return Number((record.balance * lastPrice).toPrecision(4));
            }
        },
        { 
            title: 'Status', 
            dataIndex: 'visible', 
            key: 'visible',
            render: (visible: boolean, _: any, idx: number) => {
                const props = {
                    onClick: () => handleVisibilityToggle(idx, !visible),
                }
                return visible ? <EyeOutlined {...props} /> : <EyeInvisibleOutlined {...props} />
            }
        }
    ];

    const [ tableData, setTableData ] = useState<ITableData[]>();

    const handleVisibilityToggle = (recordId: number, newVal: boolean) => {
        let _data = [...tableData];
        _data[recordId].visible = newVal;
        setTableData(_data)
    }

    useEffect(() => {
        if (data) {
            let _tableData = data?.map((d) => {
                return {
                    balance: d.balance,
                    symbol: d.tokens[0].symbol,
                    visible: false,
                    lastPrice: d.lastPrice
                }
            });
            setTableData(_tableData)
        }
    }, [data]);

    const handleAllVisChange = (e: any) => {
        let visibility: boolean;
        if (e.target.value === 1) {
            visibility = true;
        } else if (e.target.value === 0) {
            visibility = false
        };

        let _tableData = tableData.map((d) => {
            d.visible = visibility;
            return d;
        })
        setTableData(_tableData);
    }

    return (
        <Fragment>
            {/* toggle all action */}
            <div className="rd-align-right">
                <RadianInput.Radio 
                    size="large"
                    defaultValue={0}
                    onChange={handleAllVisChange}
                    options={TOKEN_VISIBILITY_OPTIONS}                                    
                />
            </div>
            {/* token balance table */}

            <div className="rd-token-table">
                <Table
                    rowKey={(record) => `${record.symbol}-visiblity`}
                    bordered={false} 
                    pagination={false}
                    rowClassName={(record, index) => index % 2 === 0 ? 'rd-table-row-light' :  'rd-table-row-dark'}
                    columns={tableCol}
                    dataSource={tableData}
                    scroll={{y: 240}}
                /> 
            </div>
        </Fragment>
    )
};

export default TokenTable;