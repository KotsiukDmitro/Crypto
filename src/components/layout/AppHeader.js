import { Button, Layout, Select, Space, Modal, Drawer } from "antd"
import { useCrypto } from "../../context/ctypto-context"
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddssetForm from "../AddAssetForm";



export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(null)
  const [coin, setCoin] = useState(false)
  const [drawer, setDrawer] = useState(false)

  const { crypto } = useCrypto()

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect(prev => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    setCoin(crypto.find(c => c.id === value))
    setModal(true)
  }

  return <Layout.Header className="text-center w-full h-14 p-4 flex justify-between items-center">
    <Select className="w-[250px]"
      open={select}
      onSelect={handleSelect}
      onClick={() => setSelect(prev => !prev)}
      value="press / to open"
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
    <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

    <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
      <CoinInfoModal coin={coin} />
    </Modal>

    <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer}>
<AddssetForm />
      </Drawer>

  </Layout.Header>
}