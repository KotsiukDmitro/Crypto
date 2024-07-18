import { useRef, useState } from "react"
import { Select, Space, Divider, Form, Button, InputNumber, DatePicker, Result } from "antd"
import { useCrypto } from "../context/ctypto-context"
import CoinInfo from "./CoinInfo"

export default function AddAssetForm({ onClose }) {

    const [form] = Form.useForm()
    const { crypto, addAsset } = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    const validateMessages = {
        required: '${label} is required !',
        types: {
            number: '${label} is not valid number'
        },
        number: {
            range: '${label} must be between ${min} and ${max}'
        }
    }

    if (submitted) {
        return (
            <Result
                status="success"
                title="New asset added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }


    if (!coin) {
        return (
            <Select className="w-full"
                onSelect={v => setCoin(crypto.find(c => c.id === v))}
                placeholder='Select coin'
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={option => (
                    <Space>
                        <img src={option.data.icon} alt={option.data.label} className="w-5" /> {option.data.label}
                    </Space>
                )}
            />
        )
    }

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                price: +coin.price.toFixed(2)
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin} withSymbol={false} />
            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                rules={[{
                    required: true,
                    type: 'number',
                    min: 0
                }]}
            >
                <InputNumber
                    placeholder="Enter coin amount"
                    onChange={handleAmountChange}
                    className="w-full"
                />
            </Form.Item>

            <Form.Item label="Price" name="price" >
                <InputNumber className="w-full" onChange={handlePriceChange} />
            </Form.Item>

            <Form.Item label="Data & Time" name="data" >
                <DatePicker showTime />
            </Form.Item>

            <Form.Item label="Total" name="total" >
                <InputNumber className="w-full" disabled />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>

    )

}