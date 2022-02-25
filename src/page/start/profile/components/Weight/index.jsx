import { useContext } from 'react';
import Toggler from '../../../../../components/Toggler';
import DatingContext from '../../../context/datingApp/dating.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CustomTypography from '../../../../../components/Typography';

const ProfileWeight = (props) => {

    const { getLatestField, datingInfo, updateData } = useContext(DatingContext);

    const weight = getLatestField('weight');
    let weightUnit = getLatestField('weightUnit');
    if (weightUnit == null || weightUnit == ""){
        weightUnit = "kg";
    }

    const unitOpts = [ { value: 'lbs', label: 'lbs' }, { value: 'kg', label: 'kg' } ];

    const toggleUnit = (val) => {
        let update = {
            target: {
                name: 'weightUnit',
                value: val
            }
        };
        updateData(update, 'number');
    };

    return (
        <div id="RD-CreateProfile-weight" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Basic Info</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">Weight</Typography.Title>
                        <Row gutter={12}>
                            <Col span={6}>
                                <Input
                                    size='large'
                                    type="number"
                                    name="weight"
                                    placeholder={weightUnit.toUpperCase()}
                                    value={weight}
                                    onChange={(e) => updateData(e, 'number')}
                                />
                            </Col>
                            <Col span={12}>
                                <div className="inline-flex items-end">
                                    <div className="mr-5">
                                    <Toggler value={weightUnit} opts={unitOpts} handleToggle={toggleUnit} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
            {/* {datingInfo.error ? <p className="text-theme-danger">{datingInfo.error}</p> : ''} */}
        </div>
    );
};

export default ProfileWeight;
