import { Flex, Typography } from "antd"

export default function CoinInfo({coin, withSymbol=true}) {
    return (
        <Flex align="center">
        <img src={coin.icon} alt={coin.name} className="w-10 mr-3" />
        <Typography.Title level={2} style={{ margin: 0 }}>
            {withSymbol && <span>({coin.symbol})</span>} {coin.name}</Typography.Title>
    </Flex>
    )
}