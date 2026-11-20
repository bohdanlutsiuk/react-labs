import BrewGuide from './BrewGuide.jsx'
import ReviewList from './ReviewList.jsx'
import RelatedProducts from './RelatedProducts.jsx'
import { brewMethods, related, reviews } from '../data.js'
import Tabs from './Tabs.jsx'

export default function ProductTabs() {
  return (
    <Tabs defaultValue="brew">
      <Tabs.List aria-label="Про каву">
        <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
        <Tabs.Tab value="reviews">Відгуки ({reviews.length})</Tabs.Tab>
        <Tabs.Tab value="related">Схожі товари</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="brew">
        <BrewGuide methods={brewMethods} />
      </Tabs.Panel>
      <Tabs.Panel value="reviews">
        <ReviewList reviews={reviews} />
      </Tabs.Panel>
      <Tabs.Panel value="related">
        <RelatedProducts products={related} />
      </Tabs.Panel>
    </Tabs>
  )
}
