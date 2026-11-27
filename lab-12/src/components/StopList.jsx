import { useStopList } from '../model/stopListContext.js'
import StopListPanel from './StopListPanel.jsx'

export default function StopList() {
  const { stopped, toggle } = useStopList()
  return <StopListPanel stopped={stopped} onToggle={toggle} />
}
