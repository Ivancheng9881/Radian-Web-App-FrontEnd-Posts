import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, TableColumnProps, TableColumnsType } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import RadianInput from "../../../components/RadianForm";
import { ITokenBalance } from "../../../schema/Token/tokenList";

interface ITableData {
    balance: number,
    symbol: string,
    visible: boolean
}

interface PageProps {
    data?: ITokenBalance[]
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
            title: 'Balance', 
            dataIndex: 'balance',
            key: 'balance'
        },
        { 
            title: 'Status', 
            dataIndex: 'visible', 
            key: 'visible',
            render: (visible: boolean, record: any, idx: number) => {
                console.log(record, visible, idx)
                const props = {
                    onClick: (e: any) => handleVisibilityToggle(idx, !visible),
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
                }
            });

            setTableData(_tableData)
        }
    }, [data]);

    const handleAllVisChange = (e: any) => {
        console.log(e.target.value);
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
                defaultValue={1}
                onChange={handleAllVisChange}
                options={TOKEN_VISIBILITY_OPTIONS}                                    
            />
        </div>
        {/* token balance table */}

        <div className="rd-token-table">
            <Table
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