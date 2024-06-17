/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Disclosure / Accordion',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

/**
 * By default, only one accordion can be visible
 * at a time, and it can't be toggled.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const Basic = () => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <chakra.div flex="1" textAlign="left">
              Section 1 title
            </chakra.div>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <chakra.div flex="1" textAlign="left">
              Section 2 title
            </chakra.div>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
